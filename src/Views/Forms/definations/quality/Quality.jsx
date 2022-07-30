 
import React, {
  useRef,
  useState,
} from "react";
import TableModal from "./TableModal/TableModal";
import { enums } from "../../../../data/Enums";
import { t } from "i18next";
import { toast } from "react-toastify";
import useWindowSize from "../../../../customHooks/useWindowSize";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import { qualityAccessList, qualityCheckFile, qualityDelete, qualityExport, qualityExportId, qualityFavorite, qualityGetOneRecord, qualityImportFile, qualityLog, qualityRead, qualityReadPaging, qualitySampleFile, qualitySetUnselectedColumn } from "../../../../services/qualityService";
import QualityDefine from "./qualityDefine/QualityDefine";
const Quality = () => {
  const childRef = useRef();
  const filteredColumns = [
    "IsLimited",
    "Registrar",
    "Language_EId",
    "SourceType",

    
  ];
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});
  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const widthOFScreen = useWindowSize().width
  const BcItems = [t("routes.basicDefinations"), t("/Definition/Quality/Read")];

  const addObject = {
    Component: QualityDefine,
    path: "/Definition/Quality/Write",
    title: "/Definition/Quality/Write",
    access: enums.Definition_Quality_Create_w,
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
        ReadApi={qualityRead}
        deleteApi={qualityDelete}
        unSelectedAPI={qualitySetUnselectedColumn}
        sampleUrl={qualitySampleFile}
        fileCheckURL={qualityCheckFile}
        importURL={qualityImportFile}
        logApi={qualityLog}
        exportId={qualityExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Definition_Quality_Export_r}
        exportLink={qualityExport}
        importAccess={enums.Definition_Quality_Import_w}
        logAccess={enums.Definition_Quality_Log_r}
        readPagingApi={qualityReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={qualityAccessList}
        favouriteApi={qualityFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Definition_Quality_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_Quality_Delete_w}
        editAccess={enums.Definition_Quality_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={qualityGetOneRecord}
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

export default Quality;
