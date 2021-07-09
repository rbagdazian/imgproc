import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import Amplify, { Storage } from 'aws-amplify';
import {API} from 'aws-amplify'


function FileList({files, changer}){
    const [fileName, setFileName] = useState([]);
    const refx = useRef();
    
    var filesx = ["Select Desired Filename",...files];

    var fileListItems = files.map( 
        file => <option key={file} value={file} id={file}>{file}</option>
    );

    
    function handleChange(event){
        event.preventDefault();
        const fname = event.target.value;
        selectionChanged(fname);
        refx.current.value = fname;
    }
    
    function selectionChanged(fname){
        setFileName(fname);
        changer(fname);
    }
    
    function foo(){
            //<label className="input-file-label" for="srcfile">Available files: </label>
            //<select id="srcfile" onChange={handleChange} onClick={()=>{refx.current.value='';}}  ref={refx} >
            //<select name="srcfile" onChange={handleChange} ref={refx} >
            //    {fileListItems}
            //</select>
            //</>
    }
    

    
    let val=0;
    console.log(fileListItems);
    return (
        <div>
        {
            (fileListItems.length > 0) ?
            <>
            <label className="input-file-label" for="srcfile">Available files: </label>
            <select id="srcfile" onChange={handleChange}  ref={refx} >
                {fileListItems}
            </select>
            </> 
            :
            ''
        }
        </div>
        )        
    
    }
    
    
export default FileList;


