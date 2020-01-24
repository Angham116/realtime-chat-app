import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;
const END_POINT = 'localhost:5000';

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  useEffect(() => {
    const data = queryString.parse(location.search);
    socket = io(END_POINT);
    // console.log(666, data)
    const { name, room } = data;
    // console.log(name)
    // console.log(room)
    setName(name);
    setRoom(room)
    // console.log(555, socket)
    socket.emit('join-chat', { name, room }, () => {
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [END_POINT, location.search])
  // [END_POINT, location.search] where is the effect happen
  // when rs for the server http or change the search contents
  return (
    <div>
      Chat
    </div>
  )
}
export default Chat;