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
  checkTableValues
} from "../../../validation/functions";
import './operatorRoleModal.css'
import axios from "axios";
import Swal from "sweetalert2";
import { organizationalRoleReadTitle } from "../../../services/organizationRoleService";
import { groupReadTitle } from "../../../services/groupService";
import { operatorCreateOperatorRole, operatorDeleteOperatorRole, operatorReadOperatorRole, operatorUpdateOperatorRole } from "../../../services/operatorService";
import { ResultCodeEnum } from "../../../data/ResultCodeEnum";
const OperatorRoleModel = (props) => {
  const [response, loading, fetchData, setResponse] = useAxios();
  const request = useRequest();
  const [organizationalRoleOptions, setOrganizationalRoleOptions] = useState(
    []
  );
  const [organizationalRole, setOrganizationalRole] = useState(undefined);
  const [group, setGroup] = useState(undefined);
  const [groupOptions, setGroupOptions] = useState([]);
  const [description, setDescription] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);
  const abortController = new AbortController();
  const [editButtonActivate, setEditButtonActivate] = useState(false);
  const [operatorRoles, setOperatorRoles] = useState([]);
    const [roleId, setRoleId] = useState("");
  const { t } = useTranslation();
  const [requestType, setRequestType] = useState("");

  const setEmpty = () => {
    setGroup(null);
    setOrganizationalRole(null);
    setDescription("");
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
    const organizationalRoleTitle = axios.request(createParams(organizationalRoleReadTitle));
    const groupTitle = axios.request(createParams(groupReadTitle));
    axios
      .all([organizationalRoleTitle, groupTitle])
      .then(
        axios.spread((...allData) => {
          allData[0].data?.Result===ResultCodeEnum.Ok? setOrganizationalRoleOptions(createSelectOptions(allData[0].data.Title))
            : handleError(allData[0].data.Message);
          allData[1].data?.Result===ResultCodeEnum.Ok? setGroupOptions(createSelectOptions(allData[1].data.Title))
            : handleError(allData[1].data.Message);
        })
      )
      .catch((error) => {
        handleError(error.message);
      });
  };
  const readDatas = () => {
    setRequestType("Read");
    fetchData({
      method: "POST",
      url: operatorReadOperatorRole,
      headers: request,
      data: {
        Id: props.id,
        
      },
      signal: abortController.signal,
    });
  };
  useEffect(() => {
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
          setEditButtonActivate(false)
          break;
        case "Read":
          setOperatorRoles(response.Record);
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
      url: operatorDeleteOperatorRole,
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
   response&&handleResponse(response,requestType)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestType("SUBMIT");

    fetchData({
      method: "POST",
      url: operatorCreateOperatorRole,
      headers: request,
      signal: abortController.signal,
      data: {
        Id: 0,
        Operator_Id: props.id,
        Group_Id: group?.value,
        OrganizationalRole_Id: organizationalRole?.value,
        IsPrimary: isPrimary,
        Description:description,
        
      },
    });
  };

  const handleQuestionEdit = (role) => {
    setEditButtonActivate(true);
    setDescription(role.Description);
    setIsPrimary(role.IsPrimary)
    setGroup(groupOptions.find((c) => c.value === role.Group_Id));
    setOrganizationalRole(organizationalRoleOptions.find((c) => c.value === role.OrganizationalRole_Id));
    setRoleId(role.Id);
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
      url: operatorUpdateOperatorRole,
      headers: request,
      signal: abortController.signal,
      data: {
        Id: roleId,
        Operator_Id: props.id,
        Group_Id: group?.value,
        OrganizationalRole_Id: organizationalRole?.value,
        IsPrimary: isPrimary,
        Description:description,
        
      },
    });
  };
  const handleChangeSwitch=(e)=>{
    setIsPrimary(e.target.checked)
  }
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
            <div className="Row" style={{textAlign:"center"}}>
          <Form.Group className="mb-3" controlId="IsPrimary">
                <Form.Label>{t("IsPrimary")}</Form.Label>
                <Form.Check type="switch" name='IsPrimary' checked={isPrimary} onChange={handleChangeSwitch}/>
              </Form.Group>
              </div>
            <div className="Row">
              <Form.Group className="mb-3" controlId="group">
                <Form.Label>{t("/Operator/Group/Read")}</Form.Label>
                <CustomReactMultiSelect
                  isMulti={false}
                  options={groupOptions}
                  value={group}
                  onchangeHandler={(e) => setGroup(e)}
                  placeholder={t("/Operator/Group/Read")}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="organizationRole">
                <Form.Label>{t("/Definition/OrganizationalRole/Read")}</Form.Label>
                <CustomReactMultiSelect
                  isMulti={false}
                  options={organizationalRoleOptions}
                  value={organizationalRole}
                  onchangeHandler={(e) => setOrganizationalRole(e)}
                  placeholder={t("/Definition/OrganizationalRole/Read")}
                />
              </Form.Group>
            </div>
            <div className="Row">
            <Form.Group className="mb-3" controlId="Description">
                <Form.Label>{t("Description")}</Form.Label>
                <Form.Control as="textarea" rows={2} value={description} onChange={(e)=>setDescription(e.target.value)} placeholder={t("Description")}/>
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
            {operatorRoles.map((role) => (
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
                  <div className="fw-bold countryTitle">{t("/Operator/Group/Read")}</div>
                  {role.Group_Title}
                </div>
                <div>
                  <div className="fw-bold currencyTitle">
                    {t("/Definition/OrganizationalRole/Read")}
                  </div>
                  {role.OrganizationalRole_Title}
                </div>
                <div>
                  <div className="fw-bold currencyTitle">{t("IsPrimary")}</div>
                  {checkTableValues("MySession",role.IsPrimary)}
                </div>
                <div className="d-flex btns ">
                  <div
                    className="actionBtns"
                    onClick={() => handleQuestionEdit(role)}
                  >
                    <fa.FaRegEdit color="green" />
                  </div>
                  <div
                    className="actionBtns"
                    onClick={() => deleteCalled(role.Id)}
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

export default OperatorRoleModel;
