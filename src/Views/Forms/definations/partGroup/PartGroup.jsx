 
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
import { partGroupRead,partGroupAccessList, partGroupCheckFile, partGroupDelete, partGroupExport, partGroupExportId, partGroupFavorite, partGroupGetOneRecord, partGroupImportFile, partGroupLog, partGroupReadPaging, partGroupSampleFile, partGroupSetUnselectedColumn } from "../../../../services/partGroup";
import PartGroupDefine from "./partGroupDefine/PartGroupDefine";
const PartGroup = () => {
  const childRef = useRef();
  const filteredColumns = [
    "IsLimited",
    "Id",
    "Registrar",
    "Language_EId",
    "SourceType",
    "PartGroup_Id",
    "Quality_Id",
    
  ];
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});
  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const widthOFScreen = useWindowSize().width

  const addObject = {
    Component: PartGroupDefine,
          path: "/Definition/PartGroup/Write",
          title: "/Definition/PartGroup/Write",
          access: enums.Definition_PartGroup_Create_w,
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
        ReadApi={partGroupRead}
        deleteApi={partGroupDelete}
        unSelectedAPI={partGroupSetUnselectedColumn}
        sampleUrl={partGroupSampleFile}
        fileCheckURL={partGroupCheckFile}
        importURL={partGroupImportFile}
        logApi={partGroupLog}
        exportId={partGroupExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Definition_PartGroup_Export_r}
        exportLink={partGroupExport}
        importAccess={enums.Definition_PartGroup_Import_w}
        logAccess={enums.Definition_PartGroup_Log_r}
        readPagingApi={partGroupReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={partGroupAccessList}
        favouriteApi={partGroupFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Definition_PartGroup_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_PartGroup_Delete_w}
        editAccess={enums.Definition_PartGroup_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={partGroupGetOneRecord}
        setUpdate={setUpdate}
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
};

export default PartGroup;
