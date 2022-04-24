import React, { Component } from 'react'
import { Button, Table, Card,Modal, message } from 'antd'
import { PAGE_SIZE } from '../../utils/constants'
import { reqRoles ,reqAddRole,reqRole} from '../../api'
import './role.less'
import AddForm from './add-form'
import AuthForm from './auth-form'

export default class Role extends Component {

  state = {
    roles:  [],
    role:[] ,// 選中的role key
    isShowAdd:false,
    isShowAuth:false,
    roleObj:{}
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
        this.setState({role:[role._id],roleObj:role})
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



  addRole = ()=>{
    this.form.validateFields(async(error,values)=>{
      if(!error){
        const {roleName} = values
        this.form.resetFields();
        this.setState({isShowAdd:false})
        const result = await reqAddRole(roleName)
        if(result.status===0){
          message.success('添加角色成功')
          const role = result.data
          //this.getRoles()
         
          this.setState(state=>({
            roles:[...state.roles,role]
          }))
        } else{
          message.error('添加角色失敗')
        }
      }
    })
  }

  updateRole =()=>{

  }

  // 用來控制按中radio
  onSelectedRowKeysChange=async(selectedRowKeys)=>{
    const roleObj = await reqRole(selectedRowKeys[0])
  
    this.setState({
     role:[...selectedRowKeys],roleObj:roleObj.data
   })
  }



  componentWillMount() {
    this.initColums()
  }

  componentDidMount(){
    this.getRoles()
  }

  render() {
    const { roles,role,isShowAdd,isShowAuth ,roleObj} = this.state
    const title = (
      <span>
        <Button type='primary' onClick={()=>this.setState({isShowAdd:true})}>創建角色</Button> &nbsp;&nbsp;
        <Button type='primary' disabled={role.length===0} onClick={()=>this.setState({isShowAuth:true})}>設置角色</Button>
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
          onCancel={()=>{
            this.setState({isShowAdd:false})
            this.form.resetFields()
          }}>
          <AddForm
            setForm={(form) => this.form = form}
          ></AddForm>
        </Modal>
         <Modal title="設置角色權限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={()=>{
            this.setState({isShowAuth:false})
        
          }}>
          <AuthForm role={roleObj}
            // setForm={(form) => this.form = form}
          ></AuthForm>
        </Modal>
      </Card>
    )
  }
}
