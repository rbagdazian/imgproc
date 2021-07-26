import React, {useRef, useEffect, useState} from  'react';
import { Storage } from 'aws-amplify';
import FileList from './FileList';
import './App.css'

function TextCommandBlock({currentUser, cmdNames}) {
    const textRef = useRef();
    const cmdRef = useRef();
    const [cNameOptions, setCNameOptions] = useState([]);
    const [fileContents, setFileContents] = useState('Howdy');
    
  useEffect( () => {
        var fileListItems = cmdNames.map( 
            file => <option key={file} value={file} id={file}>{file}</option>
        );      
        setCNameOptions(fileListItems);
        console.log('tcb in useeffect, cmdnames being set');
        console.dir(fileListItems);
      },  );  /* [fileContents] */
    
    function loadFile(event){
        console.log(cmdRef.current.value);
        const fname = cmdRef.current.value;
        fetchFile(currentUser, fname ); 
    }
    
    function saveFile(event){
        const fileName=prompt("Enter a name for the command block:"); 
        console.log(textRef.current.value);
        const cmdText = textRef.current.value;
        uploadFile(currentUser, fileName, cmdText);
    }
    
    function delFile(event){
        
    }
    
    
 const uploadFile = async (currentUser, fname, textv) => {
    
      // file info is contained in newUploadInfo.fileInfo

      const filename = currentUser +'/cmd/'+ fname;
      console.log('attempting to upload :'+filename);
      try {

        const result = await Storage.put(filename, textv, {
            contentType: 'text/plain'
        });
        
        console.dir(result);
        
      } catch (err) {
        console.log(err);
      }
  }
  
  async function fetchFile(currentUser, fname){
        const filename = currentUser + '/cmd/'+ fname;
        console.log('attempting to fetch file:'+filename);
        const config = {download:true};
        var retVal;
        await Storage.get(filename, config)
            .then(response => response.Body.text())
            .then(resp2 => setFileContents(resp2)) ;
        }

    function handleChange(event){
        event.preventDefault();
        console.log('the current command file by ref is:');
        console.log(cmdRef.current.value);
        const fname = cmdRef.current.value;
    }
    
    //             <label className = 'mid-font' for="cmdtxt">Command Text:</label>  rows="10" cols="50" 


    const handleTextChange = (event) => {
        //setFileContents(event.target.value);
        console.log(event.target.value);
    };
        

    return ( 
        <div className='text-command-block'>
            <div>
            {
                (cNameOptions.length > 0) ?
                <div  >
                    <label for="cmdfilename">Available cmd files: </label>
                    <select  id="cmdfilename" onChange={handleTextChange}  ref={cmdRef} >
                        {cNameOptions}
                    </select>
                </div> 
                :
                <div className='small-font'>
                    No cmd files available.
                </div>
            }
            </div>
            <div>
                <textarea className='cmd-text' id="cmdtxt" name="cmdtxt"  ref={textRef} value={fileContents} onChange={handleTextChange}   cols="45" rows="7" />
                <div className='sidebar2'>
                <button onClick={loadFile}>Load File</button>
                <button onClick={saveFile}>Save File</button>
                <button onClick={delFile}>Delete File</button>
                </div>
            </div>
        </div>
    );
}

export default TextCommandBlock;