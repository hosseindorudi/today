 
import React, {
  useRef,
  useState,
} from "react";
import TableModal from "./TableModal/TableModal";
import PartsDefine from "./partsDefine/PartsDefine";
import { enums } from "../../../../data/Enums";
import { PartAccessList, PartCheckFile, PartColumnInfo, PartDelete, PartExport, PartExportId, PartFavorite, PartGetOneRecord, PartImportArray, PartImportFile, PartLog, partRead, PartReadPaging, PartSampleFile, PartSetUnselectedColumn } from "../../../../services/partService";
import { t } from "i18next";
import { toast } from "react-toastify";
import useWindowSize from "../../../../customHooks/useWindowSize";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
const Parts = () => {
  const childRef = useRef();
  const filteredColumns = [
    "IsLimited",
    "Registrar",
    "Language_EId",
    "SourceType",
    "PartGroup_Id",
    "Quality_Id",
    "Color_Id"
  ];
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});
  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const widthOFScreen = useWindowSize().width
  const BcItems = [t("routes.basicDefinations"), t("/Definition/Part/Read")];

  const addObject = {
    Component: PartsDefine,
    title: "/Definition/Part/Write",
  path: "/Definition/Part/Write",
    access: enums.Definition_Part_Create_w,
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
        columnInfo={PartColumnInfo}
        importarray={PartImportArray}
        ref={childRef}
        ReadApi={partRead}
        deleteApi={PartDelete}
        unSelectedAPI={PartSetUnselectedColumn}
        sampleUrl={PartSampleFile}
        fileCheckURL={PartCheckFile}
        importURL={PartImportFile}
        logApi={PartLog}
        exportId={PartExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Definition_Part_Export_r}
        exportLink={PartExport}
        importAccess={enums.Definition_Part_Import_w}
        logAccess={enums.Definition_Part_Log_r}
        readPagingApi={PartReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={PartAccessList}
        favouriteApi={PartFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Definition_Part_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_Part_Delete_w}
        editAccess={enums.Definition_Part_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={PartGetOneRecord}
        setUpdate={setUpdate}
        mobileModal = {mobileModal}
        setMobileModal = {setMobileModal}
        widthOFScreen ={widthOFScreen}
        mobileModalButtons={mobileModalButtons}
        setMobileModalButtons={setMobileModalButtons}
        setMobileModalColumns={setMobileModalColumns}
        mobileModalColumns={mobileModalColumns}
        BcItems={BcItems}
      />
    </>
  );
};

export default Parts;
