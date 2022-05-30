import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import * as bs from "react-icons/bs";
import {  useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/imgs/logo.png";
import Language from "../Components/navbar/language";
import { toast } from "react-toastify";
import "./Auth.css";
import useAxios from "../customHooks/useAxios";
import useOsInformation from "../customHooks/useOSInformation";
import AppContext from "../contexts/AppContext";

const Auth = () => {
  const [response, error, loading, fetchData] = useAxios();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { ip, os, browser } = useOsInformation();
  const { app } = useContext(AppContext);
  const navigate = useNavigate();
  const username = useRef();
  const password = useRef();
  const loginURL = "/Operator/Authentication/Login";
  const { t } = useTranslation();
  const radioTypes = ["operator", "agent"];
  const [radioType, setRadioType] = useState("");
  const [passVisible, setpassVisible] = useState(false);
  const handleChangeRadio = (event) => {
    setRadioType(event.target.id);
  };
  useEffect(() => {
    app.type && setRadioType(app.type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!radioType.length)
      return toast.error(t("auth.chooseOperator"), {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    fetchData({
      method: "POST",
      url: loginURL,
      headers: {
        accept: "*/*",
      },
      data: {
        language: app.langCode,
        os: os,
        browser: browser,
        ip: ip,
        token: "",
        username: username.current.value,
        password: password.current.value,
        isOperator: radioType === "operator" ? true : false,
      },
    });
  };

  const setToken = useCallback((token) => {
    localStorage.setItem("token",token);
   return navigate(from, { replace: true });
  }, [navigate,from]);
 
  const handleError=(message)=>{
    username.current.value=''
    password.current.value=''
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  }
  useEffect(() => {
    if(response){
      response.result?setToken(response.message):handleError(response.message)
    }
    if(error){
    handleError(error.response.data.title)
    }
  }, [response,error,setToken])
  const handlePasswordVisible = () => {
    setpassVisible(!passVisible);
  };
  return (
    <div className="authparent">
      <div className="authHeader">
        <div></div>
        <div className="logoAuth">
          <img src={logo} alt="loginlogo" />
        </div>
        <div className="langAuth">
          <Language />
        </div>
      </div>
      <div className="formParent">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>{t("auth.username")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t("auth.username")}
              required
              ref={username}
            />
          </Form.Group>

          <Form.Group className="mb-3 authPasswordGroup">
            <Form.Label htmlFor="password">{t("auth.password")}</Form.Label>
            <Form.Control
              id="password"
              type={passVisible ? "text" : "password"}
              placeholder={t("auth.password")}
              required
              ref={password}
            />
            <span className="pviewer" onClick={handlePasswordVisible}>
              {!passVisible ? <bs.BsFillEyeFill /> : <bs.BsFillEyeSlashFill />}
            </span>
          </Form.Group>
          <div className="mb-3">
            {radioTypes.map((key, index) => (
              <Form.Check
                inline
                checked={radioType === key ? true : false}
                label={t(`auth.${key}`)}
                name="loginType"
                type="radio"
                id={key}
                key={index}
                onChange={handleChangeRadio}
              />
            ))}
          </div>

          <div className="authSubmitDiv">
            <Button variant="primary" type="submit" disabled={loading?true:false}>
              {loading&&
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />}
              {!loading&&t("auth.signin") }
            </Button>
           
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Auth;
