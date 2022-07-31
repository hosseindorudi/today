import React, { useCallback, useEffect } from "react";
import "./tableButtons.css";
import * as fa from "react-icons/fa";
import * as gr from "react-icons/gr";
import useAxios from "../../../customHooks/useAxios";
import useRequest from "../../../customHooks/useRequest";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { downloadCSVCode } from "../../../validation/functions";
import useButtonAccess from "../../../customHooks/useButtonAccess";

const TableButtons = ({
  rowValue,
  exportLink,
  deleteCalled,
  handleClickEdit,
  deleteType,
  editType,
  exportType,
  accessListType,
  handleClickGetPermission,
  changePasswordType,
  handlePassEdit,
  handleAddQuestion,
  addAccess,
  handleCreateRate,
  rateAccess,
  handleReadAnswers,
  readAnswersAccess,
  handlePolicyBrowser,
  policyBrowserAccess,
  operatorRoleAccess,
  handleOperatorRole,
  policyOsAccess,
  handlePolicyOs,
  policyLocationAccess,
  handlePolicyLocation,
  policyIpAccess,
  handlePolicyIP,
  handleAddress,
  addressAccess,
  addOperatorAccess,
  addOperator,
  handlePhone,
  phoneAccess,
  handleMobile,
  mobileAccess,
  handleAccount,
  accountAccess,
}) => {
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();
  const { t } = useTranslation();
  const [haveAccess] = useButtonAccess();
  const handleResponse = useCallback(
    (res) => {
      if(res.Content && res.Content.length>0){
        return downloadCSVCode(res.Content,res.Name)
      }
      return noFileToast()
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const noFileToast = () => {
    
    toast.info(t("noDataFound.table"), {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const handleExport = () => {
    fetchData({
      method: "POST",
      url: exportLink,
      headers: request,
      data: {
        Id: rowValue.Id,
      },
    });
  };

  useEffect(() => {
    response && handleResponse(response);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, handleResponse]);
  return (
    <div className="widgetLgStatus">
      {haveAccess(exportType) && (
        <button
          title="exportCSV"
          className="Approved widgetLgButton"
          onClick={handleExport}
          disabled={loading}
        >
          <fa.FaFileCsv />
        </button>
      )}
      {haveAccess(editType) && (
        <button
          className="Approved widgetLgButton"
          onClick={() => handleClickEdit(rowValue.Id)}
          title="edit"
        >
          <fa.FaEdit />
        </button>
      )}
      {haveAccess(changePasswordType) && (
        <button
          className="Pending widgetLgButton"
          onClick={() => handlePassEdit(rowValue.Id)}
        >
          <fa.FaLock />
        </button>
      )}
      {haveAccess(accessListType) && (
        <button
          className="Pending widgetLgButton"
          onClick={() => handleClickGetPermission(rowValue.Id)}
        >
          <fa.FaKey />
        </button>
      )}
      {haveAccess(deleteType) && (
        <button
          title="delete"
          className="Declined widgetLgButton"
          onClick={() => {
            deleteCalled(rowValue.Id);
          }}
        >
          <fa.FaTrash />
        </button>
      )}
      {haveAccess(addAccess) && (
        <button
          title={t("Add-Question")}
          className="Pending widgetLgButton"
          onClick={() => {
            handleAddQuestion(rowValue.Id);
          }}
        >
          <fa.FaPlusCircle />
        </button>
      )}
      {haveAccess(rateAccess) && (
        <button
          title={t("createRate")}
          className="Pending widgetLgButton"
          onClick={() => {
            handleCreateRate(rowValue.Id);
          }}
        >
          <fa.FaDollarSign />
        </button>
      )}
      {haveAccess(readAnswersAccess) && (
        <button
          title={t("readAnswer")}
          className="Pending widgetLgButton"
          onClick={() => {
            handleReadAnswers(rowValue.Id);
          }}
        >
          <fa.FaBookReader />
        </button>
      )}
      {haveAccess(policyBrowserAccess) && (
        <button
          title={t("policyBrowser")}
          className="Pending widgetLgButton"
          onClick={() => {
            handlePolicyBrowser(rowValue.Id);
          }}
        >
          <fa.FaFirefoxBrowser />
        </button>
      )}
      {haveAccess(policyIpAccess) && (
        <button
          title={t("policyIpAccess")}
          className="Pending widgetLgButton"
          onClick={() => {
            handlePolicyIP(rowValue.Id);
          }}
        >
          <fa.FaInternetExplorer />
        </button>
      )}
      {haveAccess(policyLocationAccess) && (
        <button
          title={t("policyLocationAccess")}
          className="Pending widgetLgButton"
          onClick={() => {
            handlePolicyLocation(rowValue.Id);
          }}
        >
          <gr.GrMapLocation />
        </button>
      )}
      {haveAccess(policyOsAccess) && (
        <button
          title={t("policyOsAccess")}
          className="Pending widgetLgButton"
          onClick={() => {
            handlePolicyOs(rowValue.Id);
          }}
        >
          <fa.FaWindows />
        </button>
      )}
      {haveAccess(operatorRoleAccess) && (
        <button
          title={t("OperatorRole")}
          className="Pending widgetLgButton"
          onClick={() => {
            handleOperatorRole(rowValue.Id);
          }}
        >
          <gr.GrUserSettings />
        </button>
      )}
      {haveAccess(addressAccess) && (
        <button
          title={t("addAddress")}
          className="Pending widgetLgButton"
          onClick={() => {
            handleAddress(rowValue.Id);
          }}
        >
          <fa.FaMap />
        </button>
      )}
      {haveAccess(mobileAccess) && (
        <button
          title={t("Mobile")}
          className="Pending widgetLgButton"
          onClick={() => {
            handleMobile(rowValue.Id);
          }}
        >
          <fa.FaMobileAlt />
        </button>
      )}
      {haveAccess(phoneAccess) && (
        <button
          title={t("Phone")}
          className="Pending widgetLgButton"
          onClick={() => {
            handlePhone(rowValue.Id);
          }}
        >
          <fa.FaPhoneAlt />
        </button>
      )}
      {haveAccess(accountAccess) && (
        <button
          title={t("bankAccount")}
          className="Pending widgetLgButton"
          onClick={() => {
            handleAccount(rowValue.Id);
          }}
        >
          <fa.FaMoneyCheckAlt />
        </button>
      )}
      {haveAccess(addOperatorAccess) && (
        <button
          title={t("addOperator")}
          className="Pending widgetLgButton"
          onClick={() => {
            addOperator(rowValue.Id);
          }}
        >
          <fa.FaUserPlus />
        </button>
      )}
    </div>
  );
};

export default TableButtons;
