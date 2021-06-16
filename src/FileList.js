import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import Amplify, { Storage } from 'aws-amplify';
import {API} from 'aws-amplify'


function FileList({files, changer, refx}){
    const [fileName, setFileName] = useState([]);
    //const selectionRef = useRef();
    

    let fileListItems = files.map( 
        file => <option key={file} value={file}>{file}</option>
    );
    
    function handleChange(event){
        const fname = event.target.value;
        selectionChanged(fname);
    }
    
    function selectionChanged(fname){
        setFileName(fname);
        changer(fname);
    }
    
    // first time only 
    //useEffect( () => {console.log('useEffect-> '+fileName); selectionChanged(fileName)}, [selectionRef] );

    
    let val=0;
    return (
        <div>
        {fileListItems.length > 0 ? (
        <>
        <label className="input-file-label" for="srcfile">Available files: </label>
        <select id="srcfile" onChange={handleChange} ref={refx} >
            {fileListItems}
        </select>
        </>
        ) : '' 
        }
        </div>
        )        
    
    }
    
    
export default FileList;


