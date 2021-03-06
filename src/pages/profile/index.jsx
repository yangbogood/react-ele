import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { saveUserInfo } from '../../store/userInfo/action.js'
import { getStore } from '../../utils/commons'
import API from '../../api/api'
import Footer from './../../components/footer/index.jsx'
import Header from './../../components/header/index.jsx'
import QueueAnim from 'rc-queue-anim'
import './index.scss';
import { async } from 'q';


const header_imgae=require('../../assets/images/header-image.jpg')
 class Profile extends Component {
  state = {
    username: '登录/注册',
    mobile: '暂无绑定手机',
    imgpath: '',   // 图片路径
    balance: 0,     //我的余额
    count: 0,       //优惠券个数
    pointNumber: 0, //积分数
    hasAlert: '',   // tip是否显示
    alertText: '请在手机APP中打开',
   }
   
   initData = () => {
     let newState = {}
   
     if (this.props.userInfo && this.props.userInfo.user_id) {
       newState.mobile = this.props.userInfo.mobile || '暂无手机绑定'
       newState.username = this.props.userInfo.username
       newState.balance = this.props.userInfo.balance
       newState.count = this.props.userInfo.gift_amount
       newState.pointNumber = this.props.userInfo.point
     } else {
       newState.mobile = '暂无手机绑定'
       newState.username = '登录/注册'
     }
     this.setState(newState)
   }

  goBack = () => {

  }

  handleClick() {
    
   }
   getUserInfo = async () => {
     let userInfo = await API.getUser({ user_id: getStore('user_id') })
     this.props.saveUserInfo(userInfo)
     this.initData()  
   }
   componentDidMount() {
    if (!this.props.userInfo.user_id&&getStore('user_id')) {
      this.getUserInfo()
    } else {
      this.initData()  
    }
   }
   render() {
    return (
      <div className='profile-container'>
        <QueueAnim type='bottom'>
          <Header title={'个人中心'} keys='s1' ></Header>
          <section key='s2' className='profile-lists'>
          <section className='profile-number' >
              <Link to={this.props.userInfo.user_id?'/info':'/login'} className='profile-link'>
                <img src={header_imgae} alt='img is wrong' className='private-image' />
                <div className='user-info'>
                  <div>{this.state.username}</div>
                  <div>
                    <div className='icon-tel'></div>
                    <span className='icon-mobile-number'>{this.state.mobile}</span>
                  </div>
                </div>
                <div className='icon-arrow-right'>
                </div>
              </Link>
            </section>
            <section className='info-data' key='i1'>
              <ul className='clear'>
                <Link to='/balance' className='info-data-link'>
                  <span className='info-data-top'><b>{parseInt(this.state.balance).toFixed(2)}</b>元</span>
                  <span className='info-data-bottom'>我的余额</span>
                </Link>
                <Link to='/balance' className='info-data-link'>
                  <span className='info-data-top'><b>{this.state.count}</b>个</span>
                  <span className='info-data-bottom'>我的优惠</span>
                </Link>
                <Link to='/balance' className='info-data-link'>
                  <span className='info-data-top'><b>{this.state.pointNumber}</b>分</span>
                  <span className='info-data-bottom'>我的积分</span>
                </Link>
              </ul>
            </section>
            <section className='profile-list'>
              <QueueAnim deley='0.4'>
                <div onClick={this.handleClick.bind(this, 'unfinished')} className='myorder' key='i2'>
                  <div className='icon-dingdan order-icon'></div>
                  <div className='myorder-text'>
                    <span>我的订单</span>
                    <div className='icon-arrow-right'></div>
                  </div>
                </div>
                <a href="https://home.m.duiba.com.cn/#/chome/index" className='myorder' key='i3'>
                  <div className='icon-jifen1 order-icon'></div>
                  <div className='myorder-text'>
                    <span>积分商城</span>
                    <div className='icon-arrow-right'></div>
                  </div>
                </a>
                <div onClick={this.handleClick.bind(this, 'unfinished')} className='myorder' key='i4' >
                  <div className='icon-huangguan order-icon'></div>
                  <div className='myorder-text'>
                    <span>饿了么会员卡</span>
                    <div className='icon-arrow-right'></div>
                  </div>
                </div>
                <div onClick={this.handleClick.bind(this, 'unfinished')} className='myorder' key='i5'>
                  <div className='icon-yk_fangkuai_fill order-icon'></div>
                  <div className='myorder-text'>
                    <span>服务中心</span>
                    <div className='icon-arrow-right'></div>
                  </div>
                </div>
                <div onClick={this.handleClick.bind(this, 'download')} className='myorder' key='i6'>
                  <div className='icon-changyonglogo40 order-icon'></div>
                  <div className='myorder-text'>
                    <span>下载饿了么APP</span>
                    <div className='icon-arrow-right'></div>
                  </div>
                </div>
              </QueueAnim>
            </section>
          </section>


       
        </QueueAnim>
        <Footer />
      </div>

    )
  }
}


const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfoData.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserInfo: (userInfo) => dispatch(saveUserInfo(userInfo))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile)