import { t } from "i18next";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useAxios from "../../../customHooks/useAxios";
import useRequest from "../../../customHooks/useRequest";
import { sendTypeEnum } from "../../../data/SendTypeEnum";
import { MessageReadTitle } from "../../../services/marketingMessage";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import AppContext from "../../../contexts/AppContext";
const styles={
    rowLimit:{
        display:"flex",
    }
}
const PhoneBookMessageModal = (props) => {
    const { app } = useContext(AppContext);
  const [response, loading, fetchData] = useAxios();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(null);
  const [sendType, setSendType] = useState(null);
  const [isExpire, setIsExpire] = useState(false);
  const [number, setNumber] = useState(1);
  const request = useRequest();
  const [type, setType] = useState("");
  const [limitedTo, setLimitedTo] = useState(new Date());

  const getPermissionGroup = () => {
    setType("READTITLE");
    fetchData({
      method: "POST",
      url: MessageReadTitle,
      headers: request,
    });
  };
  useEffect(() => {
    getPermissionGroup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    response && handleResponse(response, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleResponse = (response, type) => {
    switch (type) {
      case "READTITLE":
        setMessages(response.Title);
        break;
      default:
        break;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>{t("Message")}</Form.Label>
            <Form.Select
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            >
              <option hidden>{t("MessageSelect")}</option>
              {messages.map((f, i) => (
                <option value={f.Id} key={i}>
                  {f.Value}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>{t("SendType")}</Form.Label>
            <Form.Select
              required
              value={sendType}
              onChange={(e) => setSendType(e.target.value)}
            >
              <option hidden>{t("SendType")}</option>
              {Object.keys(sendTypeEnum).map((f, i) => (
                <option value={sendTypeEnum[f]} key={i}>
                  {f}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>{t("countMessage")}</Form.Label>
            <Form.Control
              size="sm"
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t("expire")}</Form.Label>
            <div style={styles.rowLimit} >
            <Form.Check
                style={styles.check}
              type="switch"
              checked={isExpire}
              onChange={(e) => setIsExpire(e.target.checked)}
            />
            {isExpire &&
            <DatePicker
             style={styles.picker}
              containerClassName="custom-container"
              onChange={(e) => setLimitedTo(e.toDate())}
              name="LimitTo"
              calendar={app.lang === "fa" ? persian : gregorian}
              locale={app.lang === "fa" ? persian_fa : gregorian_en}
              calendarPosition="bottom-right"
              value={limitedTo}
              
            />
}
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" disabled={loading} variant="primary">
            {t("send")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PhoneBookMessageModal;
