 
import React, { useRef, useState } from "react";
import TableModal from "./TableModal/TableModal";
import { enums } from "../../../../data/Enums";
import { t } from "i18next";
import { toast } from "react-toastify";
import useWindowSize from "../../../../customHooks/useWindowSize";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import { statusDeviceEndAccessList, statusDeviceEndCheckFile, statusDeviceEndDelete, statusDeviceEndExport, statusDeviceEndExportId, statusDeviceEndFavorite, statusDeviceEndGetOneRecord, statusDeviceEndImportFile, statusDeviceEndLog, statusDeviceEndRead, statusDeviceEndReadPaging, statusDeviceEndSampleFile, statusDeviceEndSetUnselectedColumn } from "../../../../services/statusDeviceEndService";
import StatusDeviceEndDefine from "./statusDeviceEndDefine/StatusDeviceEndDefine";

const StatusDeviceEnd = () => {
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
    Component: StatusDeviceEndDefine,
          title: "/Definition/StatusDeviceEnd/Write",
          path: "/Definition/StatusDeviceEnd/Write",
          access: enums.Definition_StatusDeviceEnd_Create_w,
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
        ReadApi={statusDeviceEndRead}
        deleteApi={statusDeviceEndDelete}
        unSelectedAPI={statusDeviceEndSetUnselectedColumn}
        sampleUrl={statusDeviceEndSampleFile}
        fileCheckURL={statusDeviceEndCheckFile}
        importURL={statusDeviceEndImportFile}
        logApi={statusDeviceEndLog}
        exportId={statusDeviceEndExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Definition_StatusDeviceEnd_Export_r}
        exportLink={statusDeviceEndExport}
        importAccess={enums.Definition_StatusDeviceEnd_Import_w}
        logAccess={enums.Definition_StatusDeviceEnd_Log_r}
        readPagingApi={statusDeviceEndReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={statusDeviceEndAccessList}
        favouriteApi={statusDeviceEndFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Definition_StatusDeviceEnd_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_StatusDeviceEnd_Delete_w}
        editAccess={enums.Definition_StatusDeviceEnd_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={statusDeviceEndGetOneRecord}
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

export default StatusDeviceEnd;
