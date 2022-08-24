import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import "./customTable.css";
import '../../../Views/Forms/definations/repairsPerformed/repairsPerformed.css'
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxios from "../../../customHooks/useAxios";
import useRequest from "../../../customHooks/useRequest";
import BackDrop from "../../backDrop/BackDrop";
import AccessListModal from "../AccessListModal/AccessListModal";
import LogModal from "../LogModal/LogModal";
import PasswordModal from "../passwordModal/PasswordModal";
import PermissionModal from "../PermissionModal/PermissionModal";
import LeftSideContainer from "./LeftSideContainer";
import TableList from "./TableList";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import TableInformation from "./TableInformation";
import ActionButtons from "./ActionButtons";
import TableFilter from "./TableFilter";
import AppContext from "../../../contexts/AppContext";
import { Filters } from "../../../data/Filters";
import MobileFilter from "./MobileFilter";
import { QRCodeCanvas } from "qrcode.react";
import AddCurrencyModal from "../addCurrencyModal/AddCurrencyModal";
const CustomTable = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const { app } = useContext(AppContext);
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
  const [totalPages, setTotalPages] = useState(0);
  const [numberOfRecordsPerPage, setNumberOfRecordsPerPage] = useState(100);
  const request = useRequest();
  const [columnSideBar, setColumnSideBar] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [log, setLog] = useState(null);
  const [rowValus, setRowValues] = useState({});
  const [posts, setPosts] = useState([]);
  const [IsFavorite, setIsFavorite] = useState(false);
  const [checkAllC, setCheckAllC] = useState(true);
  const [productsColumns, setproductsColumns] = useState([]);
  const abortController = new AbortController();
  const [totalRecord, setTotalRecord] = useState();
  const [sortedBy, setSortedBy] = useState();
  const [isAssending, setIsAssending] = useState();
  const [filterObj, setfilterObj] = useState({});
  const [tempFilterObj, setTempFilterObj] = useState({});
  const [filteres, setFilteres] = useState([]);
  const [mobileFilter, setMobileFilter] = useState(false);
  const [qrLink, setQrLink] = useState(null);
  const [feeRecord, setFeeRecord] = useState({});

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
  const readPaging = (paging, flt) => {
    setRequestType("READPAGING");
    fetchData({
      method: "POST",
      url: props.type === "tree" ? props.ReadApi : props.readPagingApi,
      headers: request,
      data: {
        Paging: paging,
        Filter: flt,
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
    readPaging(paging, filterObj);
  };
  const setData = (response) => {
    console.log(response)
    const res = response.Record;
    const paging = response.Paging;
    if(props.type === "tree"){
      setfilterObj(response.Filter)
      setTotalRecord(res.length);
      setSortedBy("")
      setIsAssending(false);
      setIsFavorite(response.IsFavorite);
      setUnSelected([]);
      setPosts(res);
      setCurrentPage(1);
      setTotalPages(2);
      setSort({ SortBy: "", IsAscending: false });
      setNumberOfRecordsPerPage(100);
      setproductsColumns(
        res[0]
          ? Object.keys(res[0])?.map((key) => {
              return {
                Header: key,
                accessor: key,
                show: true,
                isSorted:  false,
                IsAscending: false,
              };
            })
          : []
    );
    }else 
    {
      setTotalRecord(paging.TotalRecord);
      setSortedBy(paging.SortBy);
      setIsAssending(paging.IsAscending);
      setIsFavorite(response.IsFavorite);
      setUnSelected(response.UnselectedColumn);
      setPosts(res);
      setCurrentPage(paging.CurrentPage);
      setTotalPages(paging.TotalPage);
      setSort({ SortBy: paging.SortBy, IsAscending: paging.IsAscending });
      setNumberOfRecordsPerPage(paging.NumberOfRecordsPerPage);
      setproductsColumns(
        res[0]
          ? Object.keys(res[0])?.map((key) => {
              return {
                Header: key,
                accessor: key,
                show: true,
                isSorted: paging.SortBy === key ? true : false,
                IsAscending: paging.SortBy === key ? paging.IsAscending : false,
              };
            })
          : []
    );}
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
    readPaging(paging, filterObj);
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
    readPaging(paging, filterObj);
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
      readPaging(paging, filterObj);
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
    console.log(Filters[app.activeTab])
    const flts = Filters[app.activeTab];
    setFilteres(flts);
    var obj = {};
    flts?.map((f) => Object.assign(obj, { [f.field]: f.default }));
    setfilterObj(obj);
    setTempFilterObj(obj);
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
    readPaging(paging, filterObj);
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
      NumberOfRecordsPerPage: Number(e.target.value),
      CurrentPage: currentPage,
      IsAscending: sort.IsAscending,
      SortBy: sort.SortBy,
    };
    readPaging(paging, filterObj);
  };
  const setPage = (event, value) => {
    const paging = {
      NumberOfRecordsPerPage: numberOfRecordsPerPage,
      CurrentPage: value,
      IsAscending: sort.IsAscending,
      SortBy: sort.SortBy,
    };
    readPaging(paging, filterObj);
  };
  const handleClickSend = () => {
    console.log(filterObj)
    const paging = {
      NumberOfRecordsPerPage: numberOfRecordsPerPage,
      CurrentPage: currentPage,
      IsAscending: sort.IsAscending,
      SortBy: sort.SortBy,
    };
    readPaging(paging, filterObj);
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
    const paging = {
      NumberOfRecordsPerPage: numberOfRecordsPerPage,
      CurrentPage: currentPage,
      IsAscending: sort.IsAscending,
      SortBy: sort.SortBy,
    };
    readPaging(paging, tempFilterObj);
    setfilterObj(tempFilterObj);
  };
  const handleClickQrCode = (value) => {
    const link = value.SiteAddress.concat("?code=" + value.Code);
    setQrLink(link);
  };
  useEffect(() => {
    if (qrLink) {
      const qrCodeURL = document
        .getElementById("qrCode")
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let aEl = document.createElement("a");
      aEl.href = qrCodeURL;
      aEl.download = "QR_Code.png";
      document.body.appendChild(aEl);
      aEl.click();
      document.body.removeChild(aEl);
    }
    return () => {
      setQrLink(null);
    };
  }, [qrLink]);
  return (
    <>
      {qrLink && <div style={{display:"none"}}><QRCodeCanvas value={qrLink} id="qrCode"/></div>}
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
      {/* {showLogModal && (
        <LogModal
          onHide={() => setShowLogModal(false)}
          logs={log}
          show={showLogModal}
        />
      )} */}
      {props.isFee && (
        <AddCurrencyModal
          onHide={() => props.setIsFee(false)}
          delete={props.deleteRateApi}
          id={feeRecord.Id}
          read={props.readRateApi}
          create={props.createRateApi}
          update={props.updateRateApi}
          show={props.isFee}
        />
      )}
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
      <MobileFilter
        mobileFilter={mobileFilter}
        setMobileFilter={setMobileFilter}
        filteres={filteres}
        filterObj={filterObj}
        setfilterObj={setfilterObj}
        handleClearFilter={handleClearFilter}
        handleClickSendFilter={handleClickSend}
      />
      <div className="tableParent">
        <div className="toplayerTable">
          <div className="infoTable">
            <TableInformation
              totalRecord={totalRecord}
              sortedBy={sortedBy}
              isAssending={isAssending}
            />
          </div>
          <div className="actionbuttons">
            <ActionButtons
              setColumnSideBar={() => setColumnSideBar(!columnSideBar)}
              {...props}
              numberOfRecordsPerPage={numberOfRecordsPerPage}
              currentPage={currentPage}
              sort={sort}
              importSuccess={importSuccess}
              handleClickLog={handleClickLog}
              handleClickAccessList={handleClickAccessList}
              IsFavorite={IsFavorite}
              handleClickFav={handleClickFav}
              totalRecord={totalRecord}
              sortedBy={sortedBy}
              isAssending={isAssending}
              handleRefresh={handleRefresh}
              filterObj={filterObj}
              clickFilterMobile={() => setMobileFilter(!mobileFilter)}
            />
          </div>
          <div className="breadcrump">
            <BreadCrumb BcItems={props.BcItems} />
          </div>
        </div>

        <div className="downlayerTable">
          <div className="tableFilter">
            <TableFilter
              filteres={filteres}
              filterObj={filterObj}
              setfilterObj={setfilterObj}
              handleClearFilter={handleClearFilter}
              handleClickSendFilter={handleClickSend}
            />
          </div>
          {totalRecord !== 0 ? (
            <div className="tableContainer">
              <TableList
                {...props}
                type={props.type}
                setIsFee={props.setIsFee}
                isFee={props.isFee}
                setFeeRecord={setFeeRecord}
                feeRecord={feeRecord}
                handleRefresh={handleRefresh}
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
                handleuploadFile={props.handleuploadFile}
                handleClickQrCode={handleClickQrCode}
              />{" "}
            </div>
          ) : (
            <div className="noDataClass">
              <img src="/assets/images/empty.png" alt="" />
              <span>{t("noDataFound.table")}</span>
            </div>
          )}
        </div>
      </div>
      {/* {props.mobileModal & (props.widthOFScreen < 420) ? (
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
      ) : null} */}
      {/* {props.mobileModalColumns & (props.widthOFScreen < 420) ? (
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
      ) : null} */}
      {/* {props.mobileModalButtons & (props.widthOFScreen < 420) ? (
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
      ) : null} */}
      {/* <div className="reacttableParent"> */}
      {/* <RighSideContainer
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
          totalRecord={totalRecord}
          sortedBy={sortedBy}
          isAssending={isAssending}
        /> */}
      {/* <div className="groupContainerLeft"> */}
      {/* <TableList
            {...props}
            type={props.type}
            search={search}
            handleRefresh={handleRefresh}
            handleChangeTitle={handleChangeTitle}
            flt_Title={props.filterVal}
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
            handleuploadFile={props.handleuploadFile}
            filterArr ={props.filterArr}
            filterNames= {props.filterVal}
          /> */}
      {/* <LeftSideContainer
            {...props}
            columnSideBar={columnSideBar}
            setColumnSideBar={setColumnSideBar}
            checkAllC={checkAllC}
            checkAllHandler={checkAllHandler}
            productsColumns={productsColumns}
            unSelected={unSelected}
            CheckBoxChangeHandler={CheckBoxChangeHandler}
          /> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
});

export default CustomTable;
