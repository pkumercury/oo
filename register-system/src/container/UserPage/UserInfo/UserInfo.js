/**
 * Created by wen on 17-5-17.
 */
import React, { Component } from 'react'
import { Button, Modal, Row, Col, Input, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import SERVER_URL from '../../../store/Constant'

@observer
class UserInfo extends Component {

  @observable info = [];

  constructor(props) {
    super(props);
    this.getInfoError = this.getInfoError.bind(this);

    this.getInfo();
    this.showConfirm = this.showConfirm.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  getInfoError(code) {
    Modal.error({
      title: '获取用户信息错误！',
      content: '错误码: ' + code,
    });
    this.props.history.push('/login');
  }

  getInfo() {
    fetch(SERVER_URL + '/user/get_info', {
      credentials: 'include'
    }).then((resp) => resp.json())
      .then((resp) => {
        let code = resp['code'];
        if (code !== 0) {
          this.getInfoError(code);
          return;
        }
        const self_info = resp['self_info'];

        const s_status = [
          <span><Icon style={{ color: 'orange' }} type="question-circle"/> 审核中</span>,
          <span><Icon style={{ color: 'green' }} type="check-circle"/> 通过</span>,
          <span><Icon style={{ color: 'red' }} type="cross-circle"/> 未通过</span>];
        this.info.push({key: '1', index: '姓名', value: self_info['name']});
        this.info.push({key: '2', index: '性别', value: self_info['gender']});
        this.info.push({key: '3', index: '年龄', value: self_info['age']});
        this.info.push({key: '4', index: '省', value: self_info['province']});
        this.info.push({key: '5', index: '市', value: self_info['city']});
        this.info.push({key: '6', index: '县', value: self_info['county']});
        this.info.push({key: '7', index: '所在高中', value: self_info['high_school']});
        this.info.push({key: '8', index: '高考报名号', value: self_info['ncee_id']});
        this.info.push({key: '9', index: '文理', value: self_info['department']});
        this.info.push({key: '10', index: '身份证号', value: self_info['card_id']});
        this.info.push({key: '11', index: '获奖情况', value: self_info['acquired_glories']});
        this.info.push({
          key: '12', index: '审核状态',
          value: (self_info['editable'] === 1) ? s_status[self_info['status']] : '信息未确认'});
        this.info.push({
          key: '13', index: '准考证号',
          value: (self_info['exam_num'] !== "None") ? self_info['exam_num'] : '无' })
      })
  }

  confirmError(code) {
    Modal.error({
      title: '确认信息出错！',
      content: '错误码: ' + code,
    });
  }

  handleConfirm() {
    fetch(SERVER_URL + '/user/confirm', {
      credentials: 'include'
    }).then((resp) => resp.json())
      .then((resp) => {
      let code = resp['code'];
      if (code !== 0) {
        this.confirmError(code);
        return;
      }
      Modal.success({
        title: '信息确认成功！'
      });
    });
  }

  showConfirm(e) {
    const self = this;
    Modal.confirm({
      title: '是否确认提交？',
      content: '提交后信息将不可修改！',
      onOk() {
        self.handleConfirm();
      }
    })
  }

  render() {
    const listItems = this.info.map((s) => <ListItem key={s.key} index={s.index} value={s.value} />);
    return (
        <Row>
          <Col xs={24} sm={12}>
            <h1 style={{fontSize: 30, marginTop: 30 }}>个人信息</h1>
            <ul className="info-list">
              {listItems}
            </ul>
            <div style={{marginTop: 20}}>
              <Button size="large" style={{ marginRight: 40 }}>保存修改</Button>
              <Button size="large" type="primary" onClick={this.showConfirm}>确认提交</Button>
            </div>
          </Col>
          <Col xs={24} sm={{ span: 10, offset: 2 }}>
            <Notice />
          </Col>
        </Row>
    );
  }
}

@observer
class ListItem extends Component {
  @observable revising = false;
  @observable value;
  @observable revised = false;

  constructor(props) {
    super(props);
    this.value = this.props.value;
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  handleOnBlur(e) {
    this.revising = false;
    if (this.value !== this.props.value) {
      this.revised = true;
    }
  }

  render() {
    return (
        <li onMouseOver={(e) => {e.currentTarget.style.backgroundColor = '#bbb'}}
            onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = '#ececec'}}
            onDoubleClick={() => {this.revising=true}}
            style={{fontSize: 18, paddingTop: 10, paddingLeft: 10, paddingRight: 10, borderBottom: '1px solid #ddd'}}>
          <Row type="flex" justify="space-around" style={ this.revised ? { color: 'red' } : { color: '#525252' }}>
            <Col span={8}><h4>{this.props.index}</h4></Col>
            <Col span={12}>{this.revising ?
                <Input size="large" onChange={(e) => { this.value = e.currentTarget.value }}
                       value={this.value} onBlur={this.handleOnBlur}/> :
                <span>{this.value}</span>}</Col>
          </Row>
        </li>
    )
  }
}


@observer
class Notice extends Component {

  @observable notices = [];

  constructor(props) {
    super(props);
    this.getNoticeError = this.getNoticeError.bind(this);
    this.getAllNotice = this.getAllNotice.bind(this);

    this.getAllNotice();
  }

  getNoticeError(code) {
    Modal.error({
      title: '登录状态错误！',
      content: '请求公告错误:' + code
    })
  }

  getAllNotice() {
    fetch(SERVER_URL + '/notice/all/', {
      credentials: 'include'
    }).then((resp) => resp.json())
      .then((resp) => {
        const code = resp['code'];
        if (code !== 0) {
          this.getNoticeError(code);
          return;
        }
        for (const notice of resp['notices']) {
          this.notices.push({id: notice['id'], title: notice['title']});
        }
      })
  }

  render() {
    const match = this.props.match;

    return (
        <div style={{ marginTop: 30 }}>
          <h1 style={{ fontSize: 30 }}>最新通知</h1>
          <ul style={{ fontSize: 18 }}>
            {this.notices.map((notice) =>
                <li key={notice.id}>
                  <Link to='user/notice/1'><Icon type="caret-right" />{notice.title}</Link>
                </li>)}
          </ul>
        </div>
    )
  }
}

export default UserInfo;