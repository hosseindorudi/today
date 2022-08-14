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
import "./locationPolicyModal.css";
import Swal from "sweetalert2";
import { defaultCoordinates } from "../../../data/constants";
import MapModal from "../../map/MapModal";
const LocationPolicyModal = (props) => {
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();
  const [coordinates, setCoordinates] = useState(defaultCoordinates);
  const [radius, setRadius] = useState(0);
  const abortController = new AbortController();
  const [editButtonActivate, setEditButtonActivate] = useState(false);
  const [locations, setLocations] = useState([]);
  const [locationId, setLocationId] = useState("");
  const { t } = useTranslation();
  const [requestType, setRequestType] = useState("");

  const setEmpty = () => {
    setEditButtonActivate(false)
    setCoordinates(defaultCoordinates);
    setRadius(0);
  };
  const readDatas = () => {
    setRequestType("Read");
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
          setEditButtonActivate(false);
          break;
        case "Read":
          setLocations(response.Record);
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
        Group_Id: props.id,
        Latitude: coordinates[0],
        Longitude: coordinates[1],
        Radius: radius,
      },
    });
  };

  const handleQuestionEdit = (location) => {
    setEditButtonActivate(true);
    setCoordinates([location.Latitude, location.Longitude]);
    setRadius(location.Radius);
    setLocationId(location.Id);
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
        Id: locationId,
        Group_Id: props.id,
        Latitude: coordinates[0],
        Longitude: coordinates[1],
        Radius: radius,
      },
    });
  };
  const submitMap = (q, coord) => {
    setCoordinates(coord);
  };
  const createRadiusOptions = () => {
    let options = [];
    for (let index = 0; index <= 10000; index += 500) {
      options.push(
        <option key={index} value={index}>
          {index}
        </option>
      );
    }
    return options;
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
              <Form.Group className="mb-3" controlId="radius">
                <Form.Label>{t("Radius")}</Form.Label>
                <Form.Select
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                >
                  {createRadiusOptions()}
                </Form.Select>
              </Form.Group>
            </div>
            {!editButtonActivate ? (
              <Button
                variant="primary"
                type="submit"
                className="questionFormSubmit mt-2"
                disabled={loading || radius === 0}
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
                      disabled={loading || radius === 0}
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
            {locations.map((lo) => (
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
                  <div className="fw-bold countryTitle">{t("Location")}</div>
                  <MapModal
                    qId={""}
                    coordinats={[lo.Latitude, lo.Longitude]}
                    saveDisabled={true}
                  />
                </div>
                <div>
                  <div className="fw-bold currencyTitle">{t("Radius")}</div>
                  {lo.Radius}
                </div>
                <div className="d-flex btns ">
                  <div
                    className="actionBtns"
                    onClick={() => handleQuestionEdit(lo)}
                  >
                    <fa.FaRegEdit color="green" />
                  </div>
                  <div
                    className="actionBtns"
                    onClick={() => deleteCalled(lo.Id)}
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

export default LocationPolicyModal;
