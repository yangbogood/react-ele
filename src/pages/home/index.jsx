import React, { Component } from "react";
import Header from "../../components/header/index.jsx";
import { Icon } from "antd-mobile";
import { Link, Route } from "react-router-dom";
import HomeApi from "../../api/home.js";
import "./index.scss";

console.info(HomeApi);
export default class Home extends Component {
  state = {
    hotCityList: [],
    allCityList: {},
    allCityKeys:[],
  };
  goBack = () => { };
  getCitys = async () => {
    const res = await HomeApi.getCitys("hot");
    const res1 = await HomeApi.getCitys("group");
    this.setState({
      hotCityList: res,
    });
    console.info(res1);
    console.info(Object.keys(res1).sort((a, b) => a.localeCompare(b)));


    this.setState({
      allCityList: res1,
      allCityKeys:Object.keys(res1).sort((a, b) => a.localeCompare(b)),
    });
  };
  componentDidMount() {
    this.getCitys();
  }
  render() {
    return (
      <div className="home">
        <Header title={"ele.me"} />
        <nav className="city_nav">
          <div className="city_tip">
            <span>当前定位城市：</span>
            <span>定位不准时，请在城市列表中选择</span>
          </div>
          <Link to="/city/">
            <span></span>
            <Icon type="right"></Icon>
          </Link>
        </nav>
        <section className="hot_city_container">
          <div className="city_title">热门城市</div>
          <ul className="citylistul">
            {this.state.hotCityList.map((item) => {
              return <li>{item.name}</li>;
            })}
          </ul>
        </section>
        <section className="group_city_container">
          <ul className="letter_classify">
            {this.state.allCityKeys.map((key) => {

              return (
                <li className="letter_classify_li">
                  <div className="city_title">{key}</div>
                  <ul className="citylistul">
                    {this.state.allCityList[key].map((item) => {
                      return <li title={item.name}>{item.name}</li>;
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    );
  }
}
