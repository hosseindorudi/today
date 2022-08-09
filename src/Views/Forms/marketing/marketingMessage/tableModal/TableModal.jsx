import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import useRequest from "../../../../../customHooks/useRequest";
import useAxios from "../../../../../customHooks/useAxios";
import { t } from "i18next";
import DNDContainer from "../marketingMessageDefine/messageComponents/DNDContainer";
import { MessageUpdate } from "../../../../../services/marketingMessage";

const TableModal = (props) => {
  const val = props.rowValues;
  const [title, setTitle] = useState(val.Title);
  const [value, setValue] = useState(val.Body);
  const [subject, setSubject] = useState(val.Subject);
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();
  const abortController = new AbortController();

  const handleResponse = () => {
    props.updated();
  };

  useEffect(() => {
    response && handleResponse(response);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData({
      method: "POST",
      url: MessageUpdate,
      headers: request,
      data: {
        Id: val.Id,
        IsDynamic: value.includes("{"),
        IsHtml: false,
        Title: title,
        Subject: subject,
        Body: value,
      },
      signal: abortController.signal,
    });
  };
  const dropped = (i) => {
    setValue((prevState) => prevState + i.bValue);
  };
  return (
    <Modal
      show={props.tableModalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.onHide}
      className="editModalPeriority"
    >
      <Modal.Header closeButton></Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
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

          {/* <div className="periorityFormsEdit">
            
          </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loading} type="submit">
            {" "}
            {t("submit")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TableModal;
