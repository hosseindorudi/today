import React, {
  useRef,
  useState,
} from "react";

import TableModal from "./TableModal/TableModal";

import { enums } from "../../../../data/Enums";

import { t } from "i18next";
import { toast } from "react-toastify";
import useWindowSize from "../../../../customHooks/useWindowSize";
import { reasonForCancellationOfWarrantyAccessList, reasonForCancellationOfWarrantyCheckFile, reasonForCancellationOfWarrantyDelete, reasonForCancellationOfWarrantyExport, reasonForCancellationOfWarrantyExportId, reasonForCancellationOfWarrantyFavorite, reasonForCancellationOfWarrantyGetOneRecord, reasonForCancellationOfWarrantyImportFile, reasonForCancellationOfWarrantyLog, reasonForCancellationOfWarrantyRead, reasonForCancellationOfWarrantyReadPaging, reasonForCancellationOfWarrantySampleFile, reasonForCancellationOfWarrantySetUnselectedColumn } from "../../../../services/warrantyCancellationService";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import WarrantyCancelationDefine from "./warrantyCancelationDefine/WarrantyCancelationDefine";
const WarrantyCancelation = () => {
  const filteredColumns = ["IsLimited", "Registrar","SourceType"];

  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});


  const childRef = useRef();

  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const widthOFScreen = useWindowSize().width

  const addObject = {
    Component: WarrantyCancelationDefine,
    path: "/Definition/warrantyCancelation/Write",
    title: "/Definition/warrantyCancelation/Write",
    access: enums.Definition_warrantyCancelation_Create_w
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
     ReadApi={reasonForCancellationOfWarrantyRead}
     deleteApi={reasonForCancellationOfWarrantyDelete}
     unSelectedAPI={reasonForCancellationOfWarrantySetUnselectedColumn}
     sampleUrl={reasonForCancellationOfWarrantySampleFile}
     fileCheckURL={reasonForCancellationOfWarrantyCheckFile}
     importURL={reasonForCancellationOfWarrantyImportFile}
     logApi={reasonForCancellationOfWarrantyLog}
     exportId={reasonForCancellationOfWarrantyExportId}
     changePasswordURL={""}
     addObject={addObject}
     exportAccess={enums.Definition_CancellationOfWarranty_Export_r}
     exportLink={reasonForCancellationOfWarrantyExport}
     importAccess={enums.Definition_CancellationOfWarranty_Import_w}
     logAccess={enums.Definition_CancellationOfWarranty_Log_r}
     readPagingApi={reasonForCancellationOfWarrantyReadPaging}
     accessListAccess={enums.Definition_CancellationOfWarranty_Read_r}
     accessListApi={reasonForCancellationOfWarrantyAccessList}
     favouriteApi={reasonForCancellationOfWarrantyFavorite}
     handleClickHelp={handleClickHelp}
     addFormAccess={enums.Definition_CancellationOfWarranty_Create_w}
     filteredColumns={filteredColumns}
     deleteAccess={enums.Definition_CancellationOfWarranty_Delete_w}
     editAccess={enums.Definition_CancellationOfWarranty_Update_w}
     permissionsAccess={""}
     changePasswordAccess={""}
     getOneRecord={reasonForCancellationOfWarrantyGetOneRecord}
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
)
};


export default WarrantyCancelation