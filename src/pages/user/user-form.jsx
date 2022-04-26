import React, { PureComponent } from 'react'
import {
  Form,
  Input,
  Select
} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
const Option = Select.Option

// 添加/修改用戶的form組件
class UserForm extends PureComponent {
  static propTypes = {
    setForm: PropTypes.func.isRequired, //用來傳遞form對象的函數

  }



  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 }, // 左側label的寬度
      wrapperCol: { span: 20 } //指定右側包裹的寬度
    }
    return (
      <Form {...formItemLayout}>

        <Item label='用戶名'>
          {
            getFieldDecorator('username', {
              initialValue: '',
              rules: [
                { required: true, message: '用戶名稱必須輸入' },
                { min: 4, message: '用戶名至少4位' },
                { max: 12, message: '用戶名最多12位' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: "用戶名必須是英文數字下划線組成" }
              ]
            })(
              <Input placeholder='請輸入用戶名稱'></Input>
            )
          }
        </Item>
        <Item label='密碼'>
          {
            getFieldDecorator('password', {
              initialValue: '',
              rules: [
                { required: true, message: '密碼稱必須輸入' },
                {min:4,message:'密碼至少4位'},
                {max:12,message:'密碼最多12位'},
                {pattern:/^[a-zA-Z0-9_]+$/,message:"密碼必須是英文數字下划線組成"}
              ]
            })(
              <Input type='password'></Input>
            )
          }
        </Item>
        <Item label='手機號碼'>
          {
            getFieldDecorator('phone', {
              initialValue: '',
            })(
              <Input ></Input>
            )
          }
        </Item>
        <Item label='郵箱'>
          {
            getFieldDecorator('email', {
              initialValue: '',
            })(
              <Input ></Input>
            )
          }
        </Item>
        <Item label='角色'>
          {
            getFieldDecorator('role_id', {
              initialValue: ''
            })(
              <Select>
                <Option value='A'>A</Option>
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UserForm)