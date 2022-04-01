import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import { Layout } from 'antd';

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
          <Content style={{backgroundColor:'#fff'}}>Content</Content>
          <Footer style={{textAlign:'center',color:'#ccc'}}>推薦使用谷歌瀏覽器，可以獲得更佳頁面操作體驗</Footer>
        </Layout>
      </Layout>
    )
  }
}
