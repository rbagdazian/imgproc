import React, {useState} from 'react';


function FileUpload({setter, uploader}){
    const [selectedFile, setSelectedFile] = useState();
    const [fileBlob, setFileBlob] = useState([]);
    const [isFilePicked, setIsFilePicked] = useState(false);
    
    
    const changeHandler = (event) => {
        console.log('In changeHandler');
        console.log(event.target.files);
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        let urls = URL.createObjectURL(event.target.files[0]);
        console.log('setting file urls to -> ');
        console.log(urls)
        setFileBlob(urls);      
        setter({isValid:isFilePicked, fileInfo:selectedFile, fileSrc:fileBlob},[]);
    }
    
    const handleSubmission = () => {
        console.log('In handleSubmission');
        console.log(fileBlob);
        uploader();
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