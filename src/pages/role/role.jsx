import React, { Component } from 'react'
import { Button, Table, Card } from 'antd'
import { PAGE_SIZE } from '../../utils/constants'
import { reqRoles } from '../../api'
import './role.less'

export default class Role extends Component {

  state = {
    roles:  [],
    role:{} // 選中的role
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
        this.setState({role})
      }
    }
  }

  getRoles = async ()=>{
    const result = await reqRoles()
    if(result.status===0){
      const roles = result.data
      this.setState({roles})
    }
  }

  componentWillMount() {
    this.initColums()
  }

  componentDidMount(){
    this.getRoles()
  }

  render() {
    const { roles,role } = this.state
    const title = (
      <span>
        <Button type='primary'>創建角色</Button> &nbsp;&nbsp;
        <Button type='primary' disabled={!role._id}>設置角色</Button>
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
          rowSelection={{type:'radio',selectedRowKeys:[role._id]}}
          rowClassName={(record, index) => 'tablerow' }
          onRow={this.onRow}
        />
      </Card>
    )
  }
}
