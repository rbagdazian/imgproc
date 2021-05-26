import React, {useState, useEffect} from 'react';
import './App.css';
import Amplify, { Storage } from 'aws-amplify';


function FileList(){
    const [fileList, setFileList] = useState([]);
    
    useEffect(
        Storage.list('', { level: 'private' })
            .then(result => setFileList(result))
            .catch(err => console.log(err)), []
        );
        
    return (
        <div>
        <h2>Available Files</h2>
        <ul className="file-list">
        {fileList.map(file => (
            <li className="file-name">{file.name}</li>
        ))}
        </ul>        
        </div>
        )        
    
    }


