import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./dnd.css";
import DNDContainer from "./messageComponents/DNDContainer";
const MarketingMessage = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [value,setValue]=useState("")
  const [subject, setSubject] = useState("")

  const dropped=(i)=>{
    setValue((prevState) => prevState + i.bValue);
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(value)
  }
  return (
      <div className="DnDMain">
        <Form onSubmit={handleSubmit} className="DnDForm">
          <div className="Row">
            <Form.Group className="mb-3" controlId={"Title"}>
              <Form.Label>{t("Title")}</Form.Label>
              <Form.Control
                required
                type="text"
                value={title}
                placeholder={t("Title")}
                name="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            
          </div>
          <div className="Row">
            <Form.Group className="mb-3" controlId={"subject"}>
              <Form.Label>{t("Subject")}</Form.Label>
              <Form.Control
                type="text"
                value={subject}
                placeholder={t("Subject")}
                name="subject"
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>
            
          </div>
          
            <DNDContainer value={value} handleChange={(e)=>setValue(e.target.value)} dropped={dropped}/>
            <div className="btnRow">
            <Button  type="submit">
            {t("submit")}
          </Button>
            </div>
          
        </Form>
      </div>
  );
};

export default MarketingMessage;
