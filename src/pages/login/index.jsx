import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './../../components/header/index.jsx'
import { List, InputItem, Toast, Switch, Button } from 'antd-mobile';
import { getImgPath, setStore } from '../../utils/commons'
import {saveUserInfo} from '../../store/action.js'
import { createForm } from 'rc-form';
import API from '../../api/api'
import './index.scss'

class Login extends Component {
  state = {
    title: '密码登录',
    hasError: false,
    phone: '',
    password: '',
    hasPwdShow: false,
    code: '',
    imgCodePath: '',
  }
  goBack() {
    this.props.history.goBack()
  }

  onErrorClick = () => {
    if (this.state.hasError) {
      Toast.info('Please enter 11 digits');
    }
  }
  onChange(value) {
    if (value.replace(/\s/g, '').length < 11) {
      this.setState({
        hasError: true,
      });
    } else {
      this.setState({
        hasError: false,
      });
    }
    this.setState({
      phone: value,
    });
  }
  onChangePassWord(value) {
    this.setState({
      password: value,
    });
  }

  onChangeCode(value) {

  }

  getCaptchaCode = async () => {
    let res = await API.getCaptchaCode()
    this.setState({
      imgCodePath: res.code
    })
  }
  goLogin = async () => {
    const sendObj = {
      username: this.state.phone,
      password: this.state.password,
      captcha_code: this.state.code
    }
    let userInfo = await API.accountLogin({ ...sendObj });
    if (userInfo.tip) {
      Toast.info(userInfo.response.message, 2, null, false);
      if (!this.state.loginWay) this.getCaptchaCode();
      return
    }
    setStore('user_id', userInfo.user_id)
    setStore('userInfo', userInfo )
    this.props.saveUserInfo(userInfo)
    this.props.history.push('/profile')
  }
  submit() {
    if (this.state.phone === '') {

      Toast.info('请输入账号', 2, null, false);
      return;
    } else if (this.state.password === '') {
      Toast.info('请输入密码', 2, null, false);
      return
    } else if (this.state.code === '') {
      Toast.info('请输入验证码', 2, null, false);
      return
    }
    this.goLogin()
  }
  componentDidMount() {
    this.getCaptchaCode()
  }
  render() {
    // const { getFieldProps } = this.props.form;
    return (
      <div className="login-container">
        <Header title={this.state.title} goBack={this.goBack.bind(this)} />
        <div className="login-form">
          <List >
            <InputItem
     
              type="text"
              placeholder="请输入账号"
              maxLength={11}
              onErrorClick={this.onErrorClick.bind(this)}
              onChange={this.onChange.bind(this)}
              value={this.state.phone}
            >账号</InputItem>
          </List>
          {!this.state.hasPwdShow ? <List >
            <InputItem
              type="password"
              placeholder="请输入密码"
              onChange={this.onChangePassWord.bind(this)}
              value={this.state.password}
            >密码</InputItem>
            <Switch checked={this.state.hasPwdShow} onChange={() => {
              this.setState({
                hasPwdShow: !this.state.hasPwdShow,
              });
            }}
            ></Switch>
          </List> :
            <List >
              <InputItem
      
                type="text"
                placeholder="请输入密码"
                error={this.state.hasError}
                onErrorClick={this.onErrorClick.bind(this)}
                onChange={this.onChangePassWord.bind(this)}
                value={this.state.password}
              >密码</InputItem>
              <Switch checked={this.state.hasPwdShow} onChange={() => {
                this.setState({
                  hasPwdShow: !this.state.hasPwdShow,
                });
              }}
              ></Switch>
            </List>
          }
          <List className='input-container captcha-code-container'>
            <InputItem
     
              type="text"
              placeholder="请输入验证码"
              onChange={(val) => {
                this.setState({
                  code: val
                })
              }}
              value={this.state.code}
            >账号</InputItem>
            <div className='img-change-img'>
              <img src={this.state.imgCodePath} alt="img is wrong" />
              <div className='change-img' onClick={this.getCaptchaCode.bind(this)}>
                <p>看不清</p>
                <p>换一张</p>
              </div>
            </div>
          </List>

        </div>

        <p className='login-tips'>
          温馨提示: 未注册过的账号, 登录时自动注册
      </p>
        <p className='login-tips'>
          注册过的用户可凭证账号密码登录
      </p>
        <Button className='login-button' onClick={this.submit.bind(this)} >登录</Button>
        <Link to='/forget' className='to-forget'>重置密码?</Link>
        {/* <Button to='/forget' className='to-forget'>重置密码?</Button> */}
        {/* {this.state.hasAlert&&<AlertTip logout={()=> {return false}} closeTip={this.closeTip} alertText={this.state.alertText}/>} */}


      </div>
    )
  }
}
// const BasicInputExampleWrapper = createForm()(Login);

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserInfo: (userInfo) => dispatch(saveUserInfo(userInfo))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
