import React, { Component } from 'react'
import { Card, Table, Button, Icon, message } from 'antd'
import LinkButton from '../../components/link-button'
import { reqCategorys } from '../../api'

// 商品分類路由
export default class Category extends Component {

  state = {
    loading: false, //現在是否在讀取數據
    categorys: [],// 一級分類列表
    subCategorys: [], // 二級分類列表
    parentId: '0',// 當前需要顯示的分類列表的父分類ID
    parentName: ''// 當前需要顯示的分類列表的父分類名稱
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
            <LinkButton>修改分類</LinkButton>
            <LinkButton onClick={() => this.showSubCategorys(category)} >查看子分類</LinkButton>
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

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getCategorys()
  }

  render() {
    const title = '一級分類列表'
    const extra = (
      <Button type='primary'>
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


    const { categorys, subCategorys, parentId, parentName } = this.state
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
      </Card>
    )
  }
}
