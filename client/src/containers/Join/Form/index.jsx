import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';

import './style.css';
import './media.css';

import {
  Login_Url
} from '../../../routes';

class JoinForm extends Component {
  state = {
    confirmDirty: false,
    username: '',
    email: '',
    password: '',
    confirmPass: '',
  };

  handleChange = e => this.setState({ [e.target.name] : e.target.value });

  signupUser = async () => {
    const {
      username,
      email,
      password,
      // confirmPass
    } = this.state;
    const newUser = await axios.post('/api/signup', { username, email, password });
    console.log(4444444, newUser)
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render(){
    const { getFieldDecorator } =this.props.form;
    return (
      <Form className="join-form">
        <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input
                name='email'
                placeholder="Enter your E-mail"
                onChange={this.handleChange}
              />,
            )}
          </Form.Item>
        <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Enter your Username"
                name='username'
                onChange={this.handleChange}
              />,
            )}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                }
              ],
            })(<Input.Password
                name='password'
                onChange={this.handleChange}
            />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                }
              ],
            })(<Input.Password
              onBlur={this.handleConfirmBlur}
              name='confirmPass'
              onChange={this.handleChange}
              />)}
          </Form.Item>
          <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="join-form-button"
            onClick={this.signupUser}
          >
            Join
          </Button>
          Or <Link to={Login_Url}>Login</Link>
        </Form.Item>
      </Form>
    )
  }
  
}


export default Form.create({ name: 'normal_join'})(JoinForm);
