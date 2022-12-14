import React, { useRef, useState } from "react";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import TableModal from "./tableModal/TableModal";
import { t } from "i18next";
import {
  ColorRead,
  ColorReadPaging,
  ColorGetOneRecord,
  ColorDelete,
  ColorFavorite,
  ColorExportId,
  ColorExport,
  ColorSampleFile,
  ColorCheckFile,
  ColorImportFile,
  ColorLog,
  ColorSetUnselectedColumn,
  ColorAccessList,
  ColorColumnInfo,
  ColorImportArray,
} from "../../../../services/colorService";
import { enums } from "../../../../data/Enums";
import { toast } from "react-toastify";
import useWindowSize from "../../../../customHooks/useWindowSize";
import ColorForm from "./colorForm/ColorForm";

const ColorList = () => {
  const filteredColumns = ["IsLimited", "Registrar", "SourceType",
  "SafeMode"];
  const BcItems = [t("routes.basicDefinations"), t("/Definition/Color/Read")];

  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});

  const childRef = useRef();

  const [mobileModal, setMobileModal] = useState(false);
  const [mobileModalButtons, setMobileModalButtons] = useState(false);
  const [mobileModalColumns, setMobileModalColumns] = useState(false);
  const widthOFScreen = useWindowSize().width;

  const addObject = {
    Component: ColorForm,
    path: "/Definition/Color/Write",
    title: "/Definition/Color/Write",
    access: enums.Definition_Color_Create_w,
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
        columnInfo={ColorColumnInfo}
        importarray={ColorImportArray}
        ref={childRef}
        ReadApi={ColorRead}
        deleteApi={ColorDelete}
        unSelectedAPI={ColorSetUnselectedColumn}
        sampleUrl={ColorSampleFile}
        fileCheckURL={ColorCheckFile}
        importURL={ColorImportFile}
        logApi={ColorLog}
        exportId={ColorExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Definition_Color_Export_r}
        exportLink={ColorExport}
        importAccess={enums.Definition_Color_Import_w}
        logAccess={enums.Definition_Color_Log_r}
        readPagingApi={ColorReadPaging}
        accessListAccess={enums.Definition_Color_Read_r}
        accessListApi={ColorAccessList}
        favouriteApi={ColorFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Definition_Color_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_Color_Delete_w}
        editAccess={enums.Definition_Color_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={ColorGetOneRecord}
        setUpdate={setUpdate}
        mobileModal={mobileModal}
        setMobileModal={setMobileModal}
        widthOFScreen={widthOFScreen}
        mobileModalButtons={mobileModalButtons}
        setMobileModalButtons={setMobileModalButtons}
        setMobileModalColumns={setMobileModalColumns}
        mobileModalColumns={mobileModalColumns}
        BcItems = {BcItems}
      />
    </>
  );
};

export default ColorList;
