import React, {  useEffect, useState } from "react";
import {  Button, Form, Modal } from "react-bootstrap";



import { toast } from "react-toastify";
import useRequest from "../../../../../customHooks/useRequest";
import useAxios from "../../../../../customHooks/useAxios";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { t } from "i18next";
import {admissionAccessoryUpdate} from '../../../../../services/admissionAccessory'
import { defintionInputs } from "../../../../../validation/functions";


const TableModal = (props) => {
  const val=props.rowValus
  const [values, setValues] = useState({
    title: val.Title,
    color: `#${val.Color}`,
    periority: val.Priority,
    desc: val.Description,
  });
  const [response, loading, fetchData, setResponse] = useAxios();
  const request = useRequest();
  const abortController = new AbortController();

 


  const handleError = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  const handleResponse = () => {
    props.updated()
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  useEffect(() => {
   response&&handleResponse(response)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData({
      method: "POST",
      url:admissionAccessoryUpdate ,
      headers: request,
      data: {
        
        Id: val.Id,
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
    <Form onSubmit={handleSubmit}>
    <Modal.Body>
    <div className="periorityFormsEdit">
          {defintionInputs(values).map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button disabled={loading} type='submit'> {t("submit")}</Button>
    </Modal.Footer>
    </Form>
  </Modal>
  );
};

export default TableModal;
