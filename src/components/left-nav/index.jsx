import React, { Component } from 'react'
import './index.less'
import logo from '../../assets/images/logo.png'
import { Link ,withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;

 class LeftNav extends Component {
//  使用MAP + 遞歸
  getMenuNodes_map = (menuList)=>{
    return menuList.map(item=>{
      /**
       * {
       *    title:'首頁',
       *    key:'/home',
       *    icon:'home',
       *    children:[] 可能有 可能沒有
       * }
       */
      if(!item.children){
        return(
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else{
        return(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {
              this.getMenuNodes(item.children)
            }
          
          </SubMenu>
        )
      }
    })
  }

  getMenuNodes = (menuList)=>{
    return menuList.reduce((pre,item)=>{
      if (!item.children) {
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      } else {
        pre.push((
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {
              this.getMenuNodes(item.children)
            }
          
          </SubMenu>
        ))
      }
      return pre
    },[])
  }

  render() {
    const path = this.props.location.pathname

    return (
      <div className='left-nav'>
        <Link to='/' className='left-nav-header'>
          <img src={logo} alt="logo" />
          <h1>硅谷後台</h1>
        </Link>
        <Menu

          mode="inline"
          theme="dark"
          selectedKeys={[path]}

        >
          {/* 
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
          </Menu.Item> */}
          {
            this.getMenuNodes(menuList)
          }
        </Menu>
      </div>
    )
  }
}

/**
 * withRouter 高階組件
 * 包裝非路由組件,返回一個新的組件
 * 新的組件向非路由組件傳遞3個屬性 :history location match
 * 
 */

export default withRouter(LeftNav)