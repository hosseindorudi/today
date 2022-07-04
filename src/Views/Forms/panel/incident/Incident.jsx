import '../../../../assets/css/table.css'
import React, {
  useRef, useState,
} from "react";
import useWindowSize from '../../../../customHooks/useWindowSize';
import CustomTable from '../../../../Components/Table/Table/CustomTable';
import { 
  EventRead,
  EventReadPaging,
  EventFavorite,
  EventExportId,
  EventExport,
  EventLog,
  EventSetUnselectedColumn,
  EventAccessList,

} from '../../../../services/eventsService';
import { enums } from '../../../../data/Enums';
const Incident = () => {
  const childRef = useRef();
  const filteredColumns = ["IsLimited", "Id", "Registrar","Group_Id","Language_EId","SourceType", "CodePage_EId", "Operator_Id"];
  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const widthOFScreen = useWindowSize().width



  const handleClickHelp = () => {
    window.open("https://www.google.com");
  };

  return (
    <>

      <CustomTable
        ref={childRef}
        ReadApi={EventRead}
        deleteApi={""}
        unSelectedAPI={EventSetUnselectedColumn}
        sampleUrl={""}
        fileCheckURL={""}
        importURL={""}
        logApi={EventLog}
        exportId={EventExportId}
        changePasswordURL={""}
        addObject={""}
        exportAccess={enums.Operator_Event_Export_r}
        exportLink={EventExport}
        importAccess={""}
        logAccess={enums.Operator_Event_Log_r}
        readPagingApi={EventReadPaging}
        accessListAccess={enums.Operator_Event_Read_r}
        accessListApi={EventAccessList}
        favouriteApi={EventFavorite}
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

export default Incident