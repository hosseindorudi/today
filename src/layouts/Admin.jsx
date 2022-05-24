import React, { useState } from "react";
import Footer from "../Components/Footer/footer";
import Home from "../Components/navbar/home";
import Language from "../Components/navbar/language";
import NavMenu from "../Components/navbar/navMenu";
import Sidebar from "../Components/sidebar/sidebar";
import MainTabControl from "../Components/Tabs/TabControl/MainTabControl";
import useWindowSize from "../customHooks/useWindowSize";
import "./Admin.css";

function Admin() {
  const [dropDown, setDropDown] = useState(false);

  const [menu, setMenu] = useState(false);
  const windowSize=useWindowSize()

  
  const handleClickMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="mainparent">
      <div className="header">
        <div className="hederLeft">
          <div className="profileImg">
            <div>
              <i class="fa fa-user" aria-hidden="true"></i>
            </div>
          </div>
          <span className="profileName">
            <div>حسین درودی</div>
          </span>

          <div
            className="logOut"
            onClick={() => {
              setDropDown(!dropDown)
            }}
          >
            <div className="logOutReletive">
              <i className="fa fa-sign-out" aria-hidden="true"></i>
              <div
                className="dropdown-content"
                style={{ display: dropDown ? "flex" : "none" }}
              >
                <div>
                  <img src="" alt="" className="dropImg" />
                  <a className="dropDownLink" href="#home">
                    پروفایل
                  </a>
                </div>

                <div>
                  <img src="" alt="" className="dropImg" />
                  <a className="dropDownLink" href="#home">
                    خروج
                  </a>
                </div>
              </div>
            </div>
          </div>
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
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Admin;
