import React, { Component } from 'react'
import { Card, Table, Button, Icon } from 'antd'
import LinkButton from '../../components/link-button'


// 商品分類路由
export default class Category extends Component {
  render() {
    const title = '一級分類列表'
    const extra = (
      <Button type='primary'>
        <Icon type='plus'></Icon>
        添加
      </Button>
    )
    const dataSource = [

      { "parentId": "0", "_id": "624c7bc1b330242cbc091112", "name": "家用電器", "__v": 0 }, 
      { "parentId": "0", "_id": "624c7c04b330242cbc091113", "name": "電腦", "__v": 0 },
       { "parentId": "0", "_id": "624c7c10b330242cbc091114", "name": "圖書", "__v": 0 }, 
       { "parentId": "0", "_id": "624c7c15b330242cbc091115", "name": "服飾", "__v": 0 }, 
       { "parentId": "0", "_id": "624c7c55b330242cbc091116", "name": "食品", "__v": 0 }
    ];

    const columns = [
      {
        title: '分類的名稱',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        dataIndex: '',
        width:300, // 指定寬度
        key: 'action',
        render:()=>{
          return (<span>
            <LinkButton>修改分類</LinkButton>
            <LinkButton>查看子分類</LinkButton>
          </span>)
        }
      },
    
    ];
    return (
      <Card title={title} extra={extra} >
        <Table 
          bordered
          dataSource={dataSource} 
          columns={columns} 
          rowKey='_id' // 指定key
        />;
      </Card>
    )
  }
}
