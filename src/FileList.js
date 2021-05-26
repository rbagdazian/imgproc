import React, {useState, useEffect} from 'react';
import './App.css';
import Amplify, { Storage } from 'aws-amplify';


function FileList(){
    const [fileList, setFileList] = useState([]);
    const [fileUrls, setFileUrls] = useState([]);
    
    function  getImg(fileKey){
        const signedURL = Storage.get(fileKey); // get key from Storage.list
        setFileUrls(signedURL => [ {...fileUrls, signedURL } ])
    }


    useEffect(
        () => {
            Storage.list('', { level: 'private' })
            .then(res =>setFileList(res))
            .catch(err => console.log(err))
        }, [setFileList]
        );
        
        
    return (
        <div>
        <h3>Available Files</h3>
        <ul className="file-list">
        {fileList.map(file => (
            <button  onClick={getImg(file.key)}>{file.key}</button>
        ))}
        </ul> 
        </div>
        )        
    
    }
    
    
export default FileList;


