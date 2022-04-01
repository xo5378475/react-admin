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
          <Menu.Item key="/home">
            <Link to='/home'>
              <Icon type="pie-chart" />
              <span>首頁</span>
            </Link>
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
            <Menu.Item key="/category">
              <Link to='/category'>
                <Icon type="mail" />
                <span>品類管理</span> 
              </Link>
            </Menu.Item>
            <Menu.Item key="/product">
              <Link to='/product'>
                <Icon type="mail" />
                <span>商品管理</span>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/role">
            <Link to='/role'>
              <Icon type="pie-chart" />
              <span>角色管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/user">
            <Link to='/user'>
              <Icon type="pie-chart" />
              <span>人員管理</span>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}
