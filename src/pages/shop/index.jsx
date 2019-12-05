import React, { Component } from 'react'
import { Icon, Grid, Badge } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Model from '../../components/model/index.jsx';
import SHOP from '../../api/shop.js';
import { imgUrl } from '../../config/envconfig.js';
import { Tabs } from 'antd-mobile';
import BScroll from 'better-scroll'
import Rating from '../rating/index.jsx'
import Loading from '../../components/loading/index.jsx';
import { savaCartFoodList, clearCartFoodList } from '../../store/shop/shop-action'
import store from '../../store';
import './index.scss'
import { Models } from 'rmc-calendar/lib/date/DataTypes';
import CartFoodList from '../cartFoodList/index.jsx';

class Shop extends Component {

  // state = {
  //   shopId: '',
  //   menuList: [],
  //   shopDetailedInfo: {},
  //   foodIndex: 0,
  //   showCartList: false,
  //   tab: "shop",

  //   // foodScroll: null,
  //   foodScroll: {},
  //   menuIndex: 0, //已选菜单索引值，默认为0\
  //   shopListTop: [],
  //   modelShow: false,
  //   foodInfo: {},
  //   totalPrice: 0, //总共价格
  //   showLoading: true, //显示加载动画
  //   menuIndexChange: true,//解决选中index时，scroll监听事件重复判断设置index的bug
  //   shopCart:{}
  // }

  constructor(props) {
    super(props);
    this.state = {
      shopId: '',
      menuList: [],
      shopDetailedInfo: {},
      foodIndex: 0,
      showCartList: false,
      tab: "shop",
      categoryNum: [],
      // foodScroll: null,
      foodScroll: {},
      menuIndex: 0, //已选菜单索引值，默认为0\
      shopListTop: [],
      modelShow: false,
      foodInfo: {},  //
      cartFoodList: [],  //购物车商品列表
      totalPrice: 0, //总共价格
      showLoading: true, //显示加载动画
      menuIndexChange: true,//解决选中index时，scroll监听事件重复判断设置index的bug
      shopCart: {}
    }
    store.subscribe(() => {   //监听状态变化更新数据
      this.setState({
        shopCart: this.props.cartFoodList[this.props.match.params.id]
      }, function () {
        this.initCategoryNum()
      })

    })
  }
  getFoodList = async (id) => {
    const res = await SHOP.getFoodList(id);
    this.setState({
      menuList: res
    })
    let wrapper = document.querySelector('#wrapper_menu');
    const foodScroll = new BScroll(wrapper, {
      probeType: 3,
      deceleration: 0.001,
      bounce: false,
      swipeTime: 2000,
      click: true,

    });
    this.getFoodListHeight()
  }

  getShopDetailedInfo = async (id) => {
    const shopDetailedInfo = await SHOP.getShopDetailedInfo(id);
    this.setState({
      shopDetailedInfo
    })
  }
  onchangeTabs = (tab) => {
    this.setState({
      tab,
    })
  }

  chooseFood = (index) => {

    //menuIndexChange解决运动时listenScroll依然监听的bug
    this.setState({
      menuIndexChange: false
    })
    this.state.foodScroll.scrollTo(0, -this.state.shopListTop[index], 400);
    this.state.foodScroll.on('scrollEnd', () => {
      this.setState({
        menuIndexChange: true
      })
    })
    this.setState({ foodIndex: index })
  }
  goBack = () => {
    this.props.history.goBack()
  }
  componentDidMount() {
    this.setState({
      shopId: this.props.match.params.id
    })
    this.getFoodList(this.props.match.params.id);
    this.getShopDetailedInfo(this.props.match.params.id)
    this.setState({
      showLoading: false
    })



  }
  closeModel() {
    this.setState({
      modelShow: false,
      foodInfo: {}
    })
  }

  chooseFoodType = (foodInfo) => {
    this.setState({
      foodInfo,
      modelShow: true
    })
  }

  getImgPath = (path) => {
    let suffix;
    if (!path) {
      return '//elm.cangdu.org/img/default.jpg'
    }
    if (path.indexOf('jpeg') !== -1) {
      suffix = '.jpeg'
    } else {
      suffix = '.png'
    }
    let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
    return 'https://fuss10.elemecdn.com' + url
  }
  getFoodListHeight = () => {
    const listContainer = document.querySelector('.menu_right');
    const shopListTop = [];
    if (listContainer) {
      let listArr = Array.from(listContainer.children[0].children);
      listArr.forEach((item, index) => {
        shopListTop[index] = item.offsetTop;
      });
      this.setState({
        shopListTop
      })
      this.listenScroll(listContainer)

    }
  }

  clearCartList = () => {
    this.props.clearCartFoodList()
    this.setState({
      showCartList: false
    })
  }


