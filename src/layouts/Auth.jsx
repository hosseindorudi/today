import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import logo from "../assets/imgs/logo.png";
import Language from "../Components/navbar/language";
import "./Auth.css";
const Auth = () => {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('type');
  const { t } = useTranslation();
  const radioTypes=["operator","user"]
  const [radioType,setRadioType]=useState("")
  const handleChangeRadio=(event)=>{
    setRadioType(event.target.id)
  }
  useEffect(() => {
      name&&setRadioType(name)
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
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
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>{t("auth.username")}</Form.Label>
            <Form.Control type="text" placeholder={t("auth.username")} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>{t("auth.password")}</Form.Label>
            <Form.Control type="password" placeholder={t("auth.password")} />
          </Form.Group>
          <div className="mb-3">
             {radioTypes.map((key,index)=>(
            <Form.Check
              inline
              checked={radioType===key?true:false}
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
            <Button variant="primary" type="submit">
              {t("auth.signin")}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Auth;
