import logo from './logo.svg';
import React, {useState, useEffect, useRef} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import FileUpload from './FileUpload';
import FileDisplay from './FileDisplay';
import FileList from './FileList';
import MouseImage from './MouseImage';
import ImgProcRequestButtons from './ImgProcRequestButtons';
import TextCommandBlock from './TextCommandBlock';
import SaveImage from './SaveImage';


import './App.css';
import { Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import {API, Auth} from 'aws-amplify'



function Home() {
  const [uploadInfo, setUploadInfo] = useState({isValid: false});
  const [curImageName, setCurImageName] =useState('');
  
  const [loading, setLoading] = useState(false);  

  const [imageNames, setImageNames] = useState([]);
  const [curImageInfo, setCurImageInfo] = useState({isValid: false});

  const [cmdNames, setCmdNames] = useState([]);


  const [showUpload, setShowUpload] = useState(false);
  const fileListRef = useRef();
  const [outputImgInfo, setOutputImgInfo] = useState({isValid:false});
  const [currentUserName, setCurrentUserName] = useState('');
  const [genImage, setGenImage] = useState(false);
  const [predictedLabel, setPredictedLabel] = useState('');
  const [modImageEnable, setModImageEnable] = useState(true);
  const [classImageEnable, setClassImageEnable] = useState(false);
  const [procImageEnable, setProcImageEnable] = useState(false);
  const [modeState, setModeState] = useState(1);
  const [modImageStyle, setModImageStyle] = useState('mod-button-enable');
  const [classImageStyle, setClassImageStyle] = useState('class-button-disable');
  const [procImageStyle, setProcImageStyle] = useState('proc-button-disable');
  const [cmdDir, setCmdDir] = useState('dir');
  const cmdTextRef = useRef();


  var remoteFiles = [];
  var userInfo;
  var userName;
  
  
async function getRemoteFiles(){
    try {
      userInfo = await Auth.currentUserInfo();
      userName = userInfo['username'];
      console.log('In Get current User is:');
      console.log(userName);
      setCurrentUserName(userName);
    }
    catch(error){
      console.log('error:');
      console.log(error);
      userInfo = [];
      userName = 'no user';
      setCurrentUserName('');
      return;
    }
    console.log('leaving getCurrentUser');  
    console.log('Requesting file names for user:'+userName);
    const response = await API.get('imageapi',encodeURI('/image?cmd=filenames&username='+userName));
    remoteFiles = response.message.files;

    let fm = [];
    let fc = [];
    var fn;

    for(fn in remoteFiles){
      if(remoteFiles[fn][0] =='input'){
        fn = remoteFiles[fn][1]
        fm.push(fn);
      }
    }
    

    for(fn in remoteFiles){
      if(remoteFiles[fn][0] =='cmd'){
        fn = remoteFiles[fn][1]
        fc.push(fn)
      }
    }


    const url = await Storage.get(userName+'/input/'+fm[0]);
    let newState = {isValid:true, fileInfo: 'input/'+fm[0], fileSrc: url}; 
    setImageNames(fm);
    setCurImageName(fm[0]);
    setCurImageInfo(newState);
    

    const url2 = await Storage.get(userName+'/cmd/'+fc[0]);
    let newState2 = {isValid:true, fileInfo: 'cmd/'+fc[0], fileSrc: url2}; 

    
    console.log('Image files');
    console.dir(fm);
    console.log('Command names:');
    console.dir(fc);
    console.log('-------------');
    setCmdNames(fc);


}


async  function delImageFile(e){
    e.preventDefault();
    const fname = curImageName;
    console.log('Deleting file names: input/'+ curImageName);
    await API.get('imageapi',encodeURI('/image?cmd=delete&file=input/'+curImageName))
      .then( updateRemoteFiles() );
  }
  

 async  function doTest(){
    console.log('in doTest');
    const response = await API.get('imageapi',encodeURI('/doTest?cmd=check1'));
    console.log(response.message);
    setImageNames(response.message);
  }
  
  async function changeImage(fname){
    const url = await Storage.get(currentUserName+'/input/'+fname)
    console.log("in ChangeImage remote url for image is: "+url);
    let newState = {isValid:true, fileInfo:fname, fileSrc: url};    
    console.log(newState);
    setCurImageName(fname);
    setCurImageInfo(newState);
    setShowUpload(false);
  }
  
  async function changeCmd(fname){
    const url = await Storage.get(currentUserName+'/cmd/'+fname)
    console.log("in ChangeCmd remote url for cmd is: ");
    console.dir(url);
    let newState = {isValid:true, fileInfo:fname, fileSrc: url};    
    console.log(newState);
    setShowUpload(false);
  }
  

  const updateRemoteFiles = async () => { setTimeout(getRemoteFiles, 5000) };
  //const updateImageNames = async () => {setTimeout(getImageFilenames, 5000) };
  //const updateCmdFilenames = async () => {setTimeout(getCmdFilenames, 5000) };

  useEffect( async () => {
         updateRemoteFiles()
      },
      [uploadInfo]);
      
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }  
  
  const uploader = async (newUploadInfo) => {
    
      // file info is contained in newUploadInfo.fileInfo
      setUploadInfo(newUploadInfo);
      setShowUpload(true);
      console.log('newUploadInfo in uploader:');
      console.dir(newUploadInfo)
      
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
        setCurImageName(filename);
      } catch (err) {
        console.log(err);
      }

  }
  
  const saveFile = async () => {
      const s3filename = currentUserName+'/output/'+curImageName;
      const s3url = await Storage.get(s3filename);
      const dloadName = 'out'+curImageName;
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
      console.log('current file: '+curImageName)
      const rqStr = '/image?cmd=fcn&func='+funcStr+'&'+'file='+currentUserName+'/input/'+curImageName
      console.log(rqStr)
      const response = await API.get('imageapi',encodeURI(rqStr));
      console.log(response.message);
      const url = await Storage.get(response.message)
      let newState = {isValid:true, fileInfo:response.message, fileSrc: url};
      setOutputImgInfo(newState);
    } 
    else{

      if(buttonId == 6){
        // here we process a request for an image classification via the api endpoint
        console.log('sending request for image classification');
        // here we will retrieve the specified input image from the s3 bucket
        const s3filename = currentUserName+'/input/'+curImageName;
        console.log('Get url for file:'+s3filename);
        const s3url = await Storage.get(s3filename);
        console.log('s3url= '+s3url);
        // now get the data from the remote
        const resp = await fetch(s3url);
        const ibuf = resp;
        const dvx = await resp.arrayBuffer().then(function(img){ return new Uint8Array(img) });
        //const base64String = btoa(String.fromCharCode(...new Uint8Array(img)));
        var base64Arraybuffer = require("base64-arraybuffer");
        const b64 = base64Arraybuffer.encode(dvx);
        
        console.log('--------------');
        console.log(b64.length);
        console.log('--------------');
        console.log(b64);
        console.log('--------------');
        
        const apiName = 'imageclass';
        const path = encodeURI('/classify_digit'); 
        const myInit = { // OPTIONAL
            headers: {
              'Accept': 'application/json',
              'Content-Type': '*/*',
            },
            body: b64
        };
  
        API.post(apiName, path, myInit)
        .then(response => {
          console.log("response =>"+response.predicted_label);
          setPredictedLabel(response.predicted_label);
        })
        .catch(error => {
          console.log("error resp =>"+error.response);
        });
      }
    }
  }
  
  
  
  const doModImageEnable = (e)=>{ setModImageEnable(true); setClassImageEnable(false); setProcImageEnable(false); setModeState(1);
                                  setModImageStyle('mod-button-enable'); setClassImageStyle('class-button-disable'); setProcImageStyle('proc-button-disable');
                                };
  const doClassImageEnable = (e)=>{ setModImageEnable(false); setClassImageEnable(true);  setProcImageEnable(false); setModeState(2);
                                  setModImageStyle('mod-button-disable'); setClassImageStyle('class-button-enable'); setProcImageStyle('proc-button-disable');
                                };
  const doProcImageEnable = (e)=>{ setModImageEnable(false); setClassImageEnable(false);  setProcImageEnable(true); setModeState(3);
                                  setModImageStyle('mod-button-disable'); setClassImageStyle('class-button-disable'); setProcImageStyle('proc-button-enable');
                                };
  
  const tsize = [45,7];
  
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className='small-font'> {currentUserName} </p>
      </header>  
      <body className="App-body">
        <FileUpload uploader={uploader}/>
        <FileDisplay state={uploadInfo} full={true} enable={showUpload} imgClass='file-display-img-sm' />
        <FileList files={imageNames} changer={changeImage} />        
        <form onSubmit={delImageFile}>
        <span className="cur-file-name">Current Input File : &nbsp;&nbsp;&nbsp; {curImageName} <input type="submit" value="Del" /> </span>            
        <FileDisplay state={curImageInfo} full={false} enable = {true} imgClass='file-display-img-large' />
        </form>
        {(classImageEnable) ?
            <span className='text-med'>The digit is: {predictedLabel} </span>
            :
            ' -- '
        }
        <div className='btn-controls'>
          <button className={modImageStyle} onClick={doModImageEnable}>Mod Image</button>
          <button className={classImageStyle} onClick={doClassImageEnable}>Class Image</button>
          <button className={procImageStyle} onClick={doProcImageEnable}>Process Image</button>
          {
            {
              1: 
                <div className="img-proc-request-buttons">
                  <ImgProcRequestButtons requestHandler={handleImgProcRequest} predLab={predictedLabel} buttonOption={classImageEnable} />
                  <FileDisplay state={outputImgInfo} full={false} enable ={true} imgClass='file-display-img-large' />
                  <SaveImage saver={saveFile} />
                </div> ,
              2: 
                <div className="img-proc-request-buttons">
                  <ImgProcRequestButtons requestHandler={handleImgProcRequest} predLab={predictedLabel} buttonOption={classImageEnable} />
                  <MouseImage />
                </div>
                ,
              3:
                <div className="proc-img-block">
                  <TextCommandBlock blockStyle='text-command-block' currentUser={currentUserName} cmdNames={cmdNames} dirname={cmdDir} rowcol={tsize} addButton={[]} tref={cmdTextRef} />
                </div>
              
            }[modeState]
          }
        </div>
      </body>
      <AmplifySignOut />    
    </div>
  );
}

export default Home;

