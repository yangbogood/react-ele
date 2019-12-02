import React, { Component } from 'react'
import { Tag } from 'antd-mobile';
import { Rate } from "antd";
import './index.scss';
import SHOP from '../../api/shop.js';
import { imgUrl } from '../../config/envconfig.js';
// @ts-ignore
// import Viewer from 'viewerjs';
export default class Rating extends Component {
  state = {
    ratingList: [],
    tagList: [],
    ratings: {}
  }
  getRatings = async (shopId) => {

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
  componentDidMount() {
    const offset = this.state.ratingList.length;
    const params = {
      offset,
      limit: 20,
    }
    this.getRatings(this.props.shopId)
    Promise.all(
      [
        SHOP.getRatingList(this.props.shopId, params),
        SHOP.getTagList(this.props.shopId),
        SHOP.getRatings(this.props.shopId)
      ]
    ).then(res => {
      this.setState(
        {
          ratingList: res[0],
          tagList: res[1],
          ratings: res[2]
        }
      )
    })
    console.info(document.querySelector('.food_img_ul'))

  }
  render() {
    const { ratingList, tagList, ratings } = this.state;
    console.info(ratings)
    console.info(ratings.overall_score)
    return (
      <section className="rating_container">
        <section>
          <header className="rating_header">
            <section className="rating_header_left">
              <p>4.7</p>
              {ratings.overall_score && <p>综合评价{ratings.overall_score.toFixed(1)}</p>}
              {ratings.compare_rating && <p>高于周边商家{(ratings.compare_rating * 100).toFixed(1)}%</p>}
            </section>
            <section className="rating_header_right">
              <p>
                <span>服务态度</span>
                {ratings.service_score && <div className="rating_container">
                  <Rate value={ratings.service_score.toFixed(1)} disabled={true} allowHalf={true} count={5}></Rate>
                  <span className="rating_num">{ratings.service_score.toFixed(1)}</span>
                </div>}
              </p>
              <p>
                <span>服务态度</span>
                {ratings.service_score && <div className="rating_container">
                  <Rate value={ratings.food_score.toFixed(1)} disabled={true} allowHalf={true} count={5}></Rate>
                  <span className="rating_num">{ratings.food_score.toFixed(1)}</span>
                </div>}
              </p>
              <p><span>送达时间</span><div>{ratings.deliver_time}</div>分钟</p>
            </section>
          </header>

          <ul className="tag_list_ul">
            {
              tagList.map((item, index) => {
                return <li className={index === 0 ? 'tagActivity' : item.unsatisfied ? 'unsatisfied' : ''}>{item.name}({item.count})</li>
              })
            }

          </ul>
          <ul className="rating_list_ul">
            {
              ratingList.map(item => {
                return (
                  <li className="rating_list_li">
                    <img src={this.getImgPath(item.avatar)} alt="" className="user_avatar" />
                    <section className="rating_list_details">
                      <header>
                        <section className="username_star">
                          <p className="username">{item.username}</p>
                          <p className="star_desc">
                            <div className="rating_container">
                              <Rate value={item.rating_star} disabled={true} allowHalf={true} count={5}></Rate>
                            </div>
                            <span className="time_spent_desc">{item.time_spent_desc}</span>
                          </p>
                        </section>
                        <time className="rated_at">{item.rated_at}</time>
                      </header>
                      <ul className="food_img_ul">
                        {
                          item.item_ratings.map(imgInfo => {
                            return (
                              <li>
                                {imgInfo.image_hash !== '' && <img src={this.getImgPath(imgInfo.image_hash)} alt="" />}
                              </li>
                            )
                          })
                        }
                      </ul>
                      <ul className="food_name_ul">
                        {
                          item.item_ratings.map(info => {
                            return <li className="ellipsis" title={info.food_name}>{info.food_name}</li>

                          })
                        }
                      </ul>
                    </section>
                  </li>
                )
              })
            }

          </ul>


        </section>

      </section>
    )
  }
}