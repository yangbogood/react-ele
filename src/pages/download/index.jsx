import React, { Component } from 'react';

import Header from '../../components/header/index.jsx';
import logo from '../../assets/images/logo.jpg';
import {Toast } from 'antd-mobile';
import AlertTip from '../../components/alert_tip/index.jsx';
import './index.scss';
export default class Downlaod extends Component {
  state = {
    alertText: '请在手机APP中打开',
  }
  goBack = () => {
    this.props.history.goBack()
  }
  render() {
    return (<div className="download">
      <Header goBack={this.goBack} title={'下载'}></Header>
      <section>
        <img src={logo} alt="" />
        <p>下载饿了么APP</p>
        <div className="determine" onClick={() => {Toast.info('IOS用户请前往appStore下载') }}>下载</div>
      </section>
    </div>)
  }
}