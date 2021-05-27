import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import FileUpload from './FileUpload';
import FileDisplay from './FileDisplay';
import FileList from './FileList';

import './App.css';
import Amplify, { Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import {API} from 'aws-amplify'


function App() {
  const [curState, setCurState] = useState({valid:false, fileInfo:[]});
  const [loading, setLoading] = useState(false);  
  const [greeting, setGreeting] = useState(null);
  
  // function to send api call 2
  async function fetchGreeting(){
    const apiData = await API.get('imgprocApi','/greeting')
    setGreeting(apiData.message)
  }
  
  useEffect( () => {fetchGreeting()},[])
  
  const uploader = async (fb) => {
      const file = fb;
      try {
        setLoading(true);
        // Upload the file to s3 with private access level. 
        await Storage.put('picture.jpg', file, {
          level: 'private',
          contentType: 'image/jpg'
        });
        alert("Image was uploaded to s3!");
        // Retrieve the uploaded file to display
        //const url = await Storage.get('picture.jpg', { level: 'private' })
        //setImageUrl(url);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
  }
  
  
  
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>{greeting}</h3>
        <FileUpload setter={setCurState} uploader={uploader} />
        <FileDisplay state={curState} />
        <FileList />
      </header>
      <AmplifySignOut />      
    </div>
  );
}

export default withAuthenticator(App);

