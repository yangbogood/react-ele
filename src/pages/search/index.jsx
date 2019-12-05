// @ts-nocheck
import React, { Component } from 'react';
import Header from './../../components/header/index.jsx'
import Footer from '../../components/footer/index.jsx';
import { SearchBar, Button, Icon } from 'antd-mobile';
import { setStore, getStore ,removeStore} from "../../utils/commons";
import './index.scss';
export default class Search extends Component {
  state = {
    keys: '',
    keysArray: []
  }
  onChange = () => {

  }

  submit = () => {
    let arr = this.state.keysArray;
    if (!arr.includes(this.state.keys) && this.state.keys !== "") {
      arr.push(this.state.keys);

      this.setState({
        keysArray: arr
      })
      setStore('searchHistory', this.state.keysArray)
    }

  }

  onKeyup = (e) => {
    if (e.keyCode === 13) {
      this.submit()
    }
  }

  clearIndexSearch = (index) => {
    let arr = this.state.keysArray;
    arr = arr.filter((item, i) => {
      return i !== index
    })
    this.setState({
      keysArray: arr
    })
    setStore('searchHistory', this.state.keysArray)
  }

  goBack = () => {
    this.props.history.push('./msite')
  }
  componentDidMount() {
    const searchHistory = getStore('searchHistory');
    if (searchHistory) {
      this.setState({
        keysArray: JSON.parse(searchHistory)
      })
    }
 
  }
  render() {
    return (
      <div className="search">
        <Header title={'搜索'} goBack={this.goBack}></Header>
        <section className="search_form" >
          <div>
            <input type="text" placeholder="请输入商家或美食名称" class="search_input" value={this.state.keys} onChange={(e) => {
              this.setState({
                keys: e.target.value
              })
            }} onKeyUp={this.onKeyup} />
            {this.state.keys && <Icon type="cross" className='clear' onClick={() => { this.setState({ keys: '' }) }}></Icon>}
          </div>
          <button onClick={this.submit}>提交</button>
        </section>
        {this.state.keysArray.length !== 0  && <section className="search_history">
          <h4>搜索历史</h4>
          <ul >
            {
              this.state.keysArray.map((item, i) => {
                return (
                  <li className="history_list">
                    <span className="history_text">{item}</span>
                    <Icon type="cross" onClick={() => { this.clearIndexSearch(i) }}></Icon>
                  </li>
                )
              })
            }
          </ul>
          <footer className="clear_history" onClick={() => {
            this.setState({
              keysArray: []
            })
            removeStore('searchHistory')
          }}>清空搜索历史</footer>
        </section>}
        <Footer></Footer>
      </div>
    )
  }
}