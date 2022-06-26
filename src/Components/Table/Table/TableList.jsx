import { Pagination, TextField } from "@mui/material";
import React, { useContext } from "react";
import useButtonAccess from "../../../customHooks/useButtonAccess";
import { checkTableValues } from "../../../validation/functions";
import DownArrow from "../Arrows/downArrow/DownArrow";
import MainUpArrow from "../Arrows/MainUpArrow/MainUpArrow";
import UpArrow from "../Arrows/upArrow/UpArrow";
import TableButtons from "../TableButtons/TableButtons";
import * as fi from "react-icons/fi";
import * as md from "react-icons/md";
import * as fa from "react-icons/fa";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterJalali from "@date-io/date-fns-jalali";
import { TabContext } from "../../../contexts/TabContextProvider";
const TableList = ({
  search,
  handleRefresh,
  addFormAccess,
  handleClearFilter,
  handleChangeTitle,
  flt_Title,
  searchBegin,
  setSearchBegin,
  searchEnd,
  setSearchEnd,
  columnSideBar,
  productsColumns,
  filteredColumns,
  handleClickSort,
  unSelected,
  currentPage,
  setPage,
  totalPages,
  posts,
  exportId,
  deleteAccess,
  editAccess,
  exportAccess,
  permissionsAccess,
  handleClickGetPermission,
  changePasswordAccess,
  deleteCalled,
  handleClickEdit,
  handlePassEdit,
  numberOfRecordsPerPage,
  handleChangeSelect,
  handleClickSend,
  addObject,
  mobileModal,
  setMobileModal,
  widthOFScreen,
  setMobileModalButtons,
  setMobileModalColumns
}) => {
  const [haveAccess] = useButtonAccess();
  const {t}=useTranslation()
  const tabContext = useContext(TabContext);
  const handleAdd = () => {
    
    tabContext.addRemoveTabs(addObject, "add");
  };
  return (
    <div className="tableSection">
      <div className="searchSection" style={{ height: search ? "15%" : "10%" }}>
        <div className="reacttableParentPlusButton">
          <button className="groupListRefresh" onClick={handleRefresh}>
            <fi.FiRefreshCcw />
          </button>
          {haveAccess(addFormAccess) && (
            <button className="plusBUTTON" onClick={handleAdd}>
              <md.MdPostAdd />
            </button>
          )}
         
            {widthOFScreen < 420 && 
              <>
                <button className="plusBUTTON1" onClick={()=> setMobileModal(true)}>
                  <fa.FaFilter />
                </button>
          
              
                <button className="plusBUTTON2" onClick={()=> setMobileModalButtons(true)}>
                  <fa.FaPlus />
                </button>
                <button className="plusBUTTON3" onClick={()=> setMobileModalColumns(true)}>
                  <fa.FaColumns />
                </button>

            </>

}
       
        </div>

        <div className="reacttableParentMiddleMiddleSide" style={{display : widthOFScreen < 420 ? "none" : "block"}}>
          {/* <div className="bredCrumbTable">
          <div role="presentation" style={{ direction: "ltr" }}>
            <Breadcrumb>
              <Breadcrumb.Item href="#">خانه</Breadcrumb.Item>
              <Breadcrumb.Item active>فرم</Breadcrumb.Item>
              <Breadcrumb.Item active>جدول</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div> */}
          <div className="searchField" style={{ height: search ? "100%" : 0 }}>
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
                placeholder={t("search")}
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
                  label={t("search.startDate")}
                  value={searchBegin}
                  onChange={(newValue) => {
                    setSearchBegin(newValue);
                    if (searchEnd !== null && newValue > searchEnd) {
                      alert(t("search.error"));
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
                  label={t("search.endDate")}
                  mask="____/__/__"
                  value={searchEnd}
                  onChange={(newValue) => {
                    setSearchEnd(newValue);
                    if (searchBegin === null) {
                      alert(t("search.errorChooseStart"));
                      setSearchEnd(null);
                    }
                    if (searchBegin !== null && searchBegin > newValue) {
                      alert(t("search.error"));
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
                ? widthOFScreen - (widthOFScreen * 0.2 + 370)
                : widthOFScreen - (widthOFScreen * 0.2 + 120),
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
                          exportLink={exportId}
                          deleteType={deleteAccess}
                          editType={editAccess}
                          exportType={exportAccess}
                          accessListType={permissionsAccess}
                          handleClickGetPermission={handleClickGetPermission}
                          changePasswordType={changePasswordAccess}
                          deleteCalled={deleteCalled}
                          rowValue={post}
                          handleClickEdit={handleClickEdit}
                          handlePassEdit={handlePassEdit}
                        
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
                              {checkTableValues(key, post[key], post)}
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
  );
};

export default TableList;
