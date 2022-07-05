import React, { useEffect, useRef, useState } from 'react'
import * as fa from 'react-icons/fa'
import { t } from "i18next";

const LogOut = () => {

    const [open, setopen] = useState(false)
    const ref=useRef()

    const click=()=>{
        setopen(!open)
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
    <fa.FaArrowAltCircleDown/></>  
    {/* FaSignOutAlt */}
      <div
        className="dropdown-content"
        style={{ display: open ? "flex" : "none" }}
      >
        <div>
          <fa.FaUserAlt style={{color: "black"}}/>
          <button className="dropDownLink" >
            {t("profile")}
          </button>
        </div>

        <div>
          <fa.FaUserLock style={{color: "black"}}/>
          <button className="dropDownLink" >
            {t("btn.chnagePassword")}
          </button>
        </div>
      </div>
    </div>
  </div>
 
  )
}

export default LogOut