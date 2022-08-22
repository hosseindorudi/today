import React, { useContext, useEffect, useState } from "react";
import { Accordion, Button, Form, Modal } from "react-bootstrap";

import AppContext from "../../../../../../contexts/AppContext";
import { useTranslation } from "react-i18next";
import useRequest from "../../../../../../customHooks/useRequest";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";

import useAxios from "../../../../../../customHooks/useAxios";
import { customerGroupReadTitle } from "../../../../../../services/customerGroupService";
import { customerUpdate } from "../../../../../../services/customerService";
import { toast } from "react-toastify";
import useWindowSize from "../../../../../../customHooks/useWindowSize";
import FieldSetBorder from "../../../../../../Components/fieldSetBorder/FieldSetBorder";
import { createSelectOptions } from "../../../../../../validation/functions";
import { CustomReactMultiSelect } from "../../../../../../Components/Select/customReactSelect";
import { checkBoolean } from "../../../../../../validation/validation";

const TableModal = (props) => {
  const values = props.rowValus;
  const widthOfScreen = useWindowSize().width;
  const [type, setType] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [dateOfSerial, setDateOfSerial] = useState(null);
  const { t } = useTranslation();
  const abortController = new AbortController();
  const [response, loading, fetchData, setResponse] = useAxios();
  const request = useRequest();
  const [groupTitles, setGroupTitles] = useState([]);
  const [groupTitleId, setGroupTitleId] = useState();
  const [isActive, setIsActive] = useState(true);
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [idCode, setIdCode] = useState("");
  const [gender, setGender] = useState(true);

  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [idCardNumber, setIdCardNumber] = useState("");
  const [idCardSerialNumber, setIdCardSerialNumber] = useState("");
  const [serialLocation, setSerialLocation] = useState("");
  const [webSite, setWebSite] = useState("");
  const [job, setjob] = useState("");
  const [acquaintedWithCompany, setAcquaintedWithCompany] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 7))
  );
  const [activeDate, setActiveDate] = useState(false);
  const [isReal, setIsReal] = useState(true);
  const [workFax, setWorkFax] = useState("");
  const [homeFax, setHomeFax] = useState("");
  const [legalNationalID, setlegalNationalID] = useState();
  const [legalCompanyName, setLegalCompanyName] = useState("");
  const [legalCompanyType, setLegalCompanyType] = useState("");
  const [legalEconomicCode, setLegalEconomicCod] = useState();
  const [legalRegistrationNumber, setLegalRegistrationNumber] = useState();
  const [legalRegistrationDate, setLegalRegistrationDate] = useState(null);
  const [licenseExpirationDate, setLicenseExpirationDate] = useState(null);
  const [customerNumber, setCustomerNumber] = useState("");
  const [legalExpireDate, setLegalExpireDate] = useState(null);
  const [legalRegistrationunit, setLegalRegistrationUnit] = useState("");
  const [legalRegistrationOrganization, setLegalRegistrationOrganization] =
    useState("");
  const [legalOfficFax, setLegalOfficFax] = useState("");
  const [legalFactoryFax, setLegalFactoryFax] = useState("");
  const [skype, setSkype] = useState("");
  const [faceBook, setFaceBook] = useState("");
  const [youtube, setYoutube] = useState("");
  const [instagram, setInstagram] = useState("");
  const [telegram, setTelegram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [storeTitle, setStoreTitle] = useState("");
  const { app } = useContext(AppContext);

  const getCustomerGroupTitle = () => {
    setType("GROUPTITLE");
    fetchData({
      method: "POST",
      url: customerGroupReadTitle,
      headers: request,

      signal: abortController.signal,
    });
  };
  useEffect(() => {
    getCustomerGroupTitle();


    setGroupTitleId(values.Group_Id);
    setIsActive(values.IsActive);
    setFirstName(values.Real_FirstName);
    setLastName(values.Real_LastName);
    setName(values.CustomerName);
    setIdCode(values.Real_NationalCode);
    setGender(values.Real_Gender);
    setDescription(values.Description);
    setEmail(values.Email);
    setFatherName(values.Real_FathersName);
    setIdCardNumber(values.Real_IdCardNumber);
    setIdCardSerialNumber(values.Real_IdCardSerialNumber);
    setSerialLocation(values.Real_PlaceOfIssuanceIdCard);
    setWebSite(values.Website);
    setjob(values.Real_Job);
    setAcquaintedWithCompany(values.AcquaintedWithCompany);
    setFromDate(new Date(values.LimitFrom));
    setEndDate(new Date(values.LimitTo));
    setActiveDate(values.IsLimited);
    setIsReal(values.IsReal);
    setWorkFax(values.Real_WorkFax);
    setHomeFax(values.Real_HomeFax);
    setlegalNationalID(values.Legal_NationalID);
    setLegalCompanyName(values.Legal_CompanyName);
    setLegalCompanyType(values.Legal_CompanyType);
    setLegalEconomicCod(values.Legal_EconomicCode);
    setLegalRegistrationNumber(values.Legal_RegistrationNumber);
    setLegalRegistrationDate(new Date(values.Legal_RegistrationDate));
    setLegalExpireDate(new Date(values.Legal_ExpirationDate));
    setLegalRegistrationUnit(values.Legal_RegistrationUnit);
    setLegalRegistrationOrganization(values.Legal_RegistrationOrganization);
    setLegalOfficFax(values.Legal_OfficeFax);
    setLegalFactoryFax(values.Legal_FactoryFax);
    setSkype(values.Skype);
    setFaceBook(values.Facebook);
    setYoutube(values.YouTube);
    setInstagram(values.Instagram);
    setTelegram(values.Telegram);
    setTwitter(values.Twitter);
    setLicenseExpirationDate(new Date(values.LicenseExpirationDate));
    setStoreTitle(values.StoreTitle);
    setCustomerNumber(values.CustomerNumber);
    setDateOfBirth(new Date(values.Real_DateOfBirth));
    setDateOfSerial(new Date(values.Real_DateOfIssuanceIdCard));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResponse = (response, type) => {
    switch (type) {
      case "GROUPTITLE":
        setGroupTitles(response.Title);
        setGroupTitles(createSelectOptions(response.Title));

        break;
      case "UPDATE":
        props.updated();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    response && handleResponse(response, type);
    return () => setResponse(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  useEffect(() => {
    setGroupTitleId(
      groupTitles.find((i) => i.value === props.rowValus.Group_Id)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupTitles]);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    console.log(groupTitleId);
    setType("UPDATE");
    fetchData({
      method: "POST",
      url: customerUpdate,
      headers: request,
      data: {
        Id: values.Id,
        Group_Id: Number(groupTitleId.value),
        Language_EId: 1,
        IsActive: isActive,
        CustomerName: name,
        Password: "",
        Email: email,
        AcquaintedWithCompany: acquaintedWithCompany,
        IsLimited: activeDate,
        LimitFrom: new Date(fromDate),
        LimitTo: new Date(endDate),
        Description: description,
        Website: webSite,
        Skype: skype,
        Facebook: faceBook,
        YouTube: youtube,
        Instagram: instagram,
        Telegram: telegram,
        Twitter: twitter,
        LicenseExpirationDate: new Date(licenseExpirationDate),
        StoreTitle: storeTitle,
        CustomerStatus_Id: 0,
        CustomerNumber: customerNumber,
        IsReal: isReal,
        Real_NationalCode: isReal ? idCode : "",
        Real_FirstName: isReal ? firstname : "",
        Real_LastName: isReal ? lastName : "",
        Real_FathersName: isReal ? fatherName : "",
        Real_IdCardNumber: isReal ? idCardNumber : "",
        Real_IdCardSerialNumber: isReal ? idCardSerialNumber : "",
        Real_Gender: isReal ?typeof(gender)==="boolean"?gender:checkBoolean(gender) : false,
        Real_DateOfBirth: new Date(dateOfBirth),
        Real_DateOfIssuanceIdCard: new Date(dateOfSerial),
        Real_PlaceOfIssuanceIdCard: isReal ? serialLocation : "",
        Real_HomeFax: isReal ? homeFax : "",
        Real_WorkFax: isReal ? workFax : "",
        Real_Job: isReal ? job : "",
        Legal_NationalID: !isReal ? legalNationalID : 0,
        Legal_CompanyName: !isReal ? legalCompanyName : "",
        Legal_CompanyType: !isReal ? legalCompanyType : "",
        Legal_EconomicCode: !isReal ? legalEconomicCode : 0,
        Legal_RegistrationNumber: !isReal ? legalRegistrationNumber : 0,
        Legal_RegistrationDate: new Date(legalRegistrationDate),
        Legal_ExpirationDate: new Date(legalExpireDate),
        Legal_RegistrationUnit: !isReal ? legalRegistrationunit : "",
        Legal_RegistrationOrganization: !isReal
          ? legalRegistrationOrganization
          : "",
        Legal_OfficeFax: !isReal ? legalOfficFax : "",
        Legal_FactoryFax: !isReal ? legalFactoryFax : "",
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
    >
      <Modal.Header closeButton></Modal.Header>

      <div className="periorityFormDefine">
        <form
          className="periorityForm"
          style={{ width: "80%" }}
          onSubmit={handleSubmitForm}
        >
          <b>{t("customerTitle")}</b>
          <FieldSetBorder legend="پایه">
            <div class="Row">
              <Form.Group className="mb-3 activationRow" controlId={"switch"}>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label={t("OperatorGroup.switch")}
                  value={isActive}
                  checked={isActive}
                  onChange={(e) => setIsActive(!isActive)}
                />
              </Form.Group>
            </div>
            <div className="Row">
              <Form.Group className="mb-3 customerFirstName">
                <Form.Control
                  type="text"
                  placeholder={t("customerUser")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              
            </div>
            <div className="Row">
              <Form.Group className="mb-3" controlId={"switch"}>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label={t("isReal")}
                  value={isReal}
                  checked={isReal}
                  onChange={(e) => setIsReal(!isReal)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                {/* <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setGroupTitleId(e.target.value)}
                > */}
                <CustomReactMultiSelect
                  isMulti={false}
                  options={groupTitles}
                  value={groupTitleId}
                  onchangeHandler={(e) => setGroupTitleId(e)}
                  placeholder={t("City")}
                />
              </Form.Group>
              {/* <option disabled>{t("customerGroup")}</option>
                  {groupTitles?.map((gt, i) => (
                    <option value={gt.Id} key={gt.Id}>
                      {gt.Value}
                    </option>
                  ))} */}
              {/* </Form.Select> */}
              {/* </Form.Group> */}
            </div>
            <div className="Row">
              <Form.Group className="mb-3 customerFirstName">
                <Form.Control
                  type="number"
                  placeholder={t("CustomerNumber")}
                  value={customerNumber}
                  onChange={(e) => setCustomerNumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId={"licenseExpirationDate"}>
                <DatePicker
                  containerClassName="custom-container"
                  placeholder={t("licenseExpirationDate")}
                  onChange={(newValue) => {
                    setLicenseExpirationDate(newValue);
                  }}
                  name="licenseExpirationDate"
                  calendar={app.lang === "fa" ? persian : gregorian}
                  locale={app.lang === "fa" ? persian_fa : gregorian_en}
                  calendarPosition="bottom-right"
                  value={licenseExpirationDate}
                />
              </Form.Group>
            </div>
            <div className="Row">
              <Form.Group className="mb-3 customerFirstName">
                <Form.Control
                  type="text"
                  placeholder={t("StoreTitle")}
                  value={storeTitle}
                  onChange={(e) => setStoreTitle(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="Row"></div>
          </FieldSetBorder>

          {isReal ? (
            <FieldSetBorder legend="حقیقی">
              <div
                className="Row"
                style={{ display: !isReal ? "none" : "flex" }}
              >
                <Form.Group className="mb-3 customerFirstName">
                  <Form.Control
                    type="text"
                    placeholder={t("Name")}
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3 customerFirstName">
                  <Form.Control
                    type="text"
                    placeholder={t("lastname")}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div
                className="Row"
                style={{ display: !isReal ? "none" : "flex" }}
              >
                <Form.Group className="mb-3 customerFirstName">
                  <Form.Control
                    type="text"
                    placeholder={t("FathersName")}
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3 customerFirstName">
                  <Form.Control
                    type="number"
                    placeholder={t("IdCardNumber")}
                    value={idCardNumber}
                    onChange={(e) => setIdCardNumber(e.target.value)}
                  />
                </Form.Group>
              </div>

              <div
                className="Row"
                style={{ display: !isReal ? "none" : "flex" }}
              >
                <Form.Group className="mb-3 customerFirstName">
                  <Form.Control
                    type="text"
                    placeholder={t("idcode")}
                    value={idCode}
                    onChange={(e) => setIdCode(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option disabled>{t("gender")}</option>
                    <option value={true}>{t("male")}</option>
                    <option value={false}>{t("female")}</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div
                className="Row"
                style={{ display: !isReal ? "none" : "flex" }}
              >
                <Form.Group className="mb-3 customerFirstName">
                  <Form.Control
                    type="text"
                    placeholder={t("IdCardSerialNumber")}
                    value={idCardSerialNumber}
                    onChange={(e) => setIdCardSerialNumber(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId={"DateOfBirth"}>
                  <DatePicker
                    containerClassName="custom-container"
                    onChange={(newValue) => {
                      setDateOfBirth(newValue);
                    }}
                    name="LimitTo"
                    placeholder={t("DateOfBirth")}
                    calendar={app.lang === "fa" ? persian : gregorian}
                    locale={app.lang === "fa" ? persian_fa : gregorian_en}
                    calendarPosition="bottom-right"
                    value={dateOfBirth}
                  />
                </Form.Group>
              </div>
              <div
                className="Row"
                style={{ display: !isReal ? "none" : "flex" }}
              >
                <Form.Group className="mb-3 customerFirstName">
                  <Form.Control
                    type="text"
                    placeholder={t("serialLocation")}
                    value={serialLocation}
                    onChange={(e) => setSerialLocation(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId={"serialDate"}>
                  <DatePicker
                    containerClassName="custom-container"
                    placeholder={t("serialDate")}
                    onChange={(newValue) => {
                      setDateOfSerial(newValue);
                    }}
                    name="LimitTo"
                    calendar={app.lang === "fa" ? persian : gregorian}
                    locale={app.lang === "fa" ? persian_fa : gregorian_en}
                    calendarPosition="bottom-right"
                    value={dateOfSerial}
                  />
                </Form.Group>
              </div>
              <div
                className="Row"
                style={{ display: !isReal ? "none" : "flex" }}
              >
                <Form.Group
                  className="mb-3 customerFirstName"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder={t("workFax")}
                    value={workFax}
                    onChange={(e) => setWorkFax(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 customerFirstName"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder={t("homeFax")}
                    value={homeFax}
                    onChange={(e) => setHomeFax(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div
                className="Row"
                style={{ display: !isReal ? "none" : "flex" }}
              >
                <Form.Group
                  className="mb-3 customerFirstName"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder={t("job")}
                    value={job}
                    onChange={(e) => setjob(e.target.value)}
                  />
                </Form.Group>
              </div>
            </FieldSetBorder>
          ) : (
            <FieldSetBorder legend="حقوقی">
              <div
                className="Row"
                style={{ display: isReal ? "none" : "flex" }}
              >
                <Form.Group className="mb-3 customerFirstName">
                  <Form.Control
                    type="number"
                    placeholder={t("legalnationalID")}
                    value={legalNationalID}
                    onChange={(e) => setlegalNationalID(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3 customerFirstName">
                  <Form.Control
                    type="text"
                    placeholder={t("legalCompanyName")}
                    value={legalCompanyName}
                    onChange={(e) => setLegalCompanyName(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div
                className="Row"
                style={{ display: isReal ? "none" : "flex" }}
              >
                <Form.Group className="mb-3 customerFirstName">
                  <Form.Control
                    type="text"
                    placeholder={t("legalCompanyType")}
                    value={legalCompanyType}
                    onChange={(e) => setLegalCompanyType(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3 customerFirstName">
                  <Form.Control
                    type="number"
                    placeholder={t("legalEconomicCode")}
                    value={legalEconomicCode}
                    onChange={(e) => setLegalEconomicCod(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div
                className="Row"
                style={{ display: isReal ? "none" : "flex" }}
              >
                <Form.Group className="mb-3 customerFirstName">
                  <Form.Control
                    type="number"
                    placeholder={t("legalRegistrationNumber")}
                    value={legalRegistrationNumber}
                    onChange={(e) => setLegalRegistrationNumber(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3 customerFirstName">
                  <Form.Control
                    type="text"
                    placeholder={t("legalRegistrationUnit")}
                    value={legalRegistrationunit}
                    onChange={(e) => setLegalRegistrationUnit(e.target.value)}
                  />
                </Form.Group>
              </div>

              <div
                className="Row"
                style={{ display: isReal ? "none" : "flex" }}
              >
                <Form.Group className="mb-3" controlId={"startDate"}>
                  <DatePicker
                    containerClassName="custom-container"
                    placeholder={t("legalRegistrationDate")}
                    onChange={(newValue) => {
                      setLegalRegistrationDate(newValue);
                      if (
                        legalExpireDate !== null &&
                        newValue > legalExpireDate
                      ) {
                        toast.error(
                          "تاریخ پایانی نمیتواند از تاریخ شروع کمتر باشد",
                          {
                            position: toast.POSITION.BOTTOM_CENTER,
                          }
                        );

                        setLegalExpireDate(null);
                      }
                    }}
                    name="LimitTo"
                    calendar={app.lang === "fa" ? persian : gregorian}
                    locale={app.lang === "fa" ? persian_fa : gregorian_en}
                    calendarPosition="bottom-right"
                    value={legalRegistrationDate}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId={"endDate"}>
                  <DatePicker
                    containerClassName="custom-container"
                    placeholder={t("endDate")}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                      if (
                        legalRegistrationDate !== null &&
                        newValue < legalRegistrationDate
                      ) {
                        toast.error(
                          "تاریخ پایانی نمیتواند از تاریخ شروع کمتر باشد",
                          {
                            position: toast.POSITION.BOTTOM_CENTER,
                          }
                        );

                        setLegalExpireDate(null);
                      }
                    }}
                    name="LimitTo"
                    calendar={app.lang === "fa" ? persian : gregorian}
                    locale={app.lang === "fa" ? persian_fa : gregorian_en}
                    calendarPosition="bottom-right"
                    value={legalExpireDate}
                  />
                </Form.Group>
              </div>

              <div
                className="Row"
                style={{ display: isReal ? "none" : "flex" }}
              >
                <Form.Group className="mb-3 customerFirstName">
                  <Form.Control
                    type="text"
                    placeholder={t("legalRegistrationOrganization")}
                    value={legalRegistrationOrganization}
                    onChange={(e) =>
                      setLegalRegistrationOrganization(e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 customerFirstName">
                  <Form.Control
                    type="text"
                    placeholder={t("legalOfficFax")}
                    value={legalOfficFax}
                    onChange={(e) => setLegalOfficFax(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div
                className="Row"
                style={{ display: isReal ? "none" : "flex" }}
              >
                <Form.Group className="mb-3 customerFirstName">
                  <Form.Control
                    type="text"
                    placeholder={t("legalFactoryFax")}
                    value={legalFactoryFax}
                    onChange={(e) => setLegalFactoryFax(e.target.value)}
                  />
                </Form.Group>
              </div>
            </FieldSetBorder>
          )}
          <FieldSetBorder legend="اطلاعات اضافی">
            <div className="Row">
              <Form.Group
                className="mb-3 customerFirstName"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder={t("AcquaintedWithCompany")}
                  value={acquaintedWithCompany}
                  onChange={(e) => setAcquaintedWithCompany(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="Row">
              <Form.Group
                className="mb-3 customerFirstName"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder={t("description")}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </div>

            <Accordion style={{ width: "100%" }}>
              <Accordion.Item eventKey="0">
                <Accordion.Header></Accordion.Header>
                <Accordion.Body>
                  <div className="Row">
                    <Form.Group className="mb-3 customerFirstName">
                      <Form.Control
                        type="text"
                        placeholder={t("Skype")}
                        value={skype}
                        onChange={(e) => setSkype(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 customerFirstName">
                      <Form.Control
                        type="text"
                        placeholder={t("Facebook")}
                        value={faceBook}
                        onChange={(e) => setFaceBook(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="Row">
                    <Form.Group className="mb-3 customerFirstName">
                      <Form.Control
                        type="text"
                        placeholder={t("YouTube")}
                        value={youtube}
                        onChange={(e) => setYoutube(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 customerFirstName">
                      <Form.Control
                        type="text"
                        placeholder={t("Instagram")}
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="Row">
                    <Form.Group className="mb-3 customerFirstName">
                      <Form.Control
                        type="text"
                        placeholder={t("Telegram")}
                        value={telegram}
                        onChange={(e) => setTelegram(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 customerFirstName">
                      <Form.Control
                        type="text"
                        placeholder={t("Twitter")}
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                      />
                    </Form.Group>
                  </div>

                  <div className="Row">
                    <Form.Group
                      className="mb-3 customerFirstName"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Control
                        type="email"
                        placeholder={t("customerEmail")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 customerFirstName">
                      <Form.Control
                        type="text"
                        placeholder={t("website")}
                        value={webSite}
                        onChange={(e) => setWebSite(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <div className="Row">
              <Form.Group className="mb-3" controlId={"startDate"}>
                <DatePicker
                  containerClassName="custom-container"
                  placeholder={t("startDate")}
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
                  name="LimitTo"
                  calendar={app.lang === "fa" ? persian : gregorian}
                  locale={app.lang === "fa" ? persian_fa : gregorian_en}
                  calendarPosition="bottom-right"
                  value={fromDate}
                  disabled={!activeDate}
                />
              </Form.Group>

              <Form.Check
                type="switch"
                id="custom-switch"
                onChange={() => setActiveDate((prev) => !prev)}
                checked={activeDate}
              />

              <Form.Group className="mb-3" controlId={"endDate"}>
                <DatePicker
                  containerClassName="custom-container"
                  placeholder={t("endDate")}
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
                  name="LimitTo"
                  calendar={app.lang === "fa" ? persian : gregorian}
                  locale={app.lang === "fa" ? persian_fa : gregorian_en}
                  calendarPosition="bottom-right"
                  value={endDate}
                  disabled={!activeDate}
                />
              </Form.Group>
            </div>
          </FieldSetBorder>

          <div className="Row">
            {widthOfScreen > 420 && (
              <Button type="submit" disabled={loading} style={{ margin: "0 auto" }}>
                {t("submit")}
              </Button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TableModal;
