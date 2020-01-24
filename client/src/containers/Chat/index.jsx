import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import { Input, Button } from 'antd';
import InfoBar from '../../components/InfoBar';

let socket;
const END_POINT = 'localhost:5000';

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState('');

  // useEffect when user join the chat room
  useEffect(() => {
    const data = queryString.parse(location.search);
    socket = io(END_POINT);
    const { name, room } = data;
    setName(name);
    setRoom(room)
    socket.emit('join-chat', { name, room }, () => {
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
    // [END_POINT, location.search] where is the effect happen
    // when rs for the server http or change the search contents
  }, [END_POINT, location.search]);

  // useEffect for handling messages
  useEffect(() => {
    socket.on('join-chat-msg', (message) => {
      setMessages([...messages, message]);
    })
  }, [messages]);

  /*
  * @description sendMessage is a service to send msg's
  */
  const sendMessage = e => {
    e.preventDefault();
    if(message){
      socket.emit('send-msg', message, () => {
        setMessage('');
      })
    }
  }
  console.log(888, message);
  console.log(999, messages);
  return (
    <div className="chat__container">
      <InfoBar room={room} />
      <form onSubmit={e => sendMessage(e)}>
        <Input
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          // onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <Button onClick={e => sendMessage(e)}>send</Button>
      </form>
    </div>
  )
}
export default Chat;