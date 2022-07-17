import React, { useCallback, useEffect, useState } from "react";
import useAxios from "../../../customHooks/useAxios";
import useRequest from "../../../customHooks/useRequest";
import { defaultCoordinates } from "../../../data/constants";
import { areaReadTitle } from "../../../services/areaService";
import { cityReadTitle } from "../../../services/cityService";
import { countryReadTitle } from "../../../services/countryService";
import {
  customerCreateAddress,
  customerDeleteAddress,
  customerReadAddress,
  customerUpdateAddress,
} from "../../../services/customerService";
import * as fa from "react-icons/fa";
import "./customerAccountModal.css";
import { provinceReadTitle } from "../../../services/provinceService";
import { sectionReadTitle } from "../../../services/sectionService";
import {
  createSelectOptions,
  handleError,
} from "../../../validation/functions";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Button,
  Form,
  Modal,
  ListGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { CustomReactMultiSelect } from "../../Select/customReactSelect";
import MapModal from "../../map/MapModal";
const CustomerAccountModal = (props) => {
  const [response, loading, fetchData, setResponse] = useAxios();
  const request = useRequest();

  const [country, setCountry] = useState(undefined);
  const [countryOptions, setCountryOptions] = useState([]);
  const [province, setProvince] = useState(undefined);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [city, setCity] = useState(undefined);
  const [cityOptions, setCityOptions] = useState([]);
  const [section, setSection] = useState(undefined);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [area, setArea] = useState(undefined);
  const [areaOptions, setAreaOptions] = useState([]);
  const abortController = new AbortController();
  const [editButtonActivate, setEditButtonActivate] = useState(false);
  const [rowID, setRowId] = useState("");
  const [coordinates, setCoordinates] = useState(defaultCoordinates);
  const { t } = useTranslation();
  const [requestType, setRequestType] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [values, setValues] = useState({
    IsPrimary: true,
    PostalCode: "",
    MainStreet: "",
    ByStreet: "",
    Alley: "",
    Plaque: 0,
    Floor: 0,
    Unit: 0,
    Address: "",
    Description: "",
    Title: "",
  });

  const setEmpty = () => {
    setValues({
      IsPrimary: true,
      PostalCode: "",
      MainStreet: "",
      ByStreet: "",
      Alley: "",
      Plaque: 0,
      Floor: 0,
      Unit: 0,
      Address: "",
      Description: "",
      Title: "",
    });
    setCountry(undefined);
    setProvince(undefined);
    setCity(undefined);
    setSection(undefined);
    setArea(undefined);
    setCoordinates(defaultCoordinates);
  };

  const readDatas = () => {
    setRequestType("READADDRESS");
    fetchData({
      method: "POST",
      url: customerReadAddress,
      headers: {
        accept: "*/*",
      },
      data: {
        Id: props.rowValues,
        Request: request,
      },
      signal: abortController.signal,
    });
  };
  const createParams = (service) => {
    const params = {
      method: "POST",
      url: service,
      headers: {
        accept: "*/*",
      },
      data: request,
    };
    return params;
  };

  const readOptions = () => {
    const provinceTitle = axios.request(createParams(provinceReadTitle));
    const countryTitles = axios.request(createParams(countryReadTitle));
    const cityTitles = axios.request(createParams(cityReadTitle));
    const sectionTitles = axios.request(createParams(sectionReadTitle));
    const areaTitles = axios.request(createParams(areaReadTitle));
    axios
      .all([
        provinceTitle,
        countryTitles,
        cityTitles,
        sectionTitles,
        areaTitles,
      ])
      .then(
        axios.spread((...allData) => {
          allData[0].data?.Result
            ? setProvinceOptions(createSelectOptions(allData[0].data.Title))
            : handleError(allData[0].data.Message);
          allData[1].data?.Result
            ? setCountryOptions(createSelectOptions(allData[1].data.Title))
            : handleError(allData[1].data.Message);
          allData[2].data?.Result
            ? setCityOptions(createSelectOptions(allData[2].data.Title))
            : handleError(allData[2].data.Message);
          allData[3].data?.Result
            ? setSectionOptions(createSelectOptions(allData[3].data.Title))
            : handleError(allData[3].data.Message);
          allData[4].data?.Result
            ? setAreaOptions(createSelectOptions(allData[4].data.Title))
            : handleError(allData[4].data.Message);
        })
      )
      .catch((error) => {
        handleError(error.message);
      });
  };

  useEffect(() => {
    readDatas();
    readOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResponse = useCallback(
    (response, type) => {
      switch (type) {
        case "DELETE":
          handleDeleted();

          break;
        case "SUBMIT":
          readDatas();
          setEmpty();
          break;
        case "READADDRESS":
          setAddresses(response.Record);
          break;
        default:
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const deleteRecord = (id) => {
    setRequestType("DELETE");
    fetchData({
      method: "POST",
      url: customerDeleteAddress,
      headers: {
        accept: "*/*",
      },
      data: {
        Id: id,
        Request: request,
      },
      signal: abortController.signal,
    });
  };

  const handleDeleted = () => {
    Swal.fire(
      t("sweetAlert.deleted"),
      t("sweetAlert.recordDeleted"),
      "success"
    );
    setEmpty();
    readDatas();
  };

  const deleteCalled = (id) => {
    Swal.fire({
      title: t("table.deleteTitle"),
      text: t("table.noReturn"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("sweetAlert.yes"),
      cancelButtonText: t("sweetAlert.cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecord(id);
      }
    });
  };

  useEffect(() => {
    if (response) {
      response.Result
        ? handleResponse(response, requestType)
        : handleError(response.Message);

      setResponse(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestType("SUBMIT");

    fetchData({
      method: "POST",
      url: customerCreateAddress,
      headers: {
        accept: "*/*",
      },
      signal: abortController.signal,
      data: {
        Id: 0,
        Customer_Id: props.rowValues,
        Country_Id: country?.value,
        Province_Id: province?.value,
        City_Id: city?.value,
        Section_Id: section?.value,
        Area_Id: area?.value,
        IsPrimary: values.IsPrimary,
        PostalCode: values.PostalCode,
        MainStreet: values.MainStreet,
        ByStreet: values.ByStreet,
        Alley: values.Alley,
        Plaque: values.Plaque,
        Floor: values.Floor,
        Unit: values.Unit,
        Address: values.Address,
        Latitude: coordinates[0],
        Longitude: coordinates[1],
        Description: values.Description,
        Title: values.Title,
        Request: request,
      },
    });
  };

  const handleQuestionEdit = (record) => {
    console.log(record);
    setEditButtonActivate(true);
    setValues({
      IsPrimary: record.IsPrimary,
      PostalCode: record.PostalCode,
      MainStreet: record.MainStreet,
      ByStreet: record.ByStreet,
      Alley: record.Alley,
      Plaque: record.Plaque,
      Floor: record.Floor,
      Unit: record.Unit,
      Address: record.Address,
      Description: record.Description,
      Title: record.Title,
    });
    setCountry(countryOptions.find((f) => f.value === record.Country_Id));
    setProvince(provinceOptions.find((f) => f.value === record.Province_Id));
    setCity(cityOptions.find((f) => f.value === record.City_Id));
    setSection(sectionOptions.find((f) => f.value === record.Section_Id));
    setArea(areaOptions.find((f) => f.value === record.Area_Id));
    setCoordinates([record.Latitude, record.Longitude]);
    setRowId(record.Id);
  };

  const cancletationOFEdit = () => {
    setEditButtonActivate(false);
    setEmpty();
  };

  const SubmitOfEdit = (e) => {
    e.preventDefault();
    setRequestType("SUBMIT");
    setEditButtonActivate(false);
    fetchData({
      method: "POST",
      url: customerUpdateAddress,
      headers: {
        accept: "*/*",
      },
      signal: abortController.signal,
      data: {
        Id: rowID,
        Customer_Id: props.rowValues,
        Country_Id: country?.value,
        Province_Id: province?.value,
        City_Id: city?.value,
        Section_Id: section?.value,
        Area_Id: area?.value,
        IsPrimary: values.IsPrimary,
        PostalCode: values.PostalCode,
        MainStreet: values.MainStreet,
        ByStreet: values.ByStreet,
        Alley: values.Alley,
        Plaque: values.Plaque,
        Floor: values.Floor,
        Unit: values.Unit,
        Address: values.Address,
        Latitude: coordinates[0],
        Longitude: coordinates[1],
        Description: values.Description,
        Title: values.Title,
        Request: request,
      },
    });
  };

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeSwitch = (e) => {
    setValues({ ...values, [e.target.name]: e.target.checked });
  };
  const submitMap = (q, coord) => {
    setCoordinates(coord);
  };

  return (
    <>
      <Modal
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={props.onHide}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="Row ">
              <Form.Group className="mb-3" controlId={"switch"}>
                <Form.Label>{t("IsPrimary")}</Form.Label>
                <Form.Check
                  style={{ textAlign: "center" }}
                  type="switch"
                  checked={values.IsPrimary}
                  name="IsPrimary"
                  onChange={handleChangeSwitch}
                />
              </Form.Group>
            </div>
            <div className="Row">
              <Form.Group className="mb-3" controlId={"country"}>
                <Form.Label>{t("country")}</Form.Label>
                <CustomReactMultiSelect
                  isMulti={false}
                  options={countryOptions}
                  value={country}
                  onchangeHandler={(e) => setCountry(e)}
                  placeholder={t("country")}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={"province"}>
                <Form.Label>{t("province")}</Form.Label>
                <CustomReactMultiSelect
                  isMulti={false}
                  options={provinceOptions}
                  value={province}
                  onchangeHandler={(e) => setProvince(e)}
                  placeholder={t("province")}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={"city"}>
                <Form.Label>{t("city")}</Form.Label>
                <CustomReactMultiSelect
                  isMulti={false}
                  options={cityOptions}
                  value={city}
                  onchangeHandler={(e) => setCity(e)}
                  placeholder={t("city")}
                />
              </Form.Group>
            </div>
            <div className="Row">
              <Form.Group className="mb-3" controlId={"section"}>
                <Form.Label>{t("section")}</Form.Label>
                <CustomReactMultiSelect
                  isMulti={false}
                  options={sectionOptions}
                  value={section}
                  onchangeHandler={(e) => setSection(e)}
                  placeholder={t("section")}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={"area"}>
                <Form.Label>{t("Area")}</Form.Label>
                <CustomReactMultiSelect
                  isMulti={false}
                  options={areaOptions}
                  value={area}
                  onchangeHandler={(e) => setArea(e)}
                  placeholder={t("Area")}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={"Title"}>
                <Form.Label>{t("Title")}</Form.Label>
                <Form.Control
                  type="text"
                  name="Title"
                  value={values.Title}
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </div>
            <div className="Row">
              <Form.Group className="mb-3" controlId={"PostalCode"}>
                <Form.Label>{t("PostalCode")}</Form.Label>
                <Form.Control
                  type="text"
                  name="PostalCode"
                  value={values.PostalCode}
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={"MainStreet"}>
                <Form.Label>{t("MainStreet")}</Form.Label>
                <Form.Control
                  type="text"
                  name="MainStreet"
                  value={values.MainStreet}
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={"ByStreet"}>
                <Form.Label>{t("ByStreet")}</Form.Label>
                <Form.Control
                  type="text"
                  name="ByStreet"
                  value={values.ByStreet}
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </div>
            <div className="Row">
              <Form.Group className="mb-3" controlId={"Alley"}>
                <Form.Label>{t("Alley")}</Form.Label>
                <Form.Control
                  type="text"
                  name="Alley"
                  value={values.Alley}
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={"Plaque"}>
                <Form.Label>{t("Plaque")}</Form.Label>
                <Form.Control
                  type="number"
                  name="Plaque"
                  min={0}
                  value={values.Plaque}
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={"Floor"}>
                <Form.Label>{t("Floor")}</Form.Label>
                <Form.Control
                  type="number"
                  name="Floor"
                  value={values.Floor}
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={"Unit"}>
                <Form.Label>{t("Unit")}</Form.Label>
                <Form.Control
                  type="number"
                  name="Unit"
                  value={values.Unit}
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </div>
            <div className="Row">
              <Form.Group className="mb-3" controlId={"Address"}>
                <Form.Label>{t("Address")}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={values.Address}
                  onChange={onChangeHandler}
                  name="Address"
                />
              </Form.Group>
            </div>
            <div className="Row">
              <Form.Group
                className="mb-3 d-flex flex-column"
                controlId="chooseLocation"
              >
                <Form.Label>{t("chooseLocation")}</Form.Label>
                <MapModal
                  qId={""}
                  submited={submitMap}
                  coordinats={coordinates}
                  saveDisabled={false}
                />
              </Form.Group>
            </div>
            <div className="Row">
              <Form.Group className="mb-3" controlId={"Description"}>
                <Form.Label>{t("Description")}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={values.AddrDescriptioness}
                  onChange={onChangeHandler}
                  name="Description"
                />
              </Form.Group>
            </div>

            {!editButtonActivate ? (
              <Button variant="primary" type="submit" disabled={loading}>
                {t("operatorGroupFormSubmit")}
              </Button>
            ) : (
              <Container>
                <Row>
                  <Col>
                    <Button variant="danger" onClick={cancletationOFEdit}>
                      {t("cancelationOfForm")}
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="success"
                      onClick={SubmitOfEdit}
                      disabled={loading}
                    >
                      {t("edit")}
                    </Button>
                  </Col>
                </Row>
              </Container>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <ListGroup as="ol" numbered className="listGroupAddress">
            {addresses.map((a) => (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between "
                style={{
                  border: `1px solid black`,
                  borderRadius: 4,
                  alignItems: "center",
                }}
              >
                <div>
                  <div className="fw-bold countryTitle">{t("Address")}</div>
                  {a.Address}
                </div>
                <div className="d-flex btns ">
                  <div
                    className="actionBtns"
                    onClick={() => handleQuestionEdit(a)}
                  >
                    <fa.FaRegEdit color="green" />
                  </div>
                  <div
                    className="actionBtns"
                    onClick={() => deleteCalled(a.Id)}
                  >
                    <fa.FaTrash color="red" />
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomerAccountModal;
