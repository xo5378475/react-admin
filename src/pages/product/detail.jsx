import React, { Component } from 'react'
import { 
  List,
  Icon,
  Card } 
from 'antd'
import LinkButton from '../../components/link-button'
import { BASE_IMG_URL } from '../../utils/constants'
const Item = List.Item

export default class ProductDetail extends Component {
  render() {
    console.log(this.props.location.state);
    const {name,desc,price,detail,imgs} = this.props.location.state.product
    const title = (
      <span>
        <LinkButton >
          <Icon type='arrow-left' style={{marginRight:15,fontSize:20}} onClick={()=> this.props.history.goBack()}/>
        </LinkButton>
        <span>商品詳情</span>
      </span>
    )
    return (
      <Card title={title} className='product-detail'>
        <List>
          <Item>
            <span className='left'>商品名稱:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className='left'>商品描述:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className='left'>商品價格:</span>
            <span>{price}元</span>
          </Item>
          <Item>
            <span className='left'>所屬分類:</span>
            <span>電腦---&gt;筆記本</span>
          </Item>
          <Item>
            <span className='left'>商品圖片:</span>
            <span>
              {
                imgs.map(img => (
                  <img
                    key={img}
                    className='product-img'
                    src={BASE_IMG_URL + img}
                    alt='img'>
                  </img>
                ))
              }
            </span>
          </Item>
           <Item>
            <span className='left'>商品詳情:</span>
            <span dangerouslySetInnerHTML={{__html:detail}}></span> {/* dangerouslySetInnerHTML 類似innerHTML功能 */}
          </Item>
        </List>
      </Card>
    )
  }
}
