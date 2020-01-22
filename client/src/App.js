import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import {
  Join_Url,
  Rooms_Url,
  Chat_Url,
} from './routes';

import {
  Join,
  Rooms,
  Chat,
} from './containers';

import PrivateRoute from './PrivateRoutes';
import LoggedOutRoute from './LoggedOutRoutes';

function App() {
  return (
    <div className="App">
      <Router>
        <LoggedOutRoute exact path={Join_Url} component={Join} />
        <PrivateRoute exact path={Rooms_Url} component={Rooms} />
        <PrivateRoute exact path={Chat_Url} component={Chat} />
      </Router>
    </div>
  );
}

export default App;
