import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import * as bs from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/imgs/logo.png";
import Language from "../Components/navbar/language";
import "./Auth.css";
import useAxios from "../customHooks/useAxios";
import AppContext from "../contexts/AppContext";
import useRequest from "../customHooks/useRequest";
import { login } from "../services/authService";
const Auth = () => {
  const [response, loading, fetchData] = useAxios();

  const location = useLocation();
  const request = useRequest();
  const from = location.state?.from?.pathname || "/";
  const { setApp } = useContext(AppContext);
  const navigate = useNavigate();
  const username = useRef();
  const password = useRef();
  const { t } = useTranslation();
  const [passVisible, setpassVisible] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData({
      method: "POST",
      url: login,
      headers: request,
      data: {
        username: username.current.value,
        password: password.current.value
      },
    });
  };

  const setToken = useCallback(
    (response) => {
      localStorage.setItem("token",response.Message);
      localStorage.setItem("FirstName",response.FirstName)
      localStorage.setItem("LastName",response.LastName)
      setApp(prev=>({...prev,FirstName:response.FirstName,LastName:response.LastName}))
      return navigate(from, { replace: true });
    },
     // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigate, from]
  );

  const handleError = () => {
    username.current.value = "";
    password.current.value = "";
  };
  useEffect(() => {
    response?setToken(response):handleError()
  }, [response, setToken]);
  const handlePasswordVisible = () => {
    setpassVisible(!passVisible);
  };
  return (
    <div className="authparent">
      <div className="formParent">
        <div className="authLogoDiv">
        <img className="logoAuthImg" src={logo} alt="loginlogo" />
        </div>
        <div className="MiddleForm">
        <div className="langTopForm">
            <div></div>
          <Language />
          </div>
        <Form onSubmit={handleSubmit}>
          <div className="formInner">
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
        

          <div className="authSubmitDiv">
            <Button
              variant="primary"
              type="submit"
              disabled={loading ? true : false}
            >
              {loading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              {!loading && t("auth.signin")}
            </Button>
          </div>
          </div>
        </Form>
        </div>
        <div className="footerForm">
          <a href="https://ctelecom.ir/" target={"_blank"} rel="noreferrer">پیشتازان فناوری سیب طلایی</a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
