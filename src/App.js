import logo from './logo.svg';
import React, {useState, useEffect, useRef, Component} from 'react';
import FileUpload from './FileUpload';
import FileDisplay from './FileDisplay';
import FileList from './FileList';
import ImgProcRequestButtons from './ImgProcRequestButtons';
import SaveImage from './SaveImage';
import UserInfo from './UserInfo';

import './App.css';
import Amplify, { Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import {API, Auth} from 'aws-amplify'



function App() {
  const [uploadInfo, setUploadInfo] = useState({isValid: false});
  const [curFileName, setCurFileName] =useState('');
  const [loading, setLoading] = useState(false);  
  const [filenames, setFilenames] = useState([]);
  const [curFileInfo, setCurFileInfo] = useState({isValid: false});
  const [showUpload, setShowUpload] = useState(false);
  const fileListRef = useRef();
  const [outputImgInfo, setOutputImgInfo] = useState({isValid:false});
  const [currentUserName, setCurrentUserName] = useState('');

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
    const userInfo = await Auth.currentUserInfo();
    const userName = userInfo['username'];
    setCurrentUserName(userName);
    console.log('Requesting file names for user:'+userName);
    const response = await API.get('imageapi',encodeURI('/image?cmd=filenames&username='+userName));
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
    const url = await Storage.get(userName+'/input/'+fm[0]);
    let newState = {isValid:true, fileInfo: 'input/'+fm[0], fileSrc: url}; 
    setFilenames(fm);
    setCurFileName(fm[0]);
    setCurFileInfo(newState);
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
  
  async function changeFile(fname){
    const url = await Storage.get(currentUserName+'/input/'+fname)
    console.log("in ChangeFile remote url for image is: "+url);
    let newState = {isValid:true, fileInfo:fname, fileSrc: url};    
    console.log(newState);
    setCurFileName(fname);
    setCurFileInfo(newState);
    setShowUpload(false);
  }
  
  const updateFileNames = () =>{ setTimeout(getFilenames, 1000); };
  
  useEffect( () => {updateFileNames()},[uploadInfo]);
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }  
  
  const uploader = async (newUploadInfo) => {
    
      // file info is contained in newUploadInfo.fileInfo
      setUploadInfo(newUploadInfo);
      setShowUpload(true);
      console.log('CurrentState in uploader:');
      console.log(newUploadInfo);
      console.log('attempting to load:'+currentUserName+'/input/'+newUploadInfo.fileInfo.name);
      const filename = currentUserName+'/input/'+newUploadInfo.fileInfo.name;
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
        setLoading(false);
        setCurFileName(filename);
      } catch (err) {
        console.log(err);
      }

  }
  
  const saveFile = async () => {
      const s3filename = currentUserName+'/output/'+curFileName;
      const s3url = await Storage.get(s3filename);
      const dloadName = 'out'+curFileName;
      download(s3url,dloadName);
    };
  

  const download = (url, dloadName) => {
    fetch(url)
      .then(response => {
        response.arrayBuffer().then(function(buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", dloadName); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  
      
  async function handleImgProcRequest(buttonId){
    console.log('in handleImgProcRequest')
    const funcDict={
      1: 'negate',
      2: 'mono',
      3: 'gaussian',
      4: 'edge',
      5: 'unsharp',
      6: 'imgclass'
    }
    const funcStr = funcDict[buttonId]
    console.log('process request for:'+funcStr)
    if (buttonId < 6){
      console.log('current user is:'+currentUserName)
      console.log('current file: '+curFileName)
      const rqStr = '/image?cmd=fcn&func='+funcStr+'&'+'file='+currentUserName+'/input/'+curFileName
      console.log(rqStr)
      const response = await API.get('imageapi',encodeURI(rqStr));
      console.log(response.message);
      const url = await Storage.get(response.message)
      let newState = {isValid:true, fileInfo:response.message, fileSrc: url};
      setOutputImgInfo(newState);
    }
    else{
      // here we process a request for an image classification via the api endpoint
      console.log('sending request for image classification');
      const response = await fetch("https://zr84qort75.execute-api.us-east-1.amazonaws.com/Prod/classify_digit", {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: "iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAAAAABXZoBIAAABQGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGDiSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8rAyCDLIMQgxsCZmFxc4BgQ4ANUwgCjUcG3a0DVQHBZF2TWwmPutxO7FLa+827S7Tlpdx1TPQrgSkktTgbSf4A4IbmgqISBgTEGyFYuLykAsRuAbJEioKOA7CkgdjqEvQLEToKw94DVhAQ5A9kXgGyB5IzEFCD7AZCtk4Qkno7EhtoLAmxhwUYmFgQcSiooSa0oAdHO+QWVRZnpGSUKjsDQSVXwzEvW01EwMjAyZGAAhTVE9ecb4DBkFONAiMVeYmDQnwjyN0IsX5yB4RAHAwNPMUJM8w0DA18aA8NRtYLEokS4Axi/sRSnGRtB2NzbGRhYp/3//zmcgYFdk4Hh7/X//39v////7zIGBuZbDAwHvgEAq4heIf06wrwAAABWZVhJZk1NACoAAAAIAAGHaQAEAAAAAQAAABoAAAAAAAOShgAHAAAAEgAAAESgAgAEAAAAAQAAAH+gAwAEAAAAAQAAAIQAAAAAQVNDSUkAAABTY3JlZW5zaG90j9MWGwAAAYpJREFUeJy1kM0rRGEUxp/7uu64w+iaQphp8jHlIwkhH8lIaiQLZSE2NpKtZGHh35CUP8AWOwuKQkwmmUz5GLIRjTAxd65zLG5j7h2WnN3p1/Oc3/sC/zLSryv/gPkurX+SAYjr5V0AgJxG7qa+msL6KgBAsxB7KWvf7F5cJ2ZmMgxKrJVbk1LKo3E0LFNOpV8lZ5lqhbQtPB+XEcHCt9AiP4Sf7KK5eQ4BAOVbST6ZtAshZSqUDFXKiEWyIABI3oa+gFfQ0bEdiqJiJxUPD3vlz9uzU9igozHQVWFodcT0tLp+Y+/zbySIiJnJOBjIgT1J7x+cgiSRQ2npCT/YIMcWe5MxBucOzmiKyEoa0Rs2GMD9uMbIgoBuHvcpGROzQa0rMFelf8GdgTIA1T/WNH8BQHK3z3UrZJAF+pcCeSNXBCrtbKuVzrc3ny1Qay3Sp97BcHmcr0crh/d6+vUAqqeDjQBAby/R/d0d/fumBEAuDU50qI+34avHi1Dc+m+mbdtoWSQUumP80XwBdwyOoPfHcDkAAAAASUVORK5CYII="
      });
      console.log(response);
      //response.json().then(data => {
      //  console.log(data);
      //});        
    }
  }
  
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className='small-font'> {currentUserName} </p>
      </header>  
      <body className="App-body">
        <FileUpload uploader={uploader}/>
        <FileDisplay state={uploadInfo} full={true} enable={showUpload} imgClass='file-display-img-sm' />
        <table>
        <tbody>
        <tr>
          <td><FileList files={filenames} changer={changeFile} refx={fileListRef} /></td>
        </tr>
        </tbody>
        </table>
        <form onSubmit={delFile}>
        <span className="cur-file-name">Current Input File : &nbsp;&nbsp;&nbsp; {curFileName} <input type="submit" value="Del" /> </span>            
        <FileDisplay state={curFileInfo} full={false} enable = {true} imgClass='file-display-img-large' />
        </form>
        <ImgProcRequestButtons requestHandler={handleImgProcRequest} />
        <FileDisplay state={outputImgInfo} full={false} enable ={true} imgClass='file-display-img-large' />
        <SaveImage saver={saveFile} />
        <br />
      </body>
      <AmplifySignOut />      
    </div>
  );
}

export default withAuthenticator(App);

