import '../../../../assets/css/table.css'
import React, {
  useRef, useState,
} from "react";


import {  BruteForceRead,
          BruteForceReadPaging,
          BruteForceDelete,
          BruteForceFavorite,
          BruteForceExportId,
          BruteForceExport,
          BruteForceLog,
          BruteForceSetUnselectedColumn,
          BruteForceAccessList,
} from '../../../../services/attackService';
 import { enums } from '../../../../data/Enums';
import CustomTable from '../../../../Components/Table/Table/CustomTable';
import useWindowSize from '../../../../customHooks/useWindowSize';
import { useTranslation } from 'react-i18next';
const Attacks = () => {
  const childRef = useRef();
  const filteredColumns = ["IsLimited", "Id", "Registrar","Group_Id","Language_EId","SourceType",
  "SafeMode"];
  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const widthOFScreen = useWindowSize().width
  const {t} = useTranslation()
  const BcItems = [t("/Operator/Operator/Read"), t("/Operator/BruteForce/Read")];



  const handleClickHelp = () => {
    window.open("https://www.google.com");
  };

  return (
    <>

      <CustomTable
        ref={childRef}
        BcItems={BcItems}
        ReadApi={BruteForceRead}
        deleteApi={BruteForceDelete}
        unSelectedAPI={BruteForceSetUnselectedColumn}
        sampleUrl={""}
        fileCheckURL={""}
        importURL={""}
        logApi={BruteForceLog}
        exportId={BruteForceExportId}
        changePasswordURL={""}
        addObject={""}
        exportAccess={enums.Operator_BruteForce_Export_r}
        exportLink={BruteForceExport}
        importAccess={""}
        logAccess={enums.Operator_BruteForce_Log_r}
        readPagingApi={BruteForceReadPaging}
        accessListAccess={enums.Operator_BruteForce_Read_r}
        accessListApi={BruteForceAccessList}
        favouriteApi={BruteForceFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={""}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Operator_BruteForce_Delete_w}
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

export default Attacks