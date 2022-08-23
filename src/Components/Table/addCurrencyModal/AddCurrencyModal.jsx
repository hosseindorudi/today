import React, { useCallback, useEffect, useState } from "react";
import * as fa from "react-icons/fa";
import {
  Button,
  Form,
  Modal,
  ListGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import useRequest from "../../../customHooks/useRequest";
import useAxios from "../../../customHooks/useAxios";
import { useTranslation } from "react-i18next";
import { CustomReactMultiSelect } from "../../../Components/Select/customReactSelect";
import {
  createSelectOptions,
  handleError,
} from "../../../validation/functions";
import axios from "axios";
import Swal from "sweetalert2";
import "./addCurrencyModal.css";
import { countryReadTitle } from "../../../services/countryService";
import { currencyReadTitle } from "../../../services/currencyService";
import { ResultCodeEnum } from "../../../data/ResultCodeEnum";
const AddCurrencyModal = (props) => {
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [currency, setCurrency] = useState(undefined);
  const [countryOptions, setCountryOptions] = useState([]);
  const [country, setCountry] = useState(undefined);
  const [fee, setFee] = useState("");
  const [rates, setRates] = useState([]);
  const abortController = new AbortController();
  const [editButtonActivate, setEditButtonActivate] = useState(false);
  const [rateId, setRateId] = useState("");
  const { t } = useTranslation();
  const [requestType, setRequestType] = useState("");

  const setEmpty = () => {
    setEditButtonActivate(false)
    setCurrency(null);
    setCountry(null);
    setFee("");
  };

  const createParams = (service) => {
    const params = {
      method: "POST",
      url: service,
      headers: request,
    };
    return params;
  };

  const getDatas = () => {
    const countryTitles = axios.request(createParams(countryReadTitle));
    const currencyTitles = axios.request(createParams(currencyReadTitle));
    axios
      .all([countryTitles, currencyTitles])
      .then(
        axios.spread((...allData) => {
          allData[0].data?.Result === ResultCodeEnum.Ok
            ? setCountryOptions(createSelectOptions(allData[0].data.Title))
            : handleError(allData[0].data.Message);
          allData[1].data?.Result === ResultCodeEnum.Ok
            ? setCurrencyOptions(createSelectOptions(allData[1].data.Title))
            : handleError(allData[1].data.Message);
        })
      )
      .catch((error) => {
        handleError(error.message);
      });
  };
  const readDatas = () => {
    setRequestType("READRATE");
    fetchData({
      method: "POST",
      url: props.read,
      headers: request,
      data: {
        Id: props.id,
      },
      signal: abortController.signal,
    });
  };
  useEffect(() => {
    console.log(props)
    getDatas();
    readDatas();
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
        case "READRATE":
          setRates(response.Record);
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
      url: props.delete,
      headers: request,
      data: {
        Id: id,
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
    response && handleResponse(response, requestType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestType("SUBMIT");

    fetchData({
      method: "POST",
      url: props.create,
      headers: request,
      signal: abortController.signal,
      data: {
        Id: 0,
        RepairsPerformed_Id: props.id,
        Country_Id: country?.value,
        Currency_Id: currency?.value,
        Fee: Number(fee),
      },
    });
  };

  const handleQuestionEdit = (rate) => {
    setEditButtonActivate(true);
    setFee(rate.Fee);
    setCountry(countryOptions.find((c) => c.value === rate.Country_Id));
    setCurrency(currencyOptions.find((c) => c.value === rate.Currency_Id));
    setRateId(rate.Id);
  };

  const cancletationOFEdit = () => {
    setEditButtonActivate(false);
    setEmpty();
  };

  const SubmitOfEdit = (e) => {
    e.preventDefault();
    setRequestType("SUBMIT");

    fetchData({
      method: "POST",
      url: props.update,
      headers: request,
      signal: abortController.signal,
      data: {
        Id: rateId,
        RepairsPerformed_Id: props.id,
        Country_Id: country?.value,
        Currency_Id: currency?.value,
        Fee: Number(fee),
      },
    });
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
            <div className="Row">
              <Form.Group className="mb-3" controlId="country">
                <Form.Label>{t("country")}</Form.Label>
                <CustomReactMultiSelect
                  isMulti={false}
                  options={countryOptions}
                  value={country}
                  onchangeHandler={(e) => setCountry(e)}
                  placeholder={t("country")}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{t("Fee")}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={t("Fee")}
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Currency_Title">
                <Form.Label>{t("Currency_Title")}</Form.Label>
                <CustomReactMultiSelect
                  isMulti={false}
                  options={currencyOptions}
                  value={currency}
                  onchangeHandler={(e) => setCurrency(e)}
                  placeholder={t("Currency_Title")}
                />
              </Form.Group>
            </div>
            {!editButtonActivate ? (
              <Button
                variant="primary"
                type="submit"
                className="questionFormSubmit mt-2"
                disabled={loading}
              >
                {t("operatorGroupFormSubmit")}
              </Button>
            ) : (
              <Container>
                <Row>
                  <Col>
                    <Button
                      variant="danger"
                      onClick={cancletationOFEdit}
                      className="questionFormSubmit mt-2"
                    >
                      {t("cancelationOfForm")}
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="success"
                      onClick={SubmitOfEdit}
                      className="questionFormSubmit mt-2"
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
          <ListGroup as="ol" numbered className="listGroupCurrencyModal">
            {rates.map((rate) => (
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
                  <div className="fw-bold countryTitle">{t("country")}</div>
                  {rate.Country_Title}
                </div>
                <div>
                  <div className="fw-bold currencyTitle">
                    {t("Currency_Title")}
                  </div>
                  {rate.Currency_Title}
                </div>
                <div>
                  <div className="fw-bold currencyTitle">{t("Fee")}</div>
                  {rate.Fee.toLocaleString()}
                </div>
                <div className="d-flex btns ">
                  <div
                    className="actionBtns"
                    onClick={() => handleQuestionEdit(rate)}
                  >
                    <fa.FaRegEdit color="green" />
                  </div>
                  <div
                    className="actionBtns"
                    onClick={() => deleteCalled(rate.Id)}
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

export default AddCurrencyModal;
