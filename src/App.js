import logo from './logo.svg';
import React, {useState} from 'react';
import FileUpload from './FileUpload';
import FileDisplay from './FileDisplay';
import './App.css';


function App() {
  const [curState, setCurState] = useState({valid:false, fileInfo:[]});
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <FileUpload setter={setCurState} />
        <FileDisplay state={curState} />
      </header>
    </div>
  );
}

export default App;
