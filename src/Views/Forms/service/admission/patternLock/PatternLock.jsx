import React from 'react'
import AdPatternLock from "./src/ad-pattern-lock";
import './dist/main.css'

const PatternLock = ( {size, setpatternLock, setPatternArr} ) => {

    let patternSize = (size === "0") ? [3,3] : (size === "1") ? [3,4] : (size === "2") ? [4,4] : (size === "3") ? [5,4] : [5,5];
   
  return (
    <div className='patternLockParrent'>
        
        <AdPatternLock 
          patternLinesBackgroundColor = {"#3BF0DB"}
          patternCircleVisibleBorder ={"2px solid #F4A261"}
          patternCircleVisible = {true}
          patternDotsRadius={3.5} 
          patternCircleRadius={10} 
          matrix={patternSize} 
          backgroundColor={"#84766B"} 
          onCompletePattern={(pattern) => {   setpatternLock(false); setPatternArr(pattern.toString())}}/>



    </div>
  )
}

export default PatternLock