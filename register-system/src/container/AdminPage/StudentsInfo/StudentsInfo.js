/**
 * Created by wen on 17-5-18.
 */
import React, {Component} from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { Table, Icon, Row, Button, Alert, Modal } from 'antd'
import SERVER_URL from '../../../store/Constant'

import './StudentsInfo.css'
const ButtonGroup = Button.Group;

@observer
class StudentsInfo extends Component {

  @observable stuList = [];

  constructor(props) {
    super(props);
    console.log(props);
    this.getAllStudent();
    this.handlePass = this.handlePass.bind(this);
  }

  handlePass(id) {
    // console.log(id);
    fetch(SERVER_URL + '/admin/pass/?id=' + id + '&status=1', {
      method: 'GET',
      credentials: 'include',
    }).then((resp) => resp.json())
      .then((resp) => {
        const code = resp['code'];
        if (code !== 0) {
          Modal.error({
            title: '错误!',
            content: '错误编号：' + code
          });
          return;
        }
        this.getAllStudent();
      })
  }

  getAllStudent() {
    this.stuList = [];
    fetch(SERVER_URL + '/admin/students', {
      credentials: 'include'
    }).then((resp)=>resp.json())
      .then((resp)=>{
        const code = resp['code'];
        if (code === 0) {
          const students = resp['students'];
          console.log(students);
          for (const s of students) {
            const s_status = [
              <Icon style={{ color: 'orange'}} type="question-circle"/>,
              <Icon style={{ color: 'green' }} type="check-circle" />,
              <Icon style={{ color: 'red' }} type="close-circle" />];

            const check = [
              <ButtonGroup>
                <Button type="primary" onClick={this.handlePass.bind(this, s['id'])}>通过</Button>
                <Button type="danger">拒绝</Button>
              </ButtonGroup>,
              <Alert className="check-info" message="已通过" type="success" showIcon/>,
              <Alert className="check-info" message="未通过" type="error" showIcon/>
            ];
            this.stuList.push({
              key: s['id'], id: s['id'], name: s['name'], gender: s['gender'],
              editable: s_status[s['editable']],
              age: s['age'], place: s['province'] + ' / ' + s['city'] + ' / ' + s['county'],
              high_school: s['high_school'],
              ncee_id: s['ncee_id'],
              department: s['department'],
              card_id: s['card_id'],
              glories: s['acquired_glories'],
              status: (s['editable'] === 1) ? check[s['status']] : null,
              exam_num: (s['exam_num'] !== "None") ? s['exam_num'] : '无',
            })
          }
        }
      })
  }

  render() {
    const columns = [
      { title: '编号', dataIndex: 'id' },
      { title: '状态', dataIndex: 'editable' },
      { title: '姓名', dataIndex: 'name' },
      { title: '年龄', dataIndex: 'age' },
      { title: '性别', dataIndex: 'gender'},
      { title: '籍贯', dataIndex: 'place' },
      { title: '高中', dataIndex: 'high_school' },
      { title: '高考报名号', dataIndex: 'ncee_id' },
      { title: '文理', dataIndex: 'department' },
      { title: '身份证', dataIndex: 'card_id' },
      { title: '准考证号', dataIndex: 'exam_num'},
      { title: '审核', dataIndex: 'status'},
    ];
    return(
        <Row style={{ paddingLeft: 10, paddingRight: 10 }}>
          <h1 style={{ marginTop: 20, marginBottom: 20}}>报名学生信息</h1>
          <Table columns={columns} dataSource={[...this.stuList]}
                 expandedRowRender={stu => <p><strong>获奖信息：</strong>{stu.glories}</p>}/>
        </Row>
    )
  }
}

export default StudentsInfo;