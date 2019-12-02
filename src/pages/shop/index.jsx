import React, { Component } from 'react'
import { Icon, Grid } from 'antd-mobile';
import { Link } from 'react-router-dom';
import SHOP from '../../api/shop.js';
import { imgUrl } from '../../config/envconfig.js';
import { Tabs } from 'antd-mobile';
import BScroll from 'better-scroll'
import Rating from '../rating/index.jsx'
import './index.scss'

export default class Shop extends Component {

  state = {
    shopId: '',
    foodList: [],
    shopDetailedInfo: {},
    foodIndex: 0,
    tab:"shop",
  }
  getFoodList = async (id) => {
    const res = await SHOP.getFoodList(id);
    this.setState({
      foodList: res
    })
  }

  getShopDetailedInfo = async (id) => {
    const shopDetailedInfo = await SHOP.getShopDetailedInfo(id);
    console.info(shopDetailedInfo)
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

    let wrapper = document.querySelector('#wrapper_menu');
    const iScroll = new BScroll(wrapper);
    console.info(iScroll)

    }

  render() {
    const { shopDetailedInfo, foodList,tab } = this.state
    return (
      <div className="shop_container">
        <nav className="goback" ><Icon type='left' size="md" onClick={this.goBack}></Icon></nav>
        <header className="shop_detail_header">
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

        </header>
        <div className="food-wrapper">
          <div className="tabs">
            <div className="tabs-shop" onClick={() => { this.onchangeTabs('shop') }}>
              <span className={tab==='shop'?'tabs-active':""}>商品</span>  
            </div>
            <div className="tabs-shop"  onClick={() => { this.onchangeTabs('rating') }}>
            <span className={tab==='rating'?'tabs-active':""}>评论</span>
            </div>
          </div>

          {tab==="shop"&&<section className="food_container">
            <section className="menu_container">
              <section className="menu_left" id="wrapper_menu">
                <ul>
                  {
                    foodList.map((item, index) => {
                      return (
                        <li className={this.state.foodIndex === index ? "menu_left_li activity_menu" : "menu_left_li"} onClick={() => { this.chooseFood(index) }}>
                          <span className="ellipsis">{item.name}</span>
                        </li>
                      )
                    })
                  }

                </ul>
              </section>

            </section>

          </section>}
          {tab==='rating'&&<Rating shopId={this.props.match.params.id} />}
 
        </div>
      </div>
    )
  }

}