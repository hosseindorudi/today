 
import React, { useRef, useState } from "react";
import TableModal from "./TableModal/TableModal";
import { enums } from "../../../../data/Enums";
import { t } from "i18next";
import { toast } from "react-toastify";
import useWindowSize from "../../../../customHooks/useWindowSize";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import SectionDefine from "./sectionDefine/SectionDefine";
import { sectionAccessList, sectionCheckFile, SectionColumnInfo, sectionDelete, sectionExport, sectionExportId, sectionGetOneRecord, sectionImport, SectionImportArray, sectionLog, sectionRead, sectionReadPaging, sectionSampleFile, sectionSetToFavorite, sectionSetUnselectedColumn } from "../../../../services/sectionService";

const Section = () => {
  const childRef = useRef();
  const filteredColumns = [
    "IsLimited",
    "Registrar",
    "Language_EId",
    "SourceType",
    "City_Id",
    "SafeMode"
  ];
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});
  const [mobileModal, setMobileModal] = useState(false);
  const [mobileModalButtons, setMobileModalButtons] = useState(false);
  const [mobileModalColumns, setMobileModalColumns] = useState(false);
  const widthOFScreen = useWindowSize().width;
  const BcItems = [t("routes.basicDefinations"), t("/Definition/Section/Read")];

  const addObject = {
    Component: SectionDefine,
    path: "/Definition/Section/Write",
    title: "/Definition/Section/Write",
    access: enums.Definition_Section_Create_w,
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
        columnInfo={SectionColumnInfo}
        importarray={SectionImportArray}
        ref={childRef}
        ReadApi={sectionRead}
        deleteApi={sectionDelete}
        unSelectedAPI={sectionSetUnselectedColumn}
        sampleUrl={sectionSampleFile}
        fileCheckURL={sectionCheckFile}
        importURL={sectionImport}
        logApi={sectionLog}
        exportId={sectionExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Definition_Section_Export_r}
        exportLink={sectionExport}
        importAccess={enums.Definition_Section_Import_w}
        logAccess={enums.Definition_Section_Log_r}
        readPagingApi={sectionReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={sectionAccessList}
        favouriteApi={sectionSetToFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Definition_Section_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_Section_Delete_w}
        editAccess={enums.Definition_Section_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={sectionGetOneRecord}
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

export default Section;
