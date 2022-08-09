import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { TabContext } from "../../../../contexts/TabContextProvider";
import useAxios from "../../../../customHooks/useAxios";
import useRequest from "../../../../customHooks/useRequest";
import {
  validateLength,
  validateRequired,
  validateType,
} from "../../../../validation/validation";
import BackDrop from "../../../backDrop/BackDrop";
import * as md from "react-icons/md";
import * as fa from "react-icons/fa";
import ReactTable from "../../../reactTable/ReactTable";
import RemovedColumns from "../RemovedColumns";
import { HeaderDND } from "../HeaderDND";
import FieldSetBorder from "../../../fieldSetBorder/FieldSetBorder";
const styles = {
  ModalBody: {
    padding: 10,
  },
  textField: {
    fontSize: 10,
  },
  topLayer: {
    display: "flex",
    flexDirection: "row",
    gap: "1%",
  },
  topLayerHeader: {
    width: "15%",
    height: "100%",
  },
  topLayerRemove: {
    width: "15%",
    height: "100%",
  },
  table: {
    width: "70%",
    height: "100%",
  },
  buttonPrepare: {
    margin: 10,
    fontSize: 12,
  },
  CsvRowImport: {
    display: "flex",
    justifyContent: "space-between",
  },
  refresh: {
    color: "red",
    cursor: "pointer",
    fontSize: 20,
  },
  lableFinal: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  labelHeaders: {
    fontSize: 10,
    fontWeight: "bold",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  addBtn: {
    cursor: "pointer",
  },
  lowLayer: {
    display: "flex",
  },
  tableLower: {
    width: "80%",
    height: "100%",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    width: "20%",
  },
};
const ImportUI = () => {
  const { tabs, addRemoveTabs } = useContext(TabContext);
  const importUI = tabs.find((f) => f.path === "ImportUI");
  const { file, withHeader, columnInfo, importarray } = importUI;
  const [response, loading, fetchData] = useAxios();
  const [finalHeader, setFinalHeader] = useState([]);
  const [addColumnValue, setAddColumnValue] = useState("");
  const [finalData, setFinalData] = useState([]);
  const dataFinal = useMemo(() => finalData, [finalData]);
  const [originalData, setOriginalData] = useState([]);
  const columnsFinal = useMemo(() => finalHeader, [finalHeader]);
  const request = useRequest();
  const [type, setType] = useState("");
  const [columnData, setColumnData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const data = useMemo(() => rowData, [rowData]);
  const columns = useMemo(() => columnData, [columnData]);
  const [headers, setHeaders] = useState([]);
  const [removed, setRemoved] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    let columns = [];
    let rows = [];
    if (withHeader) {
      columns = file[0].map((col, index) => {
        return {
          Header: col === "" ? `NO-HEADER${index}` : col,
          accessor: col === "" ? `NO-HEADER${index}` : col,
          index: index,
        };
      });

      rows = file.slice(1).map((row) => {
        return row.reduce((acc, curr, index) => {
          acc[columns[index].accessor] = curr;
          return acc;
        }, {});
      });
    } else {
      columns = file[0].map((col, index) => {
        return {
          Header: index.toString(),
          accessor: index.toString(),
          index: index,
        };
      });
      rows = file.map((row) => {
        return row.reduce((acc, curr, index) => {
          acc[columns[index].accessor] = curr;
          return acc;
        }, {});
      });
    }
    setRowData(rows);
    setColumnData(columns);
    setHeaders(columns);
    getColumns("COLUMNINFO");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateMyData = (rowIndex, columnId, value) => {
    setFinalData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };
  const resetData = () => setFinalData(originalData);
  const getColumns = (type) => {
    setType(type);
    fetchData({
      method: "POST",
      url: columnInfo,
      headers: request,
    });
  };
  const prepareTable = (fHeader) => {
  
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
    let sortedData = [];
    finalRowData.map((d, i) => {
      let obj = {};
      availableHeaders.map((h, i) => {
        return Object.assign(obj, { [h]: d[h] });
      });
      return sortedData.push(obj);
    });
    //creating new FinalRowData with respect to new headers
    let data = sortedData.map((row) => {
      return Object.keys(row).reduce((acc, curr, index) => {
        acc[fHeader[index]?.accessor] = row[curr];
        return acc;
      }, {});
    });

    //adding extra columns in case its not available in previous headers.
    if (fHeader.length > availableHeaders.length) {
      for (
        let index = availableHeaders.length;
        index < fHeader.length;
        index++
      ) {
        data = data.map((v) => ({ ...v, [fHeader[index].accessor]: "" }));
      }
    }

    setFinalData(data);
    setOriginalData(data);
 
  };
  const setFinalTableData = () => {
    setFinalData([]);
    setOriginalData([]);
    getColumns("PREPARE");
  };
  const handleClickSubmit = () => {
    setType("SUBMIT");
    fetchData({
      method: "POST",
      url: importarray,
      headers: request,
      data: dataFinal,
    });
  };
  const handleResponse = (res, type) => {
    let finalColumns = [];
    switch (type) {
      case "COLUMNINFO":
        //Required Headers from backEnd
        finalColumns = res.Column.map((col, index) => {
          return {
            Header: col.Name,
            accessor: col.Name,
            Type: col.Type,
            Length: col.Length,
            Required: col.Necessary,
            Parent: col.Parent,
            ParentTitle: col.ParentTitle,
            isData: true,
          };
        });
        setFinalHeader(finalColumns);

        break;
      case "PREPARE":
        finalColumns = res.Column.map((col, index) => {
          return {
            Header: col.Name,
            accessor: col.Name,
            Type: col.Type,
            Length: col.Length,
            Required: col.Necessary,
            Parent: col.Parent,
            ParentTitle: col.ParentTitle,
            isData: true,
          };
        });
        setFinalHeader(finalColumns);
        prepareTable(finalColumns);
        break;
      case "SUBMIT":
        importSuccess(res.Message);
        break;

      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  const importSuccess = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
    });
    addRemoveTabs(
      {
        path: "ImportUI",
      },
      "remove"
    );
  };
  useEffect(() => {
    response && handleResponse(response, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  const handleClickAdd = () => {
    if (addColumnValue.length === 0)
      return toast.info(t("coloumnEmpty"), {
        position: toast.POSITION.TOP_CENTER,
      });
    if (columnData.find((f) => f.Header === addColumnValue))
      return toast.info(t("columnExits"), {
        position: toast.POSITION.TOP_CENTER,
      });
    let obj = {
      Header: addColumnValue,
      accessor: addColumnValue,
      index: addColumnValue,
    };
    setColumnData((oldArray) => [...oldArray, obj]);
    setHeaders((oldArray) => [...oldArray, obj]);
    setAddColumnValue("");
  };
  const addRow=()=>{
    const obj = columnsFinal.reduce((acc, cur) => ({ ...acc, [cur.Header]: "" }), {})
    setFinalData(oldArray => [...oldArray, obj]);
  }
  const removeLast=()=>{
    setFinalData((previousArr) => (previousArr.slice(0, -1)));
  }
  return (
    <>
      {loading && <BackDrop open={true} />}
      
      <div style={styles.ModalBody} className="importUIClass">
        {file && (
          <>
            <FieldSetBorder legend={t("primitive")}>
              <div style={styles.topLayer}>
                <div style={styles.topLayerRemove}>
                  <div>
                    <Form.Group>
                      <Form.Label style={styles.labelHeaders}>
                        {t("addColumn")}
                      </Form.Label>
                      <div style={styles.row}>
                        <Form.Control
                          placeholder={t("columnName")}
                          style={styles.textField}
                          value={addColumnValue}
                          onChange={(e) => setAddColumnValue(e.target.value)}
                        />
                        <fa.FaPlus
                          style={styles.addBtn}
                          onClick={handleClickAdd}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <Form.Group className="mb-3" controlId="removed">
                    <Form.Label style={styles.labelHeaders}>
                      {t("removedColumns")}
                    </Form.Label>
                    <RemovedColumns
                      removed={removed}
                      setColumns={setColumnData}
                      setHeaders={setHeaders}
                      setRemoved={setRemoved}
                    />
                  </Form.Group>
                </div>
                <div style={styles.topLayerHeader}>
                  <Form.Group className="mb-3" controlId="headers">
                    <Form.Label style={styles.labelHeaders}>
                      {t("importHeaders")}
                    </Form.Label>
                    {/* <DndProvider backend={HTML5Backend}> */}
                    <HeaderDND
                      headers={headers}
                      columns={columnData}
                      setColumns={setColumnData}
                      setHeaders={setHeaders}
                      setRemoved={setRemoved}
                      removed={removed}
                    />
                    {/* </DndProvider> */}
                  </Form.Group>
                </div>
                <div style={styles.table}>
                  <ReactTable
                    columns={columns}
                    data={data}
                    isEditable={false}
                  />
                </div>
              </div>
            </FieldSetBorder>
            <FieldSetBorder
              legend={
                <>
                  {t("final")}
                  {finalData.length > 0 && (
                    <md.MdOutlineRestartAlt
                      onClick={resetData}
                      style={styles.refresh}
                    />
                  )}{" "}
                </>
              }
            >
              <div style={styles.lowLayer}>
                <div style={styles.buttons}>
                  <Button
                    size="sm"
                    style={styles.buttonPrepare}
                    onClick={() => setFinalTableData()}
                  >
                    {t("prepare")}
                  </Button>
                  {finalData.length > 0 && (
                    <>
                      <Button
                        size="sm"
                        style={styles.buttonPrepare}
                        onClick={() => addRow()}
                      >
                        {t("addRow")}
                      </Button>
                      <Button
                        size="sm"
                        style={styles.buttonPrepare}
                        onClick={() => removeLast()}
                      >
                        {t("removeLastRow")}
                      </Button>
                      <Button
                        size="sm"
                        style={styles.buttonPrepare}
                        onClick={handleClickSubmit}
                      >
                        {t("submit")}
                      </Button>
                    </>
                  )}
                </div>
                <div style={styles.tableLower}>
                  <ReactTable
                    columns={columnsFinal}
                    data={dataFinal}
                    getCellProps={(cellInfo) => ({
                      style: {
                        backgroundColor:
                          validateType(cellInfo) &&
                          validateLength(cellInfo) &&
                          validateRequired(cellInfo)
                            ? "white"
                            : "coral",
                      },
                    })}
                    isEditable={true}
                    updateMyData={updateMyData}
                  />
                </div>
              </div>
            </FieldSetBorder>
          </>
        )}
      </div>
    </>
  );
};

export default ImportUI;
