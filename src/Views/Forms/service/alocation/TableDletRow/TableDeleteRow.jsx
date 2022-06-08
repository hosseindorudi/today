import React from 'react'
import './tableDeleteRow.css'

const TableDeleteRow = ({rowValus,setTableDeleteModalOpen}) => {
    {console.log(rowValus)}
    return (
  
    <div className="tableModalParebtDelete" >
        <div className="tableModalContainerDelete">
            <div className="tableModalHeaderDelete">
              <h1 className="tableModalHeadingDelete">حذف</h1>
            </div>
            <button className="closeBtnDelete" onClick={()=>setTableDeleteModalOpen(false)}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
            <div className="tableModalContentDelete">
            <h2>آیا میخواهید سطر مربوط به {rowValus.first_name} با آی دی {rowValus.id}  را حذف کنید؟</h2>
              <form action="" className='tableModalFormDelete'>
                
                <div className="submitBTNDivDelete">
                  <input type="submit" value="حذف" className='tableModalSumitBtnDelete'/>
                </div>
              </form>
            </div>
        </div>
    </div>
  )
}

export default TableDeleteRow