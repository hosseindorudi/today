import React, { useRef, useState } from 'react'
import CustomTable from '../../../../Components/Table/Table/CustomTable'
import useWindowSize from '../../../../customHooks/useWindowSize';
import TableModal from './tableModal/TableModal'
import { t } from "i18next";
import { enums } from '../../../../data/Enums';
import { toast } from "react-toastify";
import MarketingMessage from './marketingMessageDefine/MarketingMessage';
import { MessageAccessList, MessageCheckFile, MessageColumnInfo, MessageDelete, MessageExport, MessageExportId, MessageFavorite, MessageGetOneRecord, MessageImportArray, MessageImportFile, MessageLog, MessageRead, MessageReadPaging, MessageSampleFile, MessageSetUnselectedColumn } from '../../../../services/marketingMessage';
const MarketingMessageList = () => {
    const filteredColumns = ["IsLimited",  "Registrar","SourceType","Id","IsDynamic","IsHtml",
    "SafeMode"];
    const [tableModalOpen, setTableModalOpen] = useState(false);
    const [rowValus, setRowValues] = useState({});
    const childRef = useRef();
    const [mobileModal, setMobileModal] = useState(false)
    const [mobileModalButtons, setMobileModalButtons] = useState(false)
    const [mobileModalColumns, setMobileModalColumns] = useState(false)
    const widthOFScreen = useWindowSize().width
  
    const addObject = {
      Component: MarketingMessage,
      path: "/Marketing/Message/Create",
      title: "/Marketing/Message/Create",
      access: enums.Marketing_Message_Create_w,
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
         rowValues={rowValus}
         onHide={() => setTableModalOpen(false)}
         tableModalShow={tableModalOpen}
         updated={updated}
       />
     )}
     
     <CustomTable
        columnInfo={MessageColumnInfo}
        importarray={MessageImportArray}
       ref={childRef}
       ReadApi={MessageRead}
       deleteApi={MessageDelete}
       unSelectedAPI={MessageSetUnselectedColumn}
       sampleUrl={MessageSampleFile}
       fileCheckURL={MessageCheckFile}
       importURL={MessageImportFile}
       logApi={MessageLog}
       exportId={MessageExportId}
       changePasswordURL={""}
       addObject={addObject}
       exportAccess={enums.Marketing_Message_Export_r}
       exportLink={MessageExport}
       importAccess={enums.Marketing_Message_Import_w}
       logAccess={enums.Marketing_PhonePool_Log_r}
       readPagingApi={MessageReadPaging}
       accessListAccess={enums.Marketing_Message_Read_r}
       accessListApi={MessageAccessList}
       favouriteApi={MessageFavorite}
       handleClickHelp={handleClickHelp}
       addFormAccess={enums.Marketing_Message_Create_w}
       filteredColumns={filteredColumns}
       deleteAccess={enums.Marketing_Message_Delete_w}
       editAccess={enums.Marketing_Message_Update_w}
       permissionsAccess={""}
       changePasswordAccess={""}
       getOneRecord={MessageGetOneRecord}
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
}

export default MarketingMessageList