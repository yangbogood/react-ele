import React, { Component } from 'react';
import Header from '../../components/header/index.jsx';
import { getStore, removeStore } from '../../utils/commons'
import './index.scss';

export default class Food extends Component {
  constructor(props) {
    super(props)
    this.state = {
      geohash: "", // city页面传递过来的地址geohash
      headTitle: "", // msiet页面头部标题
      foodTitle: "", // 排序左侧头部标题
      restaurant_category_id: "", // 食品类型id值
      restaurant_category_ids: "", //筛选类型的id
      sortBy: "", // 筛选的条件
      category: null, // category分类左侧数据
      categoryDetail: null, // category分类右侧的详细数据
      sortByType: null, // 根据何种方式排序
      Delivery: null, // 配送方式数据
      Activity: null, // 商家支持活动数据
      delivery_mode: null, // 选中的配送方式
      support_ids: [], // 选中的商铺活动列表
      filterNum: 0, // 所选中的所有样式的集合
      confirmStatus: false // 确认选择
    }
  }
  goBack = () => {
    this.props.history.push('./msite');
  }


  componentDidMount() {
    const { geohash, title, restaurant_category_id } = getStore('path');
    this.setState(({
      geohash,
      headTitle: title,
      restaurant_category_id,
    }))

  }

  componentWillUnmount() {
    removeStore('path')
  }
  render() {
    return (
      <section className="food_container">
        <Header goBack={this.goBack} title={this.state.headTitle}></Header>
        <div className="sort_container">
          

        </div>
      </section>)

  }
}