import logo from './logo.svg';
import React, {useState} from 'react';
import FileUpload from './FileUpload';
import FileDisplay from './FileDisplay';

import './App.css';
import Amplify, { Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'


function App() {
  const [curState, setCurState] = useState({valid:false, fileInfo:[]});
  const [loading, setLoading] = useState(false);  
  
  const downloadUrl = async () => {
    // Creates download url that expires in 5 minutes/ 300 seconds
    const downloadUrl = await Storage.get('picture.jpg', { expires: 300 });
    window.location.href = downloadUrl
  }
  
  
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

