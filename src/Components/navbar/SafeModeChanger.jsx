import React, { useContext, useState } from "react";
import AppContext from "../../contexts/AppContext";

const SafeModeChanger = () => {
    const [activate, setActivation] = useState(false)
    const { setApp } = useContext(AppContext);



  return (
    <div className="safeRow">
      <span className="blink" style={{display: activate ? "block" : "none"}}>SAFE MODE</span>
      <label class="switch">
        <input type="checkbox" onChange={()=> {setActivation(!activate);setApp(prev=>({...prev,SafeMode:!activate}))}}/>
        <span class="slider round"></span>
      </label>
    </div>
  );
};

export default SafeModeChanger;
