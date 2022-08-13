import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useRequest from "../../../../../customHooks/useRequest";
import useAxios from "../../../../../customHooks/useAxios";
import {
  createSelectOptions,
} from "../../../../../validation/functions";
import { PhoneBookReadTitle } from "../../../../../services/phoneNumberGroupService";
import { CustomReactMultiSelect } from "../../../../../Components/Select/customReactSelect";
import { PhoneNumberUpdate } from "../../../../../services/phoneNumber";

const TableModal = (props) => {
  const [validated, setValidated] = useState(false);
  const [type, setType] = useState("");
  const { t } = useTranslation();
  const abortController = new AbortController();
  const [phoneNumberGroupOptions, setPhoneNumberGroupOptions] = useState([]);
  const [phoneNumberGroup, setPhoneNumberGroup] = useState(undefined);
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();
  const [number, setNumber] = useState("");
  useEffect(() => {
    const prop = props.rowValus;
    console.log(props.rowValus)
    setNumber(prop.Number)
    setPhoneNumberGroup(prop.PhoneBook_Id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitted = (response) => {
    props.updated();
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
    setPhoneNumberGroup(
      phoneNumberGroupOptions.find((i) => i.value === props.rowValus.PhoneBook_Id)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneNumberGroupOptions]);
  useEffect(() => {
    setType("READTITLE");
    fetchData({
      method: "POST",
      url:PhoneBookReadTitle,
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
        url: PhoneNumberUpdate,
        headers: request,
        data: {
          Id: props.rowValus.Id,
          PhoneBook_Id: phoneNumberGroup?.value,
          Number: number,
          SourceType: 0,
          Registrar: 0,
          DateSet: "2022-06-19T16:43:29.709Z",
        },
        signal: abortController.signal,
      });
    }
  };


  return (
    <Modal
      show={props.tableModalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.onHide}
      className="updateCustomerModal"
    >
      <Modal.Header closeButton></Modal.Header>
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
            <Form.Control value={number} onChange={(e) => setNumber(e.target.value)} />
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
    </Modal>
  );
};

export default TableModal;
