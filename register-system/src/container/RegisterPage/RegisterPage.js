/**
 * Created by wen on 17-5-15.
 */
import React, { Component, PropTypes } from 'react'
import { Form, Checkbox, Button, Input, Row, Col, Modal } from 'antd'
import { Link } from 'react-router-dom'
import SERVER_URL from '../../store/Constant'
import * as Cookies from 'js-cookie'

const FormItem = Form.Item;

class RegisterPage extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);

    this.state = { email: '', password: ''}
  }

  registerError(code) {
    if (code === 1) {
      Modal.error({
        title: '信息未填写完整！',
        content: '请填写完整后提交'
      })
    }
    if (code === 2) {
      Modal.error({
        title: '邮箱已被使用！',
        content: '请更换邮箱名，或者检查是否已经收到邮件'
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = new FormData();
    data.append("json", JSON.stringify( { email: this.state.email, password: this.state.password } ));
    fetch(SERVER_URL + '/user/register', {
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'
      },
      body: 'email=' + this.state.email + '&password=' + this.state.password
    }).then((resp) => resp.json())
      .then((resp) => {
        const code = resp['code'];
        if (code !== 0) {
          this.registerError(code);
        }
        else {
          Cookies.set('email', this.state.email);
          this.props.history.push('/fill-form')
        }
      })
  }

  setPassword(e) {
    e.preventDefault();
    this.setState({password: e.target.value});
  }

  setEmail(e) {
    e.preventDefault();
    this.setState({email: e.target.value});
  }

  checkConfirm(e) {
    e.preventDefault();
    const passwd = e.target.value;
    if (passwd !== this.state.password) {}
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 5,
        },
      },
    };

    console.log(this.props);
    return (
        <div>
          <Row type="flex" justify="center" style={{ marginTop: '100px' }}>
            <h1 style={{fontSize: '30px'}}>在线自主招生平台用户注册</h1>
          </Row>
          <Row type="flex" justify="center" style={{marginTop: '20px'}}>
            <Col xs={{ span: 16 }} sm={{ span: 12 }} md={{ span: 10 }}>
              <Form className="register-form" onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="邮箱" hasFeedback>
                  {getFieldDecorator('email', {
                    rules: [{
                      type: 'email', message: '无效的邮箱地址'
                    }, {
                      required: true, message: '请输入您的邮箱'
                    }]
                  })(
                      <Input placeholder="邮箱" onBlur={this.setEmail} />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="密码" hasFeedback>
                  {getFieldDecorator('password', {
                    rules: [{
                      required: true, message: '请输入您的密码'
                    }]
                  })(
                      <Input type="password" placeholder="密码" onBlur={this.setPassword} />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="确认密码" hasFeedback>
                  {getFieldDecorator('confirm', {
                    rules: [{
                      required: true, message: '请输入确认密码'
                    }]
                  })(
                      <Input type="password" placeholder="确认密码" onBlur={this.checkConfirm}/>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="验证码">
                  <Row gutter={8}>
                    <Col span={12}>
                      {getFieldDecorator('identify_code', {
                        rules: [{
                          required: true, message: '请输入邮箱中收到的验证码'
                        }]
                      })(
                          <Input placeholder="验证码"/>
                      )}
                    </Col>
                    <Col span={12}>
                      <Button>获取验证码</Button>
                    </Col>
                  </Row>
                </FormItem>
                <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                  {getFieldDecorator('agreement', {
                    valuePropName: 'checked',
                  })(
                      <Checkbox>我已经阅读并同意 <a href="">用户协议</a></Checkbox>
                  )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit" size="large" style={{ marginRight: '10px' }}>
                    注册</Button>
                   已有帐号？直接<Link to="/login">登录</Link>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </div>
    )
  }
}

export default RegisterPage;