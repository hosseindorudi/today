import '../../../../../assets/css/table.css'
import React, {
  useRef,
  useState,
} from "react";
import TableModal from "./TableModal/TableModal";
import {
  customerGroupAccessList,
  customerGroupCheckFile,
  customerGroupDelete,
  customerGroupExport,
  customerGroupExportId,
  customerGroupFavorite,
  customerGroupGetOneRecord,
  customerGroupImport,
  customerGroupLog,
  customerGroupRead,
  customerGroupReadPaging,
  customerGroupSample,
  customerGroupSetUnselectedColumn,
} from "../../../../../services/customerGroupService";
import { toast } from "react-toastify";
import { t } from "i18next";
import CustomerGroupForm from "../CustomerGroupForm";
import { enums } from "../../../../../data/Enums";
import CustomTable from '../../../../../Components/Table/Table/CustomTable';
const CustomerGroup = () => {
  const childRef = useRef();
  const filteredColumns = ["IsLimited", "Id", "Registrar","Group_Id","Language_EId","SourceType"];
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});
  const addObject = {
    Component: CustomerGroupForm,
      path:'/customergroupform',
      title:"routes.groupForm",
      access:enums.Customer_Group_Create_w,
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
        ReadApi={customerGroupRead}
        deleteApi={customerGroupDelete}
        unSelectedAPI={customerGroupSetUnselectedColumn}
        sampleUrl={customerGroupSample}
        fileCheckURL={customerGroupCheckFile}
        importURL={customerGroupImport}
        logApi={customerGroupLog}
        exportId={customerGroupExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Customer_Group_Export_r}
        exportLink={customerGroupExport}
        importAccess={enums.Customer_Group_Import_w}
        logAccess={enums.Customer_Group_Log_r}
        readPagingApi={customerGroupReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={customerGroupAccessList}
        favouriteApi={customerGroupFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Customer_Group_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Customer_Group_Delete_w}
        editAccess={enums.Customer_Group_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={customerGroupGetOneRecord}
        setUpdate={setUpdate}
      />
    </>
  );
};

export default CustomerGroup;
