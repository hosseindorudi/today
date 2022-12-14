import React, { useContext } from "react";
import AppContext from "../../contexts/AppContext";
const NavMenu = () => {
  const { app, setApp } = useContext(AppContext);

    const click=()=>{
      setApp((prev) => ({ ...prev, sidebarOpen: !app.sidebarOpen }));
    }

  return (
    <div className="firstIcon" onClick={() =>click()}> 
         <i className="fa fa-bars" aria-hidden="true"></i>
         </div>
  );
};

export default NavMenu;
