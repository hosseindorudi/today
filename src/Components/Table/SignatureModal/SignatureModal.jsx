import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import useAxios from '../../../customHooks/useAxios';
import useRequest from '../../../customHooks/useRequest';
import {  Button, Form, Modal } from "react-bootstrap";
import "./signatureModal.css"
import { toast } from 'react-toastify';
const SignatureModal = (props) => {


    const [response, loading, fetchData, setResponse] = useAxios();
    const request=useRequest();
    const { t } = useTranslation();
    const abortController = new AbortController();
    
    const handleSubmit = (e) => {
        e.preventDefault();


        fetchData({
          method: "POST",
          url: "",
          headers: {
            accept: "*/*",
          },
          signal:abortController.signal,
          data: 
          {
            Id: props.rowValus.Id,
            
            Request:request,
          },
        });
    }
       


    const handleError = (message) => {
        toast.error(message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      };
      useEffect(() => {
        
        if (response) {
          
          response.Result
            ? console.log("hello")
            : handleError(response.Message);
        }
        setResponse(undefined)
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [response]);


  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.onHide}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="tableModal">
          <form onSubmit={handleSubmit}>
            
          <Form.Group className="mb-3" controlId="formBasicEmail">
              
            </Form.Group>
            

            
            <Modal.Footer>
              <Button type="submit" disabled={loading}>
                {" "}
                {t("operatorGroupFormSubmit")}
              </Button>
            </Modal.Footer>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default SignatureModal