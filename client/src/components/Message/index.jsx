import React from 'react';

import './style.css';

export default function Message({ message: {user, text}, name }) {
  let msgSentByCurrentUser = false;
  const username = name.trim().toLowerCase();
  if(user === username){
    msgSentByCurrentUser = true;
  }
  return (
    <>
    {msgSentByCurrentUser ? (
      <div className="message__sent-container">
        <p className="sender">{username}</p>
        <div className="sent__msg-box">
          <p className="message__sent-text color__white">{text}</p>
        </div>
      </div>

    )
    :
    (
      <div className="message__recived-container">
        <div className="recieved__msg-box">
          <p className="message__recieved-text color__dark">{text}</p>
        </div>
        <p className="reciever">{user}</p>
      </div>
    )}
    </>
  )
}
