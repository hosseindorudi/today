import "../../../../assets/css/table.css";
import React, {
  useRef,
  useState,
} from "react";

import TableModal from "./TableModal/TableModal";

import { enums } from "../../../../data/Enums";

import { t } from "i18next";
import { toast } from "react-toastify";
import useWindowSize from "../../../../customHooks/useWindowSize";

import ExtraServicesDefine from "./extraServicesDefine/ExtraServicesDefine";
import { additionalServiceAccessList, additionalServiceCheckFile, additionalServiceDelete, additionalServiceExport, additionalServiceExportId, additionalServiceFavorite, additionalServiceGetOneRecord, additionalServiceImportFile, additionalServiceLog, additionalServiceRead, additionalServiceReadPaging, additionalServiceSampleFile, additionalServiceSetUnselectedColumn } from "../../../../services/additionalServiceService";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
const ExtraServices = () => {
  const filteredColumns = ["IsLimited", "Id", "Registrar","SourceType"];

  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});


  const childRef = useRef();

  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const widthOFScreen = useWindowSize().width

  const addObject = {
    Component: ExtraServicesDefine,
    path: "/extraServicesForm",
    title: "routes.extraServicesForm",
    access: enums.Definition_AdditionalService_Create_w
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
        ReadApi={additionalServiceRead}
        deleteApi={additionalServiceDelete}
        unSelectedAPI={additionalServiceSetUnselectedColumn}
        sampleUrl={additionalServiceSampleFile}
        fileCheckURL={additionalServiceCheckFile}
        importURL={additionalServiceImportFile}
        logApi={additionalServiceLog}
        exportId={additionalServiceExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Definition_AdditionalService_Export_r}
        exportLink={additionalServiceExport}
        importAccess={enums.Definition_AdditionalService_Import_w}
        logAccess={enums.Definition_AdditionalService_Log_r}
        readPagingApi={additionalServiceReadPaging}
        accessListAccess={enums.Definition_AdditionalService_Read_r}
        accessListApi={additionalServiceAccessList}
        favouriteApi={additionalServiceFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Definition_AdditionalService_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_AdditionalService_Delete_w}
        editAccess={enums.Definition_AdditionalService_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={additionalServiceGetOneRecord}
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


export default ExtraServices