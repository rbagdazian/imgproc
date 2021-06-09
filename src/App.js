import logo from './logo.svg';
import React, {useState, useEffect, useRef} from 'react';
import FileUpload from './FileUpload';
import FileDisplay from './FileDisplay';
import FileList from './FileList';
import ImgProcRequestButtons from './ImgProcRequestButtons';

import './App.css';
import Amplify, { Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import {API} from 'aws-amplify'



function App() {
  const [uploadInfo, setUploadInfo] = useState({isValid: false});
  const [curFileName, setCurFileName] =useState('');
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
    console.log('Requesting file names:');
    const response = await API.get('imageapi',encodeURI('/image?cmd=filenames'));
    const rm = response.message.slice(1,-1);
    const ra = rm.split(',');
    console.log('response message is:');
    console.log(response.message);
    const jss = JSON.parse(response.message);
    console.log('parsed json string is:');
    console.log(jss);
    console.log('remote file names returned are:');
    console.log(ra);
    let fm = [];
    for(var fn in ra){
      console.log(fn+' '+ra[fn]);
      let nfn = ra[fn][1].trim().slice(1,-1);
      fm.push(nfn);
    }
    console.log(ra);
    console.log('-----------------------------');
    console.log(fm);
    setFilenames(fm);
    setCurFileName(fm[0]);
  }
  
async  function delFile(){
    const fname = curFileName;
    //console.log('Deleting file names'+ fname);
    const response = await API.get('imageapi',encodeURI('/image?cmd=delete&file='+fname));
    updateFileNames();
    //console.log('response was:'+response.message);
  }
  

 async  function doTest(){
    console.log('in doTest');
    const response = await API.get('imageapi',encodeURI('/doTest?cmd=check1'));
    console.log(response.message);
    setFilenames(response.message);
  }
  
  function srcFileSelector(theRef){
    console.log(theRef);
  }
  
  function changeFile(fname){
    setCurFileName(fname);
  }
  
  const updateFileNames = () =>{ setTimeout(getFilenames, 1000); };
  
  useEffect( () => {updateFileNames()},[uploadInfo]);
  
  const uploader = async (newUploadInfo) => {
      setUploadInfo(newUploadInfo);
      console.log('CurrentState in uploader:');
      console.log(newUploadInfo);
      
      const filename = 'input/'+newUploadInfo.fileInfo.name;
      const fileBlob = newUploadInfo.fileSrc;
      console.log('filename =');
      console.log(filename);
      try {
        setLoading(true);
        // Upload the file to s3 with private access level. 

        await Storage.put(filename, fileBlob);
        
        // Retrieve the uploaded file to display
        const url = await Storage.get(filename)
        console.log("remote url for image is: "+url);
        setImageUrl(url);
        setLoading(false);
        setCurFileName(filename);
      } catch (err) {
        console.log(err);
      }

  }
  
  function handleImgProcRequest(buttonId){
    console.log('Received image proc request:'+buttonId);
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>  
      <body className="App-body">
        <FileUpload uploader={uploader}/>
        <FileDisplay state={uploadInfo} />
        <table>
        <tbody>
        <tr>
          <td><FileList files={filenames} changer={changeFile} deleter={delFile} /></td>
        </tr>
        </tbody>
        </table>
        <form onSubmit={delFile}>
        <span className="cur-file-name">Current Input File: &nbsp;&nbsp; {curFileName} <input type="submit" value="Del" /> </span>            
        </form>
        <ImgProcRequestButtons requestHandler={handleImgProcRequest} />
        <br />
      </body>
      <AmplifySignOut />      
    </div>
  );
}

export default withAuthenticator(App);

