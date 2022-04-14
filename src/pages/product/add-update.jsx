import React, { Component } from 'react'
import {
  Card,
  Form,
  Input,
  Icon,
  Cascader,// 級聯選擇
  Upload,
  Button
} from 'antd'
import LinkButton from '../../components/link-button'
import { reqCategorys } from '../../api'

const { Item } = Form
const { TextArea } = Input


const options = [
  {
    value:'zhejaing',
    label:'zhejaing',
    isLeaf:false
  },
  {
    value:'jiangsu',
    label:'jiangsu',
    isLeaf:false
  }
]

class ProductAddUpdate extends Component {

  state = {
    options:[]
  }

  initOptions = (categorys) => {
    const options = categorys.map(c=>({
      value:c._id,
      label:c.name,
      isLeaf:false
    }))
    this.setState({
      options:[...options]
    })
  }

  getCategorys = async(parentId) => {
    const result = await reqCategorys(parentId)
    if(result.status===0){
      const categorys = result.data
      this.initOptions(categorys)
    }
  }

  loadData = selectedOptions => {
    console.log(selectedOptions);
    const targetOption = selectedOptions[0];
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: 'dynamic1',
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: 'dynamic2',
        },
      ];
      this.setState({
        options: [...this.state.options],
      });
    }, 1000);
  };

  validatePrice = (rule,value,callback) => {
    console.log(value, typeof value)
    if( value*1 >0){
      callback() //通過驗證
    } else{
      callback('價格必須大於零')
    }
  }

  submit = ()=>{
    this.props.form.validateFields((error,values)=>{
      if(!error){
        console.log(values)
      }
    })
  }

  componentDidMount(){
    this.getCategorys('0')
  }

  render() {
    // 指定Item布局的配置對象
    const formItemLayout = {
      labelCol: { span: 2 }, // 左側label的寬度
      wrapperCol: { span: 14 } //指定右側包裹的寬度
    }
    const title = (
      <span>
        <LinkButton>
          <Icon type='arrow-left' style={{ fontSize: 20 }} />
        </LinkButton>
        <span>添加商品</span>
      </span>
    )
    const {getFieldDecorator} = this.props.form

    return (
      <Card title={title}>
        <Form {...formItemLayout}>
          <Item label='商品名稱'>
            {
              getFieldDecorator('name',{
                initialValue:'',
                rules:[
                  {required:true,message:'必須輸入商品名稱'}
                ]
              })(<Input placeholder='請輸入商品名稱' />)
            }
          </Item>
          <Item label='商品描述'>
            {
              getFieldDecorator('desc',{
                initialValue:'',
                rules:[
                  {required:true,message:'必須輸入商品描述'}
                ]
              })(<TextArea placeholder='請輸入商品描述' autosize={{ minRows: 2, maxRows: 6 }} />)
            }

            
          </Item>
          <Item label='商品價格'>
            {
              getFieldDecorator('price',{
                initialValue:0,
                rules:[
                  {required:true,message:'必須輸入商品價格'},
                  {validator:this.validatePrice}
                ]
              })(<Input type='number' placeholder='請輸入商品價格' addonAfter='元' />)
            } 
            
          </Item>
          <Item label="商品分類">
            <Cascader
              options={this.state.options}
              loadData={this.loadData}
            >
            </Cascader>
          </Item>
          <Item label="商品圖片">
            <div>商品圖片</div>
          </Item>
          <Item label="商品詳情">
            <div>商品詳情</div>
          </Item>
          <Item>
            <Button type='primary' onClick={this.submit}>提交</Button>
          </Item>

        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)