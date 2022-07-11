 
import React, { useRef, useState } from "react";
import TableModal from "./TableModal/TableModal";
import { enums } from "../../../../data/Enums";
import { t } from "i18next";
import { toast } from "react-toastify";
import useWindowSize from "../../../../customHooks/useWindowSize";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import StatusDeviceProgressDefine from "./statusDeviceProgressDefine/StatusDeviceProgressDefine";
import { statusDeviceProgressAccessList, statusDeviceProgressCheckFile, statusDeviceProgressDelete, statusDeviceProgressExport, statusDeviceProgressExportId, statusDeviceProgressFavorite, statusDeviceProgressGetOneRecord, statusDeviceProgressImportFile, statusDeviceProgressLog, statusDeviceProgressRead, statusDeviceProgressReadPaging, statusDeviceProgressSampleFile, statusDeviceProgressSetUnselectedColumn } from "../../../../services/statusDeviceProgress";

const StatusDeviceProgress = () => {
  const childRef = useRef();
  const filteredColumns = [
    "IsLimited",
    "Id",
    "Registrar",
    "Language_EId",
    "SourceType",
  ];
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});
  const [mobileModal, setMobileModal] = useState(false);
  const [mobileModalButtons, setMobileModalButtons] = useState(false);
  const [mobileModalColumns, setMobileModalColumns] = useState(false);
  const widthOFScreen = useWindowSize().width;

  const addObject = {
    Component: StatusDeviceProgressDefine,
    title: "/Definition/StatusDeviceProgress/Write",
    path: "/Definition/StatusDeviceProgress/Write",
    access: enums.Definition_StatusDeviceProgress_Create_w,
  };
  const setUpdate = (res) => {
    const record = res.Record;
    setRowValues(record);
    setTableModalOpen(true);
  };
  const updated = () => {
    setTableModalOpen(false);
    toast.success(t("updatedRecord"), {
      position: toast.POSITION.TOP_CENTER,
    });
    //call update function in child class
    childRef.current.updated();
  };

  const handleClickHelp = () => {
    window.open("https://www.google.com");
  };

  return (
    <>
      {tableModalOpen && (
        <TableModal
          rowValus={rowValus}
          onHide={() => setTableModalOpen(false)}
          tableModalShow={tableModalOpen}
          updated={updated}
        />
      )}

      <CustomTable
        ref={childRef}
        ReadApi={statusDeviceProgressRead}
        deleteApi={statusDeviceProgressDelete}
        unSelectedAPI={statusDeviceProgressSetUnselectedColumn}
        sampleUrl={statusDeviceProgressSampleFile}
        fileCheckURL={statusDeviceProgressCheckFile}
        importURL={statusDeviceProgressImportFile}
        logApi={statusDeviceProgressLog}
        exportId={statusDeviceProgressExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Definition_StatusDeviceProgress_Export_r}
        exportLink={statusDeviceProgressExport}
        importAccess={enums.Definition_StatusDeviceProgress_Import_w}
        logAccess={enums.Definition_StatusDeviceProgress_Log_r}
        readPagingApi={statusDeviceProgressReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={statusDeviceProgressAccessList}
        favouriteApi={statusDeviceProgressFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Definition_StatusDeviceProgress_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_StatusDeviceProgress_Delete_w}
        editAccess={enums.Definition_StatusDeviceProgress_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={statusDeviceProgressGetOneRecord}
        setUpdate={setUpdate}
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

export default StatusDeviceProgress;
