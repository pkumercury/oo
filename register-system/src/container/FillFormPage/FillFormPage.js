/**
 * Created by wen on 17-5-16.
 */
import React, { Component } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import * as Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import { Form, Button, Select, Row, Col, Input, InputNumber, Cascader, Modal, Icon } from 'antd'
import SERVER_URL from '../../store/Constant'

const FormItem = Form.Item;
const Option = Select.Option;

const residences = [{
  value: '浙江',
  label: '浙江',
  children: [{
    value: '杭州',
    label: '杭州',
    children: [{
      value: '西湖',
      label: '西湖',
    }],
  }],
}, {
  value: '北京',
  label: '北京',
  children: [{
    value: '北京',
    label: '北京',
    children: [{
      value: '海淀',
      label: '海淀',
    },{
      value: '朝阳',
      label: '朝阳',
    }],
  }],
}];

@observer
class FillFormPage extends Component {
  @observable login = false;

  constructor(props) {
    super(props);
    const email = Cookies.get('email');
    if (email) {
      this.login = true;
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  fillError(code) {
    Modal.error({
      title: '填写错误！',
      content: '错误码' + code,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch(SERVER_URL + '/user/fill_form', {
          method: 'POST',
          headers: {
            'Content-Type':'application/x-www-form-urlencoded'
          },
          credentials: 'include',
          body: 'name=' + values.name + '&gender=' + values.gender + '&age=' + values.age
                + '&province=' + values.place[0] + '&city=' + values.place[1] + '&county=' + values.place[2]
                + '&high_school=' + values.high_school + '&ncee_id=' + values.ncee_id
                + '&department=' + values.department + '&card_id=' + values.card_id
                + '&acquired_glories=' + values.acquired_glories,
        }).then((resp) => resp.json())
          .then(resp => {
            let code = resp['code'];
            if (code === 0) {
              this.props.history.push('/user');
            }
            else {
              this.fillError(code);
            }
          })
      }
    })
  }

  handleLogout(e) {
    e.preventDefault();
    Cookies.remove('email');
    this.props.history.push('/login');
  }

  render() {
    if (!this.login) {
      return <Redirect to="/login" />
    }

    else {
      const formLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 14 },
        },
      };

      const { getFieldDecorator } = this.props.form;
      return (
        <div>
          <Row type="flex" justify="center" style={{marginTop: '20px', marginBottom: '20px'}}>
            <h1 style={{fontSize: '30px'}}>完善你的信息</h1>
          </Row>
          <Row type="flex" justify="center">
            <Col xs={{ span: 24 }} sm={{ span: 20 }} md={{ span: 16 }}>
              <Form onSubmit={this.handleSubmit}>
                <FormItem label="姓名" {...formLayout} hasFeedback>
                  {getFieldDecorator('name', {
                    rules: [{
                      required: true, message: '请输入你的姓名！'
                    }]
                  })(
                      <Input placeholder="姓名"/>
                  )}
                </FormItem>

                <FormItem label="年龄" {...formLayout} hasFeedback>
                  {getFieldDecorator('age', {
                    rules: [{
                      required: true, message: '请输入你的年龄！'
                    }]
                  })(
                    <InputNumber min={10} max={30} placeholder="年龄" />
                  )}
                </FormItem>

                <FormItem label="性别" {...formLayout} hasFeedback>
                  {getFieldDecorator('gender', {
                    rules: [{
                      required: true, message: '请选择你的性别！'
                    }]
                  })(
                    <Select placeholder="选择你的性别">
                      <Option value='1'>男</Option>
                      <Option value='0'>女</Option>
                    </Select>
                  )}
                </FormItem>

                <FormItem label="籍贯" {...formLayout} hasFeedback>
                  {getFieldDecorator('place', {
                    rules: [{
                      required: true, message: '请选择你的籍贯！'
                    }]
                  })(
                    <Cascader options={residences} placeholder="选择你的籍贯" />
                  )}
                </FormItem>

                <FormItem label="高中" {...formLayout} hasFeedback>
                  {getFieldDecorator('high_school', {
                    rules: [{
                      required: true, message: '请输入你的高中名称！'
                    }]
                  })(
                    <Input placeholder="输入你所在的高中全称" />
                  )}
                </FormItem>

                <FormItem label="高考报名号" {...formLayout} hasFeedback>
                  {getFieldDecorator('ncee_id', {
                    rules: [{
                      required: true, message: '请输入你的高考报名号！'
                    }]
                  })(
                    <Input placeholder="输入高考报名号" />
                  )}
                </FormItem>

                <FormItem label="文理" {...formLayout} hasFeedback>
                  {getFieldDecorator('department', {
                    rules: [{
                      required: true, message: '请选择你的文理分科！'
                    }]
                  })(
                    <Select placeholder="选择你的分科">
                      <Option value='1'>理科</Option>
                      <Option value='0'>文科</Option>
                    </Select>
                  )}
                </FormItem>

                <FormItem label="身份证" {...formLayout}>
                  {getFieldDecorator('card_id', {
                    rules: [{
                      required: true, message: '请输入你的身份证号！'
                    }]
                  })(
                    <Input placeholder="输入你的身份证号"/>
                  )}
                </FormItem>

                <FormItem label="获奖情况" {...formLayout}>
                  {getFieldDecorator('acquired_glories')(
                    <textarea style={{ width: '100%' }} placeholder="列举所获奖项，每一行一条，没有则输入无" />
                  )}
                </FormItem>

                <FormItem wrapperCol={{
                  xs: {span: 24, offset: 0},
                  sm: {span: 14, offset: 5}
                }}>
                  <Button type="primary" htmlType="submit" >提交</Button>
                  <Button style={{ float: "right" }} onClick={this.handleLogout}
                          type="primary">退出 <Icon type="logout"/></Button>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </div>
      )
    }
  }
}

export default FillFormPage;