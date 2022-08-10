 
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
import { useTranslation } from "react-i18next";

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
    "SafeMode"
  ];
  const [mobileModal, setMobileModal] = useState(false);
  const [mobileModalButtons, setMobileModalButtons] = useState(false);
  const [mobileModalColumns, setMobileModalColumns] = useState(false);
  const widthOFScreen = useWindowSize().width;
  const {t} = useTranslation()
  const BcItems = [t("/Operator/Operator/Read"), t("/Operator/LoginHistory/Read")];

  const handleClickHelp = () => {
    window.open("https://www.google.com");
  };

  return (
    <>
      <CustomTable
        ref={childRef}
        BcItems={BcItems}
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
        logAccess={enums.Operator_LoginHistory_Log_r}
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
