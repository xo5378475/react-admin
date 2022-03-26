import React, { Component } from 'react'
import { Button } from 'antd'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import { Route,BrowserRouter,Switch } from 'react-router-dom'


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      
        <Switch>{/* 只匹配其中一個 */}
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}
