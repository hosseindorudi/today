import React, { useContext, useState } from "react";
import AppContext from "../../contexts/AppContext";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import * as fa from "react-icons/fa";
import { checkBoolean } from "../../validation/validation";

const SafeModeChanger = ({ handleLogOut }) => {
  const [activate, setActivation] = useState(localStorage.getItem("SafeMode")?checkBoolean(localStorage.getItem("SafeMode")):false);
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
        localStorage.setItem("SafeMode",!activate)
        setApp((prev) => ({ ...prev, SafeMode: !activate }));
      } else {
        setActivation(false);
        setApp((prev) => ({ ...prev, SafeMode: false }));
      }
    });
  };
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
        setActivation(false);
        localStorage.removeItem("SafeMode")
        setApp((prev) => ({ ...prev, SafeMode: false }));
        handleLogOut();
      } else {
        return false;
      }
    });
  };

  return (
    <div className="safeRow">
      <span className="blink" style={{ display: activate ? "block" : "none" }}>
        Safe mode
      </span>
      <button
        className="safModeButton"
        style={{ color: !activate ? "white" : "red" }}
        onClick={() => {
          if (activate) {
            logOutSwal();
          } else {
            confirmSwal();
          }
        }}
      >
        <fa.FaShieldVirus />
      </button>
    </div>
  );
};

export default SafeModeChanger;
