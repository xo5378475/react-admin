import React, { Component } from 'react'
import { Icon, Upload, Modal, message } from 'antd'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false, // 標示是否大圖預覽
    previewImage: '', // 大圖的url
    fileList: [
     
    ],
  };

  // 獲取所有已上傳圖片文件名的數組
  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    console.log('handlePreview()', file)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    // 顯示指定file對應的大圖
    // 在操作(上傳/刪除)過程中更新fileList狀態
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ file, fileList }) => {
    console.log('handelChange()', file, fileList);
    if (file.status === 'done') {
      const result = file.response
      if (result.status === 0) {
        message.success('上傳圖片成功')
        const {name,url} = result.data
        file = fileList[fileList.length-1] // file 和fileList最後一個元素 指向不同對象 但內容相同 為了 setState 可以感應變更
        file.name = name
        file.url = url
      } else {
        message.error('上傳圖片失敗')
      }
    }
    this.setState({ fileList })
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"
          accept='image/*' // 只接收圖片格式
          name='image' // 請求參數名
          listType="picture-card"
          fileList={fileList} // 所有已上傳圖片對象數組
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
