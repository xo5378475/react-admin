import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import './login.less'
import logo from '../../assets/images/logo.png'
// 登陸的路由組件

// const Item = Form.Item 
// <Form.Item> 可簡寫 <Item>

 class Login extends Component {

  handleSubmit = (event)=>{
    event.preventDefault()
    // 對所有表單字段進行校驗
    this.props.form.validateFields((err, values) => {
      // 校驗成功
      if (!err) {
        console.log('提交AJAX請求', values);
      } else{
        console.log("校驗失敗")
      }
    });
  }

  validatePwd = (rule,value,callback)=>{
    console.log(rule,value);
    if(!value){
      callback("密碼必須輸入")
    } else if(value.length < 4){
      callback('密碼至少4位')
    } else if(value.length > 12){
      callback("密碼最多12位")
    } else if(!/^[a-zA-Z0-9_]+$/.test(value)){
      callback('密碼必須是英文數字下划線組成')
    } else{
      callback()//無傳參表示成功
    }
  }

  render() {

    const form = this.props.form

    const { getFieldDecorator } = form

    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="logo" />
          <h1>React項目: 後台管理系統</h1>
        </header>
        <section className='login-content'>
          <h2>用戶登陸</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>    
              {
                getFieldDecorator('username',{
                  validateFirst:true,
                  //聲明式驗證
                  rules:[
                    {required:true,whitespace:true,message:'用戶名必須輸入'},
                    {min:4,message:'用戶名至少4位'},
                    {max:12,message:'用戶名最多12位'},
                    {pattern:/^[a-zA-Z0-9_]+$/,message:"用戶名必須是英文數字下划線組成"}
                  ]
                })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用戶名"
                />
                )
              }
            </Form.Item>
            <Form.Item>             
              {
                getFieldDecorator('password',{
                  rules:[{validator:this.validatePwd}]
                })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密碼"
                />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陸
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

const WrapLogin = Form.create()(Login)

export default WrapLogin