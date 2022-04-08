import React, { Component } from 'react'
import {
  Form,
  Select,
  Input
} from 'antd'

const Item = Form.Item
const Option = Select.Option

class AddForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form>
        <Item>
          {
            getFieldDecorator('parentId', {
              initialValue: '0'
            })(
              <Select>
                <Option value='0'>一級分類</Option>
                <Option value='1'>電腦</Option>
                <Option value='2'>圖書</Option>
              </Select>
            )
          }
        </Item>
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

export default Form.create()(AddForm)