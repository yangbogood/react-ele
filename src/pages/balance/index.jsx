import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header/index.jsx';
import { Link } from 'react-router-dom';
import { Tabs, Icon } from 'antd-mobile';
import API from '../../api/api'
import downloadImage from '../../assets/images/download.png'
import question from '../../assets/images/question.png';
import './index.scss';

// const downloadImage = require('../../assets/images/download.png');
class Balance extends Component {
  state = {
    title: '我的优惠',
    userId: this.props.userInfo.user_id,
    hongbaoArr: [],
    downloadImage: downloadImage,
    tab: '1',
    tabs: [
      { title: '红包', sub: '1' },
      { title: '商家代金券', sub: '2' },
    ]
  }
  goBack() {
    this.props.history.push('./profile')
  }


  getHongBao = async () => {

    const res = await API.getHongbao(this.state.userId, { limit: 20, offset: 0 })
    this.setState({
      hongbaoArr: res
    })
  }

  componentDidMount() {
    this.getHongBao()
  }
  render() {
    return (
      <div className='rating_page'>
        <Header title={this.state.title} goBack={this.goBack.bind(this)}></Header>

        <Tabs tabs={this.state.tabs}
          initialPage={0}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => {
            this.setState({
              tab: tab.sub
            })
          }}
        >
          <section>
            <section className="hongbao_container">
              <header className='hongbao_title'>
                <section className='total_number'>
                  有<span>3</span>个红包即将到期
                </section>
                <div className="hongbao_description">
                  <img src={question} alt="" />
                  <Link to="">红包说明</Link>
                </div>
              </header>
              <ul className="hongbao_list_ul">
                {
                  this.state.hongbaoArr.map(item => {
                    return (
                      <li className="hongbao_list_li">
                        <section className='list_item' >
                          <div className="list_item_left">
                            <span>￥</span>
                            <span>{item.sum_condition / 10}</span>
                            <span>.</span>
                            <span>0</span>
                            <p>{item.description_map.sum_condition}</p>
                          </div>
                          <div className="list_item_right">
                            <h4>{item.name}</h4>
                            <p>{item.description_map.validity_periods}</p>
                            <p>{item.description_map.phone}</p>
                          </div>
                          <div className="time_left">剩3日</div>
                        </section>
                        {item.limit_map && <div className="list_item_footer">{item.limit_map.restaurant_flavor_ids}</div>}
                      </li>
                    )
                  })
                }

              </ul>

            </section>
            <Link to='/balance/hbHistory' className="hongbao_history"><span>历史红包</span><Icon type="right" size={'xs'} /></Link>
          </section>
          <section className='voucher_container'>
            <div className="hongbao_description">
              <img src={question} alt="" />
              <Link to="">商家代金券说明</Link>
            </div>
            <div>
              <img src={this.state.downloadImage} alt="" />
              <p>无法使用代金券</p>
              <p>非客户端或客户端版本过低</p>
              <Link to="/download" className="download_app" >
                下载或升级客户端
            </Link>
            </div>


          </section>
        </Tabs>
        {this.state.tab === '1' && <footer className="hongbao_footer">
          <Link to="" className="hongbao_style" >兑换红包</Link>
          <Link to="" className="hongbao_style">推荐有奖</Link>
        </footer>
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}


export default connect(mapStateToProps)(Balance)