import React, { useCallback, useEffect, useRef, useState } from "react";
import * as fa from "react-icons/fa";
import { t } from "i18next";
import PasswordModal from "../Table/passwordModal/PasswordModal";
import { getoneRecord, operatorChangePassword } from "../../services/operatorService";
import { toast } from "react-toastify";
import useAxios from "../../customHooks/useAxios";
import useRequest from "../../customHooks/useRequest";
import UpdateProfile from "./updateProfile/UpdateProfile";
import BackDrop from "../backDrop/BackDrop";

const ProfileInfo = () => {
  const [open, setopen] = useState(false);
  const [type, setType] = useState("")
  const [response, loading, fetchData] = useAxios();
  const [isUpdateProfile, setIsUpdateProfile] = useState(false)
  const [profile, setProfile] = useState([])
  const request=useRequest()
  const ref = useRef();
  const [changePassIsOpen, setChangePassIsOpen] = useState(false);
  const userId=localStorage.getItem("Id")
  const updatedPassword = () => {
    setChangePassIsOpen(false);
    toast.success(t("operator.passwordChanged"), {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const updatedProfile=()=>{
    setIsUpdateProfile(false);
    toast.success(t("operator.ProfileUpdate"), {
      position: toast.POSITION.TOP_CENTER,
    });
  }
  const click = () => {
    setopen(!open);
  };
  const clickOutSideLogOut = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setopen(false);
    }
  };
  const handleClickProfile=()=>{
    setType("GETONERECORD")
    fetchData({
      method: "POST",
      url: getoneRecord,
      headers: request,
      data: {
        Id: localStorage.getItem("Id"),
      },
    });
  }
  const handleResponse = useCallback(
    (response, type) => {
      switch (type) {
        case "GETONERECORD":
          setProfile(response.Record)
          setIsUpdateProfile(true)
          break;
        default:
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useEffect(() => {
    response && handleResponse(response,type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  useEffect(() => {
    document.addEventListener("mousedown", clickOutSideLogOut);
    return () => {
      document.removeEventListener("mousedown", clickOutSideLogOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {loading && <BackDrop open={true} />}
      {changePassIsOpen && (
        <PasswordModal
          rowValues={userId}
          changePasswordURL={operatorChangePassword}
          show={changePassIsOpen}
          onHide={() => setChangePassIsOpen(false)}
          updated={updatedPassword}
        />
      )}
      {isUpdateProfile &&(
        <UpdateProfile profile={profile} show={isUpdateProfile} onHide={()=>setIsUpdateProfile(false)} updated={updatedProfile}/>
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
            <div onClick={() => handleClickProfile()}>
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

export default ProfileInfo;
