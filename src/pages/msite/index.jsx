import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Header from './../../components/header/index.jsx'
import Footer from '../../components/footer/index.jsx';
import { Carousel, WingBlank } from 'antd-mobile';
import { Rate } from "antd";
import API from "../../api/api.js";
import shop from "../../assets/images/shop.png";
import { imgUrl } from '../../config/envconfig.js';
import './index.scss';

export default class Msite extends Component {

  state = {
    geohash: '',

    shopImg: 'http://cangdu.org:8001/img/',
    msiteTitle: '',
    data: ['1', '2', '3'],
    foodTypes: [],
    imgHeight: 176,
    imgPath: "https://fuss10.elemecdn.com",
    postion: [31.22299, 121.36025],
    shopList: [],


  }


  getMsiteAddress = async () => {
    const str = '31.22299,121.36025'
    const result = await API.getPoisSite(this.state.postion);
    this.setState({
      msiteTitle: result.name
    })
  }

  zhunshi = (supports) => {
    let zhunStatus;
    if ((supports instanceof Array) && supports.length) {
      supports.forEach(item => {
        if (item.icon_name === '准') {
          zhunStatus = true;
        }
      })
    } else {
      zhunStatus = false;
    }
    return zhunStatus
  }

  msiteFoodTypes = async () => {
    const str = '31.22299,121.36025'
    const result = await API.getFoodTypes({ geohash: str });
    const arr = []
    const arrs = []
    const arrss = []
    result.map((item, index) => {
      index <= 7 ? arr.push(item) : arrs.push(item);
    })
    arrss.push(arr)
    arrss.push(arrs)
    this.setState({
      foodTypes: arrss
    })
  }
  getShopList = async () => {
    const result = await API.getShopList({ latitude: 31.22967, longitude: 121.4762 })
    this.setState({
      shopList: result
    })
  }

  componentDidMount() {
    this.getMsiteAddress();
    this.msiteFoodTypes();
    this.getShopList()
  }


  render() {
    return (
      <div className="msite">
        <Header title={this.state.msiteTitle}></Header>
        <nav className='msite_nav'>
          <WingBlank>
            <Carousel
              autoplay={false}
              infinite
              beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
              afterChange={index => console.log('slide to', index)}
            >
              {
                this.state.foodTypes.map(item => {
                  return (
                    <div className="food_types_container">
                      {
                        item.map(obj => {
                          return (
                            <Link to={obj.link} className="link_to_food">
                              <div>
                                <img src={this.state.imgPath + obj.image_url} alt="" />
                                <span>{obj.title}</span>
                              </div>
                            </Link>
                          )
                        })
                      }
                    </div>

                  )
                })
              }
            </Carousel>
          </WingBlank>
        </nav>
        <section className="shoplist_container">
          <header><img src={shop} /><span>附近商家</span></header>
          <ul>
            {
              this.state.shopList.map((item, index) => {
                return (
                  <li>
                    <Link to={"/shop/"+`${item.id}`}>
                    <section>
                      <img src={imgUrl + item.image_path} alt="" className="shop_img" />
                    </section>
                    <hgroup className="shop_right" >
                      <header className="shop_detail_header">
                        <h4 className="shop_title ellipsis premium">{item.name}</h4>
                        <ul className="shop_detail_ul">
                          {
                            item.supports.map(item1 => {
                              return (
                                <li className="supports">{item1.icon_name}</li>
                              )
                            })
                          }
                        </ul>
                      </header>
                      <h5 className="rating_order_num">
                        <section className="rating_order_num_left">
                          <section className="rating_section">
                            <Rate allowHalf={true} value={item.rating} disabled></Rate><span className="rating_num">{item.rating}</span>
                          </section>
                          <section className="order_section">月售{item.recent_order_num}单</section>
                        </section>
                        <section className="rating_order_num_right">
                          {item.delivery_mode && <span className="delivery_style delivery_left">{item.delivery_mode.text}</span>}
                          {this.zhunshi(item.supports) && <span className="delivery_style delivery_right" >准时达</span>}
                        </section>
                      </h5>
                      <h5 className="fee_distance">
                        <p className="fee">
                          ¥{item.float_minimum_order_amount}起送
                        <span className="segmentation">/</span>
                          {item.piecewise_agent_fee.tips}
                        </p>
                        <p className="distance_time">
                          <span>{item.distance > 1000 ? (item.distance / 1000).toFixed(2) + 'km' : item.distance + 'm'}</span>
                          <span className="segmentation">/</span>
                          <span className="order_time">{item.order_lead_time}</span>
                        </p>
                      </h5>
                      </hgroup>
                      </Link>
                  </li>
                  
                )
              })
            }

          </ul>
        </section>
        < Footer></Footer>
      </div>
    )
  }
}