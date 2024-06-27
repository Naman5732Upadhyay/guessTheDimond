import { useEffect, useState } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Box from './components/Box';


function App() {
  let boxes = Array(25).fill(null)
  const [boxArray, setBoxArray] = useState(boxes)
  const [slide, setSlide] = useState(1)
  const [boxclass, setBoxclass] = useState('boxNull');
  const [message,setMessage] = useState('')
  const [count,setCount] = useState(0)
  const [isStarted,setisStarted] =useState(false)
  const [tilepicked,settilepicked] =useState(false)

useEffect(()=>{
  fillArray()
},[slide])

function fillArray(){
  boxes = boxes.fill().map(() => ({type: 1, isOpen: false}));
  let slideLocal = slide;
  const numbers = new Set();
  while(numbers.size < slideLocal){
    let randomNumber =(Math.floor(Math.random() * (24 - 0 + 1)) + 0);
    numbers.add(randomNumber);
  }
  for(const item of numbers){
    boxes[item].type = 0
  }
}

  function setDimonds(){
    settilepicked(false);
    setMessage('');
    setBoxclass('boxGradient');
    setisStarted(true);
    setCount(0)
    fillArray();
    setBoxArray(JSON.parse(JSON.stringify([...boxes])))
  }


  function onGameOver(){
    boxArray.every(item=>item.isOpen=true);
    setBoxclass('boxOpen');
    setMessage('You Loose');
    setisStarted(false);
  }
  function cashOut(){
    if(!tilepicked){
      return
    }
    boxArray.every(item=>item.isOpen=true);
    setBoxclass('boxOpen');
     setMessage(`You Won ${count} dimonds`)
     setisStarted(false);
  }
  function onTileClick(){
    settilepicked(true)
    boxArray.forEach(item=>{
      if(item.isOpen){
        setCount(count+1);
      }
     })
  }
  function calcwidth(){
    let value=''
    if(slide < 7){
    value= `${Number(slide)}%`
    }else if(slide>=7 && slide<=11 ){
       value= `${Number(slide) + 15}%`
    }else if(slide> 11 && slide<17 ){
      value= `${Number(slide) + 25}%`
   }
   else if(slide>= 17 && slide<21 ){
    value= `${Number(slide) + 40}%`
 }
    else {
      value= `${Number(slide) +50 }%`
    }
    return value
  }

  return (
    <>
      <div className='container'>
        <div className='left' >
          <div style={{display:'flex',flexDirection:'column'}}>
             <div>
             <span className="slider-value" style={{left:calcwidth()}} id="sliderLabel" >{slide} MINES</span>
              <input disabled={isStarted} className={`slider ${isStarted ? 'noChange' : 'grab'}`} value={slide} onChange={(e)=>{setSlide(e.target.value)}} type='range' step="1" min="1" max="24"  />
              </div>
              <div style={{marginTop:"20px"}}>
                <button className={`btn-str gradient-colors`} style={{display: isStarted ? 'none':'block'}} onClick={()=>{setDimonds()}}>PLAY</button>
                <button className='btn-str gray-btn' style={{display: isStarted ? 'block':'none'}}  onClick={()=>{cashOut()}}>{tilepicked ? `Cash Out ${count} dimonds`: 'Pick a Tile'}</button>
              </div>
          </div>
        </div>
        <div className='center' >
          <div className='playArea'>
            {boxArray.map((item,index)=>{ return <Box boxclass={boxclass} item={item} onTileClick={onTileClick} onGameOver={onGameOver} key={index}/>})}
          </div>
          <div className='messagepoupOuter' style={{display: !message ? "none" : 'block'}}>
            <div className='messagepoup'><p className='text_color'>{message}</p></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
