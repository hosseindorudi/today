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
import AppContext from "../contexts/AppContext";
import useRequest from '../customHooks/useRequest'
import {login} from '../services/authService'
const Auth = () => {
  const [response, loading, fetchData] = useAxios();

  const location = useLocation();
  const request=useRequest()
  const from = location.state?.from?.pathname || "/";
  const { app,setApp } = useContext(AppContext);
  const navigate = useNavigate();
  const username = useRef();
  const password = useRef();
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
      url: login,
      headers: {
        accept: "*/*",
      },
      data: {
        request:request,
        username: username.current.value,
        password: password.current.value,
        isOperator: radioType === "operator" ? true : false,
      },
    });
  };

  const setToken = useCallback((token) => {
    localStorage.setItem("token",token);
    // const roles=[109102,110101,110102,108102,107101,107102,105102,104102,103102,102102,102101,107106]
    // setApp((prev) => ({
    //   ...prev,
    //   roles
    // }));
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
      
      response.Result?setToken(response.Message):handleError(response.Message)
    }
    // if(error){
    // handleError(error.response?.data?.title)
    // }
  }, [response,setToken])
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
