import '../../../../../assets/css/table.css'
import React, {

  useRef,
  useState,
} from "react";
import TableModal from "./TableModal/TableModal";
import {
  groupAccessList,
  groupCheckFile,
  groupDelete,
  groupExport,
  groupExportId,
  groupFavorite,
  groupGetOneRecord,
  groupGetPermission,
  groupImportFile,
  groupLog,
  groupRead,
  groupReadPaging,
  groupSampleFile,
  groupSetPermission,
  groupSetUnselectedColumn,
} from "../../../../../services/groupService";
import { toast } from "react-toastify";
import { t } from "i18next";
import OperatorGroupForm from "../OperatorGroupForm";
import { enums } from "../../../../../data/Enums";
import CustomTable from '../../../../../Components/Table/Table/CustomTable';
const Group = () => {
  const childRef = useRef();
  const filteredColumns = ["IsLimited", "Id", "Registrar","SourceType"];
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});
  const addObject = {
    Component: OperatorGroupForm,
    path: "/operatorgroupcreate",
    title: "routes.groupForm",
    access: enums.Operator_Group_Create_w,
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
        ReadApi={groupRead}
        getPermissionURL={groupGetPermission}
        setPermissionURL={groupSetPermission}
        deleteApi={groupDelete}
        unSelectedAPI={groupSetUnselectedColumn}
        sampleUrl={groupSampleFile}
        fileCheckURL={groupCheckFile}
        importURL={groupImportFile}
        logApi={groupLog}
        exportId={groupExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Operator_Group_Export_r}
        exportLink={groupExport}
        importAccess={enums.Operator_Group_Import_w}
        logAccess={enums.Operator_Group_Log_r}
        readPagingApi={groupReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={groupAccessList}
        favouriteApi={groupFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Operator_Group_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Operator_Group_Delete_w}
        editAccess={enums.Operator_Group_Update_w}
        permissionsAccess={enums.Operator_Group_Permission_w}
        changePasswordAccess={""}
        getOneRecord={groupGetOneRecord}
        setUpdate={setUpdate}
      />
      </>
  );
};

export default Group;
