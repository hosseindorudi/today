import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";


const ImportUIModal = (props) => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const handleUpload = async () => {
    console.log(file)
    
   
  };
  const handleChangeFile = (e) => {
    if (!e.target.files.length) return setFile(null);
    if (e.target.files[0].type !== "text/csv")
      return toast.warn(t("selectCSVFileOnly"), {
        position: toast.POSITION.TOP_CENTER,
      });
    setFile(e.target.files[0]);
  };
  return (
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
        <div className="Row">
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>{t("uploadUrFIle")}</Form.Label>
            <Form.Control
              type="file"
              accept=".csv"
              onChange={handleChangeFile}
            />
          </Form.Group>
        </div>
        <div className="Row">
          <Button disabled={!file} onClick={()=>handleUpload()}>
            {t("upload")}
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button>{t("submit")}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImportUIModal;
