import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import Amplify, { Storage } from 'aws-amplify';
import {API} from 'aws-amplify'

function SaveImage({saver}){
    return (
        <button onClick={saver}>Save File</button>
        )
}

export default SaveImage;