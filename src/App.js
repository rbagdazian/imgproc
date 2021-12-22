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

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default withAuthenticator(App);

