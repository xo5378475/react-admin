import React, { Component } from 'react'
import { Card, Table, Button, Icon, message, Modal } from 'antd'
import LinkButton from '../../components/link-button'
import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api'
import AddForm from './add-form'
import UpdateForm from './update-form'

// 商品分類路由
export default class Category extends Component {

  state = {
    loading: false, //現在是否在讀取數據
    categorys: [],// 一級分類列表
    subCategorys: [], // 二級分類列表
    parentId: '0',// 當前需要顯示的分類列表的父分類ID
    parentName: '',// 當前需要顯示的分類列表的父分類名稱
    showStatus: 0 // 標識添加/更新的確認框是否顯示 0 :不顯示 1:顯示添加 2:顯示更新
  }

  // 初始化Table所有column數組
  initColumns = () => {
    this.columns = [
      {
        title: '分類的名稱',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        dataIndex: '',
        width: 300, // 指定寬度
        key: 'action',
        render: (category) => {
          return (<span>
            <LinkButton onClick={() => this.showUpdate(category)}>修改分類</LinkButton>
            {
              this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategorys(category)} >查看子分類</LinkButton> : null
            }

          </span>)
        }
      },

    ];

  }

  getCategorys = async () => {

    this.setState({ loading: true })
    const { parentId } = this.state
    const result = await reqCategorys(parentId)
    this.setState({ loading: false })
    if (result.status === 0) {
      const categorys = result.data
      if (parentId === '0') {
        this.setState({
          categorys
        })
      } else {
        this.setState({
          subCategorys: categorys
        })
      }

    } else {
      message.error('獲取分類列表失敗')
    }
  }

  // 顯示指定的一級分類列表
  showCategorys = () => {
    // 更新顯示為一列表的狀態
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }

  // 顯示指定一級分類對象的二級子列表
  showSubCategorys = (category) => {
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => { // 在狀態更新且重新render後執行
      console.log(this.state.parentId)
      this.getCategorys()
    })
    // setState() 不能立即獲取最新的狀態: 因為setState()是異步更新的狀態
  }

  // 響應點即取消隱藏確定框
  handleCancel = () => {
    this.form.resetFields()
    this.setState({
      showStatus: 0
    })
  }

  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  showUpdate = (category) => {
    // 保存分類對象
    this.category = category
    this.setState({
      showStatus: 2
    })
  }

  // 添加分類
  addCategory = () => {
    console.log('addCategory()')
  }

  updateCategory = async () => {
    console.log('updateCategory()');
    // 隱藏確定框
    this.setState({
      showStatus: 0
    })

    const categoryId = this.category._id
    const categoryName = this.form.getFieldValue('categoryName')
  
    // 清除輸入數據
    this.form.resetFields()
    const result = await reqUpdateCategory({ categoryId ,categoryName})
    if (result.status === 0) {
      // 重新顯示列表
      this.getCategorys()
    }
  }



  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getCategorys()
  }

  render() {
    const { categorys, subCategorys, parentId, parentName, showStatus } = this.state
    const category = this.category

    const title = parentId === '0' ? '一級分類列表' : (
      <span>
        <LinkButton onClick={this.showCategorys}>一級分類列表</LinkButton>
        <Icon type='arrow-right' style={{ marginRight: 5 }}></Icon>
        <span>{parentName}</span>
      </span>
    )
    const extra = (
      <Button type='primary' onClick={this.showAdd}>
        <Icon type='plus'></Icon>
        添加
      </Button>
    )
    const dataSource = [

      { "parentId": "0", "_id": "624c7bc1b330242cbc091112", "name": "家用電器", "__v": 0 },
      { "parentId": "0", "_id": "624c7c04b330242cbc091113", "name": "電腦", "__v": 0 },
      { "parentId": "0", "_id": "624c7c10b330242cbc091114", "name": "圖書", "__v": 0 },
      { "parentId": "0", "_id": "624c7c15b330242cbc091115", "name": "服飾", "__v": 0 },
      { "parentId": "0", "_id": "624c7c55b330242cbc091116", "name": "食品", "__v": 0 }
    ];


    return (
      <Card title={title} extra={extra} >
        <Table
          bordered
          dataSource={parentId === '0' ? categorys : subCategorys}
          columns={this.columns}
          loading={this.state.loading}
          rowKey='_id' // 指定key
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        />;
        <Modal title="添加分類"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}>
          <AddForm></AddForm>
        </Modal>
        <Modal title="更新分類"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}>
          <UpdateForm
            categoryName={category ? category.name : ''}
            setForm={(form) => { this.form = form }}
          ></UpdateForm>
        </Modal>
      </Card>
    )
  }
}
