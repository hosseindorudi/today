import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";

import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import AppContext from "../../../../contexts/AppContext";

import useAxios from "../../../../customHooks/useAxios";
import useRequest from "../../../../customHooks/useRequest";

import BackDrop from "../../../../Components/backDrop/BackDrop";
import { enums } from "../../../../data/Enums";
import { TabContext } from "../../../../contexts/TabContextProvider";

import { customerGroupReadTitle } from "../../../../services/customerGroupService";
import { idCodeValidation } from "../../../../validation/validation";
import CustomerList from "./list/CustomerList";

// import { setDatePickerDate } from '../../../../validation/functions';
import { customerCreate } from "../../../../services/customerService";
import useWindowSize from "../../../../customHooks/useWindowSize";
const CustomerForm = () => {
  const widthOfScreen = useWindowSize().width;
  const [type, setType] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [dateOfSerial, setDateOfSerial] = useState(null);
  const { t } = useTranslation();
  const abortController = new AbortController();
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();
  const [groupTitles, setGroupTitles] = useState([]);
  const [groupTitleId, setGroupTitleId] = useState();
  const tabContext = useContext(TabContext);
  const [isActive, setIsActive] = useState(true);
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
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
  const [fromDate, setFromDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeDate, setActiveDate] = useState(false);
  const [isOfficially, setIsOfficially] = useState(true);
  const [isReal, setIsReal] = useState(true);
  const [workFax, setWorkFax] = useState("");
  const [homeFax, setHomeFax] = useState("");
  const [legalNationalID, setlegalNationalID] = useState();
  const [legalCompanyName, setLegalCompanyName] = useState("");
  const [legalCompanyType, setLegalCompanyType] = useState("");
  const [legalEconomicCode, setLegalEconomicCod] = useState();
  const [legalRegistrationNumber, setLegalRegistrationNumber] = useState();
  const [legalRegistrationDate, setLegalRegistrationDate] = useState(null);
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

  const { app } = useContext(AppContext);
  const handleClickMenu = () => {
    tabContext.addRemoveTabs(
      {
        title: "routes.customerForm",
        path: "/customerform",
        Component: CustomerForm,
        access: enums.Customer_Customer_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "routes.CustomerList",
        path: "/customerList",
        Component: CustomerList,
        access: enums.Customer_Customer_Read_r,
      },

      "add"
    );
  };

  useEffect(() => {
    setType("READTITLE");
    fetchData({
      method: "POST",
      url: customerGroupReadTitle,
      headers: request,

      signal: abortController.signal,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleError = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const handleSeccess = (message) => {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  const handleResponse = (response, type) => {
    switch (type) {
      case "READTITLE":
        setGroupTitles(response.Title);
        response.Title.length && setGroupTitleId(response.Title[0].Id);

        break;
      case "SUBMIT":
        handleSeccess(t("customer.created"));
        handleClickMenu();
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    response && handleResponse(response, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!firstname) {
      handleError(t("customer1"));
      return;
    } else if (!lastName) {
      handleError(t("customer2"));
      return;
    } else if (!name) {
      handleError(t("customer3"));
      return;
    } else if (!password) {
      handleError(t("customer4"));
      return;
    } else if (!idCode) {
      handleError(t("customer5"));
      return;
    } else if (!idCodeValidation(idCode)) {
      handleError(t("customer7"));
      return;
    } else {
      setType("SUBMIT");
      fetchData({
        method: "POST",
        url: customerCreate,
        headers: request,
        data: {
          Id: 0,
          Group_Id: Number(groupTitleId),
          Language_EId: 1,
          IsActive: isActive,
          CustomerName: name,
          Password: password,
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
          IsOfficially: isOfficially,
          IsReal: isReal,
          Real_NationalCode: isReal ? idCode : "",
          Real_FirstName: isReal ? firstname : "",
          Real_LastName: isReal ? lastName : "",
          Real_FathersName: isReal ? fatherName : "",
          Real_IdCardNumber: isReal ? idCardNumber : "",
          Real_IdCardSerialNumber: isReal ? idCardSerialNumber : "",
          Real_Gender: isReal ? gender : "",
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
    }
  };

  return (
    <>
      {loading && <BackDrop open={true} />}

      <div className="periorityFormDefine">
        <form className="periorityForm" onSubmit={handleSubmitForm}>
          <b>{t("customerTitle")}</b>
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
            <Form.Group className="mb-3 customerFirstName">
              <Form.Control
                type="password"
                placeholder={t("password")}
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </Form.Group>
          </div>

          <div className="Row">
            <Form.Group className="mb-3" controlId={"switch"}>
              <Form.Check
                type="switch"
                id="custom-switch"
                label={t("IsOfficially")}
                value={isOfficially}
                checked={isOfficially}
                onChange={(e) => setIsOfficially(!isOfficially)}
              />
            </Form.Group>
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
          </div>

          <div className="Row" style={{ display: !isReal ? "none" : "flex" }}>
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
          <div className="Row" style={{ display: !isReal ? "none" : "flex" }}>
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

          <div className="Row" style={{ display: !isReal ? "none" : "flex" }}>
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
          <div className="Row" style={{ display: !isReal ? "none" : "flex" }}>
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
          <div className="Row" style={{ display: !isReal ? "none" : "flex" }}>
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
          <div className="Row" style={{ display: !isReal ? "none" : "flex" }}>
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
          <div className="Row" style={{ display: !isReal ? "none" : "flex" }}>
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

          <div className="Row" style={{ display: isReal ? "none" : "flex" }}>
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
          <div className="Row" style={{ display: isReal ? "none" : "flex" }}>
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
          <div className="Row" style={{ display: isReal ? "none" : "flex" }}>
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

          <div className="Row" style={{ display: isReal ? "none" : "flex" }}>
            <Form.Group className="mb-3" controlId={"startDate"}>
              <DatePicker
                containerClassName="custom-container"
                placeholder={t("legalRegistrationDate")}
                onChange={(newValue) => {
                  setLegalRegistrationDate(newValue);
                  if (legalExpireDate !== null && newValue > legalExpireDate) {
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

          <div className="Row" style={{ display: isReal ? "none" : "flex" }}>
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
          <div className="Row" style={{ display: isReal ? "none" : "flex" }}>
            <Form.Group className="mb-3 customerFirstName">
              <Form.Control
                type="text"
                placeholder={t("legalFactoryFax")}
                value={legalFactoryFax}
                onChange={(e) => setLegalFactoryFax(e.target.value)}
              />
            </Form.Group>
          </div>

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
          <div className="Row">
            <Form.Group className="mb-3">
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setGroupTitleId(e.target.value)}
              >
                <option disabled>{t("customerGroup")}</option>
                {groupTitles.map((gt, i) => (
                  <option value={gt.Id} key={gt.Id}>
                    {gt.Value}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>

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
          <div className="Row">
            {widthOfScreen > 420 && (
              <Button type="submit">{t("submit")}</Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default CustomerForm;
