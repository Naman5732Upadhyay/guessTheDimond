import './Box.css'
import { useEffect, useState } from 'react'
import dimond from '/src/assets/dimond.svg'
import bomb from '/src/assets/bomb.svg'

function Box({boxclass,item,onGameOver,onTileClick}) {
    const [classes, setclasses] = useState('');
    useEffect(()=>{
        setclasses(boxclass)
    },[boxclass])
    
  function tileCLick(){
       item.isOpen = true;
      if(item?.type === 0){
        onGameOver()
      }

  } 
    return(
        <>
        <div className={`box ${classes} ${item?.isOpen ? 'boxOpen':''} ${item?.type === 0 ? 'boxGray' : 'boxGreen'}`} onClick={()=>{tileCLick();onTileClick()}}>
         {item?.type==1 ? <img src={dimond} style={{width:'40px',display:item?.isOpen ? 'block' : 'none'}}  /> : <img src={bomb} style={{width:'40px',display:item?.isOpen ? 'block' : 'none'}}  />}
        </div>
        </>
    )
}
export default Box  