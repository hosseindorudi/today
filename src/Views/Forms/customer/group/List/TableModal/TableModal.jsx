import React, { useContext, useEffect, useRef, useState } from "react";
import { Accordion, Button, Form, Modal } from "react-bootstrap";
import "./tableModal.css";
import * as bs from "react-icons/bs";
import * as fa from "react-icons/fa";
import AppContext from "../../../../../../contexts/AppContext";
import { useTranslation } from "react-i18next";
import useRequest from "../../../../../../customHooks/useRequest";
import { toast } from "react-toastify";
// import MapModal from "../../../../../../Components/GoogleMap/MapModal";
import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterJalali from "@date-io/date-fns-jalali";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { onlyNumberAndDot } from "../../../../../../validation/validation";
import { browser, radius } from "../../../../../../data/constants";
import useAxios from "../../../../../../customHooks/useAxios";
import { customerGroupUpdate } from "../../../../../../services/customerGroupService";
import { setDatePickerDate } from "../../../../../../validation/functions";

const TableModal = (props) => {
  const { app } = useContext(AppContext);
  const [response, loading, fetchData] = useAxios();
  const title = useRef();
  const description = useRef();
  const [ips, setIps] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [maxSession, setMaxSession] = useState(1);
  const [locations, setLocations] = useState([]);
  const [browsers, setBrowsers] = useState([]);
  const [activeDate, setActiveDate] = useState(false);
  const request=useRequest();
  const { t } = useTranslation();
  const [activation, setActivation] = useState(false);
  const abortController = new AbortController();

  useEffect(() => {
    const values=props.rowValus
    title.current.value=values.Title
    description.current.value=values.Description
    setActivation(values.IsActive)
    setActiveDate(values.IsLimited)
    setMaxSession(values.MaxSession)
    setFromDate(values.IsLimited?new Date(values.LimitFrom):null)
    setEndDate(values.IsLimited?new Date(values.LimitTo):null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const handleAddIP = () => {
    let ip = {
      from: "0.0.0.0",
      to: "0.0.0.0",
    };
    setIps((prev) => [...prev, ip]);
  };
  const handleAddBrowser = () => {
    let browser = "chrome";
    setBrowsers((prev) => [...prev, browser]);
  };
  const handleAddMap = () => {
    let location = {
      lat: "35.7316643",
      lng: "51.4116182",
      radius: "500m",
    };
    setLocations((prev) => [...prev, location]);
  };
  const handleChangeMaxSession = (value) => {
    let reg = "^[1-9]+[0-9]*$";
    if (value.match(reg)) {
      setMaxSession(value);
    }
  };
  const changeValue = (event, index, type) => {
    if (
      event.target.value.match(onlyNumberAndDot) ||
      event.target.value === ""
    ) {
      let newArr = ips.map((item, i) => {
        if (index === i) {
          return { ...item, [type]: event.target.value };
        } else {
          return item;
        }
      });
      setIps(newArr);
    }
  };
  const handleChangeBrowser = (event, index) => {
    let newArr = browsers.map((item, i) => {
      if (index === i) {
        return event.target.value;
      } else {
        return item;
      }
    });
    setBrowsers(newArr);
  };
  const handleChangeRadius = (event, index) => {
    let newArr = locations.map((item, i) => {
      if (index === i) {
        return { ...item, radius: event.target.value };
      } else {
        return item;
      }
    });
    setLocations(newArr);
  };
  const handleClickRemoveIP = (index) => {
    let filter = ips.filter((item, i) => i !== index);
    setIps(filter);
  };
  const handleClickRemoveBrowser = (index) => {
    let filter = browsers.filter((item, i) => i !== index);
    setBrowsers(filter);
  };
  const handleClickRemovelocation = (index) => {
    let filter = locations.filter((item, i) => i !== index);
    setLocations(filter);
  };
  const handleClickMap = (index) => {
    setModalShow(true);
    console.log(modalShow)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchData({
      method: "POST",
      url: customerGroupUpdate,
      headers: {
        accept: "*/*",
      },
      signal:abortController.signal,
      data: 
      {
        Id: props.rowValus.Id,
        IsActive: activation,
        Title: title.current.value,
        Description: description.current.value,
        MaxSession: maxSession,
        IsLimited: (fromDate !== null && endDate !== null) ? true : false ,
        LimitFrom: fromDate ? setDatePickerDate(fromDate) : "2000-01-01",
        LimitTo: fromDate ? setDatePickerDate(endDate) : "2000-01-01",
        Registrar: 0,
        DateSet: "2000-01-01",
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
              <Form.Label>{t("operatorGroupFormTitle")}</Form.Label>
              <Form.Control
                ref={title}
                type="text"
                placeholder={t("operatorGroupFormTitle")}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label> {t("operatorGroupFormDesc")}</Form.Label>
              <Form.Control required ref={description} as="textarea" rows={3} />
            </Form.Group>

            <div className="accordionOperatorGroup">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header></Accordion.Header>
                  <Accordion.Body className="accordionBody">
                    <div className="addBtn">
                      <bs.BsFillPlusCircleFill
                        size={25}
                        style={{ cursor: "pointer" }}
                        onClick={handleAddIP}
                      />
                      <b>{t("operatorGroup.ip")}</b>
                    </div>
                    {ips.map((i, index) => (
                      <div className="ipTextFields" key={index}>
                        <fa.FaMinus
                          size={25}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleClickRemoveIP(index)}
                        />
                        <Form.Control
                          type="text"
                          onChange={(event) => changeValue(event, index, "to")}
                          value={i.to}
                          maxLength={15}
                        />
                        <b>{t("ip.till")}</b>
                        <Form.Control
                          type="text"
                          maxLength={15}
                          value={i.from}
                          onChange={(event) =>
                            changeValue(event, index, "from")
                          }
                        />
                        <b>{t("ip.from")}</b>
                      </div>
                    ))}
                    <hr />
                    <div className="addBtn">
                      <bs.BsFillPlusCircleFill
                        size={25}
                        style={{ cursor: "pointer" }}
                        onClick={handleAddBrowser}
                      />
                      <b>{t("operatorGroup.browser")}</b>
                    </div>
                    {browsers.map((i, index) => (
                      <div className="browserSelects" key={index}>
                        <fa.FaMinus
                          size={20}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleClickRemoveBrowser(index)}
                        />
                        <Form.Select
                          value={i}
                          onChange={(event) =>
                            handleChangeBrowser(event, index)
                          }
                        >
                          {browser.map((b, index) => (
                            <option value={b.name} key={index}>
                              {b.name}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                    ))}
                    <hr />
                    <div className="addBtn">
                      <bs.BsFillPlusCircleFill
                        size={25}
                        style={{ cursor: "pointer" }}
                        onClick={handleAddMap}
                      />
                      <b>{t("operatorGroup.locations")}</b>
                    </div>
                    {locations.map((l, index) => (
                      <div className="locations" key={index}>
                        <fa.FaMinus
                          size={40}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleClickRemovelocation(index)}
                        />
                        <Form.Select
                          className="radiousSelect"
                          value={l.radius}
                          onChange={(event) => handleChangeRadius(event, index)}
                        >
                          <option disabled>{t("radious")}</option>
                          {radius.map((v, index) => (
                            <option value={v} key={index}>
                              {v}
                            </option>
                          ))}
                        </Form.Select>

                        <Form.Control type="text" disabled value={l.lng} />
                        <Form.Control type="text" disabled value={l.lat} />
                        <Button onClick={() => handleClickMap(index)}>
                          map
                        </Button>
                      </div>
                    ))}
                    <hr />
                    <div className="maxSessions">
                      <Form.Group className="mb-3">
                        <Form.Label>Max Session</Form.Label>
                        <Form.Control
                          type="number"
                          value={maxSession}
                          onChange={(e) =>
                            handleChangeMaxSession(e.target.value)
                          }
                        />
                      </Form.Group>
                    </div>
                    <hr />
                    <div className="datePickerTableModal">
                      <LocalizationProvider
                        dateAdapter={
                          app.lang === "fa" ? AdapterJalali : AdapterDateFns
                        }
                      >
                        <div>
                          <DatePicker
                            disabled={!activeDate}
                            mask="____/__/__"
                            label={t("startDate")}
                            value={fromDate}
                            onChange={(newValue) => {
                              setFromDate(newValue);
                              if (endDate !== null && newValue > endDate) {
                                toast.error(
                                  "تاریخ پایانی نمیتواند از تاریخ شروع کمتر باشد",
                                  {
                                    position: toast.POSITION.BOTTOM_CENTER,
                                  }
                                );

                                setEndDate(null);
                              }
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                }}
                              />
                            )}
                          />
                        </div>
                        <div class="switchDate">
                          <Form.Check
                            type="switch"
                            id="custom-switch"
                            onChange={() => setActiveDate((prev) => !prev)}
                            checked={activeDate}
                          />
                        </div>
                        <div>
                          <DatePicker
                            disabled={!activeDate}
                            mask="____/__/__"
                            label={t("endDate")}
                            value={endDate}
                            onChange={(newValue) => {
                              setEndDate(newValue);
                              if (fromDate !== null && newValue < fromDate) {
                                toast.error(
                                  "تاریخ پایانی نمیتواند از تاریخ شروع کمتر باشد",
                                  {
                                    position: toast.POSITION.BOTTOM_CENTER,
                                  }
                                );

                                setEndDate(null);
                              }
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                }}
                              />
                            )}
                          />
                        </div>
                      </LocalizationProvider>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
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
