import React from 'react';

import './style.css';

export default function Message({ message }) {
  return (
    <div className="message__container">
      {/* <span>{message.user}</span> */}
      <p className="message__text color__white">{message.text}</p>
    </div>
  )
}
