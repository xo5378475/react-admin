
import React, { Component } from 'react'
import {
  Form,
  Input
} from 'antd'

const Item = Form.Item

class UpdateForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form>
        
        <Item>
          {
            getFieldDecorator('categoryName',{
              initialValue:''
            })(
              <Input placeholder='請輸入分類名稱'></Input>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UpdateForm)