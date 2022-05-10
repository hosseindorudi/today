import React from 'react'
import './main.css'
import MainTabControl from './TabControl/MainTabControl'


const MainTabPage=()=>{

    
   
    return(
        <div className='main'>
        
           {/* <div className='sideBarGrid' onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
           <SideBar />
           </div> */}
        

           <div className='mainFormsGrid'>
              <MainTabControl />
           </div> 
        </div>
    )
}

export default MainTabPage