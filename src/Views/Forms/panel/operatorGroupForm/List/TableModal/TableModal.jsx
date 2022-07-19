import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import AppContext from "../../../../../../contexts/AppContext";
import { useTranslation } from "react-i18next";
import useRequest from "../../../../../../customHooks/useRequest";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import useAxios from "../../../../../../customHooks/useAxios";
import { groupUpdate } from "../../../../../../services/groupService";
import { setDatePickerDate } from "../../../../../../validation/functions";

const TableModal = (props) => {
  const { app } = useContext(AppContext);
  const [response, loading, fetchData] = useAxios();
  const [validated, setValidated] = useState(false);
  const request = useRequest();
  const { t } = useTranslation();
  const abortController = new AbortController();
  const value = props.rowValues;

  const [values, setValues] = useState({
    IsActive: value.IsActive,
    Title: value.Title,
    MaxSession: value.MaxSession,
    IsLimited: value.IsLimited,
    LimitFrom: new Date(value.LimitFrom),
    LimitTo: new Date(value.LimitTo),
    Description: value.Description,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity()) {
      fetchData({
        method: "POST",
        url: groupUpdate,
        headers: request,
        signal: abortController.signal,
        data: {
          Id: value.Id,
          IsActive: values.IsActive,
          Title: values.Title,
          MaxSession: values.MaxSession,
          IsLimited: values.IsLimited,
          LimitFrom: setDatePickerDate(values.LimitFrom),
          LimitTo: setDatePickerDate(values.LimitTo),
          Description: values.Description,
        },
      });
    }
  };
  const handleResponse = () => {
    props.updated();
  };
  useEffect(() => {
    response && handleResponse();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleChangeSwitch = (e) => {
    setValues({ ...values, [e.target.name]: e.target.checked });
  };
  const setDate = (date, name) => {
    setValues({ ...values, [name]: date.toDate() });
  };
  return (
    <Modal
      show={props.tableModalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.onHide}
    >
      <Modal.Header closeButton></Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="Row ">
            <Form.Group className="mb-3" controlId={"switch"}>
              <Form.Label>{t("IsActive")}</Form.Label>
              <Form.Check
                style={{ textAlign: "center" }}
                type="switch"
                checked={values.IsActive}
                name="IsActive"
                onChange={handleChangeSwitch}
              />
            </Form.Group>
          </div>
          <div className="Row">
            <Form.Group className="mb-3" controlId={"title"}>
              <Form.Label>{t("title")}</Form.Label>
              <Form.Control
                required
                type="text"
                value={values.Title}
                placeholder={t("title")}
                name="Title"
                onChange={onChangeHandler}
              />
            </Form.Group>
          </div>
          <div className="Row">
            <Form.Group className="mb-3" controlId={"maxSession"}>
              <Form.Label>{t("MaxSession")}</Form.Label>
              <Form.Control
                required
                style={{ textAlign: "center" }}
                type="number"
                value={values.MaxSession}
                placeholder={t("MaxSession")}
                name="MaxSession"
                min={1}
                max={1000}
                onChange={onChangeHandler}
              />
            </Form.Group>
          </div>
          <div className="Row">
            <Form.Group className="mb-3" controlId={"description"}>
              <Form.Label>{t("Description")}</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                type="text"
                value={values.Description}
                placeholder={t("Description")}
                name="Description"
                onChange={onChangeHandler}
              />
            </Form.Group>
          </div>
          <div className="Row">
            <Form.Group className="mb-3" controlId={"LimitFrom"}>
              <Form.Label>{t("LimitFrom")}</Form.Label>
              <DatePicker
                containerClassName="custom-container"
                onChange={(e) => setDate(e, "LimitFrom")}
                name="LimitFrom"
                calendar={app.lang === "fa" ? persian : gregorian}
                locale={app.lang === "fa" ? persian_fa : gregorian_en}
                calendarPosition="bottom-right"
                value={values.LimitFrom}
                disabled={!values.IsLimited}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId={"IsLimited"}>
              <Form.Label>{t("IsLimited")}</Form.Label>
              <Form.Check
                style={{ textAlign: "center" }}
                type="switch"
                checked={values.IsLimited}
                name="IsLimited"
                onChange={handleChangeSwitch}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId={"LimitTo"}>
              <Form.Label>{t("LimitTo")}</Form.Label>
              <DatePicker
                containerClassName="custom-container"
                onChange={(e) => setDate(e, "LimitTo")}
                name="LimitTo"
                calendar={app.lang === "fa" ? persian : gregorian}
                locale={app.lang === "fa" ? persian_fa : gregorian_en}
                calendarPosition="bottom-right"
                value={values.LimitTo}
                disabled={!values.IsLimited}
              />
            </Form.Group>
          </div>
          <Modal.Footer>
            <Button type="submit" disabled={loading}>
              {t("operatorGroupFormSubmit")}
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default TableModal;
