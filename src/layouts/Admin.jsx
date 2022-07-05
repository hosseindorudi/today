import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer/footer";
import Home from "../Components/navbar/home";
import Language from "../Components/navbar/language";
import NavMenu from "../Components/navbar/navMenu";
import Sidebar from "../Components/sidebar/sidebar";
import * as fa from "react-icons/fa";
import MainTabControl from "../Components/Tabs/TabControl/MainTabControl";
import useWindowSize from "../customHooks/useWindowSize";
import "./Admin.css";
import LogOut from "../Components/navbar/logOut";
import useAuth from "../customHooks/useAuth";
import { useNavigate } from 'react-router-dom';


function Admin() {
  const [menu, setMenu] = useState(false);
  const windowSize=useWindowSize()
  const [verifyToken]=useAuth()
  const navigate=useNavigate()
  useEffect(() => {
      verifyToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleClickMenu = () => {
    setMenu(!menu);
  };

  const handleLogOut=()=>{
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    window.location.reload();
    
  }
  
  return (
    <div className="mainparent">
      <div className="header">
        <div className="hederLeft">
          
          <span className="profileName">
            <div> admin</div>
          </span>

          <LogOut />
        </div>
        <div className="headerMid"></div>
        <div className="headerRight">
          <Language  />
          <Home />
          <fa.FaPowerOff className="adminPowerOff" onClick={handleLogOut}/>
          {windowSize.width<960 && 
          <NavMenu click={handleClickMenu} open={menu} />
            }
        </div>
      </div>
      <div className="main">
        <div className="mainRight">
          <Sidebar />
        </div>
        <div className="mainLeft">
          <MainTabControl />
        </div>
      </div>
 
        <Footer />
    
    </div>
  );
}

export default Admin;
