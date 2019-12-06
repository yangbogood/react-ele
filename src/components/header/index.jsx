import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import './index.scss'
export default class Header extends Component {

  handleBack = () => {
    this.props.goBack()
  }
  render() {
    return (
      <header className="header-container">
        {this.props.goBack && <NavBar
          mode="dark"
          icon={!this.props.icon ? <Icon type='left' />:<Icon type="search" />}
          onLeftClick={this.handleBack}
        >{this.props.title}</NavBar>}
      </header>
    )
  }
}