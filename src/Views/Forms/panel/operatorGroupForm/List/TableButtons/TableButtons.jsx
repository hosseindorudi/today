import React from 'react'
import './tableButtons.css'
import * as fa from 'react-icons/fa';

const TableButtons = ({rowValue, setTableModalOpen,setRowValues, setTableDeleteModalOpen}) => {
  return (
    
        <div className="widgetLgStatus">
        <button className="Approved widgetLgButton" onClick={()=> {console.log(rowValue);setTableModalOpen(true);setRowValues(rowValue)}}><fa.FaEdit/></button>
        <button className="Pending widgetLgButton"><fa.FaKey/></button>
        <button className="Declined widgetLgButton" onClick={()=>{setTableDeleteModalOpen(true);setRowValues(rowValue)}}><fa.FaTrash/></button>
        </div>
    
  )
}

export default TableButtons