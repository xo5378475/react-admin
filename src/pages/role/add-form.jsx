import React, { Component } from 'react'
import {
  Form,
  Input
} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item


class AddForm extends Component {
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
       
        <Item label='角色名稱'>
          {
            getFieldDecorator('roleName', {
              initialValue: '',
              rules: [{ required: true, message: '腳色名稱必須輸入' }]
            })(
              <Input placeholder='請輸入腳色名稱'></Input>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddForm)