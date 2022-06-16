import { t } from 'i18next';
import React, { useEffect } from 'react'
import * as cg from "react-icons/cg";
import useAxios from '../../../customHooks/useAxios';
import useRequest from '../../../customHooks/useRequest';
import { exportFile } from '../../../services/operatorService';
import { downloadCSVCode, setDatePickerDate } from '../../../validation/functions';
import { toast } from "react-toastify";
const ExportButtonOperator = (props) => {
    const [response, loading, fetchData,setResponse] = useAxios();
    const request=useRequest()
    const abortController = new AbortController();
    const handleExport = () => {
        const paging = {
          NumberOfRecordPerPage: props.numberOfRecordsPerPage,
          CurrentPage: props.currentPage,
          TotalPage:0,
          TotalRecord:0,
          IsAscending: props.sort.IsAscending,
          SortBy: props.sort.SortBy,
        };
        fetchData({
          method: "POST",
          url: exportFile,
          headers: {
            accept: "*/*",
          },
          data:{
            Request: request,
            paging: paging,
            filter: {
              Flt_OperatorName: props.flt_Title,
              Flt_FromDate: props.seartBegin ? setDatePickerDate(props.seartBegin) : null,
              Flt_ToDate: props.seartEnd ? setDatePickerDate(props.seartEnd) : null,
            },
          },
          signal: abortController.signal,
        });
    
      };
      const noFileToast = () => {
        toast.info(t("noDataFound.table"), {
          position: toast.POSITION.TOP_CENTER,
        });
      };
      const handleDownload=(res)=>{
        setResponse(undefined)
            downloadCSVCode(res,t("exportGroup"))
      }
      useEffect(() => {
        if (response) {
            response.length ? handleDownload(response) : noFileToast();
          
          }
          return () => abortController.abort();
      }, [response])
  return (
    <button
    disabled={loading}
    className="reactTableParentExportButton"
    title="exportCSV"
    onClick={handleExport}
  >
    <cg.CgExport />
  </button>
  )
}

export default ExportButtonOperator