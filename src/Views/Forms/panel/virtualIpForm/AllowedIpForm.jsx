import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { TabContext } from "../../../../contexts/TabContextProvider";
import useAxios from "../../../../customHooks/useAxios";
import useRequest from "../../../../customHooks/useRequest";
import { enums } from "../../../../data/Enums";
import { allowedIpCreate } from "../../../../services/allowedIp";
import { handleError } from "../../../../validation/functions";
import AllowedIp from "./AllowedIp";

const AllowedIpForm = () => {
  const [response, loading, fetchData, setResponse] = useAxios();
  const [validated, setValidated] = useState(false);
  const [type, setType] = useState("");
  const request = useRequest();
  const tabContext = useContext(TabContext);
  const abortController = new AbortController();
  const [values, setValues] = useState({
    IsActive: true,
    Title: "",
    IP_From: "",
    IP_To: "",
    Description: "",
  });
  const { t } = useTranslation();
  const submitted = () => {
    toast.success(t("item.created"), {
      position: toast.POSITION.TOP_CENTER,
    });
    tabContext.addRemoveTabs(
      {
        Component: AllowedIpForm,
          path: "/Operator/AllowedIp/write",
          title: "/Operator/AllowedIp/write",
          access: enums.Operator_AllowedIp_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "/Operator/AllowedIp/Read",
        path: "/Operator/AllowedIp/Read",
        access: enums.Operator_AllowedIp_Read_r,
        Component: AllowedIp,
      },
      "add"
    );
  };
  const handleResponse = (response, type) => {
    switch (type) {
      case "SUBMIT":
        submitted();
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    response&&handleResponse(response, type)
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
      setType("SUBMIT");
      fetchData({
        method: "POST",
        url: allowedIpCreate,
        headers:request,
        data: {
          
          Id: 0,
          IsActive: values.IsActive,
          Title: values.Title,
          IP_From: values.IP_From,
          IP_To: values.IP_To,
          Description: values.Description,
        },
        signal: abortController.signal,
      });
    }
  };

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleChangeSwitch=(e)=>{
    setValues({ ...values, [e.target.name]: e.target.checked });
  }
  return (
    <div className="periorityFormDefine">
      <Form
        className="periorityForm"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <b>{t("/Operator/AllowedIp/write")}</b>
        <div className="Row ">
        <Form.Group className="mb-3" controlId={"switch"}>
            <Form.Label>{t("IsActive")}</Form.Label>
              <Form.Check style={{textAlign:'center'}} type='switch' checked={values.IsActive} name='IsActive'  onChange={handleChangeSwitch}/>
          </Form.Group>
        </div>
        <div className="Row">
          <Form.Group className="mb-3" controlId={"title"}>
            <Form.Label>{t("title")}</Form.Label>
              <Form.Control required type='text' value={values.Title} placeholder={t("title")} name='Title' onChange={onChangeHandler}/>
          </Form.Group>
        </div>
        <div className="Row">
          <Form.Group className="mb-3" controlId={"from"}>
            <Form.Label>{t("IP_From")}</Form.Label>
              <Form.Control required style={{textAlign:"center"}} maxLength={15} type='text' value={values.IP_From} placeholder={t("IP_From")} name='IP_From' onChange={onChangeHandler}/>
          </Form.Group>
        </div>
        <div className="Row">
          <Form.Group className="mb-3" controlId={"to"}>
            <Form.Label>{t("IP_To")}</Form.Label>
              <Form.Control required style={{textAlign:"center"}} maxLength={15} type='text' value={values.IP_To} placeholder={t("IP_To")} name='IP_To' onChange={onChangeHandler}/>
          </Form.Group>
        </div>
        <div className="Row">
          <Form.Group className="mb-3" controlId={"description"}>
            <Form.Label>{t("Description")}</Form.Label>
              <Form.Control as="textarea" rows={2}  type='text' value={values.Description} placeholder={t("Description")} name='Description' onChange={onChangeHandler}/>
          </Form.Group>
        </div>
       
        <Button disabled={loading} type="submit">
          {t("submit")}
        </Button>
      </Form>
    </div>
  );
};

export default AllowedIpForm;
