import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  Modal
} from 'antd'
import { formateDate } from '../../utils/dateUtils'
import LinkButton from '../../components/link-button'
import { PAGE_SIZE } from '../../utils/constants'
import { reqUsers } from '../../api'

export default class User extends Component {
  state={
    users:[],//所有用戶列表
    roles:[],//所有角色列表
    isShow:false
  }

  initColumns = ()=>{
    this.columns = [
      {
        title:'用戶名',
        dataIndex:'username'
      },
      {
        title:'郵箱',
        dataIndex:'email' 
      },
      {
        title:'電話',
        dataIndex:'phone'
      },
      {
        title:'註冊時間',
        dataIndex:'create_time',
        render:formateDate
      },
      {
        title:'所屬角色',
        dataIndex:'role_id',
        render:(role_id)=>this.roleNames[role_id]
      },{
        title:'操作',
        render:(user)=>(
          <span>
            <LinkButton>修改</LinkButton>
            <LinkButton>刪除</LinkButton>
          </span>
        )
      }
    ]
  }

  initRoleNames = (roles)=>{
    const roleNames = roles.reduce((pre,role)=>{
      pre[role._id] = role.name
      return pre
    },{})
    this.roleNames = roleNames
  }

  addOrUpdate=()=>{

  }

  getUsers =async()=>{
    const result = await reqUsers()
    if(result.status===0){
      const {users,roles} = result.data
      this.initRoleNames(roles)
      this.setState({
        users,
        roles
      })
    }
  }

  componentWillMount(){
    this.initColumns()
  }

  componentDidMount(){
    this.getUsers()
  }

  render() {
    const {users,isShow} = this.state
    const title = <Button type='primary'>創建用戶</Button>
    return (
      <Card title={title}>
         <Table
          bordered
          dataSource={users}
          columns={this.columns}
         // loading={this.state.loading}
          rowKey='_id' // 指定key
          pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
        />;
        <Modal
          title='添加用戶'
          visible={isShow}
          onOk={this.addOrUpdate}
          onCancel={()=>this.setState({isShow:false})}
        >
          <div>
            添加/更新介面
          </div>
        </Modal>
      </Card>
    )
  }
}
