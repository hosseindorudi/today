
import React, {
  useRef, useState,
} from "react";
import { t } from "i18next";
import { enums } from '../../../../data/Enums';
import CustomTable from '../../../../Components/Table/Table/CustomTable';
import useWindowSize from '../../../../customHooks/useWindowSize';
import { bruteForceCustomerAccessList, bruteForceCustomerDelete, bruteForceCustomerExportId, bruteForceCustomerFavorite, bruteForceCustomerLog, bruteForceCustomerRead, bruteForceCustomerReadPaging, bruteForceCustomerSetUnselectedColumn } from "../../../../services/bruteForceCustomer";
const BruteForceCustomer = () => {
  const childRef = useRef();
  const filteredColumns = ["IsLimited", "Id", "Registrar","Group_Id","Language_EId","SourceType",
  "SafeMode"];
  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const widthOFScreen = useWindowSize().width
  const BcItems = [t("/Customer/Customer/Read"), t("/Customer/BruteForce/Read")];



  const handleClickHelp = () => {
    window.open("https://www.google.com");
  };

  return (
    <>

      <CustomTable
        ref={childRef}
        BcItems={BcItems}
        ReadApi={bruteForceCustomerRead}
        deleteApi={bruteForceCustomerDelete}
        unSelectedAPI={bruteForceCustomerSetUnselectedColumn}
        sampleUrl={""}
        fileCheckURL={""}
        importURL={""}
        logApi={bruteForceCustomerLog}
        exportId={bruteForceCustomerExportId}
        changePasswordURL={""}
        addObject={""}
        exportAccess={enums.Customer_BruteForce_Export_r}
        exportLink={bruteForceCustomerExportId}
        importAccess={""}
        logAccess={enums.Customer_BruteForce_Log_r}
        readPagingApi={bruteForceCustomerReadPaging}
        accessListAccess={enums.Customer_BruteForce_Read_r}
        accessListApi={bruteForceCustomerAccessList}
        favouriteApi={bruteForceCustomerFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={""}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Customer_BruteForce_Delete_w}
        editAccess={""}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={""}
        setUpdate={""}
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
}

export default BruteForceCustomer