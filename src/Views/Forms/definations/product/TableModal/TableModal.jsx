import React, { useContext, useEffect, useState } from "react";
import {  Button,  Form, Modal } from "react-bootstrap";
import "./tableModal.css";


import { toast } from "react-toastify";
import useRequest from "../../../../../customHooks/useRequest";
import useAxios from "../../../../../customHooks/useAxios";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { t } from "i18next";
import { TabContext } from "../../../../../contexts/TabContextProvider";
import { productUpdate } from "../../../../../services/productService";
import { productGroupReadTitle } from "../../../../../services/productGroup";

const TableModal = (props) => {
  const val=props.rowValus
  const [type,setType]=useState("")
  const [productGroups, setProductGroups] = useState([])
  const [values, setValues] = useState({
    title: val.Title,
    color: `#${val.Color}`,
    periority: val.Priority,
    desc: val.Description,
    groupId:val.ProductGroup_Id
  });
 
  const [response, loading, fetchData, setResponse] = useAxios();
  const request = useRequest();
  const abortController = new AbortController();

  const inputs = [
    {
      id: 1,
      name: "title",
      type: "text",
      label: t("title"),
      placeholder: t("title"),
      errorMessage: t("title.errorMessage"),
      pattern: "^[\u0600-\u06FF,A-Za-z0-9,\ ]{4,12}",
      required: true,
      value: values.title,
    },
    {
      id: 2,
      name: "color",
      label: t("color"),
      type: "color",
      errorMessage: t("color.errorMessage"),
      required: true,
    },
    {
      id: 3,
      name: "periority",
      type: "number",
      label: t("periodity"),
      placeholder: t("periodity"),
      errorMessage: t("periodity.errorMessage"),
      required: true,
      value: values.periority,
    },
    {
      id: 4,
      name: "desc",
      type: "text",
      label: t("description"),
      placeholder: t("description"),
      errorMessage: t("description.errorMessage"),
      pattern: "^[\u0600-\u06FF]{20,250}",
      required: true,
      value: values.desc,
    },
  ];


  const handleError = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSuccess=()=>{
    props.updated()
  }
  const handleResponse = (response, type) => {
    switch (type) {
      case "READTITLE":
        setProductGroups(response.Title);
        break;
        case "SUBMIT":
        handleSuccess()
        break;
      default:
        break;
    }
    
  };
  useEffect(() => {
    if (response) {
      response.Result
        ? handleResponse(response,type)
        : handleError(response.Message);
    }
    setResponse(undefined)
  }, [response]);

  useEffect(() => {
    setType("READTITLE");
    fetchData({
      method: "POST",
      url: productGroupReadTitle,
      headers: {
        accept: "*/*",
      },
      data: request,

      signal: abortController.signal,
    });
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setType("SUBMIT")
    fetchData({
      method: "POST",
      url: productUpdate,
      headers: {
        accept: "*/*",
      },
      data: {
        Request: request,
        Id: val.Id,
        ProductGroup_Id: values.groupId,
        ProductGroup_Title:"",
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
  
  };
  return (
    <Modal
    show={props.tableModalShow}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    onHide={props.onHide}
    className='editModalPeriority'
  >
    <Modal.Header closeButton></Modal.Header>
    <Modal.Body>
    <form className="periorityFormsEdit">
    <div className="formInput">
              <label className="formInputsLabel">{t("productGroup")}</label>
              <Form.Select
                name="groupId"
                value={values.groupId}
                onChange={onChange}
              >
                <option  disabled>
                  {t("productGroup")}
                </option>
                {productGroups.map((p, i) => (
                  <option key={i} value={p.Id}>
                    {p.Value}
                  </option>
                ))}
              </Form.Select>
            </div>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
      </form>
    </Modal.Body>
    <Modal.Footer>
      <Button disabled={loading} onClick={handleSubmit}> {t("submit")}</Button>
    </Modal.Footer>
  </Modal>
  );
};

export default TableModal;