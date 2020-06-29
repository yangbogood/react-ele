import React, { Component } from "react";
import { NavBar, Icon } from "antd-mobile";
import { connect } from "react-redux";

import "./index.scss";
class Header extends Component {
  handleBack = () => {
    this.props.goBack();
  };

  state = {
    headTitle: "首页",
  };

  handleEdit = () => {
    this.props.edit();
  };
  render() {
    return (
      <header className="header-container">
        {this.props.goBack && (
          <div
            className="icon-back header-back"
            onClick={this.handleBack}
          ></div>
        )}
        <div className="header-title">{this.props.title}</div>
        {this.props.signUp ? (
          this.props.userInfo ? (
            <span
              className="icon-account user-avatar"
              onClick={this.props.goHome}
            ></span>
          ) : (
            <span>登录|注册</span>
          )
        ) : (
          ""
        )}
        {this.props.edit && (
          <div onClick={this.handleEdit} className="user-avatar">
            {this.props.userInfo.operate === "edit" ? "编辑" : "完成"}
          </div>
        )}
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfoData.userInfo,
  };
};

export default connect(mapStateToProps, {})(Header);
