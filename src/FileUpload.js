import React from 'react';


function FileUpload({uploader}){
    
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }     

    const changeHandler = (event) => {
        console.log('In changeHandler');
        let fblob = event.target.files[0];
        //console.log(fblob);
        const selectedFile = event.target.files[0];
        console.log('selected file info :' + selectedFile)
        const isFilePicked = true;
        const fileUrl= URL.createObjectURL(event.target.files[0])
        let newState = {isValid:isFilePicked, fileInfo:selectedFile, fileSrc: fileUrl};

        //console.log('newVals are ->');        
        //console.log(newState);        
        uploader(newState);
        //console.log('back from setter function');        
    }


    return (
        <div>
            <input type="file" name="file" onChange={changeHandler} />
        </div>
        );
    }
    
export default FileUpload;    