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
    const rm = response.message.files;
    console.log(rm);

    let fm = [];
    
    for(var fn in rm){
        console.log(fn);
        console.log(rm[fn][0]);
        if(rm[fn][0] =='input'){
          fn = rm[fn][1]
          console.log('have input file:'+ fn )
          fm.push(fn)
        }
        
//      console.log(fn+' '+ra[fn]);
//      let nfn = ra[fn][1].trim().slice(1,-1);
//      fm.push(nfn);
    }
    console.log(fm);
    setFilenames(fm);
    setCurFileName(fm[0]);
  }
  
async  function delFile(e){
    e.preventDefault();
    const fname = curFileName;
    console.log('Deleting file names: input/'+ curFileName);
    const response = await API.get('imageapi',encodeURI('/image?cmd=delete&file=input/'+curFileName));
    console.log('response was:'+response.message);
    updateFileNames();
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
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }  
  
  const uploader = async (newUploadInfo) => {
    
      // file info is contained in newUploadInfo.fileInfo
      setUploadInfo(newUploadInfo);
      console.log('CurrentState in uploader:');
      console.log(newUploadInfo);
      
      const filename = 'input/'+newUploadInfo.fileInfo.name;
      const file = newUploadInfo.fileInfo;
      console.log('filename =' + filename);
      console.log(file);
      try {
        setLoading(true);
		    console.log('-----------------');
		    console.log(Object.keys(file));
		    console.log('-----------------');

        await Storage.put(filename, file );
        
        // Retrieve the uploaded file to display
        const url = await Storage.get(filename);
        console.log("remote url for image is: "+url);
        setImageUrl(url);
        setLoading(false);
        setCurFileName(filename);
      } catch (err) {
        console.log(err);
      }

  }
  
  async function handleImgProcRequest(buttonId){
    console.log('in handleImgProcRequest')
    const funcDict={
      1: 'negate',
      2: 'LPF',
      3: 'UNSHARP',
      4: 'SOBEL_ED',
      5: 'GAUSS_ED'
    }
    const funcStr = funcDict[buttonId]
    console.log('process request for:'+funcStr)
    console.log('current file: '+curFileName)
    const rqStr = '/image?cmd=fcn&func='+funcStr+'&'+'file=input/'+curFileName
    console.log(rqStr)
    const response = await API.get('imageapi',encodeURI(rqStr));
    console.log(response.message);
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
          <td><FileList files={filenames} changer={changeFile} /></td>
        </tr>
        </tbody>
        </table>
        <form onSubmit={delFile}>
        <span className="cur-file-name">Current Input File: &nbsp;&nbsp;&nbsp; {curFileName} <input type="submit" value="Del" /> </span>            
        </form>
        <ImgProcRequestButtons requestHandler={handleImgProcRequest} />
        <br />
      </body>
      <AmplifySignOut />      
    </div>
  );
}

export default withAuthenticator(App);

