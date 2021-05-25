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
  }
  
  
  
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <FileUpload setter={setCurState} uploader={uploader} />
        <FileDisplay state={curState} />
      </header>
      <AmplifySignOut />      
    </div>
  );
}

export default withAuthenticator(App);

