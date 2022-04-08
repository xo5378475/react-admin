import React, { Component } from 'react'
import {
  Form,
  Select,
  Input
} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
const Option = Select.Option

class AddForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    categorys: PropTypes.array.isRequired,
    parentId: PropTypes.string.isRequired
  }

  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { categorys, parentId } = this.props
    return (
      <Form>
        <Item>
          {
            getFieldDecorator('parentId', {
              initialValue: parentId
            })(
              <Select>
                <Option value='0'>一級分類</Option>
                {
                  categorys.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
                }
              </Select>
            )
          }
        </Item>
        <Item>
          {
            getFieldDecorator('categoryName', {
              initialValue: '',
              rules: [{ required: true, message: '分類名稱必須輸入' }]
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