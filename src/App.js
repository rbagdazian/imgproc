import logo from './logo.svg';
import React, {useState, useEffect, useRef} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import {API, Auth} from 'aws-amplify';

import Home from './Home';
import Lisp from './Lisp/Lisp';

  
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/lisp">Lisp</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/lisp">
            <Lisp />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default withAuthenticator(App);

