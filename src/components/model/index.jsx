import React, { Component } from 'react'
import { Icon } from 'antd-mobile'
import './index.scss'


class Model extends Component {
  state = {
    index: 0,
    foodInfo: {}
  }

  componentDidMount() {
    this.setState({
      foodInfo: this.props.foodInfo
    })
  }

  closeModel(e) {
    this.props.close()
  }

  addCarFood = () => {
    const foodInfo = this.props.foodInfo.specfoods[this.state.index];
    this.props.addFoodCar({ ...foodInfo ,category_id:this.props.foodInfo.category_id})
    this.props.close()
  }
  render() {
    const { foodInfo } = this.state
    return (
      <section className="v-model">
        {Object.keys(foodInfo).length !== 0 &&
          <section className="model-content">
            <header>
              <h3 className="ellipsis">{foodInfo.name}</h3>
              <Icon type="cross" onClick={(e) => { this.closeModel(e) }} />
            </header>
            <section className="specs_details">
              <h5 className="specs_details_title">规格</h5>
              <ul>
                {
                  foodInfo.specfoods.map((item, index) => {
                    return <li className={index === this.state.index ? "specs_activity" : ''} onClick={()=>{this.setState({index})}}>{item.specs_name}</li>
                  })
                }
              </ul>
            </section>
            <footer className="specs_footer">
              <div className="specs_price">
                <span >￥</span>
                <span>20</span>
              </div>
              <div className="specs_addto_cart" onClick={this.addCarFood}>
                加入购物车
         </div>

            </footer>
          </section>}

      </section>
    )
  }
}

export default Model