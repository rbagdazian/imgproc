import React, {useState, useEffect} from 'react';
import './App.css';
import Amplify, { Storage } from 'aws-amplify';


function FileList(){
    const [fileList, setFileList] = useState([]);
    const [fileUrl, setFileUrl] = useState([]);
    
    useEffect(
        () => {
            Storage.list('', { level: 'private' })
            .then((fileList) => {const fl0=fileList[0]; Storage.get(fl0.key).then(res => {setFileUrl(res)})}) // get key from Storage.list
            .catch(err => console.log(err))
        }, [setFileList]
        );
        
    return (
        <div>
        <h3>Available Files</h3>
        <img src={fileUrl} alt='' />
        </div>
        )        
    
    }
    
    
export default FileList;


