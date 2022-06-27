import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import {  Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterJalali from "@date-io/date-fns-jalali";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AppContext from "../../../../../../contexts/AppContext";
import useRequest from "../../../../../../customHooks/useRequest";
import useAxios from "../../../../../../customHooks/useAxios";
import { groupTitle, updateRecord } from "../../../../../../services/operatorService";
import { setDatePickerDate } from "../../../../../../validation/functions";
import "./tableModal.css";

const TableModal = (props) => {
  
  const currentLang = useContext(AppContext);
  const [type, setType] = useState("")
  const [response, loading, fetchData] = useAxios();
  const title = useRef();
  const phone = useRef();
  const [titles,setTitles]=useState([])
  const [titleId,setTitleId]=useState()
  const request = useRequest();
  const { t } = useTranslation();
  const [activation, setActivation] = useState(true);
  const abortController = new AbortController();

  const [operatorDateExp, setOperatorDateExp] = useState();
  const [operatorDate, setOperatorDate] = useState();




  const getOperatorGroups=()=>{
    setType("GETTITLES")
    fetchData({
      method: "POST",
      url: groupTitle,
      headers: {
        accept: "*/*",
      },
      data: request,
      signal:abortController.signal,
      
     
    })
  }
  useEffect(() => {
    getOperatorGroups()
    const values = props.rowValus;
    title.current.value = values.OperatorName;
    phone.current.value = values.Mobile;
    setActivation(values.IsActive);
    setOperatorDateExp(values.ExpireDate ? new Date(values.ExpireDate) : null);
    setOperatorDate(values.DateSet ? new Date(values.DateSet) : null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setType("UPDATE")

    fetchData({
      method: "POST",
      url: updateRecord,
      headers: {
        accept: "*/*",
      },
      signal: abortController.signal,
      data: {
        Id: props.rowValus.Id,
        IsActive: activation,
        OperatorName: title.current.value,
        Group_Title: "",
        ExpireDate: operatorDateExp
          ? setDatePickerDate(operatorDateExp)
          : "2000-01-01",
        Registrar: 0,
        Language_EId: 0,
        Group_Id: titleId,
        Password: "1",
        Mobile: phone.current.value,
        DateSet: operatorDate ? setDatePickerDate(operatorDate) : "2000-01-01",
        Request: request,
        SourceType:0
      },
    });
  };
  const handleError = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  const handleSetTitle=(response)=>{
    setTitles(response.Title)
    setTitleId(props.rowValus.Group_Id)
   
  }
  const handleResponse = useCallback(
    (response, type) => {
      switch (type) {
        case "GETTITLES":
          handleSetTitle(response);
          break;
        case "UPDATE":
          props.updated()
          break;
        default:
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (response) {
      response.Result ? handleResponse(response,type) : handleError(response.Message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  const handleChangeGroupTitle=(e)=>{
    setTitleId(e.target.value)
  }
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
              <Form.Select value={titleId} onChange={handleChangeGroupTitle}>
                {titles.map((t,i)=>(
                  <option value={t.Id} key={i}>{t.Value}</option>
                ))}
              </Form.Select>
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
                <label id="OperatorFormInputExp1">
                  {t("operatorDatePick")}
                </label>
                {currentLang.app.lang === "fa" ? (
                  <div style={{ direction: "ltr" }}>
                    <LocalizationProvider dateAdapter={AdapterJalali}>
                      <DatePicker
                        label="-"
                        mask="____/__/__"
                        value={operatorDateExp}
                        onChange={(newValue) => {
                          setOperatorDateExp(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                ) : (
                  <div style={{ direction: "ltr" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        inputFormat="MM/dd/yyyy"
                        value={operatorDateExp}
                        onChange={(newValue) => {
                          setOperatorDateExp(newValue);
                          console.log(newValue);
                        }}
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
                {currentLang.app.lang === "fa" ? (
                  <div style={{ direction: "ltr" }}>
                    <LocalizationProvider dateAdapter={AdapterJalali}>
                      <DatePicker
                        label="-"
                        mask="____/__/__"
                        value={operatorDate}
                        onChange={(newValue) => {
                          setOperatorDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                ) : (
                  <div style={{ direction: "ltr" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        inputFormat="MM/dd/yyyy"
                        value={operatorDate}
                        onChange={(newValue) => {
                          setOperatorDate(newValue);
                          console.log(newValue);
                        }}
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