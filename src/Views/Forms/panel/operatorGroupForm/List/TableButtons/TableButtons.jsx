import React, { useCallback, useEffect } from 'react'
import './tableButtons.css'
import * as fa from 'react-icons/fa';
import { groupExport } from '../../../../../../services/groupService';
import useAxios from '../../../../../../customHooks/useAxios';
import useRequest from '../../../../../../customHooks/useRequest';

const TableButtons = ({rowValue, deleteCalled,handleClickEdit}) => {
  const [response, loading, fetchData] = useAxios();
  const request=useRequest()
  

  const handleResponse=useCallback(
    (res) => {
      console.log(res)
    },
    [],
  )

  const handleExport=()=>{
  
  // let csvContent = "data:text/csv;charset=utf-8," 
  //     + rows.map(e => e.join(",")).join("\n");
  //     console.log(csvContent)
    fetchData({
      method: "POST",
      url: groupExport,
      headers: {
        accept: "*/*",
      },
      data: {
        Request: request,
        Id: rowValue.Id,
      }
    });
    }
  
    useEffect(() => {
      if (response) {
        handleResponse(response)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response, handleResponse]);
  return (
    
        <div className="widgetLgStatus">
        <button title='exportCSV' className="Approved widgetLgButton" onClick={handleExport} disabled={loading}><fa.FaFileCsv/></button>
        <button className="Approved widgetLgButton" onClick={()=> handleClickEdit(rowValue.Id)}><fa.FaEdit/></button>
        <button className="Pending widgetLgButton"><fa.FaKey/></button>
        <button className="Declined widgetLgButton" onClick={()=>{deleteCalled(rowValue.Id)}}><fa.FaTrash/></button>
        </div>
    
  )
}

export default TableButtons