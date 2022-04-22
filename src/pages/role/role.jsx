import React, { Component } from 'react'
import { Button, Table, Card } from 'antd'
import { PAGE_SIZE } from '../../utils/constants'
import './role.less'

export default class Role extends Component {

  state = {
    roles: [{
      menus: [
        '/home'
      ],
      "_id": 'sdgdsgasfadfdsagsdgsdg',
      name: '角色1',
      create_time: 1554639552758,
      auth_time: 1554639552758,
      auth_name: 'admin'
    },
    {
      menus: [
        '/home'
      ],
      "_id": 'ddsfsdfasgtjtyjfadfdsagsdgsdg',
      name: '角色1',
      create_time: 1554639552751,
      auth_time: 1554639552752,
      auth_name: 'admin'
    }, {
      menus: [
        '/home'
      ],
      "_id": '4cefasddsdgfadfdsagsdgsdg',
      name: '角色1',
      create_time: 1554639552753,
      auth_time: 1554639552752,
      auth_name: 'admin'
    }
    ]
  }

  initColums = () => {
    this.columns = [
      {
        title: '角色名稱',
        dataIndex: 'name'
      },
      {
        title: '創建時間',
        dataIndex: 'create_time'
      },
      {
        title: '授權時間',
        dataIndex: 'auth_time'
      },
      {
        title: '授權人',
        dataIndex: 'auth_name'
      }
    ]
  }

  onRow = (role)=>{
    return {
      onClick:event=>{
        console.log(role);
      }
    }
  }

  componentWillMount() {
    this.initColums()
  }


  render() {
    const { roles } = this.state
    const title = (
      <span>
        <Button type='primary'>創建角色</Button> &nbsp;&nbsp;
        <Button type='primary' disabled>設置角色</Button>
      </span>
    )
    return (
      <Card title={title}>
        <Table className='tablerole'
          bordered
          dataSource={roles}
          columns={this.columns}
          rowKey='_id' // 指定key
          pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
          rowSelection={{type:'radio'}}
          rowClassName={(record, index) => 'tablerow' }
          onRow={this.onRow}
        />
      </Card>
    )
  }
}
