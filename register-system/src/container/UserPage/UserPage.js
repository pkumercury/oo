/**
 * Created by wen on 17-5-15.
 */
import React, { Component } from 'react'
import { Link, Redirect, Route, BrowserRouter as Router } from 'react-router-dom'
import * as Cookies from 'js-cookie'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { Menu, Layout, Button } from 'antd'
import UserNavBar from './UserNavBar/UserNavBar'
import UserInfo from './UserInfo/UserInfo'

const { Header, Content, Footer } = Layout;
const MenuItem = Menu.Item;

import SERVER_URL from '../../store/Constant'
import NoticeInfo from "./NoticeInfo/NoticeInfo";

@observer
class UserPage extends Component {

  @observable login = false;

  constructor(props) {
    super(props);
    console.log(props);
    const email = Cookies.get('email');
    if (email) {
      this.login = true;
      this.checkLogin();
    }
  }

  checkLogin() {
    fetch(SERVER_URL + '/user/check_login', {
      method: 'GET',
      credentials: 'include'
    })
      .then((resp) => resp.json())
      .then((resp) => {
        let code = resp['code'];
        let first_login = resp['first_login'];
        if (code !== 0) {
          this.login = false;
        }
        else if (first_login === true) {
          this.props.history.push('/fill-form');
        }
      })
  }

  render() {

    if (!this.login) {
      return <Redirect to="/login"/>
    }
    else {
      const match = this.props.match;
      return (
          <Layout>

            <Header style={{position: 'fixed', width: '100%', zIndex: 999, background: '#2196f3' }}>
              <UserNavBar history={this.props.history}/>
            </Header>
            <Content style={{padding: '0 50px', marginTop: 64}}>
              {/*<Link to={`${match.url}/notice/1`}>链接</Link>*/}
              <Route exact path={match.url} component={UserInfo} />
              <Route path={`${match.url}/notice/:id`} component={NoticeInfo}/>
              {/*<Route exact path='/notice' component={<p>Hello</p>} />*/}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              <p>XX大学自主招生在线报名系统 ©2017</p>
              <p>联系人： 陈老师&nbsp;&nbsp;&nbsp;&nbsp;邮箱： xxx@xx.xx</p>
            </Footer>
          </Layout>
      )
    }
  }
}

export default UserPage;