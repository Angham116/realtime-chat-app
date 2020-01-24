import React from 'react';
import { Link } from 'react-router-dom';

import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

import './style.css';

export default function InfBar({ room }) {
  return (
    <div className="infobar__container">
      <div className="left-side">
        <img className="online-img" src={onlineIcon} alt="online icon" />
        <span>{room}</span>
      </div>
      <div className="right-side">
        <Link path='/'>
          <img src={closeIcon} alt="close icone"/>
        </Link>
      </div>
    </div>
  )
}
