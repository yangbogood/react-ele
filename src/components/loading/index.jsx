import React, { Component } from 'react'
import { Icon } from 'antd-mobile'
import './index.scss'

class Loading extends Component {
  state = {
    positionY: 0,
    timer: null,
  }
  componentDidMount() {
    const timer = setInterval(() => {
      this.setState({
        positionY: this.state.positionY + 1
      })
    }, 600)
    this.setState({
      timer,
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
    this.setState({
      timer: null
    })
  }

  render() {
    const { positionY } = this.state
    return (
      <div className="loading_container">
        <div className="load_img" style={{ backgroundPositionY: `${-(positionY % 7) * 2.5}` + 'rem' }}>
        </div>
        <svg className="load_ellipse" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <ellipse cx="26" cy="10" rx="26" ry="10" style={{ fill: '#ddd', stroke: 'none' }}></ellipse>
        </svg>
      </div>
    )
  }
}

export default Loading