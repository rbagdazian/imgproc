import logo from './logo.svg';
import React, {useState} from 'react';
import FileUpload from './FileUpload';
import FileDisplay from './FileDisplay';

import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'


function App() {
  const [curState, setCurState] = useState({valid:false, fileInfo:[]});
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <FileUpload setter={setCurState} />
        <FileDisplay state={curState} />
      </header>
      <AmplifySignOut />      
    </div>
  );
}

export default withAuthenticator(App);

