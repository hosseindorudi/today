 
import React, {
  useRef,
  useState,
} from "react";

import TableModal from "./TableModal/TableModal";

import { enums } from "../../../../data/Enums";

import { t } from "i18next";

import { toast } from "react-toastify";
import useWindowSize from "../../../../customHooks/useWindowSize";

import AccessoriesDefine from "./accessoriesDefine/AccessoriesDefine";
import { admissionAccessoryAccessList, admissionAccessoryCheckFile, admissionAccessoryDelete, admissionAccessoryExport, admissionAccessoryExportId, admissionAccessoryFavorite, admissionAccessoryGetOneRecord, admissionAccessoryImportFile, admissionAccessoryLog, admissionAccessoryRead, admissionAccessoryReadPaging, admissionAccessorySampleFile, admissionAccessorySetUnselectedColumn } from "../../../../services/admissionAccessory";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
const Accessories = () => {
  const filteredColumns = ["IsLimited", "Id", "Registrar","SourceType"];





    const [tableModalOpen, setTableModalOpen] = useState(false);
    const [rowValus, setRowValues] = useState({});
  
  
    const childRef = useRef();
  
    const [mobileModal, setMobileModal] = useState(false)
    const [mobileModalButtons, setMobileModalButtons] = useState(false)
    const [mobileModalColumns, setMobileModalColumns] = useState(false)
    const widthOFScreen = useWindowSize().width
  
    const addObject = {
      Component: AccessoriesDefine,
      path: "/accessoriesForm",
      title: "routes.accessoriesForm",
      access: enums.Definition_AdmissionAccessory_Create_w
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
      ReadApi={admissionAccessoryRead}
      deleteApi={admissionAccessoryDelete}
      unSelectedAPI={admissionAccessorySetUnselectedColumn}
      sampleUrl={admissionAccessorySampleFile}
      fileCheckURL={admissionAccessoryCheckFile}
      importURL={admissionAccessoryImportFile}
      logApi={admissionAccessoryLog}
      exportId={admissionAccessoryExportId}
      changePasswordURL={""}
      addObject={addObject}
      exportAccess={enums.Definition_AdmissionAccessory_Export_r}
      exportLink={admissionAccessoryExport}
      importAccess={enums.Definition_AdmissionAccessory_Import_w}
      logAccess={enums.Definition_AdmissionAccessory_Log_r}
      readPagingApi={admissionAccessoryReadPaging}
      accessListAccess={enums.Definition_AdmissionAccessory_Read_r}
      accessListApi={admissionAccessoryAccessList}
      favouriteApi={admissionAccessoryFavorite}
      handleClickHelp={handleClickHelp}
      addFormAccess={enums.Definition_AdmissionAccessory_Create_w}
      filteredColumns={filteredColumns}
      deleteAccess={enums.Definition_AdmissionAccessory_Delete_w}
      editAccess={enums.Definition_AdmissionAccessory_Update_w}
      permissionsAccess={""}
      changePasswordAccess={""}
      getOneRecord={admissionAccessoryGetOneRecord}
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

export default Accessories