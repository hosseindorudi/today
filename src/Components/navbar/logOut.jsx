import React, { useContext } from 'react'
import AppContext from '../../contexts/AppContext';
import * as fa from 'react-icons/fa'
import { t } from "i18next";
import { useNavigate } from 'react-router-dom';
const LogOut = () => {

    const { app,setApp } = useContext(AppContext);
    const navigate=useNavigate()
    const click=()=>{
        setApp((prev) => ({ ...prev, logOutOpen:!app.logOutOpen }));
    }
    const handleLogOut=()=>{
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      }
  return (

    <div
    className="logOut"
    onClick={click}
  >
    <div className="logOutReletive">
      <>
    <fa.FaSignOutAlt/></>
      <div
        className="dropdown-content"
        style={{ display: app.logOutOpen ? "flex" : "none" }}
      >
        <div>
          <fa.FaUserAlt/>
          <button className="dropDownLink" >
            {t("profile")}
          </button>
        </div>

        <div onClick={handleLogOut}>
          <fa.FaSignOutAlt/>
          <button className="dropDownLink" >
            {t("btn.exit")}
          </button>
        </div>
      </div>
    </div>
  </div>
 
  )
}

export default LogOut