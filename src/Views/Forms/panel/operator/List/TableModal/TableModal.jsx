import React, { useContext, useEffect, useRef, useState } from "react";
import { Accordion, Button, Form, Modal } from "react-bootstrap";
import "./tableModal.css";
import * as bs from "react-icons/bs";
import * as fa from "react-icons/fa";
import AppContext from "../../../../../../contexts/AppContext";
import { useTranslation } from "react-i18next";
import useRequest from "../../../../../../customHooks/useRequest";
import { toast } from "react-toastify";
import MapModal from "../../../../../../Components/GoogleMap/MapModal";
import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterJalali from "@date-io/date-fns-jalali";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { onlyNumberAndDot } from "../../../../../../validation/validation";
import { browser, radius } from "../../../../../../data/constants";
import useAxios from "../../../../../../customHooks/useAxios";
import { updateRecord } from "../../../../../../services/operatorService";
import { setDatePickerDate } from "../../../../../../validation/functions";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const TableModal = (props) => {
  const currentLang = useContext(AppContext);
  const { app } = useContext(AppContext);

  const [response, loading, fetchData] = useAxios();
  const title = useRef();
  const description = useRef();
  const phone = useRef();



  const request=useRequest();
  const { t } = useTranslation();
  const [activation, setActivation] = useState(true);
  const abortController = new AbortController();

  const [operatorDateExp, setOperatorDateExp] = useState();
  const [operatorDate, setOperatorDate] = useState();

  useEffect(() => {
    const values=props.rowValus
    title.current.value=values.OperatorName
    description.current.value=values.Group_Title
    phone.current.value=values.Mobile
    setActivation(values.IsActive)
    setOperatorDateExp(values.ExpireDate?new Date(values.ExpireDate):null)
    setOperatorDate(values.DateSet?new Date(values.DateSet):null)

    console.log(values)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchData({
      method: "POST",
      url: updateRecord,
      headers: {
        accept: "*/*",
      },
      signal:abortController.signal,
      data: 
      {
        Id: props.rowValus.Id,
        IsActive: activation,
        OperatorName: title.current.value,
        Group_Title: null,
        ExpireDate: operatorDateExp ? setDatePickerDate(operatorDateExp) : "2000-01-01",
        Registrar: 0,
        Language_EId: 0,
        Group_Id:0,
        Password:props.rowValus.Password,
        Mobile:phone.current.value,
        DateSet: operatorDate ? setDatePickerDate(operatorDate) : "2000-01-01",
        Request:request,
      },
    });
  };
  const handleError = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  useEffect(() => {
    
    if (response) {
      
      response.Result
        ? props.updated()
        : handleError(response.Message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  return (
    <Modal
      show={props.tableModalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.onHide}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="tableModal">
          <form onSubmit={handleSubmit}>
            <div class="switch">
              <Form.Check
                type="switch"
                id="custom-switch"
                label={t("OperatorGroup.switch")}
                onChange={() => setActivation((prev) => !prev)}
                checked={activation}
              />
            </div>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{t("OperatorName")}</Form.Label>
              <Form.Control
                ref={title}
                type="text"
                placeholder={t("OperatorName")}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>{t("Group_Title")}</Form.Label>
              <Form.Control
                ref={description}
                type="text"
                placeholder={t("Group_Title")}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>{t("Mobile")}</Form.Label>
              <Form.Control
                ref={phone}
                type="number"
                placeholder={t("Mobile")}
                className="phoneNumberClass"
              />
            </Form.Group>

            <Form.Group className="mb-3">
            <div className="inputDiv">
                <label id="OperatorFormInputExp1">{t("operatorDatePick")}</label>
                {currentLang.app.lang === 'fa' ?(
                  <div style={{direction: "ltr"}}>
                    <LocalizationProvider dateAdapter={AdapterJalali}>
                        <DatePicker
                        label="-"
                        mask="____/__/__"
                        value={operatorDateExp}
                        onChange={(newValue) => {setOperatorDateExp(newValue)}}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>  

                    </div>
                ) : 
                (<div style={{direction: "ltr"}}>
                
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                          
                          inputFormat="MM/dd/yyyy"
                          value={operatorDateExp}
                          onChange={(newValue) => {setOperatorDateExp(newValue); console.log(newValue)}}
                          renderInput={(params) => <TextField {...params} />}
                        />
                  </LocalizationProvider>
                      </div>
                  )}
                           
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
            <div className="inputDiv">
                <label id="OperatorFormInputExp1">{t("setoperatorDate")}</label>
                {currentLang.app.lang === 'fa' ?(
                  <div style={{direction: "ltr"}}>
                    <LocalizationProvider dateAdapter={AdapterJalali}>
                        <DatePicker
                        label="-"
                        mask="____/__/__"
                        value={operatorDate}
                        onChange={(newValue) => {setOperatorDate(newValue)}}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>  

                    </div>
                ) : 
                (<div style={{direction: "ltr"}}>
                
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                          
                          inputFormat="MM/dd/yyyy"
                          value={operatorDate}
                          onChange={(newValue) => {setOperatorDate(newValue); console.log(newValue)}}
                          renderInput={(params) => <TextField {...params} />}
                        />
                  </LocalizationProvider>
                      </div>
                  )}
                           
              </div>
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
  );
};

export default TableModal;
