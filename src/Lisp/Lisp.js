import logo from '../logo.svg';
import React, {useState, useEffect, useRef} from 'react';
import TextCommandBlock from '../TextCommandBlock';
import {API, Auth, Storage} from 'aws-amplify'
import '../App.js'
import lispEngine from './lispEngine';

function Lisp(){
  const [curLispName, setCurLispName] =useState('');
  const [lispNames, setLispNames] = useState([]);
  const [curLispInfo, setCurLispInfo] = useState({isValid: false});
  const [currentUserName, setCurrentUserName] = useState('');
  const [lispDir, setLispDir] = useState('lisp');
  const [lispOutput, setLispOutput] = useState('Output');
  const lispInputRef = useRef();
  const lispOutputRef = useRef();
  
    
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
    console.dir(remoteFiles);

    let fm = [];
    let fc = [];
    var fn;

    for(fn in remoteFiles){
      if(remoteFiles[fn][0] =='lisp'){
        fn = remoteFiles[fn][1]
        fm.push(fn);
      }
    }


    const url = await Storage.get(userName+'/lisp/'+fm[0]);
    let newState = {isValid:true, fileInfo: 'lisp/'+fm[0], fileSrc: url}; 
    setLispNames(fm);
    setCurLispName(fm[0]);
    setCurLispInfo(newState);
    
    const url2 = await Storage.get(userName+'/cmd/'+fc[0]);
    let newState2 = {isValid:true, fileInfo: 'cmd/'+fc[0], fileSrc: url2}; 

    console.log('Lisp files');
    console.dir(fm);

    }

    
    const updateRemoteFiles = async () => { setTimeout(getRemoteFiles, 5000) };
    //const updateImageNames = async () => {setTimeout(getImageFilenames, 5000) };
    //const updateCmdFilenames = async () => {setTimeout(getCmdFilenames, 5000) };
    
    useEffect( async () => {
         updateRemoteFiles()
      },
      []);
      
    
    function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    } 
    
  
    const tsize = [80,32];
    
    
    function bClick(event){
        console.log('->button click');
        console.dir(event.target.id);
        switch (event.target.id) {
            case "Eval":
                // here we should fetch the contents of the text block
                // assign it to an input stream
                // then pass the stream to the lisp engine
                console.log('ready to lisp!');
                var inputText = lispInputRef.current.value;
                console.log(inputText);
                var outputText = lispEngine(inputText);
                lispOutputRef.current.value = outputText;
                break;
            default:
                console.log('unknown click source:');
                console.log(event.target.id);
                break;
        }
    }
    
    
    return(
        <div className="proc-img-block">
          <TextCommandBlock blockStyle = 'lisp-block' currentUser={currentUserName} cmdNames={lispNames} dirname={lispDir} rowcol={tsize} addButton={['Eval']} buttonClick={bClick} tref={lispInputRef}/>
          <textarea className='lisp-output' id="lispOutput" name="lispOutput"  ref={lispOutputRef} value={lispOutput} cols={tsize[0]} rows={tsize[1]} />
        </div>        
    );
}

export default Lisp;