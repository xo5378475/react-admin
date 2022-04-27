import React, { Component } from 'react'
import './index.less'
import logo from '../../assets/images/logo.png'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd';
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils';

const { SubMenu } = Menu;

class LeftNav extends Component {
  //  使用MAP + 遞歸
  getMenuNodes_map = (menuList) => {
    return menuList.map(item => {
      /**
       * {
       *    title:'首頁',
       *    key:'/home',
       *    icon:'home',
       *    children:[] 可能有 可能沒有
       * }
       */
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
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

  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname
    return menuList.reduce((pre, item) => {
      if (this.hasAuth(item)) {
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
          // Array.prototype.find() 會回傳第一個滿足所提供之測試函式的元素值。否則回傳 undefined。
          const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
          if (cItem) {
            this.openKey = item.key
          }

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
      }
      return pre
    }, [])
  }

  hasAuth = (item)=>{
    const {key,isPublic} = item
    const menus = memoryUtils.user.role.menus
    const username = memoryUtils.user.username
    // 如果當前是admin
    if(username==='admin' || isPublic || menus.indexOf(key)!==-1){
      return true
    } else if(item.children){ // 如果當前用戶有此item的某個子item 權限
      return !!item.children.find(child=>menus.indexOf(child.key)!==-1)
    }
    return false
  }

  // 在第一次render()執行一次 // v16 可用 v17 已棄
  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render() {
    let path = this.props.location.pathname
    if (path.indexOf('/product') === 0) { //當前請求的是商品或其子路由介面
      path = '/product'

    }
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
          defaultOpenKeys={[this.openKey]}

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
            this.menuNodes
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