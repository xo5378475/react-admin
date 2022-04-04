import React, { Component } from 'react'
import './index.less'
import { reqWeather } from '../../api'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'

export default class Header extends Component {

  state={
    currentTime:formateDate(Date.now()),
    weather:''
  }

  getTime = ()=>{
    setInterval(()=>{
      const currentTime = formateDate(Date.now())
      this.setState({currentTime})
    },1000)
  }

  componentWillMount(){
    this.getTime()
    this.getWeather()
  }

  getWeather = async()=>{
    const weather = await reqWeather('高雄市')
    // var record = JSON.parse(weather.data)
    console.log(weather)
    this.setState({weather})
    // record = record.records.location[0].weatherElement[0].time[0].parameter.parameterName
  }

  render() {
    const {weather,currentTime} = this.state
    const user = memoryUtils.user.username
    return (
      <div className='header'>
        <div className="header-top">
          <span>歡迎, {user}</span>
          <a href="javascript:">退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">首頁</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
        
            <span style={{marginLeft:'20px'}}>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}
