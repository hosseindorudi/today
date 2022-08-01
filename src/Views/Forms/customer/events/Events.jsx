import React, { useRef, useState } from 'react'
import CustomTable from '../../../../Components/Table/Table/CustomTable';
import useWindowSize from '../../../../customHooks/useWindowSize';
import { enums } from '../../../../data/Enums';
import { 
    CustomerEventRead,
    CustomerEventReadPaging,
    CustomerEventFavorite,
    CustomerEventExportId,
    CustomerEventExport,
    CustomerEventLog,
    CustomerEventSetUnselectedColumn,
    CustomerEventAccessList,
  
  } from '../../../../services/eventsService';
import { t } from "i18next";

const CustomerEvents = () => {
    const childRef = useRef();
    const filteredColumns = ["IsLimited", "Id", "Registrar","Group_Id","Language_EId","SourceType", "CodePage_EId", "Customer_Id"];
    const [mobileModal, setMobileModal] = useState(false)
    const [mobileModalButtons, setMobileModalButtons] = useState(false)
    const [mobileModalColumns, setMobileModalColumns] = useState(false)
    const widthOFScreen = useWindowSize().width
    const BcItems = [t("/Customer/Customer/Read"), t("/Customer/Event/Read")];
  
  
  
    const handleClickHelp = () => {
      window.open("https://www.google.com");
    };
  
    return (
      <>
  
        <CustomTable
          ref={childRef}
          BcItems={BcItems}
          ReadApi={CustomerEventRead}
          deleteApi={""}
          unSelectedAPI={CustomerEventSetUnselectedColumn}
          sampleUrl={""}
          fileCheckURL={""}
          importURL={""}
          logApi={CustomerEventLog}
          exportId={CustomerEventExportId}
          changePasswordURL={""}
          addObject={""}
          exportAccess={enums.Customer_Event_Export_r}
          exportLink={CustomerEventExport}
          importAccess={""}
          logAccess={enums.Customer_Event_Log_r}
          readPagingApi={CustomerEventReadPaging}
          accessListAccess={enums.Customer_Event_Read_r}
          accessListApi={CustomerEventAccessList}
          favouriteApi={CustomerEventFavorite}
          handleClickHelp={handleClickHelp}
          addFormAccess={""}
          filteredColumns={filteredColumns}
          deleteAccess={""}
          editAccess={""}
          permissionsAccess={""}
          changePasswordAccess={""}
          getOneRecord={""}
          setUpdate={""}
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
}

export default CustomerEvents