import React, { useRef, useState } from "react";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import useWindowSize from "../../../../customHooks/useWindowSize";
import {
  PhonePoolRead,
  PhonePoolReadPaging,
  PhonePoolGetOneRecord,
  PhonePoolDelete,
  PhonePoolFavorite,
  PhonePoolExportId,
  PhonePoolExport,
  PhonePoolSampleFile,
  PhonePoolCheckFile,
  PhonePoolImportFile,
  PhonePoolLog,
  PhonePoolSetUnselectedColumn,
  PhonePoolAccessList,
} from "../../../../services/phoneNumberGroupService";
import { enums } from "../../../../data/Enums";

const MarketingOutBox = () => {
  const filteredColumns = ["IsLimited", "Registrar", "SourceType", "Id"];
  const childRef = useRef();
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
        ReadApi={PhonePoolRead}
        deleteApi={PhonePoolDelete}
        unSelectedAPI={PhonePoolSetUnselectedColumn}
        sampleUrl={PhonePoolSampleFile}
        fileCheckURL={PhonePoolCheckFile}
        importURL={PhonePoolImportFile}
        logApi={PhonePoolLog}
        exportId={PhonePoolExportId}
        changePasswordURL={""}
        addObject={""}
        exportAccess={enums.Marketing_Outbox_Export_r}
        exportLink={PhonePoolExport}
        importAccess={""}
        logAccess={enums.Marketing_Outbox_Log_r}
        readPagingApi={PhonePoolReadPaging}
        accessListAccess={enums.Marketing_Outbox_Read_r}
        accessListApi={PhonePoolAccessList}
        favouriteApi={PhonePoolFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={""}
        filteredColumns={filteredColumns}
        deleteAccess={""}
        editAccess={""}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={PhonePoolGetOneRecord}
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

export default MarketingOutBox;
