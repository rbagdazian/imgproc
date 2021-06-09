import React from 'react';


function FileUpload({uploader}){

    const changeHandler = (event) => {
        //console.log('In changeHandler');
        let fblob = event.target.files[0];
        //console.log(fblob);
        const selectedFile = event.target.files[0];
        const isFilePicked = true;
        let urls = URL.createObjectURL(event.target.files[0]);
        const fileBlob = urls;         
        //console.log('setting file urls to -> ');
        //console.log(fileBlob);
        //console.log('calling setter function');
        let newState = {isValid:isFilePicked, fileInfo:selectedFile, fileSrc:fileBlob};
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