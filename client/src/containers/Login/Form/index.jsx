import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import './style.css';
import './media.css';

import {
  Join_Url, Chat_Url
} from '../../../routes';

class JoinForm extends Component {
  state = {
    username: '',
    room: '',
    password: '',
  };

  handleChange = e => this.setState({ [e.target.name] : e.target.value });

  signupUser = async () => {
    const {
      username,
      password,
      room,
    } = this.state;
    console.log(username, password, room)
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render(){
    const { getFieldDecorator } =this.props.form;
    const { username, room } = this.state;
    console.log(username)
    return (
      <Form className="join-form">
        <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input
                name='username'
                placeholder="Username or E-mail"
                onChange={this.handleChange}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('room', {
              rules: [{ required: true, message: 'Please chat room you want to join!' }],
            })(
              <Input
                name='room'
                placeholder="Chat room"
                onChange={this.handleChange}
              />,
            )}
          </Form.Item>
          <Form.Item hasFeedback>
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
          <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="join-form-button"
            onClick={this.signupUser}
          >
            <Link to={`${Chat_Url}?name=${username}&room=${room}`}>
              Login
            </Link>
          </Button>
          Or <Link to={Join_Url}>Join</Link>
        </Form.Item>
      </Form>
    )
  }
  
}


export default Form.create({ name: 'normal_join'})(JoinForm);
