import { t } from "i18next";
import React, { useCallback,useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import useAxios from "../../../customHooks/useAxios";
import useRequest from "../../../customHooks/useRequest";
import { downloadCSVCode } from "../../../validation/functions";

import "./importModal.css";
import ModalCheckResult from "./ModalCheckResult";

const ImportCSVModal = (props) => {
  const [showCheckResultModal, setShowCheckResultModal] = useState(false);
  const [checkResult, setCheckResult] = useState(null);
  const [response, loading, fetchData] = useAxios();
  const [checkFile, setCheckFile] = useState(null);
  const [importFile, setImportFile] = useState(null);
  const [requestType, setRequestType] = useState("");
  const request = useRequest();

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
      headers:request, 
      // {
      //   "Content-Type": "multipart/form-data",
      // },
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
      headers:request,
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
        res.Content?.length>0 ?downloadCSVCode(res.Content,"sample") : noFileToast();
        break;
      case "CHECK":
         handleCheckFileModal(res.Message)
        break;
      case "IMPORT":
           handleImportSuccess(res)
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
    setCheckFile(event.target.files[0]);
  };
  const handleChangeImport = (event) => {
    setImportFile(event.target.files[0]);
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
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {t("importFile")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="sampleFileModal">
            <h4>{t("modalImport.sampleFile")}</h4>
            <div className="smapleFileDownload">
              <p>{t("modalImport.clickForDownload")}</p>
              <Button
                variant="info"
                disabled={loading}
                onClick={handleClickSample}
              >
                {t("createSample")}
              </Button>
            </div>
          </div>
          <div className="checkFile">
            <h4>{t("modalImport.checkFile")}</h4>
            <div className="checkFileButtons">
              <p>{t("modalImport.checkFileUpload")}</p>
              <div className="uploadButtonAndFile">
                <input type={"file"} onChange={handleCheckFile} />
                <Button
                  variant="info"
                  disabled={!checkFile || loading ? true : false}
                  onClick={handleUploadCheck}
                >
                  {t("upload")}
                </Button>
              </div>
            </div>
          </div>
          <div className="import">
            <h4>{t("import")}</h4>
            <div className="checkFileButtons">
              <p>{t("modalImport.importCSV")}</p>
              <div className="uploadButtonAndFile">
                <input type={"file"} onChange={handleChangeImport} />
                <Button
                  variant="info"
                  disabled={!importFile || loading ? true : false}
                  onClick={handleUploadImport}
                >
                  {t("upload")}
                </Button>
              </div>
            </div>
          </div>
          <div className="import">
            <h4>{t("importWithUI")}</h4>
            <div className="checkFileButtons">
              <p>{t("importCSVUI")}</p>
              <div className="uploadButtonAndFile">
                <Button
                  variant="info"
                  onClick={()=>props.handleUIClick()}
                >
                  {t("importUIButton")}
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.onHide()}>{t("cancel")}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImportCSVModal;
