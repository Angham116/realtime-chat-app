import React, { Component } from 'react';
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
  };

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
                placeholder="Enter your E-mail"
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
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                }
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item>
          <Button type="primary" htmlType="submit" className="join-form-button">
            Join
          </Button>
          Or <Link to={Login_Url}>Login</Link>
        </Form.Item>
      </Form>
    )
  }
  
}


export default Form.create({ name: 'normal_join'})(JoinForm);
