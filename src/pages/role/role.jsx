import React, { Component } from 'react'
import { Button, Table, Card,Modal } from 'antd'
import { PAGE_SIZE } from '../../utils/constants'
import { reqRoles } from '../../api'
import './role.less'
import AddForm from './add-form'

export default class Role extends Component {

  state = {
    roles:  [],
    role:[] ,// 選中的role key
    isShowAdd:false
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
        this.setState({role:[role._id]})
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

  // 用來控制按中radio
  onSelectedRowKeysChange=(selectedRowKeys)=>{

   this.setState({
     role:[...selectedRowKeys]
   })
  }

  addRole = ()=>{

  }

  componentWillMount() {
    this.initColums()
  }

  componentDidMount(){
    this.getRoles()
  }

  render() {
    const { roles,role,isShowAdd } = this.state
    const title = (
      <span>
        <Button type='primary' onClick={()=>this.setState({isShowAdd:true})}>創建角色</Button> &nbsp;&nbsp;
        <Button type='primary' disabled={role.length===0}>設置角色</Button>
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
          rowSelection={{type:'radio',selectedRowKeys:[...role], onChange: this.onSelectedRowKeysChange}}
          rowClassName={(record, index) => 'tablerow' }
          onRow={this.onRow}
        />
         <Modal title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={()=>this.setState({isShowAdd:false})}>
          <AddForm
            
            setForm={(form) => this.form = form}
          ></AddForm>
        </Modal>
      </Card>
    )
  }
}
