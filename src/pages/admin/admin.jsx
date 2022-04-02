import React, { Component } from 'react'
import { Redirect,Route,Switch } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import { Layout } from 'antd'
import Home from '../home/home'
import Category from '../category/category'
import Bar from '../charts/bar'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Line from '../charts/line'
import Pie from '../charts/pie'

const { Footer, Sider, Content } = Layout;

// 後台管理的路由組件
export default class Admin extends Component {
  render() {

    const user = memoryUtils.user
    // 如果內存沒有儲存USER 表示當前沒有登錄
    if (!user || !user._id) {
      // render 中使用跳轉
      return <Redirect to='/login'></Redirect>
    }

    return (
      <Layout style={{height:"100%"}}>
        <Sider>
          <LeftNav></LeftNav>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{margin:'20px',backgroundColor:'#fff'}}>
            <Switch>
              <Route path='/home' component={Home}></Route>
              <Route path='/category' component={Category}></Route>
              <Route path='/product' component={Product}></Route>
              <Route path='/role' component={Role}></Route>
              <Route path='/user' component={User}></Route>
              <Route path='/charts/bar' component={Bar}></Route>
              <Route path='/charts/line' component={Line}></Route>
              <Route path='/charts/pie' component={Pie}></Route>
              <Redirect to='/home'></Redirect>
            </Switch>
           
          </Content>
          <Footer style={{textAlign:'center',color:'#ccc'}}>推薦使用谷歌瀏覽器，可以獲得更佳頁面操作體驗</Footer>
        </Layout>
      </Layout>
    )
  }
}
