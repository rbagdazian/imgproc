import React from  'react';
import './App.css'

function FileDisplay({state, full, enable, imgClass }) {
    let filesrc = null;
    
    if(enable){
    
        if(state == null){
            return (
                <div className="file-display">
                <p> Current file is not set </p>
                </div>
                )        
        }
        else if (state.isValid) {
            filesrc = state.fileSrc;
            let fileInfo = state.fileInfo;
            //console.log('file source ->'+ filesrc)
            //console.log('file info -> '+ fileInfo) 
            //console.log('full state is: ' + full)
        }
        else {
            return (
                <div className="file-display">
                <p> Current file is not defined </p>
                </div>
                )
           }
    
        return(
                <div className="file-display">
                    { full == true ?
                        <p>Filename: {state.fileInfo.name}<br />
                        Filetype: {state.fileInfo.type}<br />
                        Filesize: {state.fileInfo.size} (bytes)<br />
                        FileSrc: {state.fileSrc} <br />
                        last Modified:{' '} 
                            {state.fileInfo.lastModifiedDate.toLocaleDateString()}</p>
                    :
                    ' '
                    }
                    <img className={imgClass} src={filesrc} alt='' />
                </div>
            )
        }
        else
        {
            return(' ');
        }
    }

export default FileDisplay;