  addFoodCar = (food) => {
    console.info(food, '=================')
    this.props.savaCartFoodList({ ...food, shopid: this.props.match.params.id })
  }

  listenScroll = (element) => {
    const foodScroll = new BScroll(element, {
      probeType: 3,
      deceleration: 0.001,
      bounce: false,
      swipeTime: 2000,
      click: true,
    });
    this.setState({
      foodScroll
    }, function () {
      const wrapperMenu = new BScroll('#wrapper_menu', {
        click: true,
      });
      const wrapper_menu = document.querySelector('#wrapper_menu');
      const wrapMenuHeight = wrapper_menu.clientHeight;
      this.state.foodScroll.on('scroll', (pos) => {
        if (!wrapper_menu) {
          return
        }
        this.state.shopListTop.forEach((item, index) => {
          if (this.state.menuIndexChange && Math.abs(Math.round(pos.y)) >= item) {
            this.setState({
              foodIndex: index
            })
            const menuList = wrapper_menu.querySelectorAll('.activity_menu');
            const el = menuList[0];
            wrapperMenu.scrollToElement(el, 800, 0, -(wrapMenuHeight / 2 - 50));
          }
        })
      })
    })


  }


  initCategoryNum = () => {
    let newArr = [];
    let cartFoodNum = 0;
    let totalPrice = 0;
    this.setState({
      totalPrice: 0
    })
    const cartFoodList = [];
    this.state.menuList.forEach((item, index) => {
      if (this.state.shopCart && this.state.shopCart[item.foods[0].category_id]) {
        let num = 0;
        Object.keys(this.state.shopCart[item.foods[0].category_id]).forEach(itemid => {
          Object.keys(this.state.shopCart[item.foods[0].category_id][itemid]).forEach(foodid => {
            let foodItem = this.state.shopCart[item.foods[0].category_id][itemid][foodid];
            num += foodItem.num;
            if (item.type == 1) {
              totalPrice += foodItem.num * foodItem.price;
              if (foodItem.num > 0) {
                cartFoodList[cartFoodNum] = {};
                cartFoodList[cartFoodNum].category_id = item.foods[0].category_id;
                cartFoodList[cartFoodNum].item_id = itemid;
                cartFoodList[cartFoodNum].food_id = foodid;
                cartFoodList[cartFoodNum].num = foodItem.num;
                cartFoodList[cartFoodNum].price = foodItem.price;
                cartFoodList[cartFoodNum].name = foodItem.name;
                cartFoodList[cartFoodNum].specs = foodItem.specs;
                cartFoodNum++;
              }
            }
          })
        })
        newArr[index] = num;
      } else {
        newArr[index] = 0;
      }


    })
    console.info(cartFoodList)
    this.setState({
      totalPrice: totalPrice.toFixed(2),
      categoryNum: [...newArr],
      cartFoodList,
    })

  }

  foodNum = (foods) => {
    let category_id = foods.category_id;
    let item_id = foods.item_id;
    if (this.state.shopCart && this.state.shopCart[category_id] && this.state.shopCart[category_id][item_id]) {
      let num = 0;
      Object.values(this.state.shopCart[category_id][item_id]).forEach((item, index) => {
        num += item.num;
      })
      return num;
    } else {
      return 0;
    }
  }

  totalNum = () => {
    let num = 0;
    this.state.categoryNum.forEach(item => {
      num += item
    })
    return num
  }

