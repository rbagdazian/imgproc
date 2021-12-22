import React from  'react';
import './App.css'

function ImgProcRequestButtons({requestHandler,  buttonOption}) {
    
    const br1 = () => requestHandler(1);
    const br2 = () => requestHandler(2);
    const br3 = () => requestHandler(3);
    const br4 = () => requestHandler(4);
    const br5 = () => requestHandler(5);
    const br6 = () => requestHandler(6);
    const br7 = () => requestHandler(7);
    
    return (
        <>
        {buttonOption == false ? (
        <table>
        <tbody>
        <tr>
        <td><button onClick={br1}> Invert </button></td>
        <td><button onClick={br2}> Monochrome </button></td>
        <td><button onClick={br3}> Blur </button></td>
        <td><button onClick={br4}> Canny E.D. </button></td>
        <td><button onClick={br5}> Unsharp </button></td>
        </tr>            
        </tbody>
        </table>
        )
        :
        (
        <br />
        )}
        </>
        )
    
}


export default ImgProcRequestButtons;