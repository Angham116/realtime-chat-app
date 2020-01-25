import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from '../Message';

import './style.css';

export default function Messages({ messages, name }) {
  return (
    <ScrollToBottom className="messages__container">
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <Message message={msg} name={name} />
          </div>
        ))}
      </div>
    </ScrollToBottom>
  )
}
