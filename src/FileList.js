import React, {useState, useEffect} from 'react';
import './App.css';
import Amplify, { Storage } from 'aws-amplify';


function FileList({files}){
    const [fileList, setFileList] = useState([]);
    const [fileUrl, setFileUrl] = useState([]);
    const [fileName, setFileName] = useState([]);
    
    const handleClick = () =>{
        
    }
    
    return (
        <div>
        <h3>Available Files {fileList.length}</h3>
        <div className = 'file-list'>
        {files.map(
            (file) => {
                <span className ='file-list-item'><button onClick={handleClick}>{file}</button></span>
            }   
            )
        }
        </div>
        </div>
        )        
    
    }
    
    
export default FileList;


