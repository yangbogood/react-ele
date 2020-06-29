import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './../../components/header/index.jsx';
import Alert from './../../components/alert_tip/index.jsx'
import { List, InputItem, Toast, Switch, Button} from 'antd-mobile';
import { getImgPath } from '../../utils/commons'
import { createForm } from 'rc-form';
import API from '../../api/api'
import './index.scss'
import { async } from 'q';


class Forget extends Component {
 cu
  state = {
    title: '密码登录',
    hasError: false,
    username: this.props.userInfo.username,
    oldPassword: '',
    newPassword: '',
    agaiNewPassword: '',
    code: '',
    imgCodePath: '',
    hasAlert: false,
    alertText: '',
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
      userName: value,
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
  submit() {
    if (this.state.userName === '') {
      this.setState({
        hasAlert: !this.state.hasAlert
      })
      this.state.alertText = "请输入账号"
      return 
    } else if (this.state.oldPassword === '') {
      this.setState({
        hasAlert: !this.state.hasAlert
      })
      this.state.alertText = "请输入密码"
    return 
    }
    this.changepassword()
  }

  changepassword = async () => {
    const sendObj = {
      username: this.state.username,
      oldpassWord: this.state.oldPassword,
      newpassword: this.state.newPassword,
      confirmpassword: this.state.againNewPassword,
      captcha_code:this.state.code
    }
    const res = await API.changepassword(sendObj);
    if (res.tip) {
      this.state.alertText =res.tip;
      this.setState({
        hasAlert: !this.state.hasAlert
      })
    } else {
      Toast.success('密码修改成功，请重新登录', 2);
    this.props.history.push('/login')
    }
    
  }

  componentDidMount() {
    this.getCaptchaCode()
    this.setState({
      username: this.props.userInfo.username
    })
  }

  closeTip() {
    this.setState({
      hasAlert: !this.state.hasAlert
    })
  }
  render() {
    return (
      <div className="forget-container">
        {this.state.hasAlert && <Alert logout={() => { return false }} closeTip={this.closeTip.bind(this)} alertText={this.state.alertText} />}
        <Header title={this.state.title} goBack={this.goBack.bind(this)} />
        <div className="login-form">
          {!this.props.userInfo.username && <List >
            <InputItem
              type="text"
              placeholder="账号"
              error={this.state.hasError}
              onErrorClick={this.onErrorClick.bind(this)}
              onChange={this.onChange.bind(this)}
              value={this.state.username}
            ></InputItem>
          </List>}
          <List >
            <InputItem

              type="password"
              placeholder="旧密码"
              onErrorClick={this.onErrorClick.bind(this)}
              onChange={(val) => {
                this.setState({
                  oldPassword: val
                })
              }}
              value={this.state.oldPassword}
            ></InputItem>
          </List>
          <List >
            <InputItem

              type="password"
              placeholder="新密码"
              onErrorClick={this.onErrorClick.bind(this)}
              onChange={(val) => {
                this.setState({
                  newPassword: val
                })
              }}
              value={this.state.newPassword}
            ></InputItem>
          </List>
          <List >
            <InputItem

              type="password"
              placeholder="确认新密码"
              onErrorClick={this.onErrorClick.bind(this)}
              onChange={(val) => {
                this.setState({
                  againNewPassword: val
                })
              }}
              value={this.state.againNewPassword}
            ></InputItem>
          </List>

          <List className='input-container captcha-code-container'>
            <InputItem
              type="number"
              maxLength={4}
              placeholder="验证码"
              onErrorClick={this.onErrorClick.bind(this)}
              onChange={(val) => {
                this.setState({
                  code: val
                })
              }}
              value={this.state.code}
            ></InputItem>
            <div className='img-change-img'>
              <img src={this.state.imgCodePath} alt="img is wrong" />
              <div className='change-img' onClick={this.getCaptchaCode.bind(this)}>
                <p>看不清</p>
                <p>换一张</p>
              </div>
            </div>
          </List>

        </div>
        <Button className='login-button' onClick={this.submit.bind(this)}>确认修改</Button>
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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Forget)