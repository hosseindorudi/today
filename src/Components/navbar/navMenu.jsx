import React, { useState } from "react";





const NavMenu = (props) => {
    const [open, setOpen] = useState(false)

    const click=()=>{
        setOpen(!open)
    }

  return (
    <div className="firstIcon" onClick={() =>click()}> 
        <div className="barsRelative">
         <i className="fa fa-bars" aria-hidden="true"></i>
         
       </div>
       
       
    
         </div>
     
   
  
  );
};

export default NavMenu;
