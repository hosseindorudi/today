
import React, { useRef, useState } from "react";
import TableModal from "./TableModal/TableModal";
import { toast } from "react-toastify";
import { t } from "i18next";
import { enums } from "../../../../../data/Enums";
import CustomTable from "../../../../../Components/Table/Table/CustomTable";
import useWindowSize from "../../../../../customHooks/useWindowSize";
import { checkFileOperator, deleteRecordOpt, exportFile, getoneRecord, importFileOperator, logTable, operatorChangePassword, operatorColumnInfo, operatorExportId, readOpt, readpaging, sampleFileOperator, setToFavorit, setUnselectedColumn } from "../../../../../services/operatorService";
import OperatorForm from "../OperatorForm";
import OperatorRoleModel from "../../../../../Components/Table/operatorRoleModal/OperatorRoleModal";
const Operator = () => {
  const filteredColumns = ["IsLimited", "Id", "Registrar", "SourceType","Group_Id"];
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValues, setRowValues] = useState({});
  const childRef = useRef();
  const [mobileModal, setMobileModal] = useState(false);
  const [mobileModalButtons, setMobileModalButtons] = useState(false);
  const [mobileModalColumns, setMobileModalColumns] = useState(false);
  const widthOFScreen = useWindowSize().width;
  const [operatorRoleOpen, setOperatorRoleOpen] = useState(false);

  const addObject = {
    Component: OperatorForm,
    path: "/Operator/Operator/Create",
    title: "/Operator/Operator/Create",
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

  const handleOperatorRole=(id)=>{
      setRowValues(id)
      setOperatorRoleOpen(true)
  }
  return (
    <>
      {tableModalOpen && (
        <TableModal
          rowValues={rowValues}
          onHide={() => setTableModalOpen(false)}
          tableModalShow={tableModalOpen}
          updated={updated}
        />
      )}
      {operatorRoleOpen &&(
        <OperatorRoleModel show={operatorRoleOpen} onHide={() => setOperatorRoleOpen(false)} id={rowValues}/>

      )}

      <CustomTable
        ref={childRef}
        ReadApi={readOpt}
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
        accessListApi={''}
        favouriteApi={setToFavorit}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Operator_Operator_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Operator_Operator_Delete_w}
        editAccess={enums.Operator_Operator_Update_w}
        permissionsAccess={""}
        getPermissionURL={""}
        setPermissionURL={""}
        changePasswordAccess={enums.Operator_Operator_ChangePassword_w}
        getOneRecord={getoneRecord}
        setUpdate={setUpdate}
        mobileModal={mobileModal}
        setMobileModal={setMobileModal}
        widthOFScreen={widthOFScreen}
        mobileModalButtons={mobileModalButtons}
        setMobileModalButtons={setMobileModalButtons}
        setMobileModalColumns={setMobileModalColumns}
        mobileModalColumns={mobileModalColumns}
        policyBrowserAccess={""}
        handleOperatorRole={handleOperatorRole}
        operatorRoleAccess={enums.Operator_Operator_Create_w}
        columnInfo={operatorColumnInfo}
      />
    </>
  );
};

export default Operator;
