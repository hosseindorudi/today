import React, { useRef, useState } from 'react'
import CustomTable from '../../../../Components/Table/Table/CustomTable'
import useWindowSize from '../../../../customHooks/useWindowSize';
import PhoneNumberGroup from './phoneNumberGroupDefine/PhoneNumberGroup';
import TableModal from './tableModal/TableModal'
import { t } from "i18next";
import { 
  PhoneBookRead,PhoneBookReadPaging,PhoneBookGetOneRecord,PhoneBookDelete,PhoneBookFavorite,PhoneBookExportId,PhoneBookExport,PhoneBookSampleFile,PhoneBookCheckFile,PhoneBookImportFile,PhoneBookLog,PhoneBookSetUnselectedColumn,PhoneBookAccessList,PhoneBookColumnInfo,PhoneBookImportArray
        } from '../../../../services/phoneNumberGroupService';
import { enums } from '../../../../data/Enums';
import { toast } from "react-toastify";
import PhoneBookMessageModal from '../../../../Components/Table/phoneBookMessage/PhoneBookMessageModal';
const PhoneGroupList = () => {
    const filteredColumns = ["IsLimited",  "Registrar","SourceType","Id"];
    const [tableModalOpen, setTableModalOpen] = useState(false);
    const [messageModal, setMessageModal] = useState(false)
    const [rowValus, setRowValues] = useState({});
    const childRef = useRef();
    const [mobileModal, setMobileModal] = useState(false)
    const [mobileModalButtons, setMobileModalButtons] = useState(false)
    const [mobileModalColumns, setMobileModalColumns] = useState(false)
    const widthOFScreen = useWindowSize().width
  
    const addObject = {
      Component: PhoneNumberGroup,
      path: "/Marketing/PhoneBook/Create",
      title: "/Marketing/PhoneBook/Create",
      access: enums.Marketing_PhoneBook_Create_w
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
    const sendMessageBank=(value)=>{
      let obj={
        title:value.Title,
        id:value.Id
      }
      setRowValues(obj)
      setMessageModal(true)
    }
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
     {messageModal &&(
      <PhoneBookMessageModal rowValues={rowValus} 
        onHide={() => setMessageModal(false)}
        show={messageModal}
      />
     )}
     
     <CustomTable
         columnInfo={PhoneBookColumnInfo}
         importarray={PhoneBookImportArray}
       ref={childRef}
       ReadApi={PhoneBookRead}
       deleteApi={PhoneBookDelete}
       unSelectedAPI={PhoneBookSetUnselectedColumn}
       sampleUrl={PhoneBookSampleFile}
       fileCheckURL={PhoneBookCheckFile}
       importURL={PhoneBookImportFile}
       logApi={PhoneBookLog}
       exportId={PhoneBookExportId}
       changePasswordURL={""}
       addObject={addObject}
       exportAccess={enums.Marketing_PhoneBook_Export_r}
       exportLink={PhoneBookExport}
       importAccess={enums.Marketing_PhoneBook_Import_w}
       logAccess={enums.Marketing_PhoneBook_Log_r}
       readPagingApi={PhoneBookReadPaging}
       accessListAccess={enums.Marketing_PhoneBook_Read_r}
       accessListApi={PhoneBookAccessList}
       favouriteApi={PhoneBookFavorite}
       handleClickHelp={handleClickHelp}
       addFormAccess={enums.Marketing_PhoneBook_Create_w}
       filteredColumns={filteredColumns}
       deleteAccess={enums.Marketing_PhoneBook_Delete_w}
       editAccess={enums.Marketing_PhoneBook_Update_w}
       permissionsAccess={""}
       changePasswordAccess={""}
       getOneRecord={PhoneBookGetOneRecord}
       setUpdate={setUpdate}
       mobileModal = {mobileModal}
       setMobileModal = {setMobileModal}
       widthOFScreen ={widthOFScreen}
       mobileModalButtons={mobileModalButtons}
       setMobileModalButtons={setMobileModalButtons}
       setMobileModalColumns={setMobileModalColumns}
       mobileModalColumns={mobileModalColumns}
       sendMessageBankAccess={enums.Marketing_PhoneBook_Delete_w}
       sendMessageBank={sendMessageBank}
     />
    </>
  )
}

export default PhoneGroupList