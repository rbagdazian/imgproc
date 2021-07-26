import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import Amplify, { Storage } from 'aws-amplify';
import {API} from 'aws-amplify'


function FileList({files, changer}){
    const [fileName, setFileName] = useState([]);
    const refX = useRef();
    
    var filesx = ["Select Desired Filename",...files];

    var fileListItems = files.map( 
        file => <option key={file} value={file} id={file}>{file}</option>
    );

    
    function handleChange(event){
        event.preventDefault();
        const fname = event.target.value;
        refX.current.value = fname;
        selectionChanged(fname);
    }
    
    function selectionChanged(fname){
        setFileName(fname);
        changer(fname);
    }
    
    let val=0;
    return (
        <div>
        {
            (fileListItems.length > 0) ?
            <div>
                <label  for='srcfile'>Available files: </label>
                <select id='srcfile' onChange={handleChange} ref={refX} >
                    {fileListItems}
                </select>
            </div>
            :
            <div className='small-font'>No files available.</div>
        }
        </div>
        )        
    
    }
    
    
export default FileList;


