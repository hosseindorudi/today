import React, { useContext, useEffect } from "react";
import Footer from "../Components/Footer/footer";
import Home from "../Components/navbar/home";
import Language from "../Components/navbar/language";
import NavMenu from "../Components/navbar/navMenu";
import Sidebar from "../Components/sidebar/sidebar";
import * as fa from "react-icons/fa";
import MainTabControl from "../Components/Tabs/TabControl/MainTabControl";
import useWindowSize from "../customHooks/useWindowSize";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import useRequest from "../customHooks/useRequest";
import { logOut, verify } from "../services/authService";
import useAxios from "../customHooks/useAxios";
import BackDrop from "../Components/backDrop/BackDrop";
import AppContext from "../contexts/AppContext";
import ProfileInfo from "../Components/navbar/profileInfo";

function Admin() {
  const FirstName = localStorage.getItem("FirstName");
  const LastName = localStorage.getItem("LastName");
  const firstAndLastName =
    FirstName && LastName ? FirstName + " " + LastName : "";
  const { app,setApp } = useContext(AppContext);
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();
  const windowSize = useWindowSize();
  // const [verifyToken]=useAuth()
  const navigate = useNavigate();

  const verifyToken = () => {
    fetchData({
      method: "POST",
      url: verify,
      headers: request
    });
  };
  useEffect(() => {
    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleResponse = (response) => {
   
   const AccessList=response.AccessList
    setApp((prev) => ({
      ...prev,
      AccessList
    }));
   
  };
  useEffect(() => {
    response && handleResponse(response);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  const handleLogOut = () => {
    fetchData({
      method: "POST",
      url: logOut,
      headers: request,
    });

    localStorage.removeItem("token");
    navigate("/", { replace: true });
    window.location.reload();
    if (response) {
      return;
    }
  };

  return (
    <div className="mainparent">
      {loading && <BackDrop open={true} />}
      <div className="header">
        <div className="hederLeft">
          <span className="profileName">
            <div>{firstAndLastName}</div>
          </span>

          <ProfileInfo />
        </div>
        <div className="headerMid"></div>
        <div className="headerRight">
          <Language />
          <Home />
          <fa.FaPowerOff className="adminPowerOff" onClick={handleLogOut} />
          {windowSize.width < 960 && <NavMenu />}
        </div>
      </div>
      <div className="main">
        <div
          className={`mainRight ${app.sidebarOpen ? "mainRight-active" : ""}`}
        >
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
