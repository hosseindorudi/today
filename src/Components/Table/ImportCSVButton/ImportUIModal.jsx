import React, { useMemo, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useCSVReader } from "react-papaparse";
import { toast } from "react-toastify";
import { useTable } from "react-table";
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
  table: {
    fontSize: 11,
    whiteSpace: "nowrap",
    textAlign: "center",
  },
};
const ImportUIModal = (props) => {
  const [file, setFile] = useState(null);
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData,setTableData]=useState([])
  const data=useMemo(()=>tableData,[file])
  const columns=useMemo(()=>tableColumns,[file])
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const { CSVReader } = useCSVReader();
  const { t } = useTranslation();

 

  // const [data, setData] = useState([]);

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
    setTableColumns(columns)
    const rowd = data.data.slice(1).map((row) => {
      return row.reduce((acc, curr, index) => {
        acc[columns[index].accessor] = curr;
        return acc;
      }, {});
    });
    setTableData(rowd)
  };

  return (
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
            <Table style={styles.table} responsive {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup)=>(
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column)=>(
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>{
                  rows.map((row,i)=>{
                    prepareRow(row)
                    return <tr {...row.getRowProps()}>
                      {row.cells.map((cell)=>(
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
                    </tr>
                  })
              }
                </tbody>
            </Table>
            {/* <Table responsive style={styles.table}>
          <thead>
            <tr>
            {file[0].map((th,index)=>(
              <th key={index}>{th}</th>
            ))}
            </tr>
          </thead>
          <tbody>
          {file.slice(1).map((row,index)=>(
            <tr key={index}>
              {row.map((td,i)=>(
                <td key={i}>{td}</td>
              ))}
            </tr>
          ))}
          </tbody>

        </Table> */}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button>{t("submit")}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImportUIModal;
