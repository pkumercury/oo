/**
 * Created by wen on 17-5-17.
 */
import React, { Component } from 'react'
import { Menu, Icon, Input, Row, Col } from 'antd'
import * as Cookies from 'js-cookie'
import './UserNavBar.css'

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

class UserNavBar extends Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(params) {
    // console.log(params);
    if (params.key === 'logout') {
      Cookies.remove('email');
      this.props.history.push('/login');
    }

  }

  render() {
    return (
        <Row className="user-navbar">
          <Col xs={0} sm={12}><h1>自主招生在线报名系统</h1></Col>
          <Col xs={8} sm={4}>
            <Input.Search placeholder="搜索" size="large"/>
          </Col>
          <Menu className="user-navbar-menu" onClick={this.handleLogout} mode="horizontal"
                style={{ lineHeight: '63px', fontSize: '18px',
                  float: 'right', background: '#2196f3' }}>
            <MenuItem className="user-navbar-menu" key="notice">
              <Icon type="notification"/>通知
            </MenuItem>
            <SubMenu className="user-navbar-menu" title={<span><Icon type="user"/>用户</span>}>
              <MenuItem className="user-navbar-menu" key="logout"><Icon type="logout" />登出</MenuItem>
            </SubMenu>
          </Menu>
        </Row>
    )
  }
}

export default UserNavBar;