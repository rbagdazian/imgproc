import React, {useState, useEffect} from 'react';
import './App.css';
import Amplify, { Storage } from 'aws-amplify';


function FileList(){
    const [fileList, setFileList] = useState([]);
    const [fileUrls, setFileUrls] = useState([]);
    
    useEffect(
        () => {
            Storage.list('', { level: 'private' })
            .then(result => {
                setFileList(result);
                console.log("files: ");
                console.log(result);
                })
            .catch(err => console.log(err))
        }, []
        );
        
    function  getImg(fileKey){
        const signedURL = Storage.get(fileKey); // get key from Storage.list
        setFileUrls(signedURL => fileUrls.append(signedURL));
    }
        
    return (
        <div>
        <h3>Available Files</h3>
        <ul className="file-list">
        {fileList.map(file => (
            <a  onClick={getImg(file.key)}>{file.key}</a>
        ))}
        </ul> 
        {fileUrls.map(fileUrl => (
            <img src={fileUrl} alt='' />
        ))}
        </div>
        )        
    
    }
    
    
export default FileList;


