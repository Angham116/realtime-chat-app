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
        {username === 'admin' ? '' : <p className="sender">{username}</p> }
        <div className={`${username === 'admin' && 'admin__msg'} sent__msg-box`}>
          <p
            className="message__sent-text color__white"
          >
            {text}
          </p>
        </div>
      </div>

    )
    :
    (
      <div className="message__recived-container">
        <div className={`${user === 'admin' && 'admin__msg'} recieved__msg-box`}>
          <p
            className="message__recieved-text color__dark"
          >
            {text}
          </p>
        </div>
        {user === 'admin' ? '' : <p className="sender">{user}</p> }
      </div>
    )}
    </>
  )
}