  render() {
    const { shopDetailedInfo, menuList, tab, modelShow, foodInfo, showLoading } = this.state;

    return (
      <div className="shop_container">
        {modelShow && <Model foodInfo={foodInfo} close={this.closeModel.bind(this)} addFoodCar={this.addFoodCar}></Model>}
        <nav className="goback" ><Icon type='left' size="md" onClick={this.goBack}></Icon></nav>
        {Object.keys(shopDetailedInfo).length !== 0 && <header className="shop_detail_header">
          <div className="header_cover_img_con"><img className="header_cover_img" src={imgUrl + shopDetailedInfo.image_path}></img></div>
          <section className="description_header">
            <Link to="#" className="description_top">
              <section className="description_left">
                <img src={imgUrl + this.state.shopDetailedInfo.image_path} alt="" />
              </section>
              <section className="description_right">
                <h4 className="description_title ellipsis">{shopDetailedInfo.name}</h4>
                <p className="description_text">商家配送／{shopDetailedInfo.order_lead_time}分钟送达／配送费¥{shopDetailedInfo.float_delivery_fee}</p>
                <p className="description_promotion  ellipsis">{shopDetailedInfo.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢'}</p>
              </section>
            </Link>
          </section>

        </header>}
        <div className="food-wrapper">

          <div className="tabs">
            <div className="tabs-shop" onClick={() => { this.onchangeTabs('shop') }}>
              <span className={tab === 'shop' ? 'tabs-active' : ""}>商品</span>
            </div>
            <div className="tabs-shop" onClick={() => { this.onchangeTabs('rating') }}>
              <span className={tab === 'rating' ? 'tabs-active' : ""}>评论</span>
            </div>
          </div>

          {tab === "shop" && <section className="food_container">
            {this.state.showCartList && <CartFoodList
              visible={this.state.showCartList}
              cartFoodList={this.state.cartFoodList}
              onClose={() => { this.setState({ showCartList: !this.state.showCartList }) }}
              clearCartList={this.clearCartList}></CartFoodList>}
            <section className="buy_cart_container">
              <section className="cart_icon_num">
                <div className="cart_icon_container">
                  <Badge text={this.totalNum()}>
                    <div className="cart_icon" onClick={() => {
                      if (this.props.cartFoodList.length !== 0) {
                        this.setState({
                          showCartList: !this.state.showCartList
                        })
                      }
                    }}></div>
                  </Badge>
                </div>
                <div className="cart_num">
                  <div>¥ {this.state.totalPrice}</div>
                  <div>配送费¥5</div>
                </div>

              </section>
              <section className="gotopay">去结算</section>
            </section>
            <section className="menu_container">
              <section className="menu_left" id="wrapper_menu" ref="wrapper_menu">
                <ul>
                  {
                    (menuList || []).map((item, index) => {
                      return (
                        <li
                          className={this.state.foodIndex === index ? "menu_left_li activity_menu" : "menu_left_li"}
                          onClick={() => { this.chooseFood(index) }}
                        >
                          <Badge text={this.state.categoryNum[index]} className="menu_left_li_num">
                            <span className="ellipsis" >{item.name}</span>
                          </Badge>
                        </li>
                      )
                    })
                  }
                </ul>
              </section>
              <section className="menu_right" ref="menu_right">
                <ul>
                  {menuList.map(item => {
                    return (
                      <li>
                        <header className="menu_detail_header">
                          <section className="menu_detail_header_left">
                            <strong className="menu_item_title">{item.name}</strong>
                            <span className="menu_item_description">{item.description}</span>
                          </section>
                          <span className="menu_detail_header_right">...</span>
                        </header>
                        {
                          item.foods.map(foodInfo => {
                            return (
                              <section className="menu_detail_list">
                                <div className="menu_detail_link">
                                  <section className="menu_food_img">
                                    <img src={imgUrl + foodInfo.image_path} alt="" />
                                  </section>
                                  <section className="menu_food_description">
                                    <h3 className="food_description_head ellipsis">
                                      {foodInfo.name}
                                    </h3>
                                    <p className="food_description_content">{foodInfo.description}</p>
                                    <p className="food_description_sale_rating">
                                      <span>月售{foodInfo.month_sales}份</span>
                                      <span>好评率{foodInfo.satisfy_rate}%</span>
                                    </p>
                                    {foodInfo.activity && <p className="food_activity">
                                      <span>{foodInfo.activity.image_text}</span>
                                    </p>}
                                  </section>
                                </div>
                                <footer className="menu_detail_footer">
                                  <section className="food_price">
                                    <span>￥</span>
                                    <span>20</span>
                                    <span>起</span>
                                  </section>
                                  <section className="cart_module">
                                    <section className="choose_specification">
                                      <section className="choose_icon_container">
                                        {this.foodNum(foodInfo) >= 1 && <div className="cart_button"></div>}
                                        {this.foodNum(foodInfo) && <span className="cart_num">{this.foodNum(foodInfo)}</span>}
                                        {foodInfo.specfoods.length === 1 &&
                                          <div className="cart-add"
                                            onClick={() => { this.addFoodCar({ ...foodInfo.specfoods[0], category_id: foodInfo.category_id }) }} >
                                          </div>}

                                        {foodInfo.specfoods.length > 1 &&
                                          <span className="show_chooselist"
                                            onClick={() => { this.chooseFoodType({ ...foodInfo, category_id: foodInfo.category_id }) }}>
                                            选规格</span>
                                        }
                                      </section>
                                    </section>
                                  </section>
                                </footer>
                              </section>
                            )
                          })
                        }
                      </li>
                    )
                  })}
                </ul>
              </section>


            </section>

          </section>}
          {tab === 'rating' && <Rating shopId={this.props.match.params.id} />}


        </div>
      </div >
    )
  }

}



const mapStateToProps = (state) => {
  return {
    cartFoodList: state.cartFoodList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    savaCartFoodList: (menuList) => dispatch(savaCartFoodList(menuList)),
    clearCartFoodList: () => dispatch(clearCartFoodList())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Shop)