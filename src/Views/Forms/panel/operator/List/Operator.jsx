import "../../../../../assets/css/table.css";
import React, { useRef, useState } from "react";

import TableModal from "./TableModal/TableModal";


import {
  readOpt,
  readpaging,
  getoneRecord,
  setUnselectedColumn,
  deleteRecordOpt,
  exportFile,
  logTable,
  setToFavorit,
  accessList,
  sampleFileOperator,
  checkFileOperator,
  importFileOperator,
  operatorExportId,
  operatorChangePassword,
} from "../../../../../services/operatorService";

import { toast } from "react-toastify";


import { t } from "i18next";

import { enums } from "../../../../../data/Enums";
import OperatorForm from "../OperatorForm";
import CustomTable from "../../../../../Components/Table/Table/CustomTable";

const Operator = () => {
  const childRef = useRef();
  const filteredColumns = [
    "Language_EId",
    "Id",
    "Group_Id",
    "Password",
    "Registrar",
  ];
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});
  const addObject = {
    Component: OperatorForm,
    path: "/operatorcreate",
    title: "routes.operatorForm",
    access: enums.Operator_Operator_Create_w,
  };
  const setUpdate = (res) => {
    const record = res.Record;
    setRowValues(record);
    setTableModalOpen(true);
  };
  const updated = () => {
    setTableModalOpen(false);
    toast.success(t("updatedRecord"), {
      position: toast.POSITION.TOP_CENTER,
    });
    //call update function in child class
    childRef.current.updated();
  };

  const handleClickHelp = () => {
    window.open("https://www.google.com");
  };

  return (
    <>
      {tableModalOpen && (
        <TableModal
          rowValus={rowValus}
          onHide={() => setTableModalOpen(false)}
          tableModalShow={tableModalOpen}
          updated={updated}
        />
      )}
      <CustomTable
        ref={childRef}
        ReadApi={readOpt}
        getPermissionURL={""}
        setPermissionURL={""}
        deleteApi={deleteRecordOpt}
        unSelectedAPI={setUnselectedColumn}
        sampleUrl={sampleFileOperator}
        fileCheckURL={checkFileOperator}
        importURL={importFileOperator}
        logApi={logTable}
        exportId={operatorExportId}
        changePasswordURL={operatorChangePassword}
        addObject={addObject}
        exportAccess={enums.Operator_Operator_Export_r}
        exportLink={exportFile}
        importAccess={enums.Operator_Operator_Import_w}
        logAccess={enums.Operator_Operator_Log_r}
        readPagingApi={readpaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={accessList}
        favouriteApi={setToFavorit}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Operator_Operator_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Operator_Operator_Delete_w}
        editAccess={enums.Operator_Operator_Update_w}
        permissionsAccess={""}
        changePasswordAccess={enums.Operator_Operator_ChangePassword_w}
        getOneRecord={getoneRecord}
        setUpdate={setUpdate}
      />
    </>
  );
};

export default Operator;
