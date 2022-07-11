import React, {
  useRef,
  useState,
} from "react";
import TableModal from "./TableModal/TableModal";
import {
  customerCreatePolicyBrowser,
  customerCreatePolicyIP,
  customerCreatePolicyLocation,
  customerCreatePolicyOs,
  customerDeletePolicyBrowser,
  customerDeletePolicyIP,
  customerDeletePolicyLocation,
  customerDeletePolicyOs,
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
  customerReadPolicyBrowser,
  customerReadPolicyIP,
  customerReadPolicyLocation,
  customerReadPolicyOs,
  customerUpdatePolicyBrowser,
  customerUpdatePolicyIP,
  customerUpdatePolicyLocation,
  customerUpdatePolicyOs,
} from "../../../../../services/customerGroupService";
import { toast } from "react-toastify";
import { t } from "i18next";
import CustomerGroupForm from "../CustomerGroupForm";
import { enums } from "../../../../../data/Enums";
import CustomTable from '../../../../../Components/Table/Table/CustomTable';
import useWindowSize from "../../../../../customHooks/useWindowSize";
import BrowserPolicyModal from "../../../../../Components/Table/browserPolicyModal/BrowserPolicyModal";
import IPpolicyModal from "../../../../../Components/Table/ipPolicyModal/IPpolicyModal";
import OsPolicyModal from "../../../../../Components/Table/osPolicyModal/OsPolicyModal";
import LocationPolicyModal from "../../../../../Components/Table/locationPolicyModal/LocationPolicyModal";
const CustomerGroup = () => {
  const filteredColumns = ["IsLimited", "Id", "Registrar", "SourceType"];

  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValues, setRowValues] = useState({});
  const [modalBrowserPolicy, setModalBrowserPolicy] = useState(false);
  const [modalIpPolicy, setModalIpPolicy] = useState(false);
  const [osModal, setOsModal] = useState(false);
  const [locationModal, setLocationModal] = useState(false)
  const childRef = useRef();

  const [mobileModal, setMobileModal] = useState(false);
  const [mobileModalButtons, setMobileModalButtons] = useState(false);
  const [mobileModalColumns, setMobileModalColumns] = useState(false);
  const widthOFScreen = useWindowSize().width;

  const addObject = {
    Component: CustomerGroupForm,
          path: "/Customer/Group/Create",
          title: "/Customer/Group/Create",
          access: enums.Customer_Group_Create_w,
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
  const handlePolicyBrowser = (id) => {
    setRowValues(id);
    setModalBrowserPolicy(true);
  };
  const handlePolicyIP=(id)=>{
    setRowValues(id)
   setModalIpPolicy(true)
  }
  const handlePolicyOs=(id)=>{
    setRowValues(id)
    setOsModal(true)
  }
  const handlePolicyLocation=(id)=>{
    setRowValues(id)
    setLocationModal(true)
  }
  return (
    <>
      {tableModalOpen && (
        <TableModal
          rowValues={rowValues}
          onHide={() => setTableModalOpen(false)}
          tableModalShow={tableModalOpen}
          updated={updated}
        />
      )}
       {modalBrowserPolicy && (
        <BrowserPolicyModal
          rowValues={rowValues}
          onHide={() => setModalBrowserPolicy(false)}
          show={modalBrowserPolicy}
          create={customerCreatePolicyBrowser}
          update={customerUpdatePolicyBrowser}
          read={customerReadPolicyBrowser}
          delete={customerDeletePolicyBrowser}
        />
      )}
    {modalIpPolicy && (
        <IPpolicyModal
          id={rowValues}
          onHide={() => setModalIpPolicy(false)}
          show={modalIpPolicy}
          create={customerCreatePolicyIP}
          update={customerUpdatePolicyIP}
          read={customerReadPolicyIP}
          delete={customerDeletePolicyIP}
        />
      )}
       {osModal && (
        <OsPolicyModal
          id={rowValues}
          onHide={() => setOsModal(false)}
          show={osModal}
          create={customerCreatePolicyOs}
          update={customerUpdatePolicyOs}
          read={customerReadPolicyOs}
          delete={customerDeletePolicyOs}
        />
      )}
      {locationModal &&(
        <LocationPolicyModal show={locationModal}    id={rowValues}
        onHide={() => setLocationModal(false)}
        create={customerCreatePolicyLocation}
        update={customerUpdatePolicyLocation}
        read={customerReadPolicyLocation}
        delete={customerDeletePolicyLocation}
        
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
        mobileModal={mobileModal}
        setMobileModal={setMobileModal}
        widthOFScreen={widthOFScreen}
        mobileModalButtons={mobileModalButtons}
        setMobileModalButtons={setMobileModalButtons}
        setMobileModalColumns={setMobileModalColumns}
        mobileModalColumns={mobileModalColumns}
        handlePolicyBrowser={handlePolicyBrowser}
        policyBrowserAccess={enums.Customer_Group_Create_w}
        handlePolicyIP={handlePolicyIP}
        policyIpAccess={enums.Customer_Group_Create_w}
        handlePolicyOs={handlePolicyOs}
        policyOsAccess={enums.Customer_Group_Create_w}
        handlePolicyLocation={handlePolicyLocation}
        policyLocationAccess={enums.Customer_Group_Create_w}
      />
    </>
  );
};

export default CustomerGroup;
