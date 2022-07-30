 
import React, { useRef, useState } from "react";
import TableModal from "./TableModal/TableModal";
import { toast } from "react-toastify";
import { t } from "i18next";
import { enums } from "../../../../data/Enums";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import useWindowSize from "../../../../customHooks/useWindowSize";
import { outputQualityControlAccessList, outputQualityControlCheckFile, outputQualityControlDelete, outputQualityControlExport, outputQualityControlExportId, outputQualityControlFavorite, outputQualityControlGetOneRecord, outputQualityControlImportFile, outputQualityControlLog, outputQualityControlRead, outputQualityControlReadPaging, outputQualityControlSampleFile, outputQualityControlSetUnselectedColumn } from "../../../../services/outPutQualityControlService";
import OutputQualityControlDefine from "./outputQualityControlDefine/OutputQualityControlDefine";
const OutputQualityControl = () => {
  const childRef = useRef();
  const filteredColumns = [
    "IsLimited",
    "Registrar",
    "Language_EId",
    "SourceType",
    "Model_Id"
  ];
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});
  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const widthOFScreen = useWindowSize().width
  const BcItems = [t("routes.basicDefinations"), t("/Definition/OutputQualityControl/Read")];

  const addObject = {
    Component: OutputQualityControlDefine,
    path: "/Definition/OutputQualityControl/Write",
    title: "/Definition/OutputQualityControl/Write",
    access: enums.Definition_OutputQualityControl_Create_w,
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
        ReadApi={outputQualityControlRead}
        deleteApi={outputQualityControlDelete}
        unSelectedAPI={outputQualityControlSetUnselectedColumn}
        sampleUrl={outputQualityControlSampleFile}
        fileCheckURL={outputQualityControlCheckFile}
        importURL={outputQualityControlImportFile}
        logApi={outputQualityControlLog}
        exportId={outputQualityControlExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Definition_OutputQualityControl_Export_r}
        exportLink={outputQualityControlExport}
        importAccess={enums.Definition_OutputQualityControl_Import_w}
        logAccess={enums.Definition_OutputQualityControl_Log_r}
        readPagingApi={outputQualityControlReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={outputQualityControlAccessList}
        favouriteApi={outputQualityControlFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Definition_OutputQualityControl_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_OutputQualityControl_Delete_w}
        editAccess={enums.Definition_OutputQualityControl_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={outputQualityControlGetOneRecord}
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

export default OutputQualityControl;
