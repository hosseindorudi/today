import React, {  useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useAxios from "../../../customHooks/useAxios";
import useRequest from "../../../customHooks/useRequest";
import {
  setDatePickerDate,
} from "../../../validation/functions";
import { languages } from "../../../assets/languages/languages";
import { dashboardProfileUpdate } from "../../../services/dashboardServices";

const UpdateProfile = ({show,onHide,updated,profile}) => {
  const [validated, setValidated] = useState(false);
  const [type, setType] = useState("");
  const { t } = useTranslation();
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();
  const abortController = new AbortController();
  const [values, setValues] = useState({
    IsActive: profile.IsActive,
    OperatorName: profile.OperatorName,
    FirstName: profile.FirstName,
    LastName: profile.LastName,
    Language_EId: profile.Language_EId,
    InternalPhone: profile.InternalPhone,
    Mobile: profile.Mobile,
    IsLimited: profile.IsLimited,
    LimitTo: new Date(profile.LimitTo),
    LimitFrom: new Date(profile.LimitFrom),
    Group_Id:profile.Group_Id
  });
  const handleSeccess = () => {
    updated();
  };
  useEffect(() => {
    response && handleResponse(response, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleResponse = (response, type) => {
    switch (type) {
      case "SUBMIT":
        handleSeccess();
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity()) {
    }
    setType("SUBMIT");
    fetchData({
      method: "POST",
      url: dashboardProfileUpdate,
      headers: request,
      signal: abortController.signal,
      data: {
        Id: profile.Id,
        IsActive: values.IsActive,
        Group_Id: values.Group_Id,
        Language_EId: values.Language_EId,
        OperatorName: values.OperatorName,
        FirstName: values.FirstName,
        LastName: values.LastName,
        Password: "",
        InternalPhone: values.InternalPhone,
        Mobile: values.Mobile,
        IsLimited: values.IsLimited,
        LimitFrom: setDatePickerDate(values.LimitFrom),
        LimitTo: setDatePickerDate(values.LimitTo),
      },
    });
  };
  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Header closeButton></Modal.Header>{" "}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
         
          <div className="Row ">
            <Form.Group className="mb-3" controlId={"lang"}>
              <Form.Label>{t("SelectLanguage")}</Form.Label>
              <Form.Select
                value={values.Language_EId}
                onChange={onChangeHandler}
                name="Language_EId"
              >
                <option disabled>{t("SelectLanguage")}</option>
                {languages.map((l, i) => (
                  <option value={l.no}>{l.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="Row">
            <Form.Group className="mb-3" controlId={"FirstName"}>
              <Form.Label>{t("FirstName")}</Form.Label>
              <Form.Control
                required
                type="text"
                value={values.FirstName}
                placeholder={t("FirstName")}
                name="FirstName"
                onChange={onChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId={"LastName"}>
              <Form.Label>{t("LastName")}</Form.Label>
              <Form.Control
                required
                type="text"
                value={values.LastName}
                placeholder={t("LastName")}
                name="LastName"
                onChange={onChangeHandler}
              />
            </Form.Group>
          </div>
          <div className="Row">
            <Form.Group className="mb-3" controlId={"name"}>
              <Form.Label>{t("OperatorName")}</Form.Label>
              <Form.Control
                required
                type="text"
                value={values.OperatorName}
                placeholder={t("OperatorName")}
                name="OperatorName"
                onChange={onChangeHandler}
              />
            </Form.Group>
          </div>
          <div className="Row">
            <Form.Group className="mb-3" controlId={"InternalPhone"}>
              <Form.Label>{t("InternalPhone")}</Form.Label>
              <Form.Control
                type="number"
                value={values.InternalPhone}
                placeholder={t("InternalPhone")}
                name="InternalPhone"
                onChange={onChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId={"mobile"}>
              <Form.Label>{t("Mobile")}</Form.Label>
              <Form.Control
                type="number"
                value={values.Mobile}
                placeholder={t("Mobile")}
                name="Mobile"
                onChange={onChangeHandler}
              />
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" disabled={loading}>
            {" "}
            {t("operatorGroupFormSubmit")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateProfile;
