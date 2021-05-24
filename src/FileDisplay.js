import React from  'react';
import './App.css'

function FileDisplay({state}) {

    return(
        state.isValid ? (
            <div>
                <p>Filename: {state.fileInfo.name}</p>
                <p>Filetype: {state.fileInfo.type}</p>
                <p>Filesize: {state.fileInfo.size} (bytes)</p>
                <p>last Modified:{' '} 
                    {state.fileInfo.lastModifiedDate.toLocaleDateString()}</p>
                <img className='file-display-img' src={state.fileSrc} alt='' />
            </div>
        ) : (
            <div>
                <p>Not defined</p>
            </div>
        )
    );
}

export default FileDisplay;