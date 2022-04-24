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
// 獲取一個分類
export const reqCategory = (categoryId) => ajax(BASE+'/manage/category/info',{categoryId})


// 商品分頁列表
export const reqProducts = (pageNum,pageSize)=> ajax(BASE+'/manage/product/list',{pageNum,pageSize})

// 更新商品的狀態(上架/下架)
export const reqUpdateStatus = (productId,status) => ajax(BASE+'/manage/product/updateStatus',{productId,status},'POST')


// 搜索商品分頁列表
// searchType 搜索的類型 productName/productDesc
export const reqSearchProducts = ({pageNum,pageSize,searchName,searchType})=>ajax(BASE+'/manage/product/search',{
   pageNum,
   pageSize,
   [searchType]:searchName// 要把變量作為屬性 需加[]
})

export const reqDeleteImg = (name)=> ajax(BASE+'/manage/img/delete',{name},'POST')

// 添加或修改商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE+'/manage/product/'+(product._id?'update':'add'),product,'POST')
//export const reqUpdateProduct = (product) => ajax(BASE+'/manage/product/update',product,'POST')

// 獲取所有角色列表
export const reqRoles = ()=>ajax(BASE+'/manage/role/list')
export const reqAddRole = (roleName) => ajax(BASE+'/manage/role/add',{roleName},'POST')
export const reqUpdateRole =(role)=> ajax(BASE+'/manage/role/update',role,'POST')

export const reqRole =(_id)=>ajax(BASE+'/manage/role/info',{_id})

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

