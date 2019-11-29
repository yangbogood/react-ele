import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header/index.jsx';
import API from '../../api/api';
import './index.scss';
class HbHistory extends Component {
  state = {
    title: '历史红包',
    HbHistoryArr: []

  }


  goBack = () => {
    this.props.history.push('/balance')
  }

  getHistoryHongbao = async () => {
    const HongbaoArr = await API.getHistoryHongbao(this.props.userInfo.user_id, { limit: 20, offset: 0 });
    this.setState({
      HbHistoryArr: HongbaoArr
    })
    console.info(this.state.HbHistoryArr);
  }
  componentDidMount() {
    console.info(this.props.userInfo);
    this.getHistoryHongbao()
  }
  render() {
    return (
      <div className="hb_history">
        <Header title={this.state.title} goBack={this.goBack}></Header>
        <section>
          <ul className="hongbao_list_ul">
            {
              this.state.HbHistoryArr.map(item => {
                return (
                  <li className="hongbao_list_li">
                    <section className='list_item' >
                      <div className="list_item_left">
                        <span>￥</span>
                        <span>{item.sum_condition / 10}</span>
                        <span>.</span>
                        {(item.sum_condition / 10) % 1 === 0 && <span >0</span>}
                        <p>{item.description_map.sum_condition}</p>
                      </div>
                      <div className="list_item_right">
                        <h4>{item.name}</h4>
                        <p>{item.description_map.validity_periods}</p>
                        <p>{item.description_map.phone}</p>
                      </div>
                      <div className="time_left">
                      </div>
                    </section>
                    {item.limit_map && <div className="list_item_footer">{item.limit_map.restaurant_flavor_ids}</div>}
                  </li>
                )

              })
            }
          </ul>
        </section>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}


export default connect(mapStateToProps)(HbHistory)