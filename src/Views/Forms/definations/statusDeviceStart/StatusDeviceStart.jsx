 
import React, { useRef, useState } from "react";
import TableModal from "./TableModal/TableModal";
import { enums } from "../../../../data/Enums";
import { t } from "i18next";
import { toast } from "react-toastify";
import useWindowSize from "../../../../customHooks/useWindowSize";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import StatusDeviceStartDefine from "./statusDeviceStartDefine/StatusDeviceStartDefine";
import { statusDeviceStartAccessList, statusDeviceStartCheckFile, statusDeviceStartDelete, statusDeviceStartExport, statusDeviceStartExportId, statusDeviceStartFavorite, statusDeviceStartGetOneRecord, statusDeviceStartImportFile, statusDeviceStartLog, statusDeviceStartRead, statusDeviceStartReadPaging, statusDeviceStartSampleFile, statusDeviceStartSetUnselectedColumn } from "../../../../services/statusDeviceStart";

const StatusDeviceStart = () => {
  const childRef = useRef();
  const filteredColumns = [
    "IsLimited",
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
  const BcItems = [t("routes.basicDefinations"), t("/Definition/StatusDeviceStart/Read")];

  const addObject = {
    Component: StatusDeviceStartDefine,
    path: "/Definition/StatusDeviceStart/Write",
    title: "/Definition/StatusDeviceStart/Write",
    access: enums.Definition_StatusDeviceStart_Create_w,
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
        ReadApi={statusDeviceStartRead}
        deleteApi={statusDeviceStartDelete}
        unSelectedAPI={statusDeviceStartSetUnselectedColumn}
        sampleUrl={statusDeviceStartSampleFile}
        fileCheckURL={statusDeviceStartCheckFile}
        importURL={statusDeviceStartImportFile}
        logApi={statusDeviceStartLog}
        exportId={statusDeviceStartExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Definition_StatusDeviceStart_Export_r}
        exportLink={statusDeviceStartExport}
        importAccess={enums.Definition_StatusDeviceStart_Import_w}
        logAccess={enums.Definition_StatusDeviceStart_Log_r}
        readPagingApi={statusDeviceStartReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={statusDeviceStartAccessList}
        favouriteApi={statusDeviceStartFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Definition_StatusDeviceStart_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_StatusDeviceStart_Delete_w}
        editAccess={enums.Definition_StatusDeviceStart_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={statusDeviceStartGetOneRecord}
        setUpdate={setUpdate}
        mobileModal={mobileModal}
        setMobileModal={setMobileModal}
        widthOFScreen={widthOFScreen}
        mobileModalButtons={mobileModalButtons}
        setMobileModalButtons={setMobileModalButtons}
        setMobileModalColumns={setMobileModalColumns}
        mobileModalColumns={mobileModalColumns}
        BcItems={BcItems}
      />
    </>
  );
};

export default StatusDeviceStart;
