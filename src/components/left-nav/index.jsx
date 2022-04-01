import React, { Component } from 'react'
import './index.less'
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom'


import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

export default class LeftNav extends Component {

  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div className='left-nav'>
        <Link to='/' className='left-nav-header'>
          <img src={logo} alt="logo" />
          <h1>硅谷後台</h1>
        </Link>
        <Menu

          mode="inline"
          theme="dark"

        >
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>首頁</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="5">
              <Icon type="mail" />
              <span>品類管理</span> 
            </Menu.Item>
            <Menu.Item key="6">
              <Icon type="mail" />
              <span>商品管理</span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}
