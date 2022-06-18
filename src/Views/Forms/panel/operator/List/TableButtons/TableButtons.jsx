import React, { useCallback, useContext, useEffect } from "react";
import "./tableButtons.css";
import * as fa from "react-icons/fa";
import { groupExportId } from "../../../../../../services/groupService";
import { exportId } from "../../../../../../services/operatorService";
import useAxios from "../../../../../../customHooks/useAxios";
import useRequest from "../../../../../../customHooks/useRequest";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import AppContext from "../../../../../../contexts/AppContext";
import { downloadCSVCode } from "../../../../../../validation/functions";
import useButtonAccess from "../../../../../../customHooks/useButtonAccess";

const TableButtons = ({
  rowValue,
  deleteCalled,
  handleClickEdit,
  handlePassEdit,
  deleteType,
  editType,
  exportType,
  accessListType,
  handleClickGetPermission,
  changePassword,
  exportTypeOperator,
  editTypeOperator,
  deleteTypeOperator
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
  }, []);

 
  const handleExportOperator = () => {
    fetchData({
      method: "POST",
      url: exportId,
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
      
      {haveAccess(exportTypeOperator) && (
        <button
          title="exportCSV"
          className="Approved widgetLgButton"
          onClick={handleExportOperator}
          disabled={loading}
        >
          <fa.FaFileCsv />
        </button>
      )}
      
      {haveAccess(editTypeOperator) && (
        <button
          className="Approved widgetLgButton"
          onClick={() => handleClickEdit(rowValue.Id)}
          title="edit"
        >
          <fa.FaEdit />
        </button>
      )}
      
      {haveAccess(changePassword) && (
        <button className="Pending widgetLgButton" onClick={() => handlePassEdit(rowValue.Id)}>
          <fa.FaKey />
        </button>
      )}
      
      {haveAccess(deleteTypeOperator) && (
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
    </div>
  );
};

export default TableButtons;
