 
import React, { useRef, useState } from "react";
import TableModal from "./TableModal/TableModal";
import { enums } from "../../../../data/Enums";
import { t } from "i18next";
import { toast } from "react-toastify";
import useWindowSize from "../../../../customHooks/useWindowSize";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import ReplacementTypeDefine from "./replacementTypeDefine/ReplacementTypeDefine";
import {
  replacementTypeAccessList,
  replacementTypeCheckFile,
  replacementTypeDelete,
  replacementTypeExport,
  replacementTypeExportId,
  replacementTypeGetOneRecord,
  replacementTypeImport,
  replacementTypeLog,
  replacementTypeRead,
  replacementTypeReadPaging,
  replacementTypeSampleFile,
  replacementTypeSetToFavorite,
  replacementTypeSetUnselectedColumn,
} from "../../../../services/replacementTypeService";

const ReplacementType = () => {
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

  const addObject = {
    Component: ReplacementTypeDefine,
    path: "/Definition/ReplacementType/Write",
    title: "/Definition/ReplacementType/Write",
    access: enums.Definition_ReplacementType_Create_w,
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
        ReadApi={replacementTypeRead}
        deleteApi={replacementTypeDelete}
        unSelectedAPI={replacementTypeSetUnselectedColumn}
        sampleUrl={replacementTypeSampleFile}
        fileCheckURL={replacementTypeCheckFile}
        importURL={replacementTypeImport}
        logApi={replacementTypeLog}
        exportId={replacementTypeExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Definition_ReplacementType_Export_r}
        exportLink={replacementTypeExport}
        importAccess={enums.Definition_ReplacementType_Import_w}
        logAccess={enums.Definition_ReplacementType_Log_r}
        readPagingApi={replacementTypeReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={replacementTypeAccessList}
        favouriteApi={replacementTypeSetToFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Definition_ReplacementType_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_ReplacementType_Delete_w}
        editAccess={enums.Definition_ReplacementType_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={replacementTypeGetOneRecord}
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

export default ReplacementType;
