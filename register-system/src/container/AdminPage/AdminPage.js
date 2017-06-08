/**
 * Created by wen on 17-5-12.
 */
import React, { Component } from 'react'
import { Layout, Form, Icon } from 'antd'
import { Route, Link } from 'react-router-dom'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

const { Header, Content, Footer } = Layout;

import NavigationBar from './NavigationBar/NavigationBar'
import StudentsInfo from './StudentsInfo/StudentsInfo'
import CreateNotice from './CreateNotice/CreateNotice'
import ReleaseGrade from './ReleaseGrade/ReleaseGrade'
import ArrangeRoom from './ArrangeRoom/ArrangeRoom'
import SERVER_URL from '../../store/Constant'

@observer
class AdminPage extends Component {

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
            for (const s of students) {
              this.stuList.push({
                key: s['id'], id: s['id'], name: s['name'], gender: s['gender'],
                editable: s['editable'] ?
                    <Icon style={{ color: 'red' }} type="close-circle" /> :
                    <Icon style={{ color: 'green' }} type="check-circle" />,
                age: s['age'], place: s['province'] + ' / ' + s['city'] + ' / ' + s['county'],
                high_school: s['high_school'], ncee_id: s['ncee_id'],
                department: s['department'], card_id: s['card_id'], glories: s['acquired_glories'],
                status: s['status'], exam_num: s['exam_num']
              })
            }
          }
        })
  }

  render() {
    const match = this.props.match;
    const WNoticeForm = Form.create()(CreateNotice);
    return (
        <Layout>
          <Header style={{ position: 'fixed', width: '100%', height: '64px', zIndex: 999 }}>
            <NavigationBar history={this.props.history}/>
          </Header>
          <Content style={{ marginTop: 64 }}>
            {/*<Link to={`${match.url}/notice/1`}>链接</Link>*/}
            <Route exact path={match.url} render={ (props) => <StudentsInfo {...props} stuList={this.stuList} />} />
            <Route path={`${match.url}/notice`} component={WNoticeForm}/>
            <Route path={`${match.url}/grade`} component={ReleaseGrade}/>
            <Route path={`${match.url}/room`} component={ArrangeRoom} />
            {/*<Route path={`${match.url}/create`} render={() => <p>Hello</p>}/>*/}
          </Content>
        </Layout>
    )
  }
}

export default AdminPage;