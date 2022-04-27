import React, { Component } from 'react'
import { 
  List,
  Icon,
  Card } 
from 'antd'
import LinkButton from '../../components/link-button'
import { BASE_IMG_URL } from '../../utils/constants'
import { reqCategory } from '../../api'
const Item = List.Item

export default class ProductDetail extends Component {

  state = {
    cName1:"",//一級分類名稱
    cName2:''//二級分類名稱
  }

  async componentDidMount(){
    const {pCategoryId,categoryId} = this.props.location.state.product
    console.log(pCategoryId,categoryId);
    if(pCategoryId === '0'){
      const result = await reqCategory(categoryId)

      console.log(result);
      const cName1 = result.data.name
      this.setState({cName1})
    } else {
      // const result1 = await reqCategory(pCategoryId)
      // const result2 = await reqCategory(categoryId)
      // const cName1 = result1.data.name
      // const cName2 = result2.data.name
      // 一次性發送多個請求 只有都成功了 正常處理
      const results = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
      const cName1 = results[0].data.name
      const cName2 = results[1].data.name
      this.setState({
        cName1,
        cName2
      })

    }
  }

  render() {
    console.log(this.props.location.state);
    const {name,desc,price,detail,imgs} = this.props.location.state.product
    const {cName1,cName2} = this.state
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
            <span>{cName1}{cName2 ? '--->'+cName2:''} </span>
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
