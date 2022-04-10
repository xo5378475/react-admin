import ajax from "./ajax";
import { message } from 'antd'

const BASE = ''

// 登陸
export const reqLogin = (username,password) => ajax(BASE + '/login',{username,password},'POST')

// 獲取一級/二級分類的列表
export const reqCategorys = (parentId) => ajax(BASE+'/manage/category/list',{parentId})
// 添加分類
export const reqAddCategory = (categoryName,parentId)=> ajax(BASE+'/manage/category/add',{categoryName,parentId},'POST')
// 更改分類
export const reqUpdateCategory =({categoryName,categoryId})=> {
 
   return ajax(BASE+'/manage/category/update',{categoryName,categoryId},'POST')
}

// 商品分頁列表
export const reqProducts = (pageNum,pageSize)=> ajax(BASE+'/manage/product/list',{pageNum,pageSize})

// 搜索商品分頁列表
// searchType 搜索的類型 productName/productDesc
export const reqSearchProducts = ({pageNum,pageSize,searchName,searchType})=>ajax(BASE+'/manage/product/search',{
   pageNum,
   pageSize,
   [searchType]:searchName// 要把變量作為屬性 需加[]
})


//添加用戶
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add',user,'POST')

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

