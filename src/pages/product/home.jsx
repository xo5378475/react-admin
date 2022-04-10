import React, { Component } from 'react'
import {
  Card,
  Input,
  Button,
  Select,
  Icon,
  Table
} from 'antd'
import LinkButton from '../../components/link-button/'
import {reqProducts} from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
const Option = Select.Option

export default class ProductHome extends Component {

  state = {
    total:0,
    products: [],// 商品數組
    loading:false
  }

  initColumns = () => {
    this.columns = [
      {
        title: '商品名稱',
        dataIndex: 'name',

      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '價格',
        dataIndex: 'price',
        render:(price)=> '￥' + price
      },
      {
        width:100,
        title:'狀態',
        dataIndex:'status',
        render:()=>{
          return (
            <span>
              <Button type='primary'>下架</Button>
              <span>在售</span>
            </span>
          )
        }
      },
      {
        width:100,
        title:'操作',
        render:(product)=>{
          return (
            <span>
              <LinkButton>詳情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          )
        }
      },
     
    ];

  }

  getProducts = async(pageNum)=>{
    this.setState({loading:true})
    const result = await reqProducts(pageNum,PAGE_SIZE)
    this.setState({loading:false})
    if(result.status===0){
      const {total,list} = result.data
      this.setState({
        total,
        products:list
      })
    }
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount(){
    this.getProducts(1)
  }

  render() {
    const { products,total,loading } = this.state


    const title = (
      <span>
        <Select value='1' style={{ width: 150 }}>
          <Option value='1'>按名稱搜索</Option>
          <Option value='2'>按描述搜索</Option>
        </Select>
        <Input placeholder='關鍵字' style={{ width: 150, margin: '0 15px' }} />
        <Button type='primary'>搜索</Button>
      </span>
    )

    const extra = (
      <Button type='primary'>
        <Icon type='plus'></Icon>
        添加商品
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table 
          bordered
          rowKey='_id'
          dataSource={products} 
          columns={this.columns} 
          loading={loading}
          pagination={{
            defaultPageSize:PAGE_SIZE,
            showQuickJumper:true,
            total,
            onChange:this.getProducts // 會自動傳入 pageNum Pagesize
          }}/>;
      </Card>
    )
  }
}
