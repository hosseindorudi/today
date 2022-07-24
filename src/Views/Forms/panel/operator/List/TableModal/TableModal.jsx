import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AppContext from "../../../../../../contexts/AppContext";
import useAxios from "../../../../../../customHooks/useAxios";
import {
  groupTitle,
  updateRecord,
} from "../../../../../../services/operatorService";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";

import useRequest from "../../../../../../customHooks/useRequest";
import {
  createSelectOptions,
  setDatePickerDate,
} from "../../../../../../validation/functions";
import { CustomReactMultiSelect } from "../../../../../../Components/Select/customReactSelect";
import { languages } from "../../../../../../assets/languages/languages";

const TableModal = (props) => {
  let rowValues = props.rowValues;
  const { app } = useContext(AppContext);
  const [validated, setValidated] = useState(false);
  const [type, setType] = useState("");
  const { t } = useTranslation();
  const [operatorGroup, setOperatorGroup] = useState(undefined);
  const [operatorGroupOptions, setOperatorGroupOptions] = useState([]);
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();
  const abortController = new AbortController();
  const [values, setValues] = useState({
    IsActive: rowValues.IsActive,
    OperatorName: rowValues.OperatorName,
    FirstName: rowValues.FirstName,
    LastName: rowValues.LastName,
    Language_EId: rowValues.Language_EId,
    InternalPhone: rowValues.InternalPhone,
    Mobile: rowValues.Mobile,
    IsLimited: rowValues.IsLimited,
    LimitTo: new Date(rowValues.LimitTo),
    LimitFrom: new Date(rowValues.LimitFrom),
  });
  const handleSeccess = () => {
    props.updated();
  };

  useEffect(() => {
    setType("READTITLE");
    fetchData({
      method: "POST",
      url: groupTitle,
      headers: request,

      signal: abortController.signal,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setOperatorGroup(
      operatorGroupOptions.find((f) => f.value === rowValues.Group_Id)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operatorGroupOptions]);
  useEffect(() => {
    response && handleResponse(response, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleResponse = (response, type) => {
    switch (type) {
      case "READTITLE":
        setOperatorGroupOptions(createSelectOptions(response.Title));
        break;
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
      url: updateRecord,
      headers: request,
      signal: abortController.signal,
      data: {
        Id: props.rowValues.Id,
        IsActive: values.IsActive,
        Group_Id: operatorGroup?.value,
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
      <Modal.Header closeButton></Modal.Header>{" "}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="Row ">
            <Form.Group className="mb-3" controlId={"Activated"}>
              <Form.Label>{t("Activated")}</Form.Label>
              <Form.Check
                style={{ textAlign: "center" }}
                type="switch"
                checked={values.IsActive}
                name="IsActive"
                onChange={handleChangeSwitch}
              />
            </Form.Group>
          </div>
          <div className="Row ">
            <Form.Group className="mb-3" controlId={"group"}>
              <Form.Label>{t("/Operator/Group/Read")}</Form.Label>
              <CustomReactMultiSelect
                isMulti={false}
                options={operatorGroupOptions}
                value={operatorGroup}
                onchangeHandler={(e) => setOperatorGroup(e)}
                placeholder={t("/Operator/Group/Read")}
              />
            </Form.Group>
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

export default TableModal;
