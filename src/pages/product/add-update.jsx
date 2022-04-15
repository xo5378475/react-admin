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
import { reqCategorys, reqLogin } from '../../api'
import PicturesWall from './pictures-wall'

const { Item } = Form
const { TextArea } = Input



class ProductAddUpdate extends Component {

  state = {
    options: []
  }

  constructor(props){
    super(props)
    // 創建用來保存ref 標示的標籤對象的容器
    this.pw = React.createRef()
  }

  initOptions = async(categorys) => {
    const options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false
    }))
    // 如果是一個二級分類的更新
    const {isUpdate,product} = this
    const {pCategoryId,categoryId} = product
    if(isUpdate && pCategoryId!=='0'){
      // 獲取對應的二級分類列表
      const subCategorys = await this.getCategorys(pCategoryId)
      const childOptions = subCategorys.map(c=>({
        value:c._id,
        label:c.name,
        isLeaf:true
      }))
      const targetOption = options.find(options=>options.value===pCategoryId)
      // 關聯對應的一級option上
      targetOption.children = childOptions
    }
    this.setState({
      options: [...options]
    })
  }

  getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId)
    if (result.status === 0) {
      const categorys = result.data
      if (parentId === '0') {
        this.initOptions(categorys)
      } else {
        return categorys
      }
    }
  }

  loadData = async (selectedOptions) => {
    console.log(selectedOptions);
    const targetOption = selectedOptions[0];
    targetOption.loading = true;
    // 根據選中的分類 請求獲取二級分類列表
    const subCategorys = await this.getCategorys(targetOption.value)
    if (subCategorys && subCategorys.length > 0) {
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      targetOption.children = childOptions
    } else { // 當前選中的分類沒有二級分類
      targetOption.isLeaf = true
    }
    targetOption.loading = false
    this.setState({
      options: [...this.state.options],
    });
    // load options lazily

  };

  validatePrice = (rule, value, callback) => {
    console.log(value, typeof value)
    if (value * 1 > 0) {
      callback() //通過驗證
    } else {
      callback('價格必須大於零')
    }
  }

  submit = () => {
    this.props.form.validateFields((error, values) => {
      if (!error) {
        console.log(values)
        console.log(this.pw);
        const imgs = this.pw.current.getImgs()
        console.log('imgs',imgs)
        
      }
    })
  }

  componentDidMount() {
    this.getCategorys('0')
  }

  componentWillMount(){
    let product
    if(this.props.location.state){
     product = this.props.location.state.product
    }
    this.isUpdate = !!product
    this.product = product || {}
  
  }

  render() {

    const {isUpdate,product} = this
       
    if(product){
      var {pCategoryId,categoryId,imgs} = product
    }
    // 用來接收級聯分類ID的數組
    const categoryIds = []
    if(isUpdate){
      if(pCategoryId==='0'){
        categoryIds.push(categoryId)
      } else{
        categoryIds.push(pCategoryId)
        categoryIds.push(categoryId)
      }
    } 
    // 指定Item布局的配置對象
    const formItemLayout = {
      labelCol: { span: 3 }, // 左側label的寬度
      wrapperCol: { span: 14 } //指定右側包裹的寬度
    }
    const title = (
      <span>
        <LinkButton onClick={()=>this.props.history.goBack()}>
          <Icon type='arrow-left' style={{ fontSize: 20 }} />
        </LinkButton>
        <span>{isUpdate ? '修改商品': '添加商品'}</span>
      </span>
    )
    const { getFieldDecorator } = this.props.form

    return (
      <Card title={title}>
        <Form {...formItemLayout}>
          <Item label='商品名稱'>
            {
              getFieldDecorator('name', {
                initialValue: product.name,
                rules: [
                  { required: true, message: '必須輸入商品名稱' }
                ]
              })(<Input placeholder='請輸入商品名稱' />)
            }
          </Item>
          <Item label='商品描述'>
            {
              getFieldDecorator('desc', {
                initialValue: product.desc,
                rules: [
                  { required: true, message: '必須輸入商品描述' }
                ]
              })(<TextArea placeholder='請輸入商品描述' autoSize={{ minRows: 2, maxRows: 6 }} />)
            }


          </Item>
          <Item label='商品價格'>
            {
              getFieldDecorator('price', {
                initialValue: product.price,
                rules: [
                  { required: true, message: '必須輸入商品價格' },
                  { validator: this.validatePrice }
                ]
              })(<Input type='number' placeholder='請輸入商品價格' addonAfter='元' />)
            }

          </Item>
          <Item label="商品分類">
            {
              getFieldDecorator('category', {
                initialValue:categoryIds,
                rules: [
                  { required: true, message: '必須指定商品分類' }
                ]
              })(<Cascader
                placeholder='請指定商品分類'
                options={this.state.options}
                loadData={this.loadData}
              >
              </Cascader>)
            }
          </Item>
          <Item label="商品圖片">
            <PicturesWall ref={this.pw} imgs={imgs}/>
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

// 父組件調用子組件方法 使用ref 取得當前組件對象