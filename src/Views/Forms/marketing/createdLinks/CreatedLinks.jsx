import React, { useRef, useState } from "react";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import useWindowSize from "../../../../customHooks/useWindowSize";
import {
  PollLinkRead,
  PollLinkReadPaging,
  PollLinkFavorite,
  PollLinkExportId,
  PollLinkExport,
  PollLinkLog,
  PollLinkSetUnselectedColumn,
  PollLinkAccessList,
} from "../../../../services/pollLinkServices";
import { enums } from "../../../../data/Enums";

const CreatedLinks = () => {
  const filteredColumns = ["IsLimited", "Registrar", "SourceType", "Id",
  "SafeMode"];
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
        ReadApi={PollLinkRead}
        deleteApi={""}
        unSelectedAPI={PollLinkSetUnselectedColumn}
        sampleUrl={""}
        fileCheckURL={""}
        importURL={""}
        logApi={PollLinkLog}
        exportId={PollLinkExportId}
        changePasswordURL={""}
        addObject={""}
        exportAccess={enums.Marketing_PollLink_Export_r}
        exportLink={PollLinkExport}
        importAccess={""}
        logAccess={enums.Marketing_PollLink_Log_r}
        readPagingApi={PollLinkReadPaging}
        accessListAccess={enums.Marketing_PollLink_Read_r}
        accessListApi={PollLinkAccessList}
        favouriteApi={PollLinkFavorite}
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
        downloadQRAccess={enums.Marketing_PollLink_Export_r}
      />
    </>
  );
};

export default CreatedLinks;
