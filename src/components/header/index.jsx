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
        {!this.props.goBack && < NavBar
          mode="dark"
          onLeftClick={this.handleBack}
          icon={this.props.icon ? <Icon type={this.props.icon} />:<Icon type="search" />}
        // rightContent={[
        //   <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
        //   <Icon key="1" type="ellipsis" />,
        // ]}
        > {this.props.title}</NavBar>}
        {this.props.goBack && <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={this.handleBack}
        >{this.props.title}</NavBar>}
      </header>
    )
  }
}