import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import "../../../assets/css/table.css";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxios from "../../../customHooks/useAxios";
import useRequest from "../../../customHooks/useRequest";
import { setDatePickerDate } from "../../../validation/functions";
import BackDrop from "../../backDrop/BackDrop";
import AccessListModal from "../AccessListModal/AccessListModal";
import LogModal from "../LogModal/LogModal";
import MobileModalsColumn from "../MobileModalColumns/MobileModalsColumn";
import MobileModalRightBar from "../mobileModalRightBar/MobileModalRightBar";
import MobileModel from "../mobileModel/MobileModel";
import PasswordModal from "../passwordModal/PasswordModal";
import PermissionModal from "../PermissionModal/PermissionModal";
import LeftSideContainer from "./LeftSideContainer";
import RighSideContainer from "./RighSideContainer";
import TableList from "./TableList";
const CustomTable = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const [response, loading, fetchData] = useAxios();
  const [accessLists, setAccessLists] = useState(undefined);
  const [groupId, setGroupId] = useState();
  const [showGetPermissionModal, setShowGetPermissionModal] = useState(false);
  const [permissions, setPermissions] = useState(undefined);
  const [showAccessListModal, setAccessListModal] = useState(false);
  const [passwordModalOpen, setPasswordmodalOpen] = useState(false);
  const [requestType, setRequestType] = useState("");
  const [unSelected, setUnSelected] = useState([]);
  const [sort, setSort] = useState({ SortBy: "", IsAscending: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [flt_Title, setFlt_Title] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [numberOfRecordsPerPage, setNumberOfRecordsPerPage] = useState(100);
  const request = useRequest();
  const [columnSideBar, setColumnSideBar] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchBegin, setSearchBegin] = useState(null);
  const [searchEnd, setSearchEnd] = useState(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [log, setLog] = useState(null);
  const [rowValus, setRowValues] = useState({});
  const [posts, setPosts] = useState([]);
  const [IsFavorite, setIsFavorite] = useState(false);
  const [checkAllC, setCheckAllC] = useState(true);
  const [productsColumns, setproductsColumns] = useState([]);
  const abortController = new AbortController();

  const getTable = () => {
    fetchData({
      method: "POST",
      url: props.ReadApi,
      headers: request,

      signal: abortController.signal,
    });
  };
  const handleClickLog = () => {
    setRequestType("LOG");
    fetchData({
      method: "POST",
      url: props.logApi,
      headers: request,

      signal: abortController.signal,
    });
  };
  const readPaging = (paging) => {
    setRequestType("READPAGING");
    fetchData({
      method: "POST",
      url: props.readPagingApi,
      headers: request,
      data: {
        paging: paging,
        filter: {
          flt_Title: flt_Title,
          flt_FromDate: searchBegin ? setDatePickerDate(searchBegin) : null,
          flt_ToDate: searchEnd ? setDatePickerDate(searchEnd) : null,
        },
      },
      signal: abortController.signal,
    });
  };
  const handleClickAccessList = () => {
    setRequestType("ACCESSLIST");
    fetchData({
      method: "POST",
      url: props.accessListApi,
      headers: request,

      signal: abortController.signal,
    });
  };
  const handleGetPermissionModal = (response) => {
    setPermissions(response.AccessList);
    setShowGetPermissionModal(true);
  };
  const handleSetPermission = () => {
    toast.success(t("updatedRecord"), {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const handleClickFav = () => {
    setRequestType("FAVORITE");
    fetchData({
      method: "POST",
      url: props.favouriteApi,
      headers: request,

      signal: abortController.signal,
    });
  };
  const deleteRecord = (id) => {
    setRequestType("DELETE");
    fetchData({
      method: "POST",
      url: props.deleteApi,
      headers: request,
      data: {
        Id: id,
      },
      signal: abortController.signal,
    });
  };
  const handleClickEdit = (id) => {
    setRequestType("GETONERECORD");
    fetchData({
      method: "POST",
      url: props.getOneRecord,
      headers: request,
      data: {
        Id: id,
      },
      signal: abortController.signal,
    });
  };
  const handleAddQuestion = (id) => {
    setRequestType("GETONERECORDAddQuestion");
    fetchData({
      method: "POST",
      url: props.getOneRecord,
      headers: request,
      data: {
        Id: id,
      },
      signal: abortController.signal,
    });
  };
  const handlePassEdit = (id) => {
    setRequestType("GETONERECORDPASS");
    fetchData({
      method: "POST",
      url: props.getOneRecord,
      headers: request,
      data: {
        Id: id,
      },
      signal: abortController.signal,
    });
  };
  const sendUnselectRequest = (temp) => {
    setRequestType("UNSELECT");
    fetchData({
      method: "POST",
      url: props.unSelectedAPI,
      headers: request,
      data: {
        Column: temp,
      },
      signal: abortController.signal,
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
  const logResponse = (res) => {
    
    if (!res.Log.length) {
      return toast.info(t("noDataFound.table"), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setLog(res.Log);
    setShowLogModal(true);
  };
  const handleRefresh = () => {
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
  const favorited = () => {
    setIsFavorite(true);
    toast.success(t("favorited"), {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const setPasswordFor = (res) => {
    const record = res.Record;
    setRowValues(record.Id);
    setPasswordmodalOpen(true);
  };

  useImperativeHandle(ref, () => ({
    updated() {
      const paging = {
        NumberOfRecordsPerPage: numberOfRecordsPerPage,
        CurrentPage: currentPage,
        IsAscending: sort.IsAscending,
        SortBy: sort.SortBy,
      };
      readPaging(paging);
    },
  }));

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
          props.setUpdate(response);
          break;
        case "GETONERECORDAddQuestion":
          props.setAddQuestion(response);
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
          handleClickSend();
          break;
        case "ACCESSLIST":
          handleAccessListModal(response);
          break;
        case "GETONERECORDPASS":
          setPasswordFor(response);
          break;
        case "GETPERMISSION":
          handleGetPermissionModal(response);
          break;
        case "SETPERMISSIONS":
          handleSetPermission(response);
          break;
        default:
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useEffect(() => {
    setRequestType("READ");
    getTable();

    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    response && handleResponse(response, requestType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, handleResponse]);
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
  const handleChangeTitle = (event) => {
    setFlt_Title(event.target.value);
  };
  const handleClickGetPermission = (id) => {
    setGroupId(id);
    setRequestType("GETPERMISSION");
    fetchData({
      method: "POST",
      url: props.getPermissionURL && props.getPermissionURL,
      headers: request,
      data: {
        Id: id,
      },
      signal: abortController.signal,
    });
  };
  const setPermission = (codes) => {
    setRequestType("SETPERMISSIONS");
    setShowGetPermissionModal(false);
    fetchData({
      method: "POST",
      url: props.setPermissionURL && props.setPermissionURL,
      headers: request,
      data: {
        id: groupId,
        AccessList: codes,
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
  const updatedPassword = () => {
    setPasswordmodalOpen(false);
    toast.success(t("operator.passwordChanged"), {
      position: toast.POSITION.TOP_CENTER,
    });
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
  const setPage = (event, value) => {
    const paging = {
      NumberOfRecordsPerPage: numberOfRecordsPerPage,
      CurrentPage: value,
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
  const checkAllHandler = (e) => {
    let temp = unSelected;
    if (e.target.id === "checkAll") {
      productsColumns
        .filter((p, i) => !props.filteredColumns.includes(p["Header"]))
        .map(
          (column, index) => (temp = temp.filter((i) => i !== column["Header"]))
        );
      sendUnselectRequest(temp);
      setCheckAllC(!checkAllC);
    } else if (e.target.id === "unCheckAll") {
      productsColumns
        .filter((p, i) => !props.filteredColumns.includes(p["Header"]))
        .map((column, index) => temp.push(column["Header"]));
      sendUnselectRequest(temp);
      setCheckAllC(!checkAllC);
    }
  };
  const CheckBoxChangeHandler = (e, column) => {
    let checked = e.target.checked;
    let temp = unSelected;
    checked ? (temp = temp.filter((u) => u !== column)) : temp.push(column);
    sendUnselectRequest(temp);
  };
  const handleClearFilter = () => {
    setFlt_Title("");
    setSearchBegin(null);
    setSearchEnd(null);
  };

  return (
    <>
      {loading && <BackDrop open={true} />}
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
      {passwordModalOpen && (
        <PasswordModal
          changePasswordURL={props.changePasswordURL}
          rowValues={rowValus}
          show={passwordModalOpen}
          onHide={() => setPasswordmodalOpen(false)}
          updated={updatedPassword}
        />
      )}
      {showGetPermissionModal && (
        <PermissionModal
          permissions={permissions}
          show={showGetPermissionModal}
          onHide={() => setShowGetPermissionModal(false)}
          setPermission={setPermission}
        />
      )}
      {props.mobileModal & (props.widthOFScreen < 420) ? (
        <MobileModel
          setMobileModal={props.setMobileModal}
          searchBegin={searchBegin}
          searchEnd={searchEnd}
          setSearchEnd={setSearchEnd}
          setSearchBegin={setSearchBegin}
          search={search}
          handleChangeTitle={handleChangeTitle}
          flt_Title={flt_Title}
        />
      ) : null}
      {props.mobileModalColumns & (props.widthOFScreen < 420) ? (
        <MobileModalsColumn
          setMobileModalColumns={props.setMobileModalColumns}
          {...props}
          columnSideBar={columnSideBar}
          setColumnSideBar={setColumnSideBar}
          checkAllC={checkAllC}
          checkAllHandler={checkAllHandler}
          productsColumns={productsColumns}
          unSelected={unSelected}
          CheckBoxChangeHandler={CheckBoxChangeHandler}
        />
      ) : null}
      {props.mobileModalButtons & (props.widthOFScreen < 420) ? (
        <MobileModalRightBar
          {...props}
          numberOfRecordsPerPage={numberOfRecordsPerPage}
          currentPage={currentPage}
          sort={sort}
          flt_Title={flt_Title}
          seartBegin={searchBegin}
          seartEnd={searchEnd}
          exportLink={props.exportLink}
          setSearch={setSearch}
          search={search}
          searchBegin={searchBegin}
          searchEnd={searchEnd}
          setColumnSideBar={setColumnSideBar}
          columnSideBar={columnSideBar}
          importSuccess={importSuccess}
          handleClickLog={handleClickLog}
          handleClickAccessList={handleClickAccessList}
          IsFavorite={IsFavorite}
          handleClickFav={handleClickFav}
          setMobileModalButtons={props.setMobileModalButtons}
        />
      ) : null}
      <div className="reacttableParent">
        <RighSideContainer
          {...props}
          setSearch={setSearch}
          search={search}
          searchBegin={searchBegin}
          searchEnd={searchEnd}
          setColumnSideBar={setColumnSideBar}
          columnSideBar={columnSideBar}
          numberOfRecordsPerPage={numberOfRecordsPerPage}
          currentPage={currentPage}
          sort={sort}
          flt_Title={flt_Title}
          importSuccess={importSuccess}
          handleClickLog={handleClickLog}
          handleClickAccessList={handleClickAccessList}
          IsFavorite={IsFavorite}
          handleClickFav={handleClickFav}
          
        />
        <div className="groupContainerLeft">
          <TableList
            {...props}
            search={search}
            handleRefresh={handleRefresh}
            handleChangeTitle={handleChangeTitle}
            flt_Title={flt_Title}
            searchBegin={searchBegin}
            searchEnd={searchEnd}
            setSearchBegin={setSearchBegin}
            setSearchEnd={setSearchEnd}
            columnSideBar={columnSideBar}
            productsColumns={productsColumns}
            unSelected={unSelected}
            handleClickSort={handleClickSort}
            posts={posts}
            deleteCalled={deleteCalled}
            handleClickEdit={handleClickEdit}
            handlePassEdit={handlePassEdit}
            currentPage={currentPage}
            setPage={setPage}
            totalPages={totalPages}
            numberOfRecordsPerPage={numberOfRecordsPerPage}
            handleChangeSelect={handleChangeSelect}
            handleClickSend={handleClickSend}
            handleClearFilter={handleClearFilter}
            handleClickGetPermission={handleClickGetPermission}
            mobileModal={props.mobileModal}
            setMobileModal={props.setMobileModal}
            widthOFScreen={props.widthOFScreen}
            setMobileModalButtons={props.setMobileModalButtons}
            setMobileModalColumns={props.setMobileModalColumns}
            handleAddQuestion={handleAddQuestion}
            addAccess={props.addAccess}
            handleCreateRate={props.handleCreateRate}
            rateAccess={props.rateAccess ? props.rateAccess : ""}
            handleReadAnswers={props.handleReadAnswers}
            readAnswersAccess={
              props.readAnswersAccess ? props.readAnswersAccess : ""
            }
          />
          <LeftSideContainer
            {...props}
            columnSideBar={columnSideBar}
            setColumnSideBar={setColumnSideBar}
            checkAllC={checkAllC}
            checkAllHandler={checkAllHandler}
            productsColumns={productsColumns}
            unSelected={unSelected}
            CheckBoxChangeHandler={CheckBoxChangeHandler}
          />
        </div>
      </div>
    </>
  );
});

export default CustomTable;
