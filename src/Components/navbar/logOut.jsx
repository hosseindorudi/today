import React, { useEffect, useRef, useState } from 'react'
import * as fa from 'react-icons/fa'
import { t } from "i18next";
import { useNavigate } from 'react-router-dom';
const LogOut = () => {

    const [open, setopen] = useState(false)
    const ref=useRef()
    const navigate=useNavigate()
    const click=()=>{
        setopen(!open)
    }
    const handleLogOut=()=>{
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      }
    const clickOutSideLogOut=(event)=>{
        if (
            ref.current &&
            !ref.current.contains(event.target)
          ) {
            setopen(false)
          }
      }
      useEffect(() => {
        document.addEventListener("mousedown", clickOutSideLogOut);
        return () => {
            document.removeEventListener("mousedown",clickOutSideLogOut);
        };
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (

    <div
    className="logOut"
    ref={ref}
    onClick={click}
  >
    <div className="logOutReletive">
      <>
    <fa.FaSignOutAlt/></>
      <div
        className="dropdown-content"
        style={{ display: open ? "flex" : "none" }}
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