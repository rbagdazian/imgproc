import React, {useRef} from 'react';


function FileUpload({uploader}){
  const choiceRef = useRef();
    
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }     

    const changeHandler = (event) => {
        //console.dir(event);
        event.preventDefault();
        console.log('In changeHandler');
        //console.dir(choiceRef);
        const selectedFile = event.target.files[0];
        //console.log('selected file info name :' + selectedFile.name)
        //console.dir('target file => '+event.target.files[0]);
        //console.dir('current val =>'+choiceRef.current.value);
        //console.log('fblob='+fblob);
        const isFilePicked = true;
        const fileUrl= URL.createObjectURL(event.target.files[0])
        //console.log('fileUrl ='+fileUrl);
        let newState = {isValid:isFilePicked, fileInfo:selectedFile, fileSrc: fileUrl};
        //console.dir(newState);

        //console.log('newVals are ->');        
        //console.log(newState);        
        uploader(newState);
        //console.log('back from setter function');        
    }


    return (
          <div>
              <input id="file" name="file" onChange={changeHandler} onClick={()=>{choiceRef.current.value=null;}}  type="file" accept="*/*" ref={choiceRef} />
          </div> 
      );
    }
    
export default FileUpload;    