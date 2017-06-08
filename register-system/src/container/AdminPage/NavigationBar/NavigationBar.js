/**
 * Created by wen on 17-5-8.
 */
import React, { Component, PropTypes } from 'react';
import { Menu, Row, Col, Input, Icon } from 'antd';
import { observer } from 'mobx-react';

import './NavigationBar.css'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

@observer
class NavigationBar extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(params) {
    if (params.key === 'notice') {
      this.props.history.push('/admin/notice');
    }

    if (params.key === 'grade') {
      this.props.history.push('/admin/grade');
    }

    if (params.key === 'main_page') {
      this.props.history.push('/admin');
    }
    if (params.key === 'room') {
      this.props.history.push('/admin/room');
    }
  }

  render() {
    return (
      <Row type="flex" justify="space-between">
        <Col xs={0} sm={10}><h1 style={{ color: '#ddd' }}><Icon style={{ fontSize: '30px' }} type="solution"/>
          &nbsp;自主招生在线报名系统</h1></Col>
        <Col xs={8} sm={4}><Input.Search placeholder="搜索" size="large" style={{ background: '#404040' }}/></Col>
        <Col xs={16} sm={9} md={7}>
        <Menu mode="horizontal" className="Menu" theme="dark" style={{ lineHeight: '64px' }}
              defaultSelectedKeys={['main_page']} onClick={this.handleClick}>
          <MenuItem key="main_page">
            首页
          </MenuItem>
          <MenuItem key="message">信息</MenuItem>
          <SubMenu title="发布">
            <MenuItem key="notice">
              公告
            </MenuItem>
            <MenuItem key="grade">
              成绩
            </MenuItem>
            <MenuItem key="room">
              考场安排
            </MenuItem>
          </SubMenu>
        </Menu>
        </Col>
      </Row>
    )
  }
}

export default NavigationBar;