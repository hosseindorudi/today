import "../../../../assets/css/table.css";
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import AdapterJalali from "@date-io/date-fns-jalali";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TableModal from "./TableModal/TableModal";
import { Breadcrumb, Form } from "react-bootstrap";
import * as fa from "react-icons/fa";
import * as fi from "react-icons/fi";
import * as md from "react-icons/md";
import useAxios from "../../../../customHooks/useAxios";
import { TabContext } from "../../../../contexts/TabContextProvider";
import useButtonAccess from "../../../../customHooks/useButtonAccess";
import useRequest from "../../../../customHooks/useRequest";
import { enums } from "../../../../data/Enums";
import BackDrop from "../../../../Components/backDrop/BackDrop";
import LogModal from "../../../../Components/Table/LogModal/LogModal";
import AccessListModal from "../../../../Components/Table/AccessListModal/AccessListModal";
import ExportAllButton from "../../../../Components/Table/ExportButton/ExportAllButton";
import MainUpArrow from "../../../../Components/Table/Arrows/MainUpArrow/MainUpArrow";
import DownArrow from "../../../../Components/Table/Arrows/downArrow/DownArrow";
import UpArrow from "../../../../Components/Table/Arrows/upArrow/UpArrow";
import TableButtons from "../../../../Components/Table/TableButtons/TableButtons";
import { t } from "i18next";
import { Pagination } from "@mui/material";
import { toast } from "react-toastify";
import useWindowSize from "../../../../customHooks/useWindowSize";
import { convertUTC, setDatePickerDate } from "../../../../validation/functions";
import ImportCSV from "../../../../Components/Table/ImportCSVButton/ImportCSV";
import PhoneDefectDefine from "./phoneDefectDefine/PhoneDefectDefine";
import { defectAccessList, defectCheckFile, defectDelete, defectExport, defectExportId, defectFavorite, defectGetOneRecord, defectImportFile, defectLog, defectRead, defectReadPaging, defectSampleFile, defectSetUnselectedColumn } from "../../../../services/defectService";
const PhoneDefects = () => {
    const filteredColumns = ["IsLimited", "Id", "Registrar","SourceType"];
    const [response, loading, fetchData, setResponse] = useAxios();
    const tabContext = useContext(TabContext);
    const [accessLists, setAccessLists] = useState(undefined);
    const [showAccessListModal, setAccessListModal] = useState(false);
    const [requestType, setRequestType] = useState("");
    const [unSelected, setUnSelected] = useState([]);
    const [haveAccess] = useButtonAccess();
    const [sort, setSort] = useState({ SortBy: "", IsAscending: false });
    const [currentPage, setCurrentPage] = useState(1);
    const [flt_Title, setFlt_Title] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [numberOfRecordsPerPage, setNumberOfRecordsPerPage] = useState(100);
    const request = useRequest();
    const [columnSideBar, setColumnSideBar] = useState(false);
    const [search, setSearch] = useState(false);
    const [seartBegin, setSearchBegin] = useState(null);
    const [seartEnd, setSearchEnd] = useState(null);
    const [showLogModal, setShowLogModal] = useState(false);
    const [log, setLog] = useState(null);
    const [tableModalOpen, setTableModalOpen] = useState(false);
    const [rowValus, setRowValues] = useState({});
    const [posts, setPosts] = useState([]);
    const [IsFavorite, setIsFavorite] = useState(false);
    const [checkAllC, setCheckAllC] = useState(true);
    const [productsColumns, setproductsColumns] = useState([]);
    const withOfScreen = useWindowSize().width;
    const abortController = new AbortController();
    const handleAdd = () => {
      const item = {
        Component:PhoneDefectDefine,
        path:"/phoneIssuesForm",
        title:"routes.phoneIssuesForm",
        access:enums.Definition_Defect_Create_w,
      };
      tabContext.addRemoveTabs(item, "add");
    };
    const getTable = () => {
      fetchData({
        method: "POST",
        url: defectRead,
        headers: {
          accept: "*/*",
        },
        data: request,
        signal: abortController.signal,
      });
    };
    const readPaging = (paging) => {
      setRequestType("READPAGING");
      fetchData({
        method: "POST",
        url: defectReadPaging,
        headers: {
          accept: "*/*",
        },
        data: {
          Request: request,
          paging: paging,
          filter: {
            flt_Title: flt_Title,
            flt_FromDate: seartBegin ? setDatePickerDate(seartBegin) : null,
            flt_ToDate: seartEnd ? setDatePickerDate(seartEnd) : null,
          },
        },
        signal: abortController.signal,
      });
    };
    const handleError = (message) => {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    };
    useEffect(() => {
      setRequestType("READ");
      getTable();
  
      return () => abortController.abort();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleDeleted = () => {
      Swal.fire(
        t("sweetAlert.deleted"),
        t("sweetAlert.recordDeleted"),
        "success"
      );
      const paging = {
        NumberOfRecordsPerPage: numberOfRecordsPerPage,
        CurrentPage: currentPage,
        IsAscending: sort.IsAscending,
        SortBy: sort.SortBy,
      };
      readPaging(paging);
    };
    const setUpdate = (res) => {
      const record = res.Record;
      setRowValues(record);
      setTableModalOpen(true);
    };
    const favorited = () => {
      setIsFavorite(true);
      toast.success(t("favorited"), {
        position: toast.POSITION.TOP_CENTER,
      });
    };
    const logResponse = (res) => {
      if (!res.Log.length) {
        return toast.info(t("noDataFound.table"), {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      setLog(res.Log);
      setShowLogModal(true);
    };
    const unselectResponseHandler = () => {
      const paging = {
        NumberOfRecordsPerPage: numberOfRecordsPerPage,
        CurrentPage: currentPage,
        IsAscending: sort.IsAscending,
        SortBy: sort.SortBy,
      };
      readPaging(paging);
    };
    const handleAccessListModal = (response) => {
      setAccessLists(response.AccessList);
      setAccessListModal(true);
    };
    const handleResponse = useCallback(
      (response, type) => {
        switch (type) {
          case "DELETE":
            handleDeleted();
            break;
          case "READ":
            setData(response);
            break;
          case "GETONERECORD":
            setUpdate(response);
            break;
          case "READPAGING":
            setData(response);
            break;
          case "FAVORITE":
            favorited();
            break;
          case "LOG":
            logResponse(response);
            break;
          case "UNSELECT":
            unselectResponseHandler();
            break;
          case "ACCESSLIST":
            handleAccessListModal(response);
            break;
          default:
            break;
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );
    const handleRefresh = () => {
      const paging = {
        NumberOfRecordsPerPage: numberOfRecordsPerPage,
        CurrentPage: currentPage,
        IsAscending: sort.IsAscending,
        SortBy: sort.SortBy,
      };
      readPaging(paging);
    };
  
    useEffect(() => {
      if (response) {
        response.Result
          ? handleResponse(response, requestType)
          : handleError(response.Message);
        setResponse(undefined);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response, handleResponse]);
  
    const setData = (response) => {
      const res = response.Record;
      const paging = response.Paging;
      setIsFavorite(response.IsFavorite);
      setUnSelected(response.UnselectedColumn);
      setPosts(res);
      setCurrentPage(paging.CurrentPage);
      setTotalPages(paging.TotalPages);
      setSort({ SortBy: paging.SortBy, IsAscending: paging.IsAscending });
      setNumberOfRecordsPerPage(paging.NumberOfRecordsPerPage);
      setproductsColumns(
        res[0]
          ? Object.keys(res[0]).map((key) => {
              return {
                Header: key,
                accessor: key,
                show: true,
                isSorted: paging.SortBy === key ? true : false,
                IsAscending: paging.SortBy === key ? paging.IsAscending : false,
              };
            })
          : []
      );
    };
    const sendUnselectRequest = (temp) => {
      setRequestType("UNSELECT");
      fetchData({
        method: "POST",
        url: defectSetUnselectedColumn,
        headers: {
          accept: "*/*",
        },
        data: {
          Request: request,
          Column: temp,
        },
        signal: abortController.signal,
      });
    };
    const CheckBoxChangeHandler = (e, column) => {
      let checked = e.target.checked;
      let temp = unSelected;
      checked ? (temp = temp.filter((u) => u !== column)) : temp.push(column);
      sendUnselectRequest(temp);
    };
    const checkAllHandler = (e) => {
      let temp = unSelected;
      if (e.target.id === "checkAll") {
        productsColumns
          .filter((p, i) => !filteredColumns.includes(p["Header"]))
          .map(
            (column, index) => (temp = temp.filter((i) => i !== column["Header"]))
          );
        sendUnselectRequest(temp);
        setCheckAllC(!checkAllC);
      } else if (e.target.id === "unCheckAll") {
        productsColumns
          .filter((p, i) => !filteredColumns.includes(p["Header"]))
          .map((column, index) => temp.push(column["Header"]));
        sendUnselectRequest(temp);
        setCheckAllC(!checkAllC);
      }
    };
    const checkValues = (type, value, post) => {
      switch (type) {
        case "DateSet":
          return convertUTC(value);
        case "IsActive":
          return <Form.Check type="switch" disabled checked={value} />;
          case "Gender":
          return value?t("male"):t("female");
        case "LimitFrom":
          return post.IsLimited ? convertUTC(value) : "-";
        case "LimitTo":
          return post.IsLimited ? convertUTC(value) : "-";
          case "Color":
            return <input disabled type={"color"} value={`#${value}`}/>;
        default:
          return value;
      }
    };
    const deleteRecord = (id) => {
      setRequestType("DELETE");
      fetchData({
        method: "POST",
        url: defectDelete,
        headers: {
          accept: "*/*",
        },
        data: {
          Request: request,
          Id: id,
        },
        signal: abortController.signal,
      });
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
    const handleClickSort = (column) => {
      setSort({ SortBy: column.accessor, IsAscending: !column.IsAscending });
      const paging = {
        NumberOfRecordsPerPage: numberOfRecordsPerPage,
        CurrentPage: currentPage,
        IsAscending: !column.IsAscending,
        SortBy: column.accessor,
      };
      readPaging(paging);
    };
    const handleChangeSelect = (e) => {
      const paging = {
        NumberOfRecordsPerPage: e.target.value,
        CurrentPage: currentPage,
        IsAscending: sort.IsAscending,
        SortBy: sort.SortBy,
      };
      readPaging(paging);
    };
    const handleClickEdit = (id) => {
      setRequestType("GETONERECORD");
      fetchData({
        method: "POST",
        url: defectGetOneRecord,
        headers: {
          accept: "*/*",
        },
        data: {
          Request: request,
          Id: id,
        },
        signal: abortController.signal,
      });
    };
    const handleChangeTitle = (event) => {
      setFlt_Title(event.target.value);
    };
    const setPage = (event, value) => {
      const paging = {
        NumberOfRecordsPerPage: numberOfRecordsPerPage,
        CurrentPage: value,
        IsAscending: sort.IsAscending,
        SortBy: sort.SortBy,
      };
      readPaging(paging);
    };
    const handleClearFilter = () => {
      setFlt_Title("");
      setSearchBegin(null);
      setSearchEnd(null);
    };
    const updated = () => {
      setTableModalOpen(false);
      toast.success(t("updatedRecord"), {
        position: toast.POSITION.TOP_CENTER,
      });
      const paging = {
        NumberOfRecordsPerPage: numberOfRecordsPerPage,
        CurrentPage: currentPage,
        IsAscending: sort.IsAscending,
        SortBy: sort.SortBy,
      };
      readPaging(paging);
    };
    const handleClickSend = () => {
      const paging = {
        NumberOfRecordsPerPage: numberOfRecordsPerPage,
        CurrentPage: currentPage,
        IsAscending: sort.IsAscending,
        SortBy: sort.SortBy,
      };
      readPaging(paging);
    };
    const handleClickFav = () => {
      setRequestType("FAVORITE");
      fetchData({
        method: "POST",
        url: defectFavorite,
        headers: {
          accept: "*/*",
        },
        data: request,
        signal: abortController.signal,
      });
    };
    const handleClickHelp = () => {
      window.open("https://www.google.com");
    };
  
    const handleClickLog = () => {
      setRequestType("LOG");
      fetchData({
        method: "POST",
        url: defectLog,
        headers: {
          accept: "*/*",
        },
        data: request,
        signal: abortController.signal,
      });
    };
    const importSuccess = (message) => {
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });
      const paging = {
        NumberOfRecordsPerPage: numberOfRecordsPerPage,
        CurrentPage: currentPage,
        IsAscending: sort.IsAscending,
        SortBy: sort.SortBy,
      };
      readPaging(paging);
    };
  
    const handleClickAccessList = () => {
      setRequestType("ACCESSLIST");
      fetchData({
        method: "POST",
        url: defectAccessList,
        headers: {
          accept: "*/*",
        },
        data: request,
        signal: abortController.signal,
      });
    };
    return (
      <>
        {loading && <BackDrop open={true} />}
        <>
          {tableModalOpen && (
            <TableModal
              rowValus={rowValus}
              onHide={() => setTableModalOpen(false)}
              tableModalShow={tableModalOpen}
              updated={updated}
            />
          )}
          {showLogModal && (
            <LogModal
              onHide={() => setShowLogModal(false)}
              logs={log}
              show={showLogModal}
            />
          )}
          {showAccessListModal && (
            <AccessListModal
              accessList={accessLists}
              show={showAccessListModal}
              onHide={() => setAccessListModal(false)}
            />
          )}
          <div className="reacttableParent">
            <div className="groupContainerRight">
              <div className="reacttableParentMainRightUp">
                <span className="reacttableParentMainRightUpInformation">
                  {t("table.information")}
                </span>
                <div className="reacttableParentMainRightUpInformationDiv"></div>
              </div>
              <div className="reacttableParentMainRightDown">
                <span className="reacttableParentMainRightDownToolBox">
                  {t("table.tools")}
                </span>
                <div className="reacttableParentMainRightDownToolBoxDiv">
                  <div
                    onClick={() => {
                      setSearch((prev) => !prev);
                    }}
                    style={{
                      color:
                        !search && seartBegin !== null && seartEnd !== null
                          ? "red"
                          : "lightgray",
                    }}
                  >
                    <i
                      className="fa fa-search searchDater"
                      aria-hidden="true"
                    ></i>
                  </div>
                  <div className="reacttableParentMainRightDownToolBoxDivColumnBtn">
                    <button
                      className={columnSideBar ? "hold" : "columnBtnTableToggle"}
                      onClick={() => {
                        setColumnSideBar(!columnSideBar);
                      }}
                    >
                      {t("table.groups")}
                    </button>
                  </div>
                  {haveAccess(enums.Definition_Defect_Export_r) && (
                    <ExportAllButton
                      numberOfRecordsPerPage={numberOfRecordsPerPage}
                      currentPage={currentPage}
                      sort={sort}
                      flt_Title={flt_Title}
                      seartBegin={seartBegin}
                      seartEnd={seartEnd}
                      exportLink={defectExport}
                    />
                  )}
                  {haveAccess(enums.Definition_Defect_Import_w) && (
                    <ImportCSV importSuccess={importSuccess} sampleUrl={defectSampleFile} fileCheckURL={defectCheckFile} importURL={defectImportFile}/>
                  )}
                  {haveAccess(enums.Definition_Defect_Log_r) && (
                    <button
                      className="reactTableParentLogButton"
                      title="log"
                      onClick={handleClickLog}
                    >
                      <fa.FaHistory />
                    </button>
                  )}
                 
                  {haveAccess(enums.Definition_Defect_Read_r) && (
                  <button
                    className="reactTableParentAccessButton"
                    onClick={handleClickAccessList}
                  >
                    <fa.FaUserLock />
                  </button>
                  )}
                  <button
                    disabled={IsFavorite}
                    title="favorite"
                    className={`reactTableParentFavoritButton ${
                      IsFavorite ? "favactive" : ""
                    }`}
                    onClick={handleClickFav}
                  >
                    <fa.FaRegStar />
                  </button>
                  <button
                    className="reactTableParentHelpButton"
                    onClick={handleClickHelp}
                    title="help"
                  >
                    <fa.FaQuestionCircle />
                  </button>
                </div>
              </div>
            </div>
  
            <div className="groupContainerLeft">
              <div className="tableSection">
                <div
                  className="searchSection"
                  style={{ height: search ? "15%" : "10%" }}
                >
                  <div className="reacttableParentPlusButton">
                    <button className="groupListRefresh" onClick={handleRefresh}>
                      <fi.FiRefreshCcw />
                    </button>
                    {haveAccess(enums.Definition_Defect_Create_w) && (
                      <button className="plusBUTTON" onClick={handleAdd}>
                        <md.MdPostAdd />
                      </button>
                    )}
                  </div>
  
                  <div className="reacttableParentMiddleMiddleSide">
                    <div className="bredCrumbTable">
                      <div role="presentation" style={{ direction: "ltr" }}>
                        <Breadcrumb>
                          <Breadcrumb.Item href="#">خانه</Breadcrumb.Item>
                          <Breadcrumb.Item active>فرم</Breadcrumb.Item>
                          <Breadcrumb.Item active>جدول</Breadcrumb.Item>
                        </Breadcrumb>
                      </div>
                    </div>
                    <div
                      className="searchField"
                      style={{ height: search ? "100%" : 0 }}
                    >
                      <div style={{ display: search ? "block" : "none" }}>
                        <fa.FaTimes
                          color="red"
                          onClick={handleClearFilter}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      <Form.Group style={{ display: search ? "block" : "none" }}>
                        <Form.Control
                          className="searchTextChange"
                          type="text"
                          placeholder="جستجو"
                          onChange={handleChangeTitle}
                          value={flt_Title}
                        />
                      </Form.Group>
                      <div
                        style={{
                          direction: "ltr",
                          display: search ? "block" : "none",
                        }}
                      >
                        <LocalizationProvider dateAdapter={AdapterJalali}>
                          <DatePicker
                            mask="____/__/__"
                            label="تاریخ شروع"
                            value={seartBegin}
                            onChange={(newValue) => {
                              setSearchBegin(newValue);
                              if (seartEnd !== null && newValue > seartEnd) {
                                alert(
                                  "تاریخ پایانی نمیتواند از تاریخ شروع کمتر باشد"
                                );
                                setSearchBegin(null);
                              }
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                }}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </div>
                      <div
                        style={{
                          direction: "ltr",
                          display: search ? "block" : "none",
                        }}
                      >
                        <LocalizationProvider dateAdapter={AdapterJalali}>
                          <DatePicker
                            label="تاریخ پایان"
                            mask="____/__/__"
                            value={seartEnd}
                            onChange={(newValue) => {
                              setSearchEnd(newValue);
                              if (seartBegin === null) {
                                alert("ابتدا تاریخ شروع را مشخص کنید!!!");
                                setSearchEnd(null);
                              }
                              if (seartBegin !== null && seartBegin > newValue) {
                                alert(
                                  "تاریخ پایانی نمیتواند از تاریخ شروع کمتر باشد"
                                );
                                setSearchEnd(null);
                              }
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                }}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tableAndPaging"
                  style={{ height: search ? "85%" : "90%" }}
                >
                  <div className="selfTabel">
                    <div
                      className="div33"
                      style={{
                        width: columnSideBar
                          ? withOfScreen - (withOfScreen * 0.2 + 370)
                          : withOfScreen - (withOfScreen * 0.2 + 120),
                      }}
                    >
                      {productsColumns.length > 0 ? (
                        <table className="MainTableCss">
                          <thead className="MainTableThead">
                            <tr className="MainTableTr">
                              <th className="MainTableTh"> </th>
  
                              {productsColumns
                                .filter(
                                  (p, i) =>
                                    !filteredColumns.includes(p["Header"]) &&
                                    !unSelected.includes(p["Header"])
                                )
                                .map((column, index) => (
                                  <th
                                    className="MainTableTh"
                                    key={index}
                                    style={{
                                      display: !column["show"] ? "none" : null,
                                    }}
                                  >
                                    {t(column["Header"])}
                                    <button
                                      className="sortingArrowsBTN"
                                      onClick={() => handleClickSort(column)}
                                    >
                                      {column["isSorted"] ? (
                                        column["IsAscending"] ? (
                                          <MainUpArrow />
                                        ) : (
                                          <DownArrow />
                                        )
                                      ) : (
                                        <UpArrow />
                                      )}
                                    </button>
                                  </th>
                                ))}
                            </tr>
                          </thead>
                          <tbody>
                            {posts.map((post, index) => (
                              <tr key={index}>
                                <td className="TableMainTd">
                                <TableButtons
                                    exportLink={defectExportId}
                                    deleteType={enums.Definition_Defect_Delete_w}
                                    editType={enums.Definition_Defect_Update_w}
                                    exportType={enums.Definition_Defect_Export_r}
                                    accessListType={
                                      ""
                                    }
                                    changePasswordType={
                                     ""
                                    }
                                    deleteCalled={deleteCalled}
                                    rowValue={post}
                                    handleClickEdit={handleClickEdit}
                                  />
                                </td>
                                {Object.keys(post)
                                  .filter(
                                    (p, i) =>
                                      !filteredColumns.includes(p) &&
                                      !unSelected.includes(p)
                                  )
                                  .map((key, index) => {
                                    return (
                                      <td
                                        key={key + index}
                                        className="TableMainTd"
                                        style={{
                                          display: !productsColumns[
                                            productsColumns.findIndex(
                                              (p) => p["accessor"] === key
                                            )
                                          ].show
                                            ? "none"
                                            : null,
                                        }}
                                      >
                                        {checkValues(key, post[key], post)}
                                      </td>
                                    );
                                  })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="noDataTable">
                          <b>{t("noDataFound.table")}</b>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="selfPaging">
                    <div className="downPaginationMain">
                      <div className="page">
                        <Pagination
                          page={currentPage}
                          onChange={setPage}
                          count={totalPages}
                        />
                      </div>
                    </div>
                    <div className="downpaginationButtins">
                      <select
                        className="paginationSelector"
                        value={numberOfRecordsPerPage}
                        onChange={handleChangeSelect}
                      >
                        {[25, 50, 100].map((v, i) => (
                          <option key={i} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                      <button className="sendForm" onClick={handleClickSend}>
                        {t("sendGroup")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
  
              <div
                className="hiddingSection"
                style={{ width: columnSideBar ? 250 : 10 }}
              >
                <div className="hiddenSectionBtn">
                  <div
                    className="reactTableParentMiddle1BTN"
                    onClick={() => setColumnSideBar(!columnSideBar)}
                  ></div>
                </div>
                <div className="hiddenSectionCheck">
                  <div className="mainUnderCloseBtn">
                    <div className="checkBoxTableParentForAll">
                      <div></div>
                      <input
                        type="radio"
                        checked={checkAllC}
                        id="checkAll"
                        name="checkall"
                        onChange={checkAllHandler}
                      />
                      <input
                        type="radio"
                        checked={!checkAllC}
                        id="unCheckAll"
                        name="checkall"
                        onChange={checkAllHandler}
                      />
                      <div></div>
                    </div>
                    {productsColumns
                      .filter((p, i) => !filteredColumns.includes(p["Header"]))
                      .map((column, index) => (
                        <div className="checkBoxTableParent" key={index}>
                          <label htmlFor="todo" data-content="Get out of bed">
                            {t(column["Header"])}
                          </label>
                          <input
                            type="checkbox"
                            id="todo"
                            checked={
                              unSelected.includes(column["Header"]) ? false : true
                            }
                            name="todo"
                            value="todo"
                            onChange={(e) =>
                              CheckBoxChangeHandler(e, column["Header"])
                            }
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        {/* )} */}
      </>
    );
  };

export default PhoneDefects