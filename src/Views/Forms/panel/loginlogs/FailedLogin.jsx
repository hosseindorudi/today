
import React, {
  useRef, useState,
} from "react";

import { enums } from '../../../../data/Enums';
import CustomTable from '../../../../Components/Table/Table/CustomTable';
import { 
  FailedHistoryRead,
  FailedHistoryReadPaging,
  FailedHistoryFavorite,
  FailedHistoryExportId,
  FailedHistoryExport,
  FailedHistoryLog,
  FailedHistorySetUnselectedColumn,
  FailedHistoryAccessList,

} from '../../../../services/loginFailedService';
import useWindowSize from '../../../../customHooks/useWindowSize';
import { useTranslation } from 'react-i18next';

const FailedLogin = () => {
  const childRef = useRef();
  const filteredColumns = ["IsLimited", "Id", "Registrar","Group_Id","Language_EId","SourceType",
  "SafeMode"];
  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const widthOFScreen = useWindowSize().width
  const {t} = useTranslation()
  const BcItems = [t("/Operator/Operator/Read"), t("/Operator/FailedHistory/Read")];



  const handleClickHelp = () => {
    window.open("https://www.google.com");
  };

  return (
    <>

      <CustomTable
      BcItems={BcItems}
        ref={childRef}
        ReadApi={FailedHistoryRead}
        deleteApi={""}
        unSelectedAPI={FailedHistorySetUnselectedColumn}
        sampleUrl={""}
        fileCheckURL={""}
        importURL={""}
        logApi={FailedHistoryLog}
        exportId={FailedHistoryExportId}
        changePasswordURL={""}
        addObject={""}
        exportAccess={enums.Operator_FailedHistory_Export_r}
        exportLink={FailedHistoryExport}
        importAccess={""}
        logAccess={enums.Operator_FailedHistory_Log_r}
        readPagingApi={FailedHistoryReadPaging}
        accessListAccess={enums.Operator_FailedHistory_Read_r}
        accessListApi={FailedHistoryAccessList}
        favouriteApi={FailedHistoryFavorite}
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

export default FailedLogin