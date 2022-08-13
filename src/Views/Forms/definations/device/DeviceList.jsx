import React, { useRef, useState } from 'react'
import CustomTable from '../../../../Components/Table/Table/CustomTable'
import TableModal from './tableModal/TableModal'
import { t } from "i18next";
import { 
    DeviceRead,
    DeviceReadPaging,
    DeviceGetOneRecord,
    DeviceDelete,
    DeviceFavorite,
    DeviceExportId,
    DeviceExport,
    DeviceSampleFile,
    DeviceCheckFile,
    DeviceImportFile,
    DeviceLog,
    DeviceSetUnselectedColumn,
    DeviceAccessList,
    DeviceColumnInfo,
    DeviceImportArray,
        } from '../../../../services/deviceService';
import { enums } from '../../../../data/Enums';
import { toast } from "react-toastify";
import useWindowSize from '../../../../customHooks/useWindowSize';
import DeviceForm from './deviceForm/DeviceForm';

const DeviceList = () => {
    const filteredColumns = ["IsLimited", "Registrar","SourceType", "Company_Id",
    "SafeMode"];
    const BcItems = [t("routes.basicDefinations"), t("/Definition/Device/Read")];

    const [tableModalOpen, setTableModalOpen] = useState(false);
    const [rowValus, setRowValues] = useState({});
  
  
    const childRef = useRef();
  
    const [mobileModal, setMobileModal] = useState(false)
    const [mobileModalButtons, setMobileModalButtons] = useState(false)
    const [mobileModalColumns, setMobileModalColumns] = useState(false)
    const widthOFScreen = useWindowSize().width
  
    const addObject = {
      Component: DeviceForm,
      path: "/Definition/Device/Write",
      title: "/Definition/Device/Write",
      access: enums.Definition_Device_Create_w
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
        columnInfo={DeviceColumnInfo}
        importarray={DeviceImportArray}
       ref={childRef}
       ReadApi={DeviceRead}
       deleteApi={DeviceDelete}
       unSelectedAPI={DeviceSetUnselectedColumn}
       sampleUrl={DeviceSampleFile}
       fileCheckURL={DeviceCheckFile}
       importURL={DeviceImportFile}
       logApi={DeviceLog}
       exportId={DeviceExportId}
       changePasswordURL={""}
       addObject={addObject}
       exportAccess={enums.Definition_Device_Export_r}
       exportLink={DeviceExport}
       importAccess={enums.Definition_Device_Import_w}
       logAccess={enums.Definition_Device_Log_r}
       readPagingApi={DeviceReadPaging}
       accessListAccess={enums.Definition_Device_Read_r}
       accessListApi={DeviceAccessList}
       favouriteApi={DeviceFavorite}
       handleClickHelp={handleClickHelp}
       addFormAccess={enums.Definition_Device_Create_w}
       filteredColumns={filteredColumns}
       deleteAccess={enums.Definition_Device_Delete_w}
       editAccess={enums.Definition_Device_Update_w}
       permissionsAccess={""}
       changePasswordAccess={""}
       getOneRecord={DeviceGetOneRecord}
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
  )
}

export default DeviceList