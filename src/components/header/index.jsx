import React, { Component } from 'react'
import './index.less'
import { reqWeather } from '../../api'


export default class Header extends Component {

  getWeather = async(city)=>{
    const weather = await reqWeather(city)
    var record = JSON.parse(weather.data)
    record = record.records.location[0].weatherElement[0].time[0].parameter.parameterName
  }

  render() {
    this.getWeather('高雄市')
    return (
      <div className='header'>
        <div className="header-top">
          <span>歡迎, admin</span>
          <a href="javascript:">退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">首頁</div>
          <div className="header-bottom-right">
            <span>2019-05-16 10:12:36</span>
            <img src="" alt="" />
            <span>晴</span>
          </div>
        </div>
      </div>
    )
  }
}
