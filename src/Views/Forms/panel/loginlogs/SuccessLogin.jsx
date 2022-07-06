import "../../../../assets/css/table.css";
import React, { useRef, useState } from "react";

import { enums } from "../../../../data/Enums";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import {
  LoginHistoryRead,
  LoginHistoryReadPaging,
  LoginHistoryFavorite,
  LoginHistoryExportId,
  LoginHistoryExport,
  LoginHistoryLog,
  LoginHistorySetUnselectedColumn,
  LoginHistoryAccessList,
} from "../../../../services/loginHistoryServices";
import useWindowSize from "../../../../customHooks/useWindowSize";

const SuccessLogin = () => {
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
        ReadApi={LoginHistoryRead}
        deleteApi={""}
        unSelectedAPI={LoginHistorySetUnselectedColumn}
        sampleUrl={""}
        fileCheckURL={""}
        importURL={""}
        logApi={LoginHistoryLog}
        exportId={LoginHistoryExportId}
        changePasswordURL={""}
        addObject={""}
        exportAccess={enums.Operator_LoginHistory_Export_r}
        exportLink={LoginHistoryExport}
        importAccess={""}
        logAccess={""}
        // enums.Operator_LoginHistory_Log_r
        readPagingApi={LoginHistoryReadPaging}
        accessListAccess={enums.Operator_LoginHistory_Read_r}
        accessListApi={LoginHistoryAccessList}
        favouriteApi={LoginHistoryFavorite}
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
};

export default SuccessLogin;
