import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useAxios from "../../../customHooks/useAxios";
import useRequest from "../../../customHooks/useRequest";
import Swal from "sweetalert2";
import { Button, Form, Modal, ListGroup } from "react-bootstrap";
import * as fa from "react-icons/fa";
import "./customerFileUploadModal.css";
import { TargetBox } from "../ImportCSVButton/importDND/TargetBox";
import { FileList } from "../ImportCSVButton/importDND/FileList";
import {
  customerCreateAttachment,
  CustomerDeleteAttachment,
  customerReadAttachedFile,
  CustomerReadAttachment,
} from "../../../services/customerService";
import BackDrop from "../../backDrop/BackDrop";
const CustomerFileUploadModal = (props) => {
  const { rowValues } = props;
  const [processing, setProcessing] = useState(false);
  const inputRefFile = useRef(null);
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();
  const abortController = new AbortController();
  const { t } = useTranslation();
  const [requestType, setRequestType] = useState("");
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [values, setValues] = useState({
    Title: "",
    Description: "",
  });

  const setEmpty = () => {
    setValues({
      Title: "",
      Description: "",
    });
    setFile(null);
  };

  const readDatas = () => {
    setRequestType("READFILES");
    fetchData({
      method: "POST",
      url: CustomerReadAttachment,
      headers: request,
      data: {
        Id: rowValues,
      },
      signal: abortController.signal,
    });
  };
  const handleDownloadFile = async (response) => {
    setProcessing(true);
    const base64ToArrayBuffer = (base64) => {
      var binaryString = window.atob(base64);
      var binaryLen = binaryString.length;
      var bytes = new Uint8Array(binaryLen);
      for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
      }
      return bytes;
    };
    const saveByteArray = (reportName, byte) => {
      var blob = new Blob([byte], {
        type: response.ContentType && response.ContentType,
      });
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      var fileName = reportName;
      link.download = fileName;
      link.click();
    };

    var sampleArr = await base64ToArrayBuffer(
      response.UploadedFile_Byte && response.UploadedFile_Byte
    );
    await saveByteArray(response.Name && response.Name, sampleArr);
    setProcessing(false);
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
          break;
        case "READFILES":
          setFiles(response.Record);
          break;
        case "DOWNLOAD":
          handleDownloadFile(response);
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
      url: CustomerDeleteAttachment,
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

  const handleSubmit = () => {
    setRequestType("SUBMIT");
    var data = new FormData();
    data.append("Customer_Id", rowValues);
    data.append("Title", values.Title);
    data.append("Description", values.Description);
    data.append("UploadedFile", file);
    fetchData({
      method: "POST",
      url: customerCreateAttachment,
      headers: request,
      signal: abortController.signal,
      data: data,
    });
  };

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFileDrop = useCallback(
    (item) => {
      const files = item.files;
      setFile(files[0]);
    },
    [setFile]
  );
  const handleClickFile = () => {
    inputRefFile.current.click();
  };
  const downloadFile = (id) => {
    setRequestType("DOWNLOAD");
    fetchData({
      method: "POST",
      url: customerReadAttachedFile,
      headers: request,
      data: {
        Id: id,
      },
      signal: abortController.signal,
    });
  };
  return (
    <>
      {(loading || processing) && <BackDrop open={true} />}
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
          <div className="Row">
            <Form.Group className="mb-3" controlId={"Title"}>
              <Form.Label>{t("Title")}</Form.Label>
              <Form.Control
                type="text"
                name="Title"
                value={values.Title}
                onChange={onChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId={"Description"}>
              <Form.Label>{t("Description")}</Form.Label>
              <Form.Control
                type="text"
                name="Description"
                value={values.Description}
                onChange={onChangeHandler}
              />
            </Form.Group>
          </div>
          <div className="Row">
            <div className="dndInsideChildCustomer">
              <input
                type="file"
                id="customerFile"
                name="File"
                onChange={onChangeFile}
                ref={inputRefFile}
                multiple={false}
              />
              <TargetBox
                onDrop={handleFileDrop}
                handleClickAdd={handleClickFile}
                inputId={"customerFile"}
                typeRestricted={false}
              />
              <FileList files={file} />
              <div style={{ display: "flex", gap: "5px" }}>
                {file && (
                  <Button
                    variant="danger"
                    className="deleteBtnCustomerFile"
                    onClick={() => setFile(null)}
                  >
                    {t("remove")}
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={() => handleSubmit()}
            disabled={loading || !file}
          >
            {t("operatorGroupFormSubmit")}
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <ListGroup as="ol" numbered className="listGroupFile">
            {files.map((m) => (
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
                  <div className="fw-bold ">{t("Title")}</div>
                  {m.Title}
                </div>
                <div>
                  <div className="fw-bold ">{t("Description")}</div>
                  {m.Description}
                </div>
                <div>
                  <div className="fw-bold ">{t("fileName")}</div>
                  {m.Name}
                </div>

                <div className="d-flex btns ">
                  <div
                    className="actionBtns"
                    onClick={() => downloadFile(m.Id)}
                  >
                    <fa.FaFileDownload color="green" />
                  </div>
                  <div
                    className="actionBtns"
                    onClick={() => deleteCalled(m.Id)}
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

export default CustomerFileUploadModal;
