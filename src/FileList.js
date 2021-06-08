import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import Amplify, { Storage } from 'aws-amplify';
import {API} from 'aws-amplify'


function FileList({files}, {selector}){
    const [fileList, setFileList] = useState([]);
    const [fileUrl, setFileUrl] = useState([]);
    const [fileName, setFileName] = useState([]);
    
    async  function delFile(fname){
        console.log('Deleting file names'+ fname);
        const response = await API.get('imageapi',encodeURI('/image?cmd=delete&file='+fname));
        console.log(response.message);
      }

    let fileListItems = files.map( 
            file => <option key={file} value={file}>{file}</option>
    );
    
    function handleChange(event){
        alert('change detected:'+event.target.value)
        setFileName(event.target.value);
    }
    
    function handleSubmit(event){
        alert('del was pressed: '+fileName);
        delFile(fileName);
        event.preventDefault();
    }

    let val=0;
    return (
        <div>
        {fileListItems.length > 0 ? (
        <form onSubmit={handleSubmit}>
            <label for="srcfile">Choose the input file: </label>
            <select id="srcfile" onChange={handleChange}>
                {fileListItems}
            </select>
            <span>  </span>
            <input type="submit" value="Del" />            
        </form>
        ) : '' 
        }
        </div>
        )        
    
    }
    
    
export default FileList;


