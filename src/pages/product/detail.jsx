import React, { Component } from 'react'
import { 
  List,
  Icon,
  Card } 
from 'antd'
const Item = List.Item

export default class ProductDetail extends Component {
  render() {
    const title = (
      <span>
        <Icon type='arrow-left'/>
        <span>商品詳情</span>
      </span>
    )
    return (
      <Card title={title} className='product-detail'>
        <List>
          <Item>
            <span className='left'>商品名稱:</span>
            <span>联想ThinkPad 翼4809</span>
          </Item>
          <Item>
            <span className='left'>商品描述:</span>
            <span>年度重量级新品，X390、T490全新登场 更加轻薄机身设计9</span>
          </Item>
          <Item>
            <span className='left'>商品價格:</span>
            <span>66000元</span>
          </Item>
          <Item>
            <span className='left'>所屬分類:</span>
            <span>電腦---&gt;筆記本</span>
          </Item>
          <Item>
            <span className='left'>商品圖片:</span>
            <span><img className='product-img' src="/hk-notebook-np500r5m-x0ahk-np500r5m-x0ahk-022-front-over-61552492.webp" alt="#" /></span>
            <span><img className='product-img' src="/hk-notebook-np500r5m-x0ahk-np500r5m-x0ahk-022-front-over-61552492.webp" alt="#" /></span>
          </Item>
           <Item>
            <span className='left'>商品詳情:</span>
            <span dangerouslySetInnerHTML={{__html:'<h1 style="color:red;">商品內容詳情標題</h1>'}}></span> {/* dangerouslySetInnerHTML 類似innerHTML功能 */}
          </Item>
        </List>
      </Card>
    )
  }
}
