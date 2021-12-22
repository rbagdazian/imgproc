import React from  'react';
import './App.css'

function ClassRequestButton({requestHandler, benable}) {
    
    return (
        <>
        {benable == true ? (
            <span>
            <button onClick={requestHandler}> Classify Digit </button>
            </span> )
        : (
            <span />
            )
        }
        </>
        )
}


export default ClassRequestButton;