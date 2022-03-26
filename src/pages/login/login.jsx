import React, { Component } from 'react'

import './login.less'
import logo from  '../../assets/images/logo.png'
// 登陸的路由組件

export default class Login extends Component {
  render() {
    return (
      <div className='login'>
          <header className='login-header'>
              <img src={logo} alt="logo" />
              <h1>React項目: 後台管理系統</h1>
          </header>
          <section className='login-content'>
              <h2>用戶登陸</h2>
              <div>表單標籤</div>
          </section>
      </div>
    )
  }
}
