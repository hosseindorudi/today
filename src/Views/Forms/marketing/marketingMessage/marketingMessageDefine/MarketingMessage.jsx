import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { TabContext } from "../../../../../contexts/TabContextProvider";
import useAxios from "../../../../../customHooks/useAxios";
import useRequest from "../../../../../customHooks/useRequest";
import { enums } from "../../../../../data/Enums";
import { MessageCreate } from "../../../../../services/marketingMessage";
import MarketingMessageList from "../MarketingMessageList";
import "./dnd.css";
import DNDContainer from "./messageComponents/DNDContainer";
const MarketingMessage = () => {
  const tabContext = useContext(TabContext);
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [subject, setSubject] = useState(" ");
  const request = useRequest();
  const [response, loading, fetchData] = useAxios();
  const handleSubmitted=()=>{
    tabContext.addRemoveTabs(
      {
        Component: MarketingMessage,
        path: "/Marketing/Message/Create",
        title: "/Marketing/Message/Create",
        access: enums.Marketing_Message_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "/Marketing/Message/Read",
        path: "/Marketing/Message/Read",
        Component: MarketingMessageList,
        access: enums.Marketing_Message_Read_r,
      },

      "add"
    );
  }


  const dropped = (i) => {
    setValue((prevState) => prevState + i.bValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData({
      method: "POST",
      url: MessageCreate,
      headers: request,
      data: {
        IsDynamic: value.includes("{"),
        IsHtml: false,
        Title: title,
        Subject: subject,
        Body: value,
      },
    });
  };
  const handleResponse = (response) => {
    handleSubmitted()
  };
  useEffect(() => {
    response && handleResponse(response);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
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

        <DNDContainer value={value} handleChange={setValue} dropped={dropped} />
        <div className="btnRow">
          <Button disabled={loading} type="submit">{t("submit")}</Button>
        </div>
      </Form>
    </div>
  );
};

export default MarketingMessage;
