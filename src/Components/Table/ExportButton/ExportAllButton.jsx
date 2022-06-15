import { t } from 'i18next';
import React, { useEffect } from 'react'
import * as cg from "react-icons/cg";
import useAxios from '../../../customHooks/useAxios';
import useRequest from '../../../customHooks/useRequest';
import { groupExport } from '../../../services/groupService';
import { downloadCSVCode, setDatePickerDate } from '../../../validation/functions';
import { toast } from "react-toastify";
const ExportAllButton = (props) => {
    const [response, loading, fetchData,setResponse] = useAxios();
    const request=useRequest()
    const abortController = new AbortController();
    const handleExport = () => {
        const paging = {
          NumberOfRecordsPerPage: props.numberOfRecordsPerPage,
          CurrentPage: props.currentPage,
          IsAscending: props.sort.IsAscending,
          SortBy: props.sort.SortBy,
        };
        fetchData({
          method: "POST",
          url: groupExport,
          headers: {
            accept: "*/*",
          },
          data:{
            Request: request,
            paging: paging,
            filter: {
              flt_Title: props.flt_Title,
              flt_FromDate: props.seartBegin ? setDatePickerDate(props.seartBegin) : null,
              flt_ToDate: props.seartEnd ? setDatePickerDate(props.seartEnd) : null,
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

export default ExportAllButton