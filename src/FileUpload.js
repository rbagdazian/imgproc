import React, {useState} from 'react';


function FileUpload({setter, uploader}){
    const [selectedFile, setSelectedFile] = useState();
    const [fileBlob, setFileBlob] = useState([]);
    const [isFilePicked, setIsFilePicked] = useState(false);
    
    
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        let urls = URL.createObjectURL(event.target.files[0]);
        setFileBlob(urls);      
    }
    
    const handleSubmission = () => {
        console.log(fileBlob);
        setter({isValid:isFilePicked, fileInfo:selectedFile, fileSrc:fileBlob},[]);
        uploader(fileBlob);
    }
    
    if(isFilePicked){
        console.log(fileBlob);
        console.log(selectedFile);
    }
    
    return (
        <div>
            <input type="file" name="file" onChange={changeHandler} />
            <div>
                <button onClick={handleSubmission}>Submit</button>
            </div>
        </div>
        );
    }
    
export default FileUpload;    