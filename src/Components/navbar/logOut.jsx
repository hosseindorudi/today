import React, { useEffect, useRef, useState } from "react";
import * as fa from "react-icons/fa";
import { t } from "i18next";
import PasswordModal from "../Table/passwordModal/PasswordModal";
import { operatorChangePassword } from "../../services/operatorService";
import { toast } from "react-toastify";

const LogOut = () => {
  const [open, setopen] = useState(false);
  const ref = useRef();
  const [changePassIsOpen, setChangePassIsOpen] = useState(false);

  const updatedPassword = () => {
    setChangePassIsOpen(false);
    toast.success(t("operator.passwordChanged"), {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const click = () => {
    setopen(!open);
  };
  const clickOutSideLogOut = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setopen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", clickOutSideLogOut);
    return () => {
      document.removeEventListener("mousedown", clickOutSideLogOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {changePassIsOpen && (
        <PasswordModal
          changePasswordURL={operatorChangePassword}
          show={changePassIsOpen}
          onHide={() => setChangePassIsOpen(false)}
          updated={updatedPassword}
        />
      )}
      <div className="logOut" ref={ref} onClick={click}>
        <div className="logOutReletive">
          <>
            <fa.FaArrowAltCircleDown />
          </>
          <div
            className="dropdown-content"
            style={{ display: open ? "flex" : "none" }}
          >
            <div>
              <fa.FaUserAlt style={{ color: "black" }} />
              <button className="dropDownLink">{t("profile")}</button>
            </div>

            <div onClick={() => setChangePassIsOpen(true)}>
              <fa.FaUserLock style={{ color: "black" }} />
              <button className="dropDownLink">
                {t("btn.chnagePassword")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogOut;
