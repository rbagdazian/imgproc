import React, {useState, useEffect} from 'react';
import './App.css';
import Amplify, { Storage } from 'aws-amplify';


function FileList(){
    const [fileList, setFileList] = useState([]);
    const [fileUrl, setFileUrl] = useState([]);
    const [fileName, setFileName] = useState([]);
    
    useEffect(
        () => {
            Storage.list('', { level: 'private' })
            .then((fileList) => {const fl0=fileList[0]; setFileName(fl0.key); Storage.get(fl0.key, {level: 'private' }).then(res => {setFileUrl(res)})}) // get key from Storage.list
            .catch(err => console.log(err))
        }, []
        );
        
    return (
        <div>
        <h3>Available Files</h3>
        <a href={fileUrl} target="_blank">{fileName}</a>
        </div>
        )        
    
    }
    
    
export default FileList;


