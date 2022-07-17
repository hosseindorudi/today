import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTranslation } from "react-i18next";
import "./dnd.css";
import DNDContainer from "./DNDContainer";
const DND = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [value,setValue]=useState("")

  const dropped=(i)=>{
    setValue((prevState) => prevState + i.bValue);
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="DnDMain">
        <Form className="DnDForm">
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
            <DNDContainer value={value} handleChange={(e)=>setValue(e.target.value)} dropped={dropped}/>
            <div className="btnRow">
            <Button  type="submit">
            {t("submit")}
          </Button>
            </div>
          
        </Form>
      </div>
    </DndProvider>
  );
};

export default DND;
