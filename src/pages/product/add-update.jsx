import React, { Component } from 'react'
import {
  Card,
  Form,
  Input,
  Icon,
  Cascader,// 級聯選擇
  Upload
} from 'antd'
import LinkButton from '../../components/link-button'
const {Item} = Form
const {TextArea} = Input

export default class ProductAddUpdate extends Component {
  render() {
    // 指定Item布局的配置對象
    const formItemLayout = {
      labelCol:{span:2}, // 左側label的寬度
      wrapperCol:{span:14} //指定右側包裹的寬度
    }    
    const title = (
      <span>
        <LinkButton>
          <Icon type='arrow-left' style={{fontSize:20}}/>
        </LinkButton>
        <span>添加商品</span>
      </span>
    )
    return (
      <Card title={title}>
        <Form {...formItemLayout}>
          <Item label='商品名稱'>
            <Input placeholder='請輸入商品名稱'/>
          </Item>
          <Item label='商品描述'>
            <TextArea placeholder='請輸入商品描述' autosize={{minRows:2,maxRows:6}}/>
          </Item>
          <Item label='商品價格'>
            <Input type='number' placeholder='請輸入商品價格' addonAfter='元'/>
          </Item>
        </Form>
      </Card>
    )
  }
}
