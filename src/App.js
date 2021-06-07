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
  const [filenames, setFilenames] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  
  // function to send api call 2
  async function fetchGreeting(){
    console.log('in fetchGreeting');
    const response = await API.get('imageapi',encodeURI('/greeting?cmd=filenames'));
    console.log(response.message);
    setFilenames(response.message);
  }

 async  function cp1(){
    const response = await API.get('imageapi',encodeURI('/image?cmd=check1'));
    console.log(response.message);
    setFilenames(response.message);
  }
  
async  function cp2(){
    const response = await API.get('imageapi',encodeURI('/image?cmd=check2'));
    console.log(response.message);
    setFilenames(response.message);
  }  
  
async  function cp3(){
    const response = await API.get('imageapi',encodeURI('/image?cmd=check3'));
    console.log(response.message);
    setFilenames(response.message);
  }  
  
async  function cp4(){
    const response = await API.get('imageapi',encodeURI('/image?cmd=check4'));
    console.log(response.message);
    setFilenames(response.message);
  }    

async  function getFilenames(){
    const response = await API.get('imageapi',encodeURI('/image?cmd=filenames'));
    console.log(response.message);
    setFilenames(response.message);
  }    

 async  function doTest(){
    console.log('in doTest');
    const response = await API.get('imageapi',encodeURI('/doTest?cmd=check1'));
    console.log(response.message);
    setFilenames(response.message);
  }

  
  //useEffect( () => {fetchGreeting()},[])
  
  const uploader = async (fb) => {
      const file = fb;
      const filename = curState.fileInfo.name;
      try {
        setLoading(true);
        // Upload the file to s3 with private access level. 

        await Storage.put(filename, file);
        
        alert("Image was uploaded to s3!"+ filename);
        // Retrieve the uploaded file to display
        const url = await Storage.get(filename)
        setImageUrl(url);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {filenames}
        <FileUpload setter={setCurState} uploader={uploader} />
        <FileDisplay state={curState} />

        <div>---------------------------------</div>
        <table>
        <tr>
        <td><button onClick={fetchGreeting}>Get Greeting</button></td>
        <td><button onClick={cp1}>Checkpoint 1</button></td>
        <td><button onClick={cp2}>Checkpoint 2</button></td>
        <td><button onClick={cp3}>Checkpoint 3</button></td>
        <td><button onClick={cp4}>Checkpoint 4</button></td>
        <td><button onClick={filenames}>Filenames</button></td>
        </tr>
        </table>
      </header>
      <AmplifySignOut />      
    </div>
  );
}

export default withAuthenticator(App);

