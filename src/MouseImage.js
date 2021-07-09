import React, {useState, useEffect, useRef} from  'react';
import './App.css'

function MouseImage({props}){
    const xMax=256;
    const yMax=256;
    const penVal = useRef();
    const bcolor = useRef();
    const pcolor = useRef();
    const [canvas, setCanvas] = useState('');
    const [context, setContext] = useState('');
    const myCanvasRef = useRef(canvas);
    const myContextRef = useRef(context);

        
    useEffect(() => {


        // Find the canvas element.
        const tcanvas = document.getElementById('myCanvas');
        if (!tcanvas) {
          alert('Error: I cannot find the canvas element!');
          return;
        }
        else{
            console.log('got canvas');
            setCanvas(tcanvas);
            myCanvasRef.current = tcanvas;
        }
    
        if (!tcanvas.getContext) {
          alert('Error: no canvas.getContext!');
          return;
        }
        else
            console.log('got canvas context');
    
        // Get the 2D canvas context.
        const tcontext = tcanvas.getContext('2d');
        if (!tcontext) {
          alert('Error: failed to getContext!');
          return;
        }
        else{
          setContext(tcontext);
          myContextRef.current = tcontext;
          console.log('got context 2d');
        }
        
    
        // Attach the mousemove event handler.
        tcanvas.addEventListener('mousemove', ev_mousemove, false);
        tcanvas.addEventListener('mousedown', ev_mousedown, false);
        tcanvas.addEventListener('mouseup', ev_mouseup, false);
        
        penVal.current.value = '1';
        tcontext.lineWidth = '1';
        
        bcolor.current.value = "#000000";
        pcolor.current.value = "#ffffff";
        
        console.log('tcontext:');
        console.dir(tcontext);
        tcontext.fillRect(0,0,xMax,yMax);
        tcontext.strokeStyle = pcolor.current.value;
        tcontext.scale(1,1);
    },[]);

    // The mousemove event handler.
    var started = false;
    
    function ev_mousedown(ev) {
        var x, y;

        // Get the mouse position relative to the canvas element.
        if (ev.layerX || ev.layerX === 0) { // Firefox
          x = ev.layerX;
          y = ev.layerY;
        } else if (ev.offsetX || ev.offsetX === 0) { // Opera
          x = ev.offsetX;
          y = ev.offsetY;
        }
        
      console.log('mouse down');
      console.dir(context);
      const ctx = myContextRef.current;
      ctx.beginPath();
      ctx.moveTo(x,y);
      started = true;
    }
    
    function ev_mouseup(ev) {
      console.log('mouse up');
      started = false;
    }
    
    
    function ev_mousemove (ev) {
        var x, y;
        // Get the mouse position relative to the canvas element.
        if (ev.layerX || ev.layerX === 0) { // Firefox
          x = ev.layerX;
          y = ev.layerY;
        } else if (ev.offsetX || ev.offsetX === 0) { // Opera
          x = ev.offsetX;
          y = ev.offsetY;
        }
      
        // The event handler works like a drawing pencil which tracks the mouse 
        // movements. We start drawing a path made up of lines.
        if (started){
          const ctx = myContextRef.current;
          ctx.lineTo(x, y);
          ctx.stroke();
        }
    }
    
    const clearImg=()=>{ const bv = bcolor.current.value; console.log(bv); const ctx = myContextRef.current; ctx.fillStyle = bv; ctx.fillRect(0,0, xMax, yMax); };
    const setPenSize = (e) => { const lw = penVal.current.value; console.log(lw); const ctx = myContextRef.current; ctx.lineWidth = lw; };
    const setBackColor = (e) => {const bv = bcolor.current.value; console.log(bv); const ctx = myContextRef.current; ctx.fillStyle = bv; ctx.fillRect(0,0, xMax, yMax) }; 
    const setPenColor = (e) => {const pv = pcolor.current.value; console.log(pv); const ctx = myContextRef.current; ctx.strokeStyle = pv; };
    
    
    function saveImg(e){
        const can = myCanvasRef.current;
        const imgUrl = can.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgUrl;
        link.setAttribute("download", "*.png"); //or any other extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    

    return (
        <div className='mouse-box'>
          <canvas id="myCanvas" className='mouse-image' width="256" height="256" >
  
          </canvas>
          <div className='sidebar'>
            <button className='button-sb1' onClick={clearImg}>Clear Image</button>
            <div className='stroke-width'>
              <label className="fi1" for="quantity">Stroke Width:</label>
              <input className="fi2" type="number" id="quantity" name="quantity" min="1" max="20" ref={penVal} onChange={setPenSize} />
            </div>
            <div className="back-color">
              <label className="fi1" for="bcolor">Background Color:</label>
              <input className="fi2" type='color' id="bcolor" name="bcolor" ref={bcolor} onChange={setBackColor} />
            </div>
            <div className="pen-color">
              <label className="fi1" for="pcolor">Pen Color:</label>
              <input className="fi2" type='color' id="pcolor" name="pcolor" ref={pcolor} onChange={setPenColor} />
            </div>
            <button className='button-sb2' onClick={saveImg}>Save Image</button>
          </div>
        </div>
        );
}

export default MouseImage;