import React, { Component } from 'react'
import './index.less'


export default class Header extends Component {
  render() {
    return (
      <div className='header'>
        <div className="header-top">
          <span>歡迎, admin</span>
          <a href="javascript:">退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">首頁</div>
          <div className="header-bottom-right">
            <span>2019-05-16 10:12:36</span>
            <img src="" alt="" />
            <span>晴</span>
          </div>
        </div>
      </div>
    )
  }
}
