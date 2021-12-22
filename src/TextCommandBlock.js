import React, {useRef, useEffect, useState} from  'react';
import { Storage } from 'aws-amplify';
import FileList from './FileList';
import './App.css'

function TextCommandBlock({blockStyle, currentUser, cmdNames, dirname, rowcol, addButton, buttonClick, tref, tChange}) {
    const cmdRef = useRef();
    const [cNameOptions, setCNameOptions] = useState([]);
    const [fileContents, setFileContents] = useState('Howdy');
    const [lDirname,setLDirname] = useState('');
    
  useEffect( () => {
        var fileListItems = cmdNames.map( 
            file => <option key={file} value={file} id={file}>{file}</option>
        );      
        setCNameOptions(fileListItems);
        setLDirname(dirname);
        console.log('tcb in useeffect, cmdnames being set');
        console.log(dirname);
        console.log('-----');
        console.dir(fileListItems);
      }, [cmdNames, dirname]  );  /* [fileContents] */
    
    function loadFile(event){
        console.log(cmdRef.current.value);
        const fname = cmdRef.current.value;
        fetchFile(currentUser, fname ); 
    }
    
    function saveFile(event){
        const fileName=prompt("Enter a name for the command block:"); 
        console.log(tref.current.value);
        const cmdText = tref.current.value;
        uploadFile(currentUser, fileName, cmdText);
    }
    
    function delFile(event){
        
    }
    
    
 const uploadFile = async (currentUser, fname, textv) => {
    
      // file info is contained in newUploadInfo.fileInfo

      const filename = currentUser +'/'+ lDirname +'/'+ fname;
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
        const filename = currentUser + '/'+lDirname+'/'+ fname;
        console.log('attempting to fetch file:'+filename);
        const config = {download:true};
        var retVal;
        await Storage.get(filename, config)
            .then(response => response.Body.text())
            .then(resp2 => setFileContents(resp2)) ;
        }

    function handleChange(event){
        event.preventDefault();
        console.log('the current file by ref is:');
        console.log(cmdRef.current.value);
        const fname = cmdRef.current.value;
    }
    
    //             <label className = 'mid-font' for="cmdtxt">Command Text:</label>  rows="10" cols="50" 


    const handleCmdChange = (event) => {
        //setFileContents(event.target.value);
        console.log(event.target.value);
    };
    
    const handleTextChange = (event) => {
        event.preventDefault();

        var curText = tref.current.value;
        if(event.keyCode === 8){
            curText = curText.slice(0,-1);
        }
        else if(event.keyCode === 13){
            curText += '\n';
        }
        else if(event.keyCode < 32){
            ;
        }
        else{
            curText += event.key;
        }
        console.dir(event);
        console.log(curText);
        
        setFileContents(curText);
        
        // now let upper level handle input
        tChange(event);
        
    }
        
    var additionalButtons = addButton.map( 
        bname => <button key={bname} value={bname} id={bname} onClick={buttonClick} >{bname} </button>
    );
    
//onKeyDown={tChange}

    return ( 
        <div className={blockStyle}>
            <div>
            {
                (cNameOptions.length > 0) ?
                <div  >
                    <label for="cmdfilename">Available {lDirname} files: </label>
                    <select  id="cmdfilename" onChange={handleCmdChange}  ref={cmdRef} >
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
                <textarea className='cmd-text' id="cmdtxt" name="cmdtxt"  ref={tref} value={fileContents} onKeyDown={handleTextChange}   cols={rowcol[0]} rows={rowcol[1]} />
                <div className='sidebar2'>
                <button onClick={loadFile}>Load File</button>
                <button onClick={saveFile}>Save File</button>
                <button onClick={delFile}>Delete File</button>
                {additionalButtons}
                </div>
            </div>
        </div>
    );
}

export default TextCommandBlock;