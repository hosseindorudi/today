import { t } from "i18next";
import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import useAxios from "../../../customHooks/useAxios";
import useRequest from "../../../customHooks/useRequest";
import { downloadCSVCode, isDuplicateExistInArray } from "../../../validation/functions";
import "./importModal.css";
import ModalCheckResult from "./ModalCheckResult";
import { TargetBox } from "./importDND/TargetBox";
import { FileList } from "./importDND/FileList";
import { useCSVReader } from "react-papaparse";
import * as fa from "react-icons/fa";
const styles = {
  lable: {
    fontWeight: "bold",
    fontSize: 8,
  },
  acceptedFile: {
    display: "flex",
    alignItems: "center",
  },
  remove: {
    border: "none",
    background: "none",
    color: "red",
  },
};
const ImportCSVModal = (props) => {
  const { CSVReader } = useCSVReader();
  const { file, setFile, withHeader, setwithheader } = props;
  const [showCheckResultModal, setShowCheckResultModal] = useState(false);
  const [checkResult, setCheckResult] = useState(null);
  const [response, loading, fetchData] = useAxios();
  const [checkFile, setCheckFile] = useState(null);
  const [importFile, setImportFile] = useState(null);
  const [requestType, setRequestType] = useState("");
  const request = useRequest();
  const inputRefCheckFile = useRef(null);
  const inputRefUpload = useRef(null);
  const handleFileDropCheckFile = useCallback(
    (item) => {
      const files = item.files;
      setCheckFile(files[0]);
    },
    [setCheckFile]
  );
  const handleFileDropUpload = useCallback(
    (item) => {
      const files = item.files;
      setImportFile(files[0]);
    },
    [setImportFile]
  );
  const handleClickCheckFile = () => {
    inputRefCheckFile.current.click();
  };
  const handleClickUploadFile = () => {
    inputRefUpload.current.click();
  };

  const handleClickSample = () => {
    setRequestType("SAMPLE");
    fetchData({
      method: "POST",
      url: props.sampleUrl,
      headers: request,
    });
  };
  const noFileToast = () => {
    toast.info(t("noDataFound.table"), {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleUploadCheck = () => {
    setRequestType("CHECK");
    var formData = new FormData();
    formData.append("File", checkFile);
    fetchData({
      method: "POST",
      url: props.fileCheckURL,
      headers: request,
      data: formData,
    });
  };
  const handleUploadImport = () => {
    setRequestType("IMPORT");
    var formData = new FormData();
    formData.append("File", importFile);
    fetchData({
      method: "POST",
      url: props.importURL,
      headers: request,
      data: formData,
    });
  };
  const handleCheckFileModal = (Message) => {
    setCheckResult(Message);
    setShowCheckResultModal(true);
  };
  const handleImportSuccess = (res) => {
    props.onHide();
    props.importSuccess(res.Message);
  };
  const handleResponse = useCallback((res, type) => {
    switch (type) {
      case "SAMPLE":
        res.Content?.length > 0
          ? downloadCSVCode(res.Content, res.Name)
          : noFileToast();
        break;
      case "CHECK":
        handleCheckFileModal(res.Message);
        break;
      case "IMPORT":
        handleImportSuccess(res);
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    response && handleResponse(response, requestType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  const handleCheckFile = (event) => {
    if (event.target.files[0].type !== "text/csv")
      return toast.info(t("uploadOnlyCSv"), {
        position: toast.POSITION.TOP_CENTER,
      });
    setCheckFile(event.target.files[0]);
  };
  const handleChangeImport = (event) => {
    if (event.target.files[0].type !== "text/csv")
      return toast.info(t("uploadOnlyCSv"), {
        position: toast.POSITION.TOP_CENTER,
      });
    setImportFile(event.target.files[0]);
  };
  const handleOnUploadAccepted = (data) => {
    if (data.errors.length)
      return toast.warn(t("selectCSVFileOnly"), {
        position: toast.POSITION.TOP_CENTER,
      });
    if(withHeader && isDuplicateExistInArray(data?.data[0]))
    return toast.info(t("columnExits"), {
      position: toast.POSITION.TOP_CENTER,
    })
    setFile(data.data);
  };
  const handleRemove = () => {
    setFile(null)
  };
  return (
    <>
      {showCheckResultModal && (
        <ModalCheckResult
          onHide={() => setShowCheckResultModal(false)}
          show={showCheckResultModal}
          data={checkResult}
        />
      )}
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="ModalImport"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <label className="labelModalImport">{t("importFile")} </label>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="dndMainDiv">
              <div className="dndChild">
                <div className="dndInsideChild">
                  <Button
                    variant="primary"
                    disabled={loading}
                    onClick={handleClickSample}
                  >
                    {t("modalImport.sampleFile")}
                  </Button>
                </div>
              </div>
              <div className="dndChild">
                <div className="dndInsideChild">
                  <input
                    accept=".csv"
                    type="file"
                    id="checkFileInput"
                    onChange={handleCheckFile}
                    ref={inputRefCheckFile}
                    multiple={false}
                  />
                  <TargetBox
                    onDrop={handleFileDropCheckFile}
                    handleClickAdd={handleClickCheckFile}
                    inputId={"checkFileInput"}
                    typeRestricted={true}
                    fileType={"text/csv"}
                    typeError={"uploadOnlyCSv"}
                  />
                  <FileList files={checkFile} />
                  <div style={{ display: "flex", gap: "5px" }}>
                    <Button
                      variant="primary"
                      disabled={!checkFile || loading ? true : false}
                      onClick={handleUploadCheck}
                    >
                      {t("modalImport.checkFile")}
                    </Button>
                    {checkFile && (
                      <Button
                        variant="danger"
                        onClick={() => setCheckFile(null)}
                      >
                        {t("remove")}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="dndChild">
                <div className="dndInsideChild">
                  <input
                    accept=".csv"
                    type="file"
                    id="uploadFileInput"
                    onChange={handleChangeImport}
                    ref={inputRefUpload}
                    multiple={false}
                  />
                  <TargetBox
                    onDrop={handleFileDropUpload}
                    handleClickAdd={handleClickUploadFile}
                    inputId={"uploadFileInput"}
                    typeRestricted={true}
                    fileType={"text/csv"}
                    typeError={"uploadOnlyCSv"}
                  />
                  <FileList files={importFile} />
                  <div style={{ display: "flex", gap: "5px" }}>
                    <Button
                      variant="primary"
                      disabled={!importFile || loading ? true : false}
                      onClick={handleUploadImport}
                    >
                      {t("upload")}
                    </Button>
                    {importFile && (
                      <Button
                        variant="danger"
                        onClick={() => setImportFile(null)}
                      >
                        {t("remove")}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="dndChild">
                <div className="dndInsideChild">
                  <CSVReader
                    accept=".csv"
                    config={{
                      skipEmptyLines: true,
                    }}
                    onUploadAccepted={(results) => {
                      handleOnUploadAccepted(results);
                    }}
                  >
                    {({
                      getRootProps,
                      acceptedFile,
                      getRemoveFileProps,
                    }) => (
                      <>
                        <div {...getRootProps()} className="label-file-upload">
                          <div>
                            <button disabled className="upload-button">
                              <fa.FaPlus className="dndPlusBtn" />
                            </button>
                          </div>
                          <label className="labelDrop">{t("dropFile")}</label>
                        </div>
                        {acceptedFile && (
                          <div style={styles.acceptedFile}>
                            <div style={styles.lable}>{acceptedFile.name}</div>{" "}
                            <button
                              {...getRemoveFileProps()}
                              style={styles.remove}
                              onClick={(event) => {
                                getRemoveFileProps().onClick(event);
                                handleRemove();
                              }}
                            >
                              <fa.FaWindowClose />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </CSVReader>
                  <div style={{ display: "flex" }}>
                    <Form.Check
                      style={{ fontsize: "0.8rem" }}
                      label={t("withHeader")}
                      checked={withHeader}
                      onChange={() => setwithheader(!withHeader)}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <Button
                      variant="primary"
                      disabled={!file || loading ? true : false}
                      onClick={() => props.handleUIClick()}
                    >
                      {t("manualUpload")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => props.onHide()}>
            {t("cancel")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImportCSVModal;
