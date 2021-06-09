import React from  'react';
import './App.css'

function ImgProcRequestButtons({requestHandler}) {
    
    const br1 = () => requestHandler(1);
    const br2 = () => requestHandler(2);
    const br3 = () => requestHandler(3);
    const br4 = () => requestHandler(4);
    const br5 = () => requestHandler(5);
    
    return (
        <div className="img-proc-request-buttons">
        <table>
        <tbody>
        <tr>
        <td><button onClick={br1}> Monochrome </button></td>
        <td><button onClick={br2}> Low Pass </button></td>
        <td><button onClick={br3}> Unsharp </button></td>
        <td><button onClick={br4}> Sobel E.D. </button></td>
        <td><button onClick={br5}> Gauss E.D. </button></td>
        </tr>            
        </tbody>
        </table>
        </div>
        )
    
}


export default ImgProcRequestButtons;