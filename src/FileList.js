import React, {useState, useEffect} from 'react';
import './App.css';
import Amplify, { Storage } from 'aws-amplify';


function FileList({files}){
    const [fileList, setFileList] = useState([]);
    const [fileUrl, setFileUrl] = useState([]);
    const [fileName, setFileName] = useState([]);
    
    const handleClick = () =>{
        
    }
    

    let val=0;
    return (
        <div>
        <h3>Available Files {fileList.length}</h3>
        <div className = 'file-list'>
        <select id="fileset">
        {files.map(
            (file) => {
                <option key={file} value={file}>{file}</option>
            }  
            )
        }
        </select>
        </div>
        </div>
        )        
    
    }
    
    
export default FileList;


