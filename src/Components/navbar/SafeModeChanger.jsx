import React, { useContext, useState } from "react";
import AppContext from "../../contexts/AppContext";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const SafeModeChanger = ({handleLogOut}) => {
    const [activate, setActivation] = useState(false)
    const { setApp } = useContext(AppContext);
    const { t } = useTranslation();

    const confirmSwal = () => {
      Swal.fire({
        title: t("safeModeSwalTitle"),
        text: t("safeModeSwalText"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("sweetAlert.yes"),
        cancelButtonText: t("sweetAlert.cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          setActivation(!activate);
          setApp(prev=>({...prev,SafeMode:!activate}))
        } else {
          setActivation(false)
          setApp(prev=>({...prev,SafeMode:false}))
        }
      });
    }
    const logOutSwal = () => {
      Swal.fire({
        title: "خروج از حالت Safe mode",
        text: "تایید این پیام منجر به از بین رفتن داده های شما و خروج از سیستم میشود آیا مطمئن هستید؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("sweetAlert.yes"),
        cancelButtonText: t("sweetAlert.cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          setActivation(false)
          setApp(prev=>({...prev,SafeMode:false}))
          handleLogOut()
        } else {
          return false;
        }
      });
    }

  return (
    <div className="safeRow">
      <span className="blink" style={{display: activate ? "block" : "none"}}>Safe mode</span>
      <label class="switch">
        <input type="checkbox" checked={activate} onChange={
          ()=> {
            if(activate){
              logOutSwal()
              
            }else {
              confirmSwal()
            }
          }
        }/>
        <span class="slider round"></span>
      </label>
    </div>
  );
};

export default SafeModeChanger;
