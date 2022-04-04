import ajax from "./ajax";
import { message } from 'antd'

// 登陸
export const reqLogin = (username,password) => ajax('/login',{username,password},'POST')


export const reqAddUser = (user) => ajax('/manage/user/add',user,'POST')

export const reqWeather = (city) => {

   return new Promise((resolve,reject)=>{
      ajax('/weather/get',{city},'GET').then(
         response=>{
            var data = JSON.parse(response.data)
            
            if(data.success==='true'){
               var weather = data.records.location[0].weatherElement[0].time[0].parameter.parameterName
               resolve(weather)
            } else{
               message.error('獲取天氣失敗')
               
            }
         }   
      ).catch(err=>{
         console.log(err)
         message.error('獲取天氣失敗')
      })

   })
    
}

