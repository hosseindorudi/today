import React, { useRef, useState } from "react";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import useWindowSize from "../../../../customHooks/useWindowSize";
import {
  OutBoxRead,
  OutBoxReadPaging,
  OutBoxFavorite,
  OutBoxExportId,
  OutBoxExport,
  OutBoxLog,
  OutBoxSetUnselectedColumn,
  OutBoxAccessList,
} from "../../../../services/outBoxServices";
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
        columnInfo={""}
        importarray={""}
        ref={childRef}
        ReadApi={OutBoxRead}
        deleteApi={""}
        unSelectedAPI={OutBoxSetUnselectedColumn}
        sampleUrl={""}
        fileCheckURL={""}
        importURL={""}
        logApi={OutBoxLog}
        exportId={OutBoxExportId}
        changePasswordURL={""}
        addObject={""}
        exportAccess={enums.Marketing_Outbox_Export_r}
        exportLink={OutBoxExport}
        importAccess={""}
        logAccess={enums.Marketing_Outbox_Log_r}
        readPagingApi={OutBoxReadPaging}
        accessListAccess={enums.Marketing_Outbox_Read_r}
        accessListApi={OutBoxAccessList}
        favouriteApi={OutBoxFavorite}
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

export default MarketingOutBox;
