/**
 * Created by wen on 17-5-18.
 */
import React, { Component } from 'react'
import SERVER_URL from '../../../store/Constant'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { Table, Button, Row, Icon } from 'antd'

@observer
class ReleaseGrade extends Component {

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
            if (s['status'] != 1) {
              continue;
            }
            this.stuList.push({
              key: s['id'], id: s['id'], name: s['name'],
              department: s['department'], exam_num: s['exam_num'],
              grade: s['grade'], revise: <Button type="primary">修改</Button>
            });
          }
        }
        console.log(this.stuList);
      })
  }

  render() {
    const columns = [
      { title: '编号', dataIndex: 'id' },
      { title: '姓名', dataIndex: 'name' },
      { title: '文理', dataIndex: 'department' },
      { title: '考号', dataIndex: 'exam_num' },
      { title: '成绩', dataIndex: 'grade' },
      { title: '修改', dataIndex: 'revise' }
    ];
    return(
      <Row style={{ paddingLeft: 10, paddingRight: 10 }} >
        <Button size="large"
                style={{ float: 'right', marginTop: 20, marginBottom: 20 }} >
          <Icon type="upload"/>导入</Button>
        <h1 style={{ marginTop: 20, marginBottom: 20 }}>成绩单</h1>
        <Table columns={columns} dataSource={[...this.stuList]}/>
      </Row>
    )
  }
}


export default ReleaseGrade;