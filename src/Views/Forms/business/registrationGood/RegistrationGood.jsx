 
import React, { useRef, useState } from "react";
import TableModal from "./TableModal/TableModal";
import { toast } from "react-toastify";
import { t } from "i18next";
import useWindowSize from "../../../../customHooks/useWindowSize";
import RegistrationGoodDefine from "./registrationGoodDefine/RegistrationGoodDefine";
import { enums } from "../../../../data/Enums";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import { registrationGoodAccessList, registrationGoodCheckFile, RegistrationGoodColumnInfo, registrationGoodDelete, registrationGoodExport, registrationGoodExportId, registrationGoodGetOneRecord, registrationGoodImport, RegistrationGoodImportArray, registrationGoodLog, registrationGoodRead, registrationGoodReadPaging, registrationGoodSampleFile, registrationGoodSetToFavorite, registrationGoodSetUnselectedColumn } from "../../../../services/registrationGoodService";
const RegistrationGood = () => {
  const childRef = useRef();
  const filteredColumns = [
    "IsLimited",
    "Id",
    "Company_Id",
    "Device_Id",
    "Model_Id",
    "ImportingCompany_Id",
    "SourceType",
    "Registrar"
  ];
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});
  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const widthOFScreen = useWindowSize().width

  const addObject = {
    Component: RegistrationGoodDefine,
        path: "/Business/RegistrationGood/Write",
        title: "/Business/RegistrationGood/Write",
        access: enums.Business_RegistrationGood_Create_w,
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
        columnInfo={RegistrationGoodColumnInfo}
        importarray={RegistrationGoodImportArray}
        ref={childRef}
        ReadApi={registrationGoodRead}
        deleteApi={registrationGoodDelete}
        unSelectedAPI={registrationGoodSetUnselectedColumn}
        sampleUrl={registrationGoodSampleFile}
        fileCheckURL={registrationGoodCheckFile}
        importURL={registrationGoodImport}
        logApi={registrationGoodLog}
        exportId={registrationGoodExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Business_RegistrationGood_Export_r}
        exportLink={registrationGoodExport}
        importAccess={enums.Business_RegistrationGood_Import_w}
        logAccess={enums.Customer_Customer_Log_r}
        readPagingApi={registrationGoodReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={registrationGoodAccessList}
        favouriteApi={registrationGoodSetToFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Business_RegistrationGood_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Business_RegistrationGood_Delete_w}
        editAccess={enums.Business_RegistrationGood_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={registrationGoodGetOneRecord}
        setUpdate={setUpdate}
        mobileModal = {mobileModal}
        setMobileModal = {setMobileModal}
        widthOFScreen ={widthOFScreen}
        mobileModalButtons={mobileModalButtons}
        setMobileModalButtons={setMobileModalButtons}
        setMobileModalColumns={setMobileModalColumns}
        mobileModalColumns={mobileModalColumns}
      />
    </>
  );
};

export default RegistrationGood;
