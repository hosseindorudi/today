
import React, { useRef, useState } from 'react'
import CustomTable from '../../../../Components/Table/Table/CustomTable'
import TableModal from './tableModal/TableModal'
import { t } from "i18next";

import { enums } from '../../../../data/Enums';
import { toast } from "react-toastify";
import useWindowSize from '../../../../customHooks/useWindowSize';
import AllowedIpCustomerForm from './AllowedIpCustomerForm';
import { AllowedIpCustomerAccessList, AllowedIpCustomerCheckFile, AllowedIpCustomerDelete, AllowedIpCustomerExport, AllowedIpCustomerExportId, AllowedIpCustomerFavorite, AllowedIpCustomerGetOneRecord, AllowedIpCustomerImport, AllowedIpCustomerLog, AllowedIpCustomerRead, AllowedIpCustomerReadPaging, AllowedIpCustomerSampleFile, AllowedIpCustomerSetColumn } from '../../../../services/allowedIPCustomer';

const AllowedCustomerIp = () => {
    const filteredColumns = ["IsLimited", "Id", "Registrar","SourceType"];

    const [tableModalOpen, setTableModalOpen] = useState(false);
    const [rowValus, setRowValues] = useState({});
  
  
    const childRef = useRef();
  
    const [mobileModal, setMobileModal] = useState(false)
    const [mobileModalButtons, setMobileModalButtons] = useState(false)
    const [mobileModalColumns, setMobileModalColumns] = useState(false)
    const widthOFScreen = useWindowSize().width
  
    const addObject = {
      Component: AllowedIpCustomerForm,
      path: "/Customer/AllowedIp/write",
      title: "/Customer/AllowedIp/write",
      access: enums.Customer_AllowedIp_Create_w,
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
       ReadApi={AllowedIpCustomerRead}
       deleteApi={AllowedIpCustomerDelete}
       unSelectedAPI={AllowedIpCustomerSetColumn}
       sampleUrl={AllowedIpCustomerSampleFile}
       fileCheckURL={AllowedIpCustomerCheckFile}
       importURL={AllowedIpCustomerImport}
       logApi={AllowedIpCustomerLog}
       exportId={AllowedIpCustomerExportId}
       changePasswordURL={""}
       addObject={addObject}
       exportAccess={enums.Customer_AllowedIp_Export_r}
       exportLink={AllowedIpCustomerExport}
       importAccess={enums.Customer_AllowedIp_Import_w}
       logAccess={enums.Customer_AllowedIp_Log_r}
       readPagingApi={AllowedIpCustomerReadPaging}
       accessListAccess={enums.Operator_AccessList_Read_r}
       accessListApi={AllowedIpCustomerAccessList}
       favouriteApi={AllowedIpCustomerFavorite}
       handleClickHelp={handleClickHelp}
       addFormAccess={enums.Customer_AllowedIp_Create_w}
       filteredColumns={filteredColumns}
       deleteAccess={enums.Customer_AllowedIp_Delete_w}
       editAccess={enums.Customer_AllowedIp_Update_w}
       permissionsAccess={""}
       changePasswordAccess={""}
       getOneRecord={AllowedIpCustomerGetOneRecord}
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

export default AllowedCustomerIp