/**
 * Created by wen on 17-5-14.
 */
import React, { Component } from 'react'
import { Form, Input, Icon, Button, Layout, Row, Col, Modal } from 'antd'
import { Link } from 'react-router-dom'
import SERVER_URL from '../../store/Constant'

import './LoginPage.css'

const FormItem = Form.Item;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loginError(code) {
    Modal.error({
      title: '登录错误！',
      content: '错误码：' + code,
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch(SERVER_URL + '/user/login', {
          method: 'POST',
          headers: {
            'Content-Type':'application/x-www-form-urlencoded'
          },
          credentials: 'include',
          body: 'email=' + values.email + '&password=' + values.password
        }).then((resp) => resp.json())
          .then((resp) => {
            let code = resp['code'];
            if (code === 0) {
              this.props.history.push('/');
            }
            else {
              this.loginError(code);
            }
          })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div>
          <Row type="flex" justify="center" style={{marginTop: '120px'}}>
            <h1 style={{fontSize: '30px'}}>在线自主招生平台</h1>
          </Row>
          <Row type="flex" justify="center" style={{marginTop: '20px'}}>
            <Col xs={{ span: 16 }} sm={{ span: 8 }} md={{ span: 6 }}>
              <Form className="login-form" onSubmit={this.handleSubmit}>
                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: '请输入您的邮箱' }]
                  })(
                      <Input prefix={<Icon type="user" style={{ fontSize:15 }}/>} placeholder="邮箱" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入您的密码' }]
                  })(
                      <Input prefix={<Icon type="lock" style={{ fontSize: 15 }}/>} type="password" placeholder="密码" />
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                  或<Link to="/register">注册</Link>
                  <a className="login-form-forgot">忘记密码</a>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </div>
    )
  }
}


export default LoginPage;