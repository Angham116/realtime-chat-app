import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './style.css';

export default function UsersInRoom({ users }) {
  return (
    <div>
      <h2>Online People</h2>
      <div className="online__people-container">
        {users.length ? (
          <>
            {users.map(({ username }) => (
              <div>
                <div key={username} className="active">
                <img alt="Online Icon" src={onlineIcon}/>
                <span className="online__user">{username}</span>
                </div>
              </div>
            ))}
          </>
        ) :
         <></>
        }
      </div>
      {console.log(8888, users)}
    </div>
  )
}
