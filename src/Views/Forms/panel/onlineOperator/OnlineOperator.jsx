
 
import React, { useRef, useState } from "react";
import { enums } from "../../../../data/Enums";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import useWindowSize from "../../../../customHooks/useWindowSize";
import { useTranslation } from "react-i18next";
import { onlineOperatorDelete, onlineOperatorExport, onlineOperatorExportId, onlineOperatorLog, onlineOperatorRead, onlineOperatorReadPaging, onlineOperatorSetUnselectedColumn } from "../../../../services/onlineOperatorsService";
const OnlineOperator = () => {
  const {t} = useTranslation()
  const filteredColumns = ["IsLimited", "Id", "Registrar", "SourceType",
  "SafeMode"];
  const childRef = useRef();
  const [mobileModal, setMobileModal] = useState(false);
  const [mobileModalButtons, setMobileModalButtons] = useState(false);
  const [mobileModalColumns, setMobileModalColumns] = useState(false);
  const widthOFScreen = useWindowSize().width;
  const BcItems = [t("/Operator/Operator/Read"), t("/Operator/OnlineOperator/Read")];




  const handleClickHelp = () => {
    window.open("https://www.google.com");
  };


  return (
    <>
      <CustomTable
        BcItems={BcItems}
        ref={childRef}
        ReadApi={onlineOperatorRead}
        deleteApi={onlineOperatorDelete}
        unSelectedAPI={onlineOperatorSetUnselectedColumn}
        sampleUrl={''}
        fileCheckURL={''}
        importURL={''}
        logApi={onlineOperatorLog}
        exportId={onlineOperatorExportId}
        changePasswordURL={''}
        addObject={''}
        exportAccess={enums.Operator_OnlineOperator_Export_r}
        exportLink={onlineOperatorExport}
        importAccess={''}
        logAccess={enums.Operator_OnlineOperator_Log_r}
        readPagingApi={onlineOperatorReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={''}
        favouriteApi={''}
        handleClickHelp={handleClickHelp}
        addFormAccess={''}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Operator_OnlineOperator_Delete_w}
        editAccess={''}
        permissionsAccess={""}
        getPermissionURL={""}
        setPermissionURL={""}
        changePasswordAccess={''}
        getOneRecord={''}
        setUpdate={''}
        mobileModal={mobileModal}
        setMobileModal={setMobileModal}
        widthOFScreen={widthOFScreen}
        mobileModalButtons={mobileModalButtons}
        setMobileModalButtons={setMobileModalButtons}
        setMobileModalColumns={setMobileModalColumns}
        mobileModalColumns={mobileModalColumns}
        policyBrowserAccess={""}
      />
    </>
  );
};

export default OnlineOperator;
