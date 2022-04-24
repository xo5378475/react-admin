import React, { Component } from 'react'

import { Tree, Form, Input } from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item
const { TreeNode } = Tree
export default class AuthForm extends Component {

  state = {
    role: {}
  }

  static propTypes = {
    role: PropTypes.object
  }



  render() {
    const { role } = this.props
    const formItemLayout = {
      labelCol: { span: 4 }, // 左側label的寬度
      wrapperCol: { span: 20 } //指定右側包裹的寬度
    }

    return (
      <div >

        <Item label='角色名稱' {...formItemLayout}>

          <Input disabled value={role.name}></Input>

        </Item>
        <Tree
          checkable
          
        >
          <TreeNode title="parent 1" key="0-0">
            <TreeNode title="parent 1-0" key="0-0-0" disabled>
              <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
              <TreeNode title="leaf" key="0-0-0-1" />
            </TreeNode>
            <TreeNode title="parent 1-1" key="0-0-1">
              <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
            </TreeNode>
          </TreeNode>
        </Tree>
      </div>

    )
  }
}
