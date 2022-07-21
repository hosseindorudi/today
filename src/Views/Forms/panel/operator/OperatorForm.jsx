import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { createOpt, groupTitle } from "../../../../services/operatorService";
import {
  createSelectOptions,
  setDatePickerDate,
} from "../../../../validation/functions";
import { languages } from "../../../../assets/languages/languages";
import AppContext from "../../../../contexts/AppContext";
import useAxios from "../../../../customHooks/useAxios";
import { TabContext } from "../../../../contexts/TabContextProvider";
import useRequest from "../../../../customHooks/useRequest";
import { enums } from "../../../../data/Enums";
import Operator from "./List/Operator";
import BackDrop from "../../../../Components/backDrop/BackDrop";
import { CustomReactMultiSelect } from "../../../../Components/Select/customReactSelect";

const OperatorForm = () => {
  const { app } = useContext(AppContext);
  const [validated, setValidated] = useState(false);
  const [type, setType] = useState("");
  const { t } = useTranslation();
  const [operatorGroup, setOperatorGroup] = useState(undefined);
  const [operatorGroupOptions, setOperatorGroupOptions] = useState([]);
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();
  const tabContext = useContext(TabContext);
  const abortController = new AbortController();
  const [values, setValues] = useState({
    IsActive: true,
    OperatorName: "",
    FirstName: "",
    LastName: "",
    Language_EId: 1,
    Password: "",
    InternalPhone: "",
    Mobile: "",
    IsLimited: true,
    LimitTo: new Date(),
    LimitFrom: new Date(),
  });
  const handleSubmited = () => {
    tabContext.addRemoveTabs(
      {
        Component: OperatorForm,
        path: "/Operator/Operator/Create",
        title: "/Operator/Operator/Create",
        access: enums.Operator_Operator_Read_r,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "/Operator/Operator/Read",
        path: "/Operator/Operator/Read",
        access: enums.Operator_Operator_Read_r,
        Component: Operator,
      },

      "add"
    );
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
    response && handleResponse(response, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleResponse = (response, type) => {
    switch (type) {
      case "READTITLE":
        setOperatorGroupOptions(createSelectOptions(response.Title));
        break;
      case "SUBMIT":
        handleSubmited();
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
      url: createOpt,
      headers: request,
      signal: abortController.signal,
      data: {
        IsActive: values.IsActive,
        Group_Id: operatorGroup?.value,
        Language_EId: values.Language_EId,
        OperatorName: values.OperatorName,
        FirstName: values.FirstName,
        LastName: values.LastName,
        Password: values.Password,
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
    <>
      {loading && <BackDrop open={true} />}
      <div className="periorityFormDefine">
        <Form
          className="periorityForm"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <b>{t("/Operator/Operator/Create")}</b>
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
            <Form.Group className="mb-3" controlId={"password"}>
              <Form.Label>{t("password")}</Form.Label>
              <Form.Control
                required
                type="password"
                value={values.Password}
                placeholder={t("password")}
                name="Password"
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

          <Button disabled={loading} type="submit">
            {t("submit")}
          </Button>
        </Form>
      </div>
    </>
  );
};

export default OperatorForm;
