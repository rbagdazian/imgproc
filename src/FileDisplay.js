import React from  'react';
import './App.css'

function FileDisplay({state}) {

    return(
        state.isValid ? (
            <div className="file-display">
                <p>Filename: {state.fileInfo.name}<br />
                Filetype: {state.fileInfo.type}<br />
                Filesize: {state.fileInfo.size} (bytes)<br />
                FileSrc: {state.fileSrc} <br />
                last Modified:{' '} 
                    {state.fileInfo.lastModifiedDate.toLocaleDateString()}</p>
                <img className='file-display-img' src={state.fileSrc} alt='' />
            </div>
        ) : (
            <div>
                <p>___</p>
            </div>
        )
    );
}

export default FileDisplay;