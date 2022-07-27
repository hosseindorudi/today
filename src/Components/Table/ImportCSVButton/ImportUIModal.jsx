import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTranslation } from "react-i18next";
import { useCSVReader } from "react-papaparse";
import { toast } from "react-toastify";
import useAxios from "../../../customHooks/useAxios";
import ReactTable from "../../reactTable/ReactTable";
import { HeaderDND } from "./HeaderDND";
import RemovedColumns from "./RemovedColumns";
import useRequest from "../../../customHooks/useRequest";
import BackDrop from "../../backDrop/BackDrop";
const styles = {
  csvReader: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    width: "80%",
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
  headerDivImport: {
    display: "flex",
    justifyContent: "space-around",
  },
  buttonPrepare: {
    margin: 10,
  },
  CsvRowImport: {
    display: "flex",
    justifyContent: "space-between",
  },
};
const ImportUIModal = (props) => {
  const [response, loading, fetchData] = useAxios();
  const [columnInfo, setColumnInfo] = useState([]);
  const [finalHeader, setFinalHeader] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const dataFinal = useMemo(() => finalData, [finalData]);
  const columnsFinal = useMemo(() => finalHeader, [finalHeader]);
  const request = useRequest();
  const [type, setType] = useState("");
  const [withHeader, setWithHeader] = useState(true);
  const [file, setFile] = useState(null);
  const [columnData, setColumnData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const data = useMemo(() => rowData, [rowData]);
  const columns = useMemo(() => columnData, [columnData]);
  const [headers, setHeaders] = useState([]);
  const [removed, setRemoved] = useState([]);
  const { CSVReader } = useCSVReader();
  const { t } = useTranslation();

  const handleOnUploadAccepted = (data) => {
    if (data.errors.length)
      return toast.warn(t("selectCSVFileOnly"), {
        position: toast.POSITION.TOP_CENTER,
      });
    setFile(data.data);
    let columns = [];
    let rows = [];
    if (withHeader) {
      columns = data.data[0].map((col, index) => {
        return {
          Header: col === "" ? `NO-HEADER${index}` : col,
          accessor: col === "" ? `NO-HEADER${index}` : col,
          index: index,
        };
      });
      
      rows = data.data.slice(1).map((row) => {
        return row.reduce((acc, curr, index) => {
          acc[columns[index].accessor] = curr;
          return acc;
        }, {});
      });
    } else {
      columns = data.data[0].map((col, index) => {
        return {
          Header: index.toString(),
          accessor: index.toString(),
          index: index,
        };
      });
      rows = data.data.map((row) => {
        return row.reduce((acc, curr, index) => {
          acc[columns[index].accessor] = curr;
          return acc;
        }, {});
      });
      
    }
    setRowData(rows);
    setColumnData(columns);
    setHeaders(columns);
  };
  const handleRemove = () => {
    setHeaders([]);
    setFile(null);
    setRowData([]);
    setColumnData([]);
    setRemoved([]);
    setColumnInfo([]);
    setFinalData([]);
  };
  const handleClickPrepare = () => {
    setType("COLUMNINFO");
    fetchData({
      method: "POST",
      url: props.columnInfo,
      headers: request,
    });
  };
 
  const setFinalTableData = (columnInfo) => {
    //Required Headers from backEnd
    const finalColumns = columnInfo.map((col, index) => {
      return {
        Header: col.Name,
        accessor: col.Name,
        Type: col.Type,
        Length: col.Length,
        Required: col.Necessary,
      };
    });
  

    //Creating new data with respect to sorted columns and Removed columns
    const availableHeaders = columns.map((col) => col.Header);
    
    const finalRowData = rowData.map((d, i) =>
      Object.keys(d).reduce((acc, key) => {
        if (availableHeaders.includes(key)) {
          acc[key] = d[key];
        }
        return acc;
      }, {})
    );
    
   let sortedData=[] 
    finalRowData.map((d,i)=>{
      let obj={}
      availableHeaders.map((h,i)=>{     
       return Object.assign(obj, {[h]: d[h]});
      })
     return sortedData.push(obj)
  })
//creating new FinalRowData with respect to new headers
const data= sortedData.map((row) => {
    return Object.keys(row).reduce((acc, curr, index) => {
      acc[finalColumns[index].accessor] = row[curr];
      return acc;
    }, {});
  });
setFinalHeader(finalColumns);

setFinalData(data)
  };
  const handleClickSubmit = () => {

// console.log(sortedData)
  // console.log(finalHeader)
  // console.log(rowData)
  
  };
  const handleResponse = useCallback((res, type) => {
    switch (type) {
      case "COLUMNINFO":
        setColumnInfo(res.Column);
        setFinalTableData(res.Column);
        break;

      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    response && handleResponse(response, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  const config = {
    skipEmptyLines: true,
  };
  return (
    <DndProvider backend={HTML5Backend}>
      {loading && <BackDrop open={true} />}
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
              <div style={styles.CsvRowImport}>
                <CSVReader
                  onUploadAccepted={handleOnUploadAccepted}
                  accept=".csv"
                  config={config}
                >
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
                          {t("select")}
                        </button>
                        <div style={styles.acceptedFile}>
                          {acceptedFile && acceptedFile.name}
                        </div>
                        <button
                          {...getRemoveFileProps()}
                          style={styles.remove}
                          onClick={(event) => {
                            getRemoveFileProps().onClick(event);
                            handleRemove();
                          }}
                        >
                          {t("remove")}
                        </button>
                      </div>
                      {/* <ProgressBar style={styles.progressBarBackgroundColor} /> */}
                    </>
                  )}
                </CSVReader>
                <Form.Check
                  label={t("withHeader")}
                  checked={withHeader}
                  onChange={() => setWithHeader(!withHeader)}
                />
              </div>
            </Form.Group>
          </div>
          {file && (
            <>
              <Form.Label>{t("preview")}</Form.Label>
              <div style={styles.headerDivImport}>
                <Form.Group className="mb-3" controlId="headers">
                  <Form.Label>{t("importHeaders")}</Form.Label>
                  <HeaderDND
                    headers={headers}
                    columns={columnData}
                    setColumns={setColumnData}
                    setHeaders={setHeaders}
                    setRemoved={setRemoved}
                    removed={removed}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="removed">
                  <Form.Label>{t("removedColumns")}</Form.Label>
                  <RemovedColumns
                    removed={removed}
                    setColumns={setColumnData}
                    setHeaders={setHeaders}
                    setRemoved={setRemoved}
                  />
                </Form.Group>
              </div>

              <ReactTable columns={columns} data={data} />
              <Button
                size="sm"
                style={styles.buttonPrepare}
                onClick={handleClickPrepare}
              >
                {t("prepare")}
              </Button>
              {columnInfo.length > 0 && (
                <ReactTable columns={columnsFinal} data={dataFinal} />
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={!file} onClick={handleClickSubmit}>
            {t("submit")}
          </Button>
        </Modal.Footer>
      </Modal>
    </DndProvider>
  );
};

export default ImportUIModal;
