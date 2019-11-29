import React, { Component } from 'react';

import Header from '../../components/header/index.jsx';
import { List, InputItem, Toast, Switch, Button } from 'antd-mobile';

import './index.scss';
export default class setUser extends Component {
  state = {
    headerTitle: "",
    type: "",
    name: '',
  }


  initData = (props) => {
    let type = props.location.pathname.split('/')[2]
    let headerTitle
    switch (type) {
      case 'name':
        headerTitle = '修改用户名'
        break
      case 'address':
        headerTitle = '编辑地址'
        break
      case 'add':
        headerTitle = '新增地址'
        break
      case 'add_detail':
        headerTitle = '搜索地址'
        break
      default:
        headerTitle = ''
    }
    this.setState({
      headerTitle,
      type
    })
  }
  goBack = () => {
    this.props.history.push('/info')
  }
  componentDidMount() {
    this.initData(this.props)
  }
  render() {
    return (
      <div className="setting">
        <Header goBack={this.goBack} title={this.state.headerTitle}></Header>
        {this.state.headerTitle === '修改用户名' && <section className="setting-input">
          <List>
            <InputItem placeholder={'请修改' + this.state.headerTitle} value={this.state.name} onChange={
              (value) => {
                this.setState({ name: value })
                console.info(this.state.name);
              }}></InputItem>
          </List>
          <p>用户名只能修改一次（5-24字符之间）</p>
        </section>}
        <section className="btn">
          <Button disabled={this.state.name === ''}>确认修改</Button>
        </section>


      </div>
    )
  }
}