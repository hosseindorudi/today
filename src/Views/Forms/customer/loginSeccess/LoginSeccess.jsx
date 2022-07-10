import React, { useRef, useState } from 'react'
import CustomTable from '../../../../Components/Table/Table/CustomTable';
import useWindowSize from '../../../../customHooks/useWindowSize';
import { enums } from '../../../../data/Enums';
import {
    CustomerLoginHistoryRead,
    CustomerLoginHistoryReadPaging,
    CustomerLoginHistoryFavorite,
    CustomerLoginHistoryExportId,
    CustomerLoginHistoryExport,
    CustomerLoginHistoryLog,
    CustomerLoginHistorySetUnselectedColumn,
    CustomerLoginHistoryAccessList,
  } from "../../../../services/loginHistoryServices";
const LoginSeccess = () => {
    const childRef = useRef();
    const filteredColumns = [
      "IsLimited",
      "Id",
      "Registrar",
      "Group_Id",
      "Language_EId",
      "SourceType",
      "Operator_Id",
    ];
    const [mobileModal, setMobileModal] = useState(false);
    const [mobileModalButtons, setMobileModalButtons] = useState(false);
    const [mobileModalColumns, setMobileModalColumns] = useState(false);
    const widthOFScreen = useWindowSize().width;
  
    const handleClickHelp = () => {
      window.open("https://www.google.com");
    };
  
    return (
      <>
        <CustomTable
          ref={childRef}
          ReadApi={CustomerLoginHistoryRead}
          deleteApi={""}
          unSelectedAPI={CustomerLoginHistorySetUnselectedColumn}
          sampleUrl={""}
          fileCheckURL={""}
          importURL={""}
          logApi={CustomerLoginHistoryLog}
          exportId={CustomerLoginHistoryExportId}
          changePasswordURL={""}
          addObject={""}
          exportAccess={enums.Customer_LoginHistory_Export_r}
          exportLink={CustomerLoginHistoryExport}
          importAccess={""}
          logAccess={enums.Customer_LoginHistory_Log_r}
          readPagingApi={CustomerLoginHistoryReadPaging}
          accessListAccess={enums.Customer_LoginHistory_Read_r}
          accessListApi={CustomerLoginHistoryAccessList}
          favouriteApi={CustomerLoginHistoryFavorite}
          handleClickHelp={handleClickHelp}
          addFormAccess={""}
          filteredColumns={filteredColumns}
          deleteAccess={""}
          editAccess={""}
          permissionsAccess={""}
          changePasswordAccess={""}
          getOneRecord={""}
          setUpdate={""}
          mobileModal={mobileModal}
          setMobileModal={setMobileModal}
          widthOFScreen={widthOFScreen}
          mobileModalButtons={mobileModalButtons}
          setMobileModalButtons={setMobileModalButtons}
          setMobileModalColumns={setMobileModalColumns}
          mobileModalColumns={mobileModalColumns}
        />
      </>
    );
}

export default LoginSeccess