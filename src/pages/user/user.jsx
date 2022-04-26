import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  Modal,

  message
} from 'antd'
import { formateDate } from '../../utils/dateUtils'
import LinkButton from '../../components/link-button'
import { PAGE_SIZE } from '../../utils/constants'
import { reqDeleteUser, reqUsers, reqAddOrUpdateUser } from '../../api'
import UserForm from './user-form'

export default class User extends Component {
  state = {
    users: [],//所有用戶列表
    roles: [],//所有角色列表
    isShow: false
  }

  initColumns = () => {
    this.columns = [
      {
        title: '用戶名',
        dataIndex: 'username'
      },
      {
        title: '郵箱',
        dataIndex: 'email'
      },
      {
        title: '電話',
        dataIndex: 'phone'
      },
      {
        title: '註冊時間',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '所屬角色',
        dataIndex: 'role_id',
        render: (role_id) => this.roleNames[role_id]
      }, {
        title: '操作',
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>刪除</LinkButton>
          </span>
        )
      }
    ]
  }

  initRoleNames = (roles) => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre
    }, {})
    this.roleNames = roleNames
  }

  showUpdate = (user) => {
    this.user = user
    this.setState({ isShow: true })
  }

  showAdd = (user) => {
    this.user = null
    this.setState({ isShow: true })
  }

  deleteUser = (user) => {
    console.log(user);
    Modal.confirm({
      title: `確認刪除${user.username}嗎?`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id)
        if (result.status === 0) {
          message.success('刪除用戶成功!')
          this.getUsers()
        }
      }
    })
  }

  addOrUpdate = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          isShow: false
        })
        if (this.user._id) {
          values._id = this.user._id
        }

        const result = await reqAddOrUpdateUser(values)
        this.form.resetFields()
        if (result.status === 0) {
          message.success(`${this.user._id ? '修改' : '添加'}用戶成功`)
          this.getUsers()
        }
      }
    })
  }

  getUsers = async () => {
    const result = await reqUsers()
    if (result.status === 0) {
      const { users, roles } = result.data
      this.initRoleNames(roles)
      this.setState({
        users,
        roles
      })
    }
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getUsers()
  }

  render() {
    const { users, isShow, roles } = this.state
    const user = this.user || {}
    const title = <Button type='primary' onClick={this.showAdd}>創建用戶</Button>
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
          title={user._id ? '修改用戶' : '添加用戶'}
          visible={isShow}
          onOk={this.addOrUpdate}
          onCancel={() => {
            this.form.resetFields()
            this.setState({ isShow: false })
          }
          }
        >
          <UserForm
            setForm={(form) => this.form = form}
            roles={roles}
            user={user}
          >

          </UserForm>
        </Modal>
      </Card>
    )
  }
}

