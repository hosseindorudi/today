 
import React, { useRef, useState } from "react";
import TableModal from "./TableModal/TableModal";
import { toast } from "react-toastify";
import { t } from "i18next";
import { enums } from "../../../../data/Enums";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import useWindowSize from "../../../../customHooks/useWindowSize";
import { modelAccessList, modelCheckFile, modelDelete, modelExport, modelExportId, modelFavorite, modelGetOneRecord, modelImportFile, modelLog, modelRead, modelReadPaging, modelSampleFile, modelSetUnselectedColumn } from "../../../../services/modelService";
import ModelDefine from "./modelDefine/ModelDefine";
const Model = () => {
  const childRef = useRef();
  const filteredColumns = [
    "IsLimited",
    "Registrar",
    "Language_EId",
    "SourceType",
    "Device_Id",
    "Country_Id",
    "Color_Id"
  ];
  const BcItems = [t("routes.basicDefinations"), t("/Definition/Model/Read")];

  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});
  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const widthOFScreen = useWindowSize().width

  const addObject = {
    Component: ModelDefine,
          path: "/Definition/Model/Write",
          title: "/Definition/Model/Write",
          access: enums.Definition_Model_Create_w,
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
      
      {/* {showGetPermissionModal &&(
          <PermissionModal  permissions={permissions}
          show={showGetPermissionModal}
          onHide={() => setShowGetPermissionModal(false)}
          setPermission={setPermission}
          />
        )} */}
      <CustomTable
        ref={childRef}
        ReadApi={modelRead}
        deleteApi={modelDelete}
        unSelectedAPI={modelSetUnselectedColumn}
        sampleUrl={modelSampleFile}
        fileCheckURL={modelCheckFile}
        importURL={modelImportFile}
        logApi={modelLog}
        exportId={modelExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Definition_Model_Export_r}
        exportLink={modelExport}
        importAccess={enums.Definition_Model_Import_w}
        logAccess={enums.Definition_Model_Log_r}
        readPagingApi={modelReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={modelAccessList}
        favouriteApi={modelFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Definition_Model_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_Model_Delete_w}
        editAccess={enums.Definition_Model_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={modelGetOneRecord}
        setUpdate={setUpdate}
        mobileModal = {mobileModal}
        setMobileModal = {setMobileModal}
        widthOFScreen ={widthOFScreen}
        mobileModalButtons={mobileModalButtons}
        setMobileModalButtons={setMobileModalButtons}
        setMobileModalColumns={setMobileModalColumns}
        mobileModalColumns={mobileModalColumns}
        BcItems={BcItems}
      />
    </>
  );
};

export default Model;
