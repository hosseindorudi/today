import React, { useRef, useState } from "react";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import TableModal from "./tableModal/TableModal";
import { t } from "i18next";
import {
  cancellationOfAdmissionRead,
  cancellationOfAdmissionDelete,
  cancellationOfAdmissionSetUnselectedColumn,
  cancellationOfAdmissionSampleFile,
  cancellationOfAdmissionCheckFile,
  cancellationOfAdmissionImportFile,
  cancellationOfAdmissionLog,
  cancellationOfAdmissionExportId,
  cancellationOfAdmissionExport,
  cancellationOfAdmissionReadPaging,
  cancellationOfAdmissionAccessList,
  cancellationOfAdmissionFavorite,
  cancellationOfAdmissionGetOneRecord,
} from "../../../../services/CancellationOfAdmissionService";
import { enums } from "../../../../data/Enums";
import { toast } from "react-toastify";
import useWindowSize from "../../../../customHooks/useWindowSize";
import CancellationOfAdmissionDefine from "./cancellationOfAdmission/CancellationOfAdmissionDefine";

const CancellationOfAdmission = () => {
  const filteredColumns = [
    "IsLimited",
    "Id",
    "Registrar",
    "SourceType",
    "Province_Id",
  ];

  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});

  const childRef = useRef();

  const [mobileModal, setMobileModal] = useState(false);
  const [mobileModalButtons, setMobileModalButtons] = useState(false);
  const [mobileModalColumns, setMobileModalColumns] = useState(false);
  const widthOFScreen = useWindowSize().width;

  const addObject = {
    Component: CancellationOfAdmissionDefine,
    path: "/Definition/CancellationOfAdmission/Write",
    title: "/Definition/CancellationOfAdmission/Write",
    access: enums.Definition_CancellationOfAdmission_Create_w,
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
        ReadApi={cancellationOfAdmissionRead}
        deleteApi={cancellationOfAdmissionDelete}
        unSelectedAPI={cancellationOfAdmissionSetUnselectedColumn}
        sampleUrl={cancellationOfAdmissionSampleFile}
        fileCheckURL={cancellationOfAdmissionCheckFile}
        importURL={cancellationOfAdmissionImportFile}
        logApi={cancellationOfAdmissionLog}
        exportId={cancellationOfAdmissionExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Definition_CancellationOfAdmission_Export_r}
        exportLink={cancellationOfAdmissionExport}
        importAccess={enums.Definition_CancellationOfAdmission_Import_w}
        logAccess={enums.Definition_CancellationOfAdmission_Log_r}
        readPagingApi={cancellationOfAdmissionReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={cancellationOfAdmissionAccessList}
        favouriteApi={cancellationOfAdmissionFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Definition_CancellationOfAdmission_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_CancellationOfAdmission_Delete_w}
        editAccess={enums.Definition_CancellationOfAdmission_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={cancellationOfAdmissionGetOneRecord}
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

export default CancellationOfAdmission;
