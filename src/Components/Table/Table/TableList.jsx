import { Pagination } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import useButtonAccess from "../../../customHooks/useButtonAccess";
import {
  checkRowBackGroundColor,
  checkTableTH,
  checkTableValues,
} from "../../../validation/functions";
import DownArrow from "../Arrows/downArrow/DownArrow";
import MainUpArrow from "../Arrows/MainUpArrow/MainUpArrow";
import UpArrow from "../Arrows/upArrow/UpArrow";
import TableButtons from "../TableButtons/TableButtons";
import * as fi from "react-icons/fi";
import * as md from "react-icons/md";
import * as fa from "react-icons/fa";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useTranslation } from "react-i18next";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { TabContext } from "../../../contexts/TabContextProvider";
import DescModal from "../descriptionModal/DescModal";
import { enums } from "../../../data/Enums";
import { toast } from "react-toastify";
import AppContext from "../../../contexts/AppContext";
import TableCard from "../tableCard/TableCard";

const TableList = ({
  type,
  BcItems,
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
  setMobileModalColumns,
  handleAddQuestion,
  addAccess,
  handleCreateRate,
  rateAccess,
  handleReadAnswers,
  readAnswersAccess,
  handlePolicyBrowser,
  policyBrowserAccess,
  operatorRoleAccess,
  handleOperatorRole,
  handlePolicyIP,
  policyIpAccess,
  handlePolicyLocation,
  policyLocationAccess,
  handlePolicyOs,
  policyOsAccess,
  handleAddress,
  addressAccess,
  addOperator,
  addOperatorAccess,
  handlePhone,
  phoneAccess,
  handleMobile,
  mobileAccess,
  handleAccount,
  accountAccess,
  sendMessageBankAccess,
  sendMessageBank,
  handleuploadFile,
  filterArr,
  filterNames
}) => {
  const [haveAccess] = useButtonAccess();
  const { t } = useTranslation();
  const tabContext = useContext(TabContext);
  const [descriptionShow, setDescriptionShow] = useState(false);
  const [desc, setDesc] = useState("");
  const { app } = useContext(AppContext);
  const [filterActivate, setFilterActivate] = useState({})
  useEffect(()=> {
    let fArr = {}
    Object.keys(filterNames).map((f,i) => {
       fArr[f] = false
       return;
    })
    setFilterActivate(fArr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleCreateItem =(filter, index) => {
    let titleItem = filter.split("_")
    titleItem.pop()
    let theName = titleItem.join("_")
    return (
      <Form.Group style={{ display: search ? "block" : "none", width:"200px", transition:"all 500ms ease", margin: filterActivate[theName] ? "5px" : "1px" }}>
        <FloatingLabel style={{transition:"all 500ms ease"}}>
        <Form.Control
        style={{   height: filterActivate[theName] ? "50px" : "5px", transition:"all 500ms ease"}}
        type= {filter.split("_")[filter.split("_").length -1] === "string" ? "text" : "number"}
        placeholder={theName}
        onFocus={()=> setFilterActivate({...filterActivate, [theName]:true})}
        onBlur={()=> {console.log(filterActivate);setFilterActivate({...filterActivate, [theName]:false})}}
        onChange={handleChangeTitle}
        value={flt_Title[theName.toString()]}
        name={theName}
      />
      <label htmlFor="floatingInputCustom" style={{   fontSize: filterActivate[theName] ? "1rem" : "10px", transition:"all 500ms ease"}} >{t(theName)}</label>
        </FloatingLabel>
      
    </Form.Group>
    )
  }
  


  const handleAdd = () => {
    tabContext.addRemoveTabs(addObject, "add");
  };
  return (
    <>
      {descriptionShow && (
        <DescModal
          onHide={() => setDescriptionShow(false)}
          show={descriptionShow}
          value={desc}
        />
      )}
      <div className="tableSection">
        <div
          className="searchSection"
          style={{ height: search ? "15%" : "10%" }}
        >
          <div className="reacttableParentPlusButton">
            {haveAccess(addFormAccess) && (
              <button className="plusBUTTON" onClick={handleAdd}>
                <md.MdPostAdd />
              </button>
            )}
            <button className="groupListRefresh" onClick={handleRefresh}>
              <fi.FiRefreshCcw />
            </button>

            {widthOFScreen < 420 && (
              <>
                <button
                  className="plusBUTTON1"
                  onClick={() => setMobileModal(true)}
                >
                  <fa.FaFilter />
                </button>

                <button
                  className="plusBUTTON2"
                  onClick={() => setMobileModalButtons(true)}
                >
                  <fa.FaPlus />
                </button>
                <button
                  className="plusBUTTON3"
                  onClick={() => setMobileModalColumns(true)}
                >
                  <fa.FaColumns />
                </button>
              </>
            )}
          </div>

          <div
            className="reacttableParentMiddleMiddleSide"
            style={{ display: widthOFScreen < 420 ? "none" : "block" }}
          >
            <BreadCrumb BcItems={BcItems} />
            <div
              className="searchField"
              style={{ height: search ? "fit-content" : 0 }}
            >
              <button
                className="sendForm"
                style={{ display: search ? "block" : "none" }}
                onClick={handleClickSend}
              >
                {t("sendGroup")}
              </button>
              <div style={{ display: search ? "block" : "none" }}>
                <fa.FaTimes
                  color="red"
                  onClick={handleClearFilter}
                  style={{ cursor: "pointer" }}
                />
              </div>
              
              {
                filterArr?.map((filter, index) => 
                  (
                    handleCreateItem(filter, index)
                  )
                )
              }
              <div
                style={{
                  direction: "ltr",
                  display: search ? "block" : "none",
                }}
              >
                <DatePicker
                  containerClassName="custom-container"
                  placeholder={t("search.startDate")}
                  onChange={(newValue) => {
                    setSearchBegin(newValue);
                    if (searchEnd !== null && newValue > searchEnd) {
                      toast.error(t("search.error"), {
                        position: toast.POSITION.BOTTOM_CENTER,
                      });

                      setSearchBegin(null);
                    }
                  }}
                  name="LimitTo"
                  calendar={app.lang === "fa" ? persian : gregorian}
                  locale={app.lang === "fa" ? persian_fa : gregorian_en}
                  calendarPosition="bottom-right"
                  value={searchBegin}
                />
              </div>
              <div
                style={{
                  direction: "ltr",
                  display: search ? "block" : "none",
                }}
              >
                <DatePicker
                  containerClassName="custom-container"
                  placeholder={t("search.endDate")}
                  onChange={(newValue) => {
                    setSearchEnd(newValue);
                    if (searchBegin === null) {
                      toast.error(t("search.errorChooseStart"));
                      setSearchEnd(null);
                    }
                    if (searchBegin !== null && searchBegin > newValue) {
                      toast.error(t("search.error"));
                      setSearchEnd(null);
                    }
                  }}
                  name="LimitTo"
                  calendar={app.lang === "fa" ? persian : gregorian}
                  locale={app.lang === "fa" ? persian_fa : gregorian_en}
                  calendarPosition="bottom-right"
                  value={searchEnd}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="tableAndPaging"
          style={{ height: search ? "80%" : "90%" }}
        >
          <div className="selfTabel">
            <div
              className="div33"
              style={{
                width:
                  columnSideBar & (widthOFScreen > 420)
                    ? widthOFScreen - (widthOFScreen * 0.2 + 370)
                    : widthOFScreen < 420
                    ? widthOFScreen
                    : widthOFScreen - (widthOFScreen * 0.2 + 120),
              }}
            >
              {productsColumns.length > 0 ? (
                type === "card" ? (
                  <TableCard
                    productsColumns={productsColumns}
                    posts={posts}
                    exportLink={exportId}
                    deleteType={deleteAccess}
                    editType={editAccess}
                    exportType={exportAccess}
                    accessListType={permissionsAccess}
                    handleClickGetPermission={handleClickGetPermission}
                    changePasswordType={changePasswordAccess}
                    deleteCalled={deleteCalled}
                    // rowValue={post}
                    handleClickEdit={handleClickEdit}
                    handlePassEdit={handlePassEdit}
                    handleAddQuestion={handleAddQuestion}
                    addAccess={addAccess}
                    handleCreateRate={handleCreateRate}
                    rateAccess={rateAccess}
                    readAnswersAccess={readAnswersAccess}
                    handleReadAnswers={handleReadAnswers}
                    operatorRoleAccess={operatorRoleAccess}
                    handleOperatorRole={handleOperatorRole}
                    handlePolicyBrowser={handlePolicyBrowser}
                    policyBrowserAccess={policyBrowserAccess}
                    policyIpAccess={policyIpAccess}
                    policyLocationAccess={policyLocationAccess}
                    policyOsAccess={policyOsAccess}
                    handlePolicyIP={handlePolicyIP}
                    handlePolicyLocation={handlePolicyLocation}
                    handlePolicyOs={handlePolicyOs}
                    addressAccess={addressAccess}
                    handleAddress={handleAddress}
                    addOperator={addOperator}
                    addOperatorAccess={addOperatorAccess}
                    handlePhone={handlePhone}
                    phoneAccess={phoneAccess}
                    handleMobile={handleMobile}
                    mobileAccess={mobileAccess}
                    handleAccount={handleAccount}
                    accountAccess={accountAccess}
                    sendMessageBankAccess={sendMessageBankAccess}
                    sendMessageBank={sendMessageBank}
                    handleClickSort={handleClickSort}
                  />
                ) : (
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
                              {/* {t(column["Header"])} */}
                              {checkTableTH(column["Header"], exportAccess)}
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
                        <tr
                          key={index}
                          style={{
                            backgroundColor: checkRowBackGroundColor(post),
                          }}
                        >
                          <td className="TableMainTd">
                            <TableButtons
                              exportLink={exportId}
                              deleteType={deleteAccess}
                              editType={editAccess}
                              exportType={exportAccess}
                              accessListType={permissionsAccess}
                              handleClickGetPermission={
                                handleClickGetPermission
                              }
                              changePasswordType={changePasswordAccess}
                              deleteCalled={deleteCalled}
                              rowValue={post}
                              handleClickEdit={handleClickEdit}
                              handlePassEdit={handlePassEdit}
                              handleAddQuestion={handleAddQuestion}
                              addAccess={addAccess}
                              handleCreateRate={handleCreateRate}
                              rateAccess={rateAccess}
                              readAnswersAccess={readAnswersAccess}
                              handleReadAnswers={handleReadAnswers}
                              operatorRoleAccess={operatorRoleAccess}
                              handleOperatorRole={handleOperatorRole}
                              handlePolicyBrowser={handlePolicyBrowser}
                              policyBrowserAccess={policyBrowserAccess}
                              policyIpAccess={policyIpAccess}
                              policyLocationAccess={policyLocationAccess}
                              policyOsAccess={policyOsAccess}
                              handlePolicyIP={handlePolicyIP}
                              handlePolicyLocation={handlePolicyLocation}
                              handlePolicyOs={handlePolicyOs}
                              addressAccess={addressAccess}
                              handleAddress={handleAddress}
                              addOperator={addOperator}
                              addOperatorAccess={addOperatorAccess}
                              handlePhone={handlePhone}
                              phoneAccess={phoneAccess}
                              handleMobile={handleMobile}
                              mobileAccess={mobileAccess}
                              handleAccount={handleAccount}
                              accountAccess={accountAccess}
                              sendMessageBankAccess={sendMessageBankAccess}
                              sendMessageBank={sendMessageBank}
                              handleuploadFile={handleuploadFile}
                            />
                          </td>
                          {Object.keys(post)
                            .filter(
                              (p, i) =>
                                !filteredColumns.includes(p) &&
                                !unSelected.includes(p)
                            )
                            .map((key, index) => {
                              if (
                                (key === "Description") &
                                (exportAccess === enums.Operator_Event_Export_r)
                              ) {
                                return (
                                  <td
                                    onClick={() => {
                                      post[key].length > 0 &&
                                        setDescriptionShow(true);
                                      post[key].length > 0 &&
                                        setDesc(post[key]);
                                    }}
                                    key={key + index}
                                    className={
                                      post[key].length > 30
                                        ? "TableMainTd tableDescriptionShow"
                                        : "TableMainTd"
                                    }
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
                                    {checkTableValues(
                                      key,
                                      post[key],
                                      post,
                                      exportAccess
                                    )}
                                  </td>
                                );
                              } else {
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
                              }
                            })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableList;
