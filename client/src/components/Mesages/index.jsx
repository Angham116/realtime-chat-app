import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

export default function Messages({ messages }) {
  return (
    <ScrollToBottom>
      <div>
        {messages.map(msg => (
          <div>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
    </ScrollToBottom>
  )
}
