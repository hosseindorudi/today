import React, { useState } from "react";
import "./operatorGroupForm.css";
import { useTranslation } from "react-i18next";
import { Accordion, Form } from "react-bootstrap";
import * as bs from "react-icons/bs";
import { onlyNumberAndDot } from "../../../validation/validation";

const OperatorGroupForm = () => {
  const [ips, setIps] = useState([]);
  const [value, setValue] = useState("");
  const { t } = useTranslation();

  const handleAddIP = () => {
    let ip = {
      from: "0.0.0.0",
      to: "0.0.0.0",
    };
    setIps((prev) => [...prev, ip]);
  };
  const changeValue = (event,index,type) => {
    (event.target.value.match(onlyNumberAndDot) || event.target.value === "") &&
      setValue(event.target.value)
  };
  const handleClickRemoveIP=(index)=>{
    let filter=ips.filter((item,i)=>i!==index)
    setIps(filter)
  }
  return (
    <div className="OperatorGroupForm">
      <h5 className="OperatorGroupFormTitle">{t("operatorGroupFormHeader")}</h5>
      <div className="OperatorGroupFormMainDiv">
        <form className="OperatorGroupFormform">
          <div class="switch">
            <Form.Check
              type="switch"
              id="custom-switch"
              label={t("OperatorGroup.switch")}
            />
          </div>
          <div className="inputDiv">
            <label htmlFor="OperatorGroupFormInputTitle1">
              {t("operatorGroupFormTitle")}:
            </label>
            <input
              type="text"
              className="OperatorGroupFormInputTitle"
              id="OperatorGroupFormInputTitle1"
            />
          </div>
          <div className="inputDivDesc">
            <label htmlFor="OperatorGroupFormInputDesc">
              {t("operatorGroupFormDesc")}:
            </label>
            <textarea
              type="text"
              className="OperatorGroupFormInputDesc"
              id="OperatorGroupFormInputDesc"
            />
          </div>
          <div className="accordionOperatorGroup">
            <Accordion>
              <Accordion.Item>
                <Accordion.Header></Accordion.Header>
                <Accordion.Body>
                  <div className="addBtn">
                    <bs.BsFillPlusCircleFill
                      size={25}
                      style={{ cursor: "pointer" }}
                      onClick={handleAddIP}
                    />
                    <b>{t("operatorGroup.ip")}</b>
                  </div>
                  {ips.map((i, index) => (
                    <div className="ipTextFields" key={index}>
                      <bs.BsPatchMinusFill size={20}   style={{ cursor: "pointer" }} onClick={()=>handleClickRemoveIP(index)}/>
                      <Form.Control type="text" onChange={(event)=>changeValue(event,index,"to")} value={i.to}/>
                      <b>{t("ip.till")}</b>
                      <Form.Control
                        type="text"
                        maxLength={15}
                        value={i.from}
                        onChange={(event)=>changeValue(event,index,"from")}
                      />
                      <b>{t("ip.from")}</b>
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="submitBtn">
            <input
              type="submit"
              value={t("operatorGroupFormSubmit")}
              className="deleteBtnForm"
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OperatorGroupForm;
