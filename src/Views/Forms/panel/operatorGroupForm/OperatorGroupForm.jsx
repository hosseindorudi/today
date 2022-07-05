import Group from "./List/Group";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Form } from "react-bootstrap";
import useRequest from "../../../../customHooks/useRequest";
import useAxios from "../../../../customHooks/useAxios";
import BackDrop from "../../../../Components/backDrop/BackDrop";
import { TabContext } from "../../../../contexts/TabContextProvider";
import { enums } from "../../../../data/Enums";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { groupCreate } from "../../../../services/groupService";
import AppContext from "../../../../contexts/AppContext";
import { handleError, setDatePickerDate } from "../../../../validation/functions";
const OperatorGroupForm = () => {
  const {app}=useContext(AppContext)
  const [validated, setValidated] = useState(false);
  const { t } = useTranslation();
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();
  const tabContext = useContext(TabContext);
  const abortController = new AbortController();
  const [values, setValues] = useState({
    IsActive: true,
    Title: "",
    MaxSession: 1,
    IsLimited: false,
    LimitFrom: new Date(),
    LimitTo: new Date(),
    Description: "",
  });
  const handleClickMenu = () => {
    tabContext.addRemoveTabs(
      {
        Component: OperatorGroupForm,
        path: "/Operator/Group/Create",
        title: "/Operator/Group/Create",
        access: enums.Operator_Group_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "routes.group",
        path: "/Operator/Group/Read",
        access: enums.Operator_Group_Read_r,
        Component: Group,
      },

      "add"
    );
  };
  // const handleAddIP = () => {
  //   let ip = {
  //     from: "0.0.0.0",
  //     to: "0.0.0.0",
  //   };
  //   setIps((prev) => [...prev, ip]);
  // };
  // const handleAddBrowser = () => {
  //   let browser = "chrome";
  //   setBrowsers((prev) => [...prev, browser]);
  // };
  // const handleAddMap = () => {
  //   let location = {
  //     lat: "35.7316643",
  //     lng: "51.4116182",
  //     radius: "500m",
  //   };
  //   setLocations((prev) => [...prev, location]);
  // };

  // const handleChangeBrowser = (event, index) => {
  //   let newArr = browsers.map((item, i) => {
  //     if (index === i) {
  //       return event.target.value;
  //     } else {
  //       return item;
  //     }
  //   });
  //   setBrowsers(newArr);
  // };
  // const handleChangeRadius = (event, index) => {
  //   let newArr = locations.map((item, i) => {
  //     if (index === i) {
  //       return { ...item, radius: event.target.value };
  //     } else {
  //       return item;
  //     }
  //   });
  //   setLocations(newArr);
  // };
  // const handleClickRemoveIP = (index) => {
  //   let filter = ips.filter((item, i) => i !== index);
  //   setIps(filter);
  // };
  // const handleClickRemoveBrowser = (index) => {
  //   let filter = browsers.filter((item, i) => i !== index);
  //   setBrowsers(filter);
  // };
  // const handleClickRemovelocation = (index) => {
  //   let filter = locations.filter((item, i) => i !== index);
  //   setLocations(filter);
  // };
  // const handleClickMap = (index) => {
  //   setModalShow(true);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity()) {
    fetchData({
      method: "POST",
      url: groupCreate,
      headers: {
        accept: "*/*",
      },
      signal: abortController.signal,
      data: {
        IsActive: values.IsActive,
        Title: values.Title,
        MaxSession: values.MaxSession,
        IsLimited: values.IsLimited,
        LimitFrom: setDatePickerDate(values.LimitFrom),
        LimitTo: setDatePickerDate(values.LimitTo),
        Description: values.Description,
        request: request,
      },
    });
  }
  };

  useEffect(() => {
    if (response) {
      response.Result
        ? handleClickMenu()
        : handleError(response.Message);
       
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleChangeSwitch = (e) => {
    setValues({ ...values, [e.target.name]: e.target.checked });
  };
  const setDate = (date,name) => {
    setValues({ ...values, [name]: date.toDate() });
  };
  return (
    <>
      {loading && <BackDrop open={true} />}
      <div className="periorityFormDefine">
        <Form
          className="periorityForm"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <b>{t("/Operator/Group/Create")}</b>
          <div className="Row ">
            <Form.Group className="mb-3" controlId={"switch"}>
              <Form.Label>{t("IsActive")}</Form.Label>
              <Form.Check
                style={{ textAlign: "center" }}
                type="switch"
                checked={values.IsActive}
                name="IsActive"
                onChange={handleChangeSwitch}
              />
            </Form.Group>
          </div>
          <div className="Row">
            <Form.Group className="mb-3" controlId={"title"}>
              <Form.Label>{t("title")}</Form.Label>
              <Form.Control
                required
                type="text"
                value={values.Title}
                placeholder={t("title")}
                name="Title"
                onChange={onChangeHandler}
              />
            </Form.Group>
          </div>
          <div className="Row">
            <Form.Group className="mb-3" controlId={"maxSession"}>
              <Form.Label>{t("MaxSession")}</Form.Label>
              <Form.Control
                required
                style={{ textAlign: "center" }}
                type="number"
                value={values.MaxSession}
                placeholder={t("MaxSession")}
                name="MaxSession"
                min={1}
                max={1000}
                onChange={onChangeHandler}
              />
            </Form.Group>
          </div>
          <div className="Row">
            <Form.Group className="mb-3" controlId={"description"}>
              <Form.Label>{t("Description")}</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                type="text"
                value={values.Description}
                placeholder={t("Description")}
                name="Description"
                onChange={onChangeHandler}
              />
            </Form.Group>
          </div>
          <div className="Row">
            <Form.Group className="mb-3" controlId={"LimitFrom"}>
              <Form.Label>{t("LimitFrom")}</Form.Label>
              <DatePicker
                containerClassName="custom-container"
                onChange={(e)=>setDate(e,"LimitFrom")}
                name='LimitFrom'
                calendar={app.lang === "fa" ? persian : gregorian}
                locale={app.lang === "fa" ? persian_fa : gregorian_en}
                calendarPosition="bottom-right"
                value={values.LimitFrom}
                disabled={!values.IsLimited}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId={"IsLimited"}>
              <Form.Label>{t("IsLimited")}</Form.Label>
              <Form.Check
                style={{ textAlign: "center" }}
                type="switch"
                checked={values.IsLimited}
                name="IsLimited"
                onChange={handleChangeSwitch}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId={"LimitTo"}>
              <Form.Label>{t("LimitTo")}</Form.Label>
              <DatePicker
                containerClassName="custom-container"
                onChange={(e)=>setDate(e,"LimitTo")}
                name='LimitTo'
                calendar={app.lang === "fa" ? persian : gregorian}
                locale={app.lang === "fa" ? persian_fa : gregorian_en}
                calendarPosition="bottom-right"
                value={values.LimitTo}
                disabled={!values.IsLimited}
              />
            </Form.Group>
          </div>

          <Button disabled={loading} type="submit">
            {t("submit")}
          </Button>
        </Form>
      </div>
      {/* <div className="OperatorGroupForm">
      <h5 className="OperatorGroupFormTitle">{t("operatorGroupFormHeader")}</h5>
      <div className="OperatorGroupFormMainDiv">
        <form onSubmit={handleSubmit} className="OperatorGroupFormform">
          <div class="switch">
            <Form.Check
              type="switch"
              id="custom-switch"
              label={t("OperatorGroup.switch")}
              onChange={()=> setActivation(prev => !prev)}
              checked ={activation}
            />
          </div>
          <div className="inputDivGroup">
            <label htmlFor="OperatorGroupFormInputTitle1">
              {t("operatorGroupFormTitle")}:
            </label>
            <input
            ref={title}
            required
              type="text"
              className="OperatorGroupFormInputTitle"
              id="OperatorGroupFormInputTitle1"
            />
          </div>
          <div className="inputDivDescGroup">
            <label htmlFor="OperatorGroupFormInputDesc">
              {t("operatorGroupFormDesc")}:
            </label>
            <textarea
            ref={description}
            required
              type="text"
              className="OperatorGroupFormInputDesc"
              id="OperatorGroupFormInputDesc"
            />
          </div>
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
                        onChange={(event) => changeValue(event, index, "from")}
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
                        onChange={(event) => handleChangeBrowser(event, index)}
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
                      <Button onClick={() => handleClickMap(index)}>map</Button>
                    </div>
                  ))}
                  <hr />
                  <div className="maxSessions">
                    <Form.Group className="mb-3">
                      <Form.Label>Max Session</Form.Label>
                      <Form.Control
                        type="number"
                        value={maxSession}
                        onChange={(e) => handleChangeMaxSession(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <hr />
                  <div className="datePickerGroup" >
                   
                    <LocalizationProvider dateAdapter={app.lang==="fa"?AdapterJalali:AdapterDateFns}>
                    <div>
                      <DatePicker
                        disabled={!activeDate}
                        mask="____/__/__"
                        label={t("startDate")}
                        value={fromDate}
                        onChange={(newValue) => {
                          setFromDate(newValue);
                          if (endDate !== null && newValue > endDate) {
                            toast.error("تاریخ پایانی نمیتواند از تاریخ شروع کمتر باشد", {
                              position: toast.POSITION.BOTTOM_CENTER,
                            });
                            
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
                          onChange={()=> setActiveDate(prev => !prev)}
                          checked ={activeDate}
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
                            toast.error("تاریخ پایانی نمیتواند از تاریخ شروع کمتر باشد", {
                              position: toast.POSITION.BOTTOM_CENTER,
                            });
                            
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
          <div className="submitBtn">
            <input
              type="submit"
              value={t("operatorGroupFormSubmit")}
              className="deleteBtnForm"
           
            />
          </div>
        </form>
      </div>

    </div> */}
    </>
  );
};

export default OperatorGroupForm;
