import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useState } from "react";
import {
  checkRowBackGroundColor,
  checkTableTH,
  checkTableValues,
} from "../../../validation/functions";
import DownArrow from "../Arrows/downArrow/DownArrow";
import MainUpArrow from "../Arrows/MainUpArrow/MainUpArrow";
import UpArrow from "../Arrows/upArrow/UpArrow";
import TableButtons from "../TableButtons/TableButtons";
import DescModal from "../descriptionModal/DescModal";
import { enums } from "../../../data/Enums";

const TableList = ({
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
}) => {


  const [descriptionShow, setDescriptionShow] = useState(false);
  const [desc, setDesc] = useState("");


  return (
    <>
      {descriptionShow && (
        <DescModal
          onHide={() => setDescriptionShow(false)}
          show={descriptionShow}
          value={desc}
        />
      )}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer className="tableC">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                {productsColumns
                 .filter(
                   (p, i) =>
                     !filteredColumns.includes(p["Header"]) &&
                     !unSelected.includes(p["Header"])
                 )
                 .map((column, index) => (
                   <TableCell
                     className="MainTableTh"
                     key={index}
                     style={{
                       display: !column["show"] ? "none" : null,
                     }}
                   >
                     {checkTableTH(column["Header"], exportAccess)}
                     <button
                       className="sortingArrowsBTN"
                       onClick={() => {handleClickSort(column);console.log("log")}}
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
                   </TableCell>
                 ))}
              </TableRow>
            </TableHead>
            <TableBody>
            {posts.map((post, index) => (
               <TableRow
                 key={index}
                 style={{
                   backgroundColor: checkRowBackGroundColor(post),
                 }}
               >
                 <TableCell className="TableMainTd">
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
                 </TableCell>
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
                         <TableCell
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
                         </TableCell>
                       );
                     } else {
                       return (
                         <TableCell
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
                         </TableCell>
                       );
                     }
                   })}
               </TableRow>
             ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <div className="pagination">
      <Pagination
         page={currentPage}
         onChange={setPage}
         count={totalPages}
       />
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
    </>
  );
};

export default TableList;
