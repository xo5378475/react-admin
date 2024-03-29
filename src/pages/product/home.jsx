import React, { Component } from 'react'
import {
  Card,
  Input,
  Button,
  Select,
  Icon,
  Table,
  message
} from 'antd'
import LinkButton from '../../components/link-button/'
import {reqProducts,reqSearchProducts,reqUpdateStatus} from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
const Option = Select.Option

export default class ProductHome extends Component {

  state = {
    total:0,
    products: [],// 商品數組
    loading:false,
    searchName:'',// 搜索的關鍵字
    searchType:'productName',// 根據哪個字段搜索
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
        //dataIndex:'status',
        render:(product)=>{
          const {status,_id} = product
          const newStatus = status === 1 ? 2: 1
          console.log(status);
          return (
            <span>
              <Button 
                type='primary'
                onClick={() => this.updateStatus(_id,newStatus)}
              >
                {status===1?'下架':'上架'}
              </Button>
              <span>{status===1?'在售':'以下架'}</span>
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
              {/* 將product對象使用state傳遞給目標路由組件 */}
              <LinkButton onClick={()=>this.props.history.push('/product/detail',{product}) }>詳情</LinkButton>
              <LinkButton onClick={()=>this.props.history.push('/product/addupdate',{product})}>修改</LinkButton>
            </span>
          )
        }
      },
     
    ];

  }

  updateStatus = async (productId,status)=>{
    const result = await reqUpdateStatus(productId,status)
    if(result.status===0){
      message.success('更新商品成功')
      this.getProducts(this.pageNum)
    }
  }

  getProducts = async(pageNum)=>{
    this.pageNum = pageNum // 保存pageNum 讓其他方法可以看到
    this.setState({loading:true})
    const {searchName,searchType} = this.state
    let result
    if(searchName){
      result = await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchName,searchType})
    } else{
      result = await reqProducts(pageNum,PAGE_SIZE)
    }
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
    const { products,total,loading,searchName,searchType } = this.state


    const title = (
      <span>
        <Select 
          value={searchType} 
          style={{ width: 150 }}
          onChange={value=>this.setState({searchType:value})}
        >
          <Option value='productName'>按名稱搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input 
          placeholder='關鍵字' 
          style={{ width: 150, margin: '0 15px' }} 
          value={searchName} 
          onChange={event=>this.setState({searchName:event.target.value})}  
        />
        <Button type='primary' onClick={()=>this.getProducts(1)}>搜索</Button>
      </span>
    )

    const extra = (
      <Button type='primary' onClick={()=> this.props.history.push('/product/addupdate')}>
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
