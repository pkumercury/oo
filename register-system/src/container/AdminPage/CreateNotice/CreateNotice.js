/**
 * Created by wen on 17-5-18.
 */
import React, { Component } from 'react'
import { Input, Button, Form, Row, Col } from 'antd'
import { Editor } from 'draft-js'

const FormItem = Form.Item;

class CreateNotice extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

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
    return (
        <div>
          <Row type="flex" justify="center" style={{ marginTop: 20, marginBottom: 20 }}>
            <h1>发布新的通知</h1>
          </Row>
          <Row type="flex" justify="center">
            <Col xs={{ span: 24 }} sm={{ span: 20 }}>
              <Form>
                <FormItem {...formLayout} label="标题">
                  <Input placeholder="标题"/>
                </FormItem>
                <FormItem {...formLayout} label="内容">
                  <textarea style={{ width: '100%' }} />
                </FormItem>
                <FormItem wrapperCol={{
                  xs: {span: 24, offset: 0},
                  sm: {span: 14, offset: 5}
                }}>
                  <Button type="primary" htmlType="submit">发布</Button>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </div>
    )
  }
}

export default CreateNotice;