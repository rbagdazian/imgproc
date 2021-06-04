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
            .then((res) => {setFileList(res); const fl0=res[0]; setFileName(fl0.key); Storage.get(fl0.key, {level: 'private' }).then(res2 => {setFileUrl(res2)})}) // get key from Storage.list
            .catch(err => console.log(err))
        }, []
        );
        
    return (
        <div>
        <h3>Available Files {fileList.length}</h3>
        <a href={fileUrl} target="_blank">{fileName}</a>
        {fileList.size}
        </div>
        )        
    
    }
    
    
export default FileList;


