import React from 'react';
import { Input, Button } from 'antd';

import './style.css';

export default function InputMsg({ message, setMessage, sendMessage }) {
  return (
    <form className="input__msg-form">
      <Input
        className="msg__input"
        type="text"
        placeholder="type a message"
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
      />
      <Button
        onClick={e => sendMessage(e)}
        className="send_btn">
        send
      </Button>
    </form>
  )
}
