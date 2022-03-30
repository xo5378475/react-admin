import axios from 'axios'
import { message } from 'antd'

// 統一處理錯誤

export default function ajax(url, data = {}, type = "GET") {
    return new Promise((resolve, reject) => {
        let promise
        if (type === 'GET') {
            promise = axios.get(url, {
                params: data
            })
        } else {
            promise = axios.post(url, data)
        }
        promise.then(response=>{
            resolve(response)
        }).catch(error=>{
            message.error('請求出錯了:' + error.message)
        })

    })

}