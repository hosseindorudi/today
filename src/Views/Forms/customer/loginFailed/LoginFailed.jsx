import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import CustomTable from '../../../../Components/Table/Table/CustomTable';
import useWindowSize from '../../../../customHooks/useWindowSize';
import { enums } from '../../../../data/Enums';
import { 
    CustomerFailedHistoryRead,
    CustomerFailedHistoryReadPaging,
    CustomerFailedHistoryFavorite,
    CustomerFailedHistoryExportId,
    CustomerFailedHistoryExport,
    CustomerFailedHistoryLog,
    CustomerFailedHistorySetUnselectedColumn,
    CustomerFailedHistoryAccessList,
  
  } from '../../../../services/loginFailedService';
const LoginFailed = () => {
    const childRef = useRef();
  const filteredColumns = ["IsLimited", "Id", "Registrar","Group_Id","Language_EId","SourceType"];
  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const widthOFScreen = useWindowSize().width
  const {t} = useTranslation()
  const BcItems = [t("/Customer/Customer/Read"), t("/Customer/FailedHistory/Read")];



  const handleClickHelp = () => {
    window.open("https://www.google.com");
  };

  return (
    <>

      <CustomTable
        ref={childRef}
        BcItems={BcItems}
        ReadApi={CustomerFailedHistoryRead}
        deleteApi={""}
        unSelectedAPI={CustomerFailedHistorySetUnselectedColumn}
        sampleUrl={""}
        fileCheckURL={""}
        importURL={""}
        logApi={CustomerFailedHistoryLog}
        exportId={CustomerFailedHistoryExportId}
        changePasswordURL={""}
        addObject={""}
        exportAccess={enums.Customer_FailedHistory_Export_r}
        exportLink={CustomerFailedHistoryExport}
        importAccess={""}
        logAccess={enums.Customer_FailedHistory_Log_r}
        readPagingApi={CustomerFailedHistoryReadPaging}
        accessListAccess={enums.Customer_FailedHistory_Read_r}
        accessListApi={CustomerFailedHistoryAccessList}
        favouriteApi={CustomerFailedHistoryFavorite}
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

export default LoginFailed