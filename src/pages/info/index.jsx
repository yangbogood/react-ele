import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Header from '../../components/header';
import { Modal, Toast } from 'antd-mobile';
import { imgUrl } from '../../config/envconfig';
import { modifyUserInfo,saveUserInfo } from '../../store/action'
import QueueAnim from 'rc-queue-anim'
import API from '../../api/api.js';
import './index.scss'
const alert = Modal.alert;

const defaultImage = require('../../assets/images/default.jpg');
class Info extends Component {
  state = {
    hasAlert: false,
    alertText: '请在手机APP中打开',
    logout: false,
    files: [],
    base64: '',
  }

  uploadImg = async event => {
    try {
      let formdata = new FormData();  // 获取表单
      formdata.append('file', event.target.files[0]);  // 上传的文件
      let result = await API.uploadImg(formdata, 'avatar');
      this.props.modifyUserInfo(imgUrl + result.image_path)
    } catch (err) {
      console.error(err);
    }
  }


  goBack() {
    this.props.history.push('./profile')
  }

  handleClick(type) {
    switch (type) {
      case 'tele':
        Toast.info('请在手机APP中打开', 2, null, false);
        break
      case 'password':
        this.props.history.push('/forget');
        break
      case 'logout':
        alert('确认退出？', '', [
          { text: '取消', onPress: () => console.log('cancel') },
          { text: '确认', onPress: () => { this.loginOut() } },
        ])
        break
      default:
    }

  }
  loginOut = async ()=> {
    let res = await API.loginOut();
    if (res.status === 1) {
      Toast.success('退出成功', 2); 
      this.props.history.push('/')
      this.props.saveUserInfo({})
      window.localStorage.clear()
    }
  }
  render() {
    return (
      <div className='rating-page'>
        <QueueAnim type='bottom'>
          <Header title="账户消息" goBack={this.goBack.bind(this)} key='o1' />
          <section className='profile-info' key='o2'>
            <QueueAnim>
              <section className='headportrait' key='k1'>
                <input type="file" className='profile-info-upload' onChange={this.uploadImg} />
                <h2>头像</h2>
                <div className='info-avatar'>
                  <img src={this.props.userInfo.imgpath ? this.props.userInfo.imgpath : defaultImage} alt="img id wrong" className='headport-top' />
                  <div className='icon-arrow-right'></div>
                </div>

              </section>
              <Link to='/setuser/name' className='info-router' key='k2'>
                <section className='headportrait headportraitwo'>
                  <h2>用户名</h2>
                  <div className='info-avatar'>
                    <div>{this.props.userInfo.username}</div>
                    <div className='icon-arrow-right'></div>
                  </div>
                </section>
              </Link>
              <Link to='/setuser/address' className='info-router' key='k3'>
                <section className='headportrait headportraithree'>
                  <h2>收获地址</h2>
                  <div className='info-avatar'>
                    <div>{this.state.username}</div>
                    <div className='icon-arrow-right'></div>
                  </div>
                </section>
              </Link>
              <section className="bind-phone" key='k4'>
                账号绑定
            </section>
              <div onClick={this.handleClick.bind(this, 'tele')} className='info-router' key='k5'>
                <section className='headportrait headportraitfour'>
                  <div className='headport-phone'>
                    <div className='icon-shouji'></div>
                    <h2>手机</h2>
                  </div>
                  <div className='info-avatar'>
                    <div className='icon-arrow-right'></div>
                  </div>
                </section>
              </div>

              <section className="bind-phone" key='k6'>
                安全设置
            </section>
              <div onClick={this.handleClick.bind(this, 'password')} className='info-router' key='k7'>
                <section className='headportrait headportraithree'>
                  <h2>登录密码</h2>
                  <div className='info-avatar'>
                    <div className='headport-modify'>修改</div>
                    <div className='icon-arrow-right'></div>
                  </div>
                </section>
              </div>
              <section onClick={this.handleClick.bind(this, 'logout')} className='exit-login' key='k8'>退出登录</section>

            </QueueAnim>
          </section>
        </QueueAnim>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    modifyUserInfo: (imgpath) => dispatch(modifyUserInfo("imgpath", imgpath)),
    saveUserInfo:(userInfo)=>dispatch(saveUserInfo(userInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)