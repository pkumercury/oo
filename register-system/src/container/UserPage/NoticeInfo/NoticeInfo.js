/**
 * Created by wen on 17-5-18.
 */
import React, { Component, PropTypes } from 'react'
import SERVER_URL from '../../../store/Constant'
import { Modal } from 'antd'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

@observer
class NoticeInfo extends Component {

  @observable title = '';
  @observable content = '';
  @observable datetime = '';

  constructor(props) {
    super(props);
    this.getNoticeError = this.getNoticeError.bind(this);
    this.getNotice();
  }

  getNoticeError(code) {
    Modal.error({
      title: '登录状态异常',
      content: '错误码：' + code
    });
  }

  getNotice() {
    fetch(SERVER_URL + '/notice/' + this.props.match.params.id, {
      credentials: 'include'
    }).then((resp) => resp.json())
      .then((resp) => {
        const code = resp['code'];
        if (code !== 0) {
          this.getNoticeError(code);
          return;
        }
        this.content = resp['notice']['content'];
        this.title = resp['notice']['title'];
        this.datetime = resp['notice']['date_time'];
      });
  }

  render() {
    return (
        <div>
          <h1>{this.title}</h1>
          <p>{this.datetime}</p>
          <div>{this.content}</div>
        </div>
    )
  }
}

export default NoticeInfo;