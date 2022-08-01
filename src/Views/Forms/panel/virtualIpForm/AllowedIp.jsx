
import React, { useRef, useState } from 'react'
import CustomTable from '../../../../Components/Table/Table/CustomTable'
import TableModal from './tableModal/TableModal'
import { t } from "i18next";

import { enums } from '../../../../data/Enums';
import { toast } from "react-toastify";
import useWindowSize from '../../../../customHooks/useWindowSize';
import { allowedIpAccessList, allowedIpCheckFile, allowedIpDelete, allowedIpExport, allowedIpExportId, allowedIpFavorite, allowedIpGetOneRecord, allowedIpImport, allowedIpLog, allowedIpRead, allowedIpReadPaging, allowedIpSampleFile, allowedIpSetColumn } from '../../../../services/allowedIp';
import AllowedIpForm from './AllowedIpForm';

const AllowedIp = () => {
    const filteredColumns = ["IsLimited", "Id", "Registrar","SourceType"];

    const [tableModalOpen, setTableModalOpen] = useState(false);
    const [rowValus, setRowValues] = useState({});
  
  
    const childRef = useRef();
  
    const [mobileModal, setMobileModal] = useState(false)
    const [mobileModalButtons, setMobileModalButtons] = useState(false)
    const [mobileModalColumns, setMobileModalColumns] = useState(false)
    const widthOFScreen = useWindowSize().width
    const BcItems = [t("/Operator/Operator/Read"), t("/Operator/AllowedIp/write")];
  
    const addObject = {
      Component: AllowedIpForm,
      path: "/Operator/AllowedIp/write",
      title: "/Operator/AllowedIp/write",
      access: enums.Operator_AllowedIp_Create_w,
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
       ReadApi={allowedIpRead}
       deleteApi={allowedIpDelete}
       unSelectedAPI={allowedIpSetColumn}
       sampleUrl={allowedIpSampleFile}
       fileCheckURL={allowedIpCheckFile}
       importURL={allowedIpImport}
       logApi={allowedIpLog}
       exportId={allowedIpExportId}
       changePasswordURL={""}
       addObject={addObject}
       exportAccess={enums.Operator_AllowedIp_Export_r}
       exportLink={allowedIpExport}
       importAccess={enums.Operator_AllowedIp_Import_w}
       logAccess={enums.Operator_AllowedIp_Log_r}
       readPagingApi={allowedIpReadPaging}
       accessListAccess={enums.Definition_VehicleType_Read_r}
       accessListApi={allowedIpAccessList}
       favouriteApi={allowedIpFavorite}
       handleClickHelp={handleClickHelp}
       addFormAccess={enums.Operator_AllowedIp_Create_w}
       filteredColumns={filteredColumns}
       deleteAccess={enums.Operator_AllowedIp_Delete_w}
       editAccess={enums.Operator_AllowedIp_Update_w}
       permissionsAccess={""}
       changePasswordAccess={""}
       getOneRecord={allowedIpGetOneRecord}
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

export default AllowedIp