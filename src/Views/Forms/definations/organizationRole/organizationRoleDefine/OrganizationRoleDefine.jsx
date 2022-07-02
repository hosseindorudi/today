import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { TabContext } from "../../../../../contexts/TabContextProvider";
import useAxios from "../../../../../customHooks/useAxios";
import useRequest from "../../../../../customHooks/useRequest";
import { enums } from "../../../../../data/Enums";
import { organizationalRoleCreate } from "../../../../../services/organizationRoleService";
import {
  defintionInputs,
  handleError,
} from "../../../../../validation/functions";
import OrganizationRole from "../OrganizationRole";
import "./organizationRoleDefine.css";
const OrganizationRoleDefine = () => {
  const [response, loading, fetchData, setResponse] = useAxios();
  const [validated, setValidated] = useState(false);
  const request = useRequest();
  const tabContext = useContext(TabContext);
  const abortController = new AbortController();
  const [values, setValues] = useState({
    title: "",
    color: "#000000",
    periority: 1,
    desc: "",
    group: "",
    percentage: 0,
  });
  const { t } = useTranslation();
  const handleResponse = () => {
    toast.success(t("item.created"), {
      position: toast.POSITION.TOP_CENTER,
    });
    tabContext.addRemoveTabs(
      {
        Component: OrganizationRoleDefine,
        path: "/Definition/OrganizationalRole/Write",
        title: "/Definition/OrganizationalRole/Write",
        access: enums.Definition_OrganizationalRole_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "/Definition/OrganizationalRole/Read",
        path: "/Definition/OrganizationalRole/Read",
        access: enums.Definition_OrganizationalRole_Read_r,
        Component: OrganizationRole,
      },
      "add"
    );
  };
  useEffect(() => {
    if (response) {
      response.Result
        ? handleResponse(response)
        : handleError(response.Message);
      setResponse(undefined);
    }
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
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
        url: organizationalRoleCreate,
        headers: {
          accept: "*/*",
        },
        data: {
          Request: request,
          Id: 0,
          Group: values.group,
          Percentage: values.percentage,
          Priority: values.periority,
          Title: values.title,
          Description: values.desc,
          Color: values.color.substring(1),
          SourceType: 0,
          Registrar: 0,
          DateSet: "2022-06-19T16:43:29.709Z",
        },
        signal: abortController.signal,
      });
    }
  };

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="periorityFormDefine">
      <Form
        className="periorityForm"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <b>{t("/Definition/OrganizationalRole/Write")}</b>
        {defintionInputs(
          values,
          t("/Definition/OrganizationalRole/Read"),
          t("CompanyRole_errorMSG")
        ).map((input) => (
          <FormInput key={input.id} {...input} onChange={onChangeHandler} />
        ))}
        <div className="OrganizationRow">
          <Form.Group className="mb-3" controlId={"group"}>
            <Form.Label>{t("organization.group")}</Form.Label>
            <Form.Control
              type="text"
              name="group"
              onChange={onChangeHandler}
              value={values.group}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={"Percent"}>
            <Form.Label>{t("organization.percent")}</Form.Label>
            <Form.Control
              type="number"
              min="0"
              name="percentage"
              value={values.percentage}
              onChange={onChangeHandler}
            />
          </Form.Group>
        </div>
        <Button disabled={loading} type="submit">
          {t("submit")}
        </Button>
      </Form>
    </div>
  );
};

export default OrganizationRoleDefine;
