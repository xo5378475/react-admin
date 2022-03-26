import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import './login.less'
import logo from '../../assets/images/logo.png'
// 登陸的路由組件

// const Item = Form.Item 
// <Form.Item> 可簡寫 <Item>

export default class Login extends Component {

  handleSubmit = (event)=>{

  }

  render() {
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="logo" />
          <h1>React項目: 後台管理系統</h1>
        </header>
        <section className='login-content'>
          <h2>用戶登陸</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>    
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用戶名"
                />
            </Form.Item>
            <Form.Item>             
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密碼"
                />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陸
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}
