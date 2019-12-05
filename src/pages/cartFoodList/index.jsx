import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'antd-mobile'

import { savaCartFoodList } from '../../store/shop/shop-action'
import './index.scss'
import clear_icon from '../../assets/images/clear.png'
import cart_add from '../../assets/images/cart-add.png'
import specs_reduce_icon  from '../../assets/images/specs_reduce_icon.png'
class CartFoodList extends Component {
  state = {
    modal2: true
  }

  onClose = () => {

  }

  clearCartList = () => {
    this.props.clearCartList()
  }
  render() {
    return (<section>
      <Modal
        className="cart_food_list"
        popup
        visible={this.props.visible}
        onClose={this.props.onClose}
        animationType="slide-up"
      >
        <section className="cart-content">
          <header>
            <h4>购物车</h4>
            <div onClick={() => { this.clearCartList() }}>
              <img src={clear_icon} alt="" />
              <span>清空</span>
            </div>
          </header>
          <section className="cart_food_details">
            <ul>
              {
                this.props.cartFoodList.map(item => {
                  console.info(item)
                  return (
                    <li className="cart_food_li">
                    <div className="cart_list_num">
                        <p className="ellipsis">{item.name}</p>
                        {item.specs.length!==0&&<p className="ellipsis">{item.specs[0].value}</p>}
                    </div>
                    <div className="cart_list_price">
                        <span>¥</span><span>{item.price}</span>
                    </div>
                    <section className="cart_list_control">
                        <img src={specs_reduce_icon} alt="" />
                        <span>{item.num}</span>
                        <img src={cart_add} alt=""/>   
                    </section>
                  </li>
                  )
                })
              }
         
            </ul>
          </section>
        </section>
      </Modal>
    </section>)
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    savaCartFoodList: (foodList) => dispatch(savaCartFoodList(foodList))
  }
}


export default connect(mapDispatchToProps)(CartFoodList)