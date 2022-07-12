
import React, {   useEffect, useRef, useState } from "react";
import {  Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import useAxios from '../../../../../customHooks/useAxios';
import { admitionUpdate } from '../../../../../services/admitionService';
import SignaturePad from '../signaturePad/src';



const AdmissionModal = (props) => {
    const val = props.rowValus;
    const [type, setType] = useState("")
    const [response, loading, fetchData] = useAxios();
    // const title = useRef();
    // const phone = useRef();
    // const [titles,setTitles]=useState([])
    // const [titleId,setTitleId]=useState()
    // const request = useRequest();
    const { t } = useTranslation();
    // const [activation, setActivation] = useState(true);
    const abortController = new AbortController();
    
    const customerSig = useRef();
    const operatorSig = useRef();

    const [sigCustomerEdit, setSigCustomerEdit] = useState(false)
    const [sigOperatorEdit, setSigOperatorEdit] = useState(false)
    const [values, setValues] = useState({
        customerDisc:val.Customer_Description,
        customerSig: val.Customer_Signature,
        operatorDisc:val.Operator_Description,
        operatorSig: val.Operator_Signature,
        email:val.Account,
        defect:val.Defect,

    })

    useEffect(() => {
        if (response) {
          response.Result ? props.updated() : handleError(response.Message);
          
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [response]);



    const handleError = (message) => {
        toast.error(message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        setType("UPDATE")
        console.log(type)
    
        fetchData({
          method: "POST",
          url: admitionUpdate,
          headers: {
            accept: "*/*",
          },
          signal: abortController.signal,
          data: {
              Id:val.Id,
              Customer_Id: val.Customer_Id,
              ProductGroup_Id:val.ProductGroup_Id,
              Product_Id:val.Product_Id,
              Part_Id:val.Part_Id,
              AdmissionStep_EId:val.AdmissionStep_EId,
              IsArchive:val.IsArchive,
              ModelName:val.ModelName,
              ModelNumber:val.ModelNumber,
              SerialNumber:val.SerialNumber,
              IMEI1:val.IMEI1,
              IMEI2:val.IMEI2,
              CodeNumber : val.CodeNumber,
              AdmissionNumber: val.AdmissionNumber,
              IsHavePassword: val.IsHavePassword,  //password.length ? true : false
              Password: val.Password,
              IsHavePattern:val.IsHavePattern,
              Pattern:val.Pattern,
              IsHaveAccount:values.email.length ? true : false,
              Account:values.email,
              AdmissionDefect: [1],
              AdmissionAccessory:[1],
              Customer_Description: values.customerDisc,
              Customer_Signature: sigCustomerEdit ? String(customerSig.current.toDataURL()) : val.Customer_Signature,
              Operator_Description: values.operatorDisc,
              Operator_Signature: sigOperatorEdit ? String(operatorSig.current.toDataURL()) : val.Operator_Signature,
              SourceType: val.SourceType,
              Registrar: val.Registrar,
              DateSet: "2022-06-20T04:46:16.961Z",
              Customer_Title: "",
              ProductGroup_Title: "",
              Product_Title: "",
              Part_Title: "",
              
            
  
          },
        });
      };



  return (

    <Modal
      show={props.tableModalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.onHide}
      className="admissionModal"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="tableModal">
          <form className='admitionDiv'>
            

          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{t("Email")}</Form.Label>
              <Form.Control
                type="email"
                placeholder={t("Email")}
                value={values.email}
                onChange={(e) => setValues({...values, email:e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>امضا مشتری</Form.Label>
                
                {!sigCustomerEdit ?
                (    <div className="updateModalSig">
                        <img className='imageCustomer' src={props.rowValus.Customer_Signature} alt="" />
                        <button className='editSignature' onClick={(e) => setSigCustomerEdit(true)}>{t("admissionEdit")}</button>
                    </div>)
                    :
                    (
                        <div className='updateModalSignature'>
                            <SignaturePad ref={customerSig}  sigType={"customer"}  clearButton="true"  />
                        </div>
                    )
                }
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{t("admissionSignature")}</Form.Label>
                
                {!sigOperatorEdit ?
                (    <div className="updateModalSig">
                        <img className='imageCustomer' src={props.rowValus.Operator_Signature} alt="" />
                        <button className='editSignature' onClick={(e) => setSigOperatorEdit(true)}>{t("admissionEdit")}</button>
                    </div>)
                    :
                    (
                        <div className='updateModalSignature'>
                            <SignaturePad ref={operatorSig} sigType={"customer"}  clearButton="true"  />
                        </div>
                    )
                }
            </Form.Group>


            <Form.Group  className="mb-3" controlId="formBasicEmail">
                <div className='customerDescDiv'>
              <Form.Label>{t("admissionDesc")}</Form.Label>
              <textarea className='customerDesc' cols={30} rows={10} value={values.customerDisc}
              onChange={(e) => setValues({...values, customerDisc: e.target.value})}/>
              </div>
            </Form.Group>
            <Form.Group  className="mb-3" controlId="formBasicEmail">
                <div className='customerDescDiv'>
              <Form.Label>{t("admissionDesc1")}</Form.Label>
              <textarea className='customerDesc' cols={30} rows={10} value={values.operatorDisc}
              onChange={(e) => setValues({...values, operatorDisc: e.target.value})}
              />
              </div>
            </Form.Group>

            

            

            
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
              <Button onClick={handleSubmit} disabled={loading}>
                {" "}
                {t("operatorGroupFormSubmit")}
              </Button>
            </Modal.Footer>
    </Modal>
    
    

  )
}

export default AdmissionModal