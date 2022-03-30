import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'

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
      <div>Hello {user.username}</div>
    )
  }
}
