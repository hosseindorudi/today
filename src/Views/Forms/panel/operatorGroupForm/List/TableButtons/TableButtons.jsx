import React from 'react'
import './tableButtons.css'
import * as fa from 'react-icons/fa';

const TableButtons = ({rowValue, deleteCalled,handleClickEdit}) => {
  return (
    
        <div className="widgetLgStatus">
        <button className="Approved widgetLgButton" onClick={()=> handleClickEdit(rowValue.Id)}><fa.FaEdit/></button>
        <button className="Pending widgetLgButton"><fa.FaKey/></button>
        <button className="Declined widgetLgButton" onClick={()=>{deleteCalled(rowValue.Id)}}><fa.FaTrash/></button>
        </div>
    
  )
}

export default TableButtons