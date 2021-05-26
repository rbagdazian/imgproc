import React, {useState, useEffect} from 'react';
import './App.css';
import Amplify, { Storage } from 'aws-amplify';


function FileList(){
    const [fileList, setFileList] = useState([]);
    
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
        
    return (
        <div>
        <h3>Available Files</h3>
        <ul className="file-list">
        {fileList.map(file => (
            <li className="file-name">{file.key}</li>
        ))}
        </ul>        
        </div>
        )        
    
    }
    
    
export default FileList;


