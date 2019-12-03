import React, { Component } from 'react'
import { Icon, Grid, Badge } from 'antd-mobile';
import { Link } from 'react-router-dom';
import Model from '../../components/model/index.jsx';
import SHOP from '../../api/shop.js';
import { imgUrl } from '../../config/envconfig.js';
import { Tabs } from 'antd-mobile';
import BScroll from 'better-scroll'
import Rating from '../rating/index.jsx'
import Loading from '../../components/loading/index.jsx';
import './index.scss'
import { Models } from 'rmc-calendar/lib/date/DataTypes';

export default class Shop extends Component {

  state = {
    shopId: '',
    foodList: [],
    shopDetailedInfo: {},
    foodIndex: 0,
    tab: "shop",
    // foodScroll: null,
    foodScroll: {},
    menuIndex: 0, //已选菜单索引值，默认为0\
    shopListTop: [],
    modelShow: false,
    foodInfo: {},
    totalPrice: 0, //总共价格
    cartFoodList: [], //购物车商品列表
    showLoading: true, //显示加载动画
    showCartList: false,//显示购物车列表
    menuIndexChange: true,//解决选中index时，scroll监听事件重复判断设置index的bug
  }
  getFoodList = async (id) => {
    const res = await SHOP.getFoodList(id);
    this.setState({
      foodList: res
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
    console.info(this.state.shopListTop)
    this.state.foodScroll.scrollTo(0, -this.state.shopListTop[index], 400);
    this.state.foodScroll.on('scrollEnd', () => {
      this.setState({
        menuIndexChange: true
      })
    })
    this.setState({ foodIndex: index })
  }
  goBack = () => {
    console.info(this.props)
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
              foodIndex:index
            })
            const menuList = wrapper_menu.querySelectorAll('.activity_menu');
            const el = menuList[0];
            wrapperMenu.scrollToElement(el, 800, 0, -(wrapMenuHeight / 2 - 50));
          }
        })
      })
    })


  }

  render() {
    const { shopDetailedInfo, foodList, tab, modelShow, foodInfo, showLoading } = this.state
    // if (!showLoading) {
    //   this.getFoodListHeight()
    // }
    return (
      <div className="shop_container">
        <section className="buy_cart_container">

          <section className="cart_icon_num">

            <div className="cart_icon_container">
              <Badge text={'3'}>
                <div className="cart_icon"></div>
              </Badge>
            </div>
            <div className="cart_num">
              <div>¥ 10040.00</div>
              <div>配送费¥5</div>
            </div>

          </section>
          <section className="gotopay">去结算</section>
        </section>
        {modelShow && <Model foodInfo={foodInfo} close={this.closeModel.bind(this)}></Model>}
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
            <section className="menu_container">
              <section className="menu_left" id="wrapper_menu" ref="wrapper_menu">
                <ul>
                  {
                    foodList.map((item, index) => {
                      return (
                        <li className={this.state.foodIndex === index ? "menu_left_li activity_menu" : "menu_left_li"} onClick={() => { this.chooseFood(index) }}>
                          <span className="ellipsis" >{item.name}</span>
                        </li>
                      )
                    })
                  }
                </ul>
              </section>
              <section className="menu_right" ref="menu_right">
                <ul>
                  {foodList.map(item => {
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
                                        <span className="show_chooselist" onClick={() => { this.chooseFoodType(foodInfo) }}>选规格</span>
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