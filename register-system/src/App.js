import React, { Component } from 'react';
import { Form } from 'antd'
import {Route, BrowserRouter as Router, Link, Redirect} from 'react-router-dom'

import AdminPage from './container/AdminPage/AdminPage'
import LoginPage from './container/LoginPage/LoginPage'
import RegisterPage from './container/RegisterPage/RegisterPage'
import UserPage from './container/UserPage/UserPage'
import FillFormPage from './container/FillFormPage/FillFormPage'
import './App.css';


class App extends Component {
  render() {
    const WLoginPage = Form.create()(LoginPage);
    const WRegPage = Form.create()(RegisterPage);
    const WFillPage = Form.create()(FillFormPage);
    return (
        <Router>
          <div>
            <Route exact path='/' render={ ()=><Redirect to='/user' /> }/>
            <Route path='/user' component={UserPage} />
            <Route path='/login' component={WLoginPage} />
            <Route path='/register' component={WRegPage} />
            <Route path='/admin' component={AdminPage} />
            <Route path='/fill-form' component={WFillPage}/>
          </div>
        </Router>
    );
  }
}

export default App;