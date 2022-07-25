import React, { useMemo, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTranslation } from "react-i18next";
import { useCSVReader } from "react-papaparse";
import { toast } from "react-toastify";
import ReactTable from "../../reactTable/ReactTable";
import { HeaderDND } from "./HeaderDND";
import RemovedColumns from "./RemovedColumns";

const styles = {
  csvReader: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  browseFile: {
    width: "10%",
    height: 30,
    background: "cornflowerblue",
    color: "white",
  },
  acceptedFile: {
    border: "1px solid #ccc",
    height: 30,
    paddingLeft: 10,
    width: "80%",
  },
  remove: {
    borderRadius: 0,
    padding: "0 20px",
    background: "darkred",
    color: "white",
    width: "10%",
    height: 30,
  },
  progressBarBackgroundColor: {
    backgroundColor: "green",
  },
  headerDivImport:{
    display:'flex',
    justifyContent:"space-around"
  }
};
const ImportUIModal = (props) => {
  const [file, setFile] = useState(null);
  const [columnData, setColumnData] = useState([]);
  const [rowData,setRowData]=useState([])
  const data=useMemo(()=>rowData,[rowData])
  const columns=useMemo(()=>columnData,[columnData])
  const [headers,setHeaders]=useState([])
  const [removed, setRemoved] = useState([]);
  const { CSVReader } = useCSVReader();
  const { t } = useTranslation();

  const handleOnUploadAccepted = (data) => {
    if (data.errors.length)
      return toast.warn(t("selectCSVFileOnly"), {
        position: toast.POSITION.TOP_CENTER,
      });
    setFile(data.data);
    const columns = data.data[0].map((col, index) => {
      return {
        Header: col,
        accessor: col.split(" ").join("_").toLowerCase(),
        index: index,
      };
    });
    const rows = data.data.slice(1).map((row) => {
      return row.reduce((acc, curr, index) => {
        acc[columns[index].accessor] = curr;
        return acc;
      }, {});
    });
    setRowData(rows)
    setColumnData(columns)
    setHeaders(columns)
  };

  return (
    <DndProvider backend={HTML5Backend}>
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
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
            <CSVReader onUploadAccepted={handleOnUploadAccepted}>
              {({
                getRootProps,
                acceptedFile,
                ProgressBar,
                getRemoveFileProps,
              }) => (
                <>
                  <div style={styles.csvReader}>
                    <button
                      type="button"
                      {...getRootProps()}
                      style={styles.browseFile}
                    >
                      {t("upload")}
                    </button>
                    <div style={styles.acceptedFile}>
                      {acceptedFile && acceptedFile.name}
                    </div>
                    <button {...getRemoveFileProps()} style={styles.remove}>
                      {t("remove")}
                    </button>
                  </div>
                  <ProgressBar style={styles.progressBarBackgroundColor} />
                </>
              )}
            </CSVReader>
          </Form.Group>
        </div>
        {file && (
          <>
            <Form.Label>{t("preview")}</Form.Label>
            <div style={styles.headerDivImport}>
            <Form.Group className="mb-3" controlId="headers">
            <Form.Label>{t("importHeaders")}</Form.Label>
              <HeaderDND headers={headers} columns={columnData} setColumns={setColumnData} setHeaders={setHeaders} setRemoved={setRemoved} removed={removed}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="removed">
            <Form.Label>{t("removedColumns")}</Form.Label> 
            <RemovedColumns removed={removed} setColumns={setColumnData} setHeaders={setHeaders} setRemoved={setRemoved} />
            </Form.Group>
            </div>
           
            <ReactTable columns={columns} data={data}/>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={!file}>{t("submit")}</Button>
      </Modal.Footer>
    </Modal>
    </DndProvider>
  );
};

export default ImportUIModal;
