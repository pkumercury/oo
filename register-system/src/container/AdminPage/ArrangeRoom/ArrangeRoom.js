/**
 * Created by wen on 17-5-18.
 */
import React, {Component} from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { Table, Icon, Row, Col, Tabs, Button, Form, Input, InputNumber, message } from 'antd'
import SERVER_URL from '../../../store/Constant'
import StudentsInfo from "../StudentsInfo/StudentsInfo";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;

@observer
class ArrangeRoom extends Component {
  render() {
    return (
        <Tabs defaultActiveKey="1">
          <TabPane tab="考场安排" key="1">
            <StudentRoom/>
          </TabPane>
          <TabPane tab="考场信息" key="2">
            <RoomInfo/>
          </TabPane>
        </Tabs>
    )
  }
}

@observer
class StudentRoom extends Component {

  @observable stuList = [];

  constructor(props) {
    super(props);
    this.getAllStudent();
  }

  getAllStudent() {
    fetch(SERVER_URL + '/admin/students', {
      credentials: 'include'
    }).then((resp)=>resp.json())
        .then((resp)=>{
          const code = resp['code'];
          if (code === 0) {
            const students = resp['students'];
            console.log(students);
            for (const s of students) {
              if (s['status'] !== 1) {
                continue;
              }
              this.stuList.push({
                key: s['id'], id: s['id'], name: s['name'],
                department: s['department'], exam_num: s['exam_num'],
                room: s['room'], revise: <Button type="primary">修改</Button>
              });
            }
          }
        })
  }

  render() {
    const columns = [
      { title: '编号', dataIndex: 'id' },
      { title: '姓名', dataIndex: 'name' },
      { title: '文理', dataIndex: 'department' },
      { title: '考号', dataIndex: 'exam_num' },
      { title: '考场', dataIndex: 'room' },
      { title: '修改', dataIndex: 'revise' },
    ];
    return (
      <Row>
        <Col xs={{ offset: 1, span: 22 }} style={{ textAlign: 'center' }}>
          <h1 style={{marginBottom: 20 }} >考场安排表</h1>
          <Table columns={columns} dataSource={[...this.stuList]}/>
        </Col>
      </Row>
    )
  }
}


@observer
class RoomInfo extends Component {

  @observable roomList = [];

  constructor(props) {
    super(props);
    this.getRooms();
  }

  getRooms() {
    fetch(SERVER_URL + '/room', {
      credentials: 'include'
    }).then((resp) => resp.json())
      .then((resp) => {
        const code = resp['code'];
        const rooms = resp['rooms'];
        for (const room of rooms) {
          this.roomList.push({
            id: room['id'],
            province: room['province'],
            place: room['place'],
            size: room['size'],
            action: <ButtonGroup><Button>修改</Button>
              <Button type="danger">删除</Button></ButtonGroup>
          });
        }
      })
  }

  render() {
    console.log(this.roomList);
    const columns = [
      { key: 'id', title: '编号', dataIndex: 'id' },
      { key: 'province', title: '省份', dataIndex: 'province' },
      { key: 'place', title: '地点', dataIndex: 'place' },
      { key: 'size', title: '容纳人数', dataIndex: 'size' },
      { key: 'action', title: '操作', dataIndex: 'action' },
    ];
    const AddRoomForm = Form.create()(AddRoomPanel);
    return (
      <div>
        <Row type="flex">
          <Col xs={{ offset: 1, span: 22 }} sm={{ offset: 1, span: 13 }} style={{ textAlign: 'center' }} >
            <h1>考点信息表</h1>
            <Table columns={columns} dataSource={[...this.roomList]} />
          </Col>
          <Col xs={24} sm={{ offset: 1, span: 8 }}>
            <h2 style={{ display: 'inline' }}>添加新的考点</h2>
            <Button style={{ float: 'right' }}><Icon type="upload"/>导入</Button>
            <AddRoomForm/>
          </Col>
        </Row>
      </div>
    )
  }
}


class AddRoomPanel extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch(SERVER_URL + '/room/add', {
          method: 'POST',
          headers: {
            'Content-Type':'application/x-www-form-urlencoded'
          },
          credentials: 'include',
          body: 'province=' + values.province + '&place=' + values.place + '&size=' + values.size
        }).then((resp) => resp.json())
          .then((resp) => {
            let code = resp['code'];
            if (code === 0) {
              message.success('添加成功！');
            }
            else {
              message.error('添加失败！');
            }
          })
      }
    });
    location.reload();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="省份">
          {getFieldDecorator('province', {
            rules: [{ required: true, message: '请输入考场所在省' }]
          })(
            <Input placeholder="省份"/>
          )}
        </FormItem>
        <FormItem label="位置">
          {getFieldDecorator('place', {
            rules: [{ required: true, message: '请输入考点的具体位置' }]
          })(
            <Input type="textarea" placeholder="具体位置"/>
          )}
        </FormItem>
        <FormItem label="可容纳人数">
          {getFieldDecorator('size', {
            rules: [{ required: true, message: '请输入考点可容纳人数' }]
          })(
            <InputNumber min={1} max={200} />
          )}
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
    )
  }
}

export default ArrangeRoom;