import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import InfoBar from '../../components/InfoBar';
import Messages from '../../components/Mesages';
import Input from '../../components/Input';

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
      <Messages />
      <div>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  )
}
export default Chat;