import React, { useContext, useEffect, useState } from "react";
import Footer from "../Components/Footer/footer";
import Home from "../Components/navbar/home";
import Language from "../Components/navbar/language";
import NavMenu from "../Components/navbar/navMenu";
import Sidebar from "../Components/sidebar/sidebar";
import MainTabControl from "../Components/Tabs/TabControl/MainTabControl";
import useWindowSize from "../customHooks/useWindowSize";
import "./Admin.css";
import LogOut from "../Components/navbar/logOut";
import { OsContext } from "../contexts/OsInformationProvider";
import useAuth from "../customHooks/useAuth";
import * as fi from 'react-icons/fi'


function Admin() {
  const [menu, setMenu] = useState(false);
  const windowSize=useWindowSize()
  const { loading } = useContext(OsContext);
  const [verifyToken]=useAuth()
  useEffect(() => {
    if(!loading){
      verifyToken()
    }  
  }, [loading]);
  
  const handleClickMenu = () => {
    setMenu(!menu);
  };
  
  return (
    <div className="mainparent">
      <fi.FiRefreshCcw/>
      <div className="header">
        <div className="hederLeft">
          <div className="profileImg">
            <div>
              <i className="fa fa-user" aria-hidden="true"></i>
            </div>
          </div>
          <span className="profileName">
            <div>حسین درودی</div>
          </span>

          <LogOut />
        </div>
        <div className="headerMid"></div>
        <div className="headerRight">
          <Language  />
          <div className="thirdIcon">
            <div>
              <i className="fa fa-bell" aria-hidden="true"></i>
            </div>
          </div>
         
          <Home />
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
