import React, { Component } from 'react'
import menuList from '../../config/menuConfig'
import { Tree, Form, Input } from 'antd'
import PropTypes from 'prop-types'


const Item = Form.Item
const { TreeNode } = Tree
export default class AuthForm extends Component {

  state = {
    role: {},
  }

  static propTypes = {
    role: PropTypes.object
  }

  constructor(props) {
    super(props)
    const menus = this.props.role.menus
    this.state = {
      checkedKeys: menus
    }

  }

  getTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )
      return pre
    }, [])
  }

  getMenus = ()=>this.state.checkedKeys

   onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };

  componentWillMount() {
    this.treeNodes = this.getTreeNodes(menuList)
  }

  // 根據新傳入的role來更新checkedKeys狀態
  componentWillReceiveProps(nextProps){
    const menus = nextProps.role.menus
    this.setState({
      checkedKeys:menus
    })
  } 

  render() {
    const { role } = this.props
    const { checkedKeys } = this.state
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
          defaultExpandAll={true}
          onCheck={this.onCheck}
          checkedKeys={checkedKeys}
        >
          <TreeNode title="平台權限" key="all">
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </div>

    )
  }
}
