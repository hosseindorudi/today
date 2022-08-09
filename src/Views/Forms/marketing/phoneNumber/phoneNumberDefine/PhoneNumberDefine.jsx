import PhoneNumberList from "../PhoneNumberList";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { CustomReactMultiSelect } from "../../../../../Components/Select/customReactSelect";
import { TabContext } from "../../../../../contexts/TabContextProvider";
import useAxios from "../../../../../customHooks/useAxios";
import useRequest from "../../../../../customHooks/useRequest";
import { enums } from "../../../../../data/Enums";
import { PhonePoolReadTitle } from "../../../../../services/phoneNumberGroupService";
import { createSelectOptions } from "../../../../../validation/functions";
import { PhoneNumberCreate } from "../../../../../services/phoneNumber";
const PhoneNumberDefine = () => {
  const [response, loading, fetchData] = useAxios();
  const [validated, setValidated] = useState(false);
  const [type, setType] = useState("");
  const [phoneNumberGroupOptions, setPhoneNumberGroupOptions] = useState([]);
  const [phoneNumberGroup, setPhoneNumberGroup] = useState(undefined);
  const request = useRequest();
  const tabContext = useContext(TabContext);
  const abortController = new AbortController();
  const [values, setValues] = useState("");
  const { t } = useTranslation();
  const submitted = () => {
    toast.success(t("item.created"), {
      position: toast.POSITION.TOP_CENTER,
    });
    tabContext.addRemoveTabs(
      {
        title: "/Marketing/PhoneNumber/Create",
        path: "/Marketing/PhoneNumber/Create",
        access: enums.Marketing_PhoneNumber_Create_w,
        Component: PhoneNumberDefine,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "/Marketing/PhoneNumber/Read",
        path: "/Marketing/PhoneNumber/Read",
        access: enums.Marketing_PhoneNumber_Read_r,
        Component: PhoneNumberList,
      },
      "add"
    );
  };
  const handleResponse = (response, type) => {
    switch (type) {
      case "READTITLE":
        setPhoneNumberGroupOptions(createSelectOptions(response.Title));
        break;
      case "SUBMIT":
        submitted();
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    setType("READTITLE");
    fetchData({
      method: "POST",
      url: PhonePoolReadTitle,
      headers: request,

      signal: abortController.signal,
    });
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    response && handleResponse(response, type);
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
        url: PhoneNumberCreate,
        headers: request,
        data: {
          Id: 0,
          PhonePool_Id: phoneNumberGroup?.value,
          Number: values,
          SourceType: 0,
          Registrar: 0,
          DateSet: "2022-06-19T16:43:29.709Z",
        },
        signal: abortController.signal,
      });
    }
  };

  return (
    <div className="periorityFormDefine">
      <Form
        className="periorityForm"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <b>{t("/Marketing/PhoneNumber/Create")}</b>
        <div className="Row">
          <Form.Group className="mb-3" controlId={"phoneNumberGroup"}>
            <Form.Label>{t("/Marketing/PhonePool/Create")}</Form.Label>
            <CustomReactMultiSelect
              isMulti={false}
              options={phoneNumberGroupOptions}
              value={phoneNumberGroup}
              onchangeHandler={(e) => setPhoneNumberGroup(e)}
              placeholder={t("/Marketing/PhonePool/Create")}
            />
          </Form.Group>
        </div>
        <div className="Row">
          <Form.Group
            className="mb-3"
            style={{ width: "100%" }}
            controlId={"phoneNumber"}
          >
            <Form.Label>{t("PhoneNumber")}</Form.Label>
            <Form.Control onChange={(e) => setValues(e.target.value)} />
            <Form.Control.Feedback type="invalid">
              {t("phoneNumber_errorMSG")}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <Button disabled={loading} type="submit">
          {t("submit")}
        </Button>
      </Form>
    </div>
  );
};

export default PhoneNumberDefine;
