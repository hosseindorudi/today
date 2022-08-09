import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Form } from "react-bootstrap";
import useRequest from "../../../../customHooks/useRequest";
import useAxios from "../../../../customHooks/useAxios";
import BackDrop from "../../../../Components/backDrop/BackDrop";
import { TabContext } from "../../../../contexts/TabContextProvider";
import { enums } from "../../../../data/Enums";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import AppContext from "../../../../contexts/AppContext";
import { setDatePickerDate } from "../../../../validation/functions";
import { customerGroupCreate } from "../../../../services/customerGroupService";
import CustomerGroup from "./List/CustomerGroup";
const CustomerGroupForm = () => {
  const { app } = useContext(AppContext);
  const [validated, setValidated] = useState(false);
  const { t } = useTranslation();
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();
  const tabContext = useContext(TabContext);
  const abortController = new AbortController();
  const [values, setValues] = useState({
    IsActive: true,
    Title: "",
    MaxSession: 1,
    IsLimited: false,
    LimitFrom: new Date(),
    LimitTo: new Date(),
    Description: "",
  });
  const handleResponse = () => {
    tabContext.addRemoveTabs(
      {
        Component: CustomerGroupForm,
        path: "/Customer/Group/Create",
        title: "/Customer/Group/Create",
        access: enums.Customer_Group_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "/Customer/Group/Read",
        path: "/Customer/Group/Read",
        access: enums.Customer_Group_Read_r,
        Component: CustomerGroup,
      },

      "add"
    );
  };

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
        url: customerGroupCreate,
        headers: request,
        signal: abortController.signal,
        data: {
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

  useEffect(() => {
    response && handleResponse(response);
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
    <>
      {loading && <BackDrop open={true} />}
      <div className="periorityFormDefine">
        <Form
          className="periorityForm"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <b>{t("/Customer/Group/Create")}</b>
          <div className="Row ">
            <Form.Group className="mb-3 activationRow" controlId={"switch"}>
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
            <Form.Group className="mb-3" controlId={"customer.group"}>
              <Form.Label>{t("customer.group")}</Form.Label>
              <Form.Control
                required
                type="text"
                value={values.Title}
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

          <Button disabled={loading} type="submit">
            {t("submit")}
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CustomerGroupForm;
