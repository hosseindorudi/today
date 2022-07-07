import React, { useCallback, useContext, useEffect } from "react";
import "./tableButtons.css";
import * as fa from "react-icons/fa";
import * as gr from 'react-icons/gr'
import useAxios from "../../../customHooks/useAxios";
import useRequest from "../../../customHooks/useRequest";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import AppContext from "../../../contexts/AppContext";
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
  handleOperatorRole
}) => {
  const [response, loading, fetchData, setResponse] = useAxios();
  const { app } = useContext(AppContext);
  const request = useRequest();
  const { t } = useTranslation();
  const [haveAccess] = useButtonAccess();
  const handleResponse = useCallback((res) => {
    if (res.length) {
      return downloadCSVCode(res, app.title);
    } else {
      toast.info(t("noDataFound.table"), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [app.title,t]);

  const handleExport = () => {
    fetchData({
      method: "POST",
      url: exportLink,
      headers: {
        accept: "*/*",
      },
      data: {
        Request: request,
        Id: rowValue.Id,
      },
    });
  };

  useEffect(() => {
    if (response) {
      handleResponse(response);
      setResponse(undefined);
    }
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
      {haveAccess(changePasswordType)&&(
        <button className="Pending widgetLgButton" onClick={()=>handlePassEdit(rowValue.Id)}>
        <fa.FaLock />
      </button>
      )}
      {haveAccess(accessListType) && (
        <button className="Pending widgetLgButton" onClick={()=>handleClickGetPermission(rowValue.Id)}>
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
    </div>
  );
};

export default TableButtons;
