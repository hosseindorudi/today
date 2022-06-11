import { Pagination } from '@mui/material'
import React from 'react'

const TableBottom = (props) => {
  const [page, setPage] = React.useState("");

  const handleChangeSelect=(event)=>{
    props.handleChangeSelect(event.target.value)

  }
  const handleChange = (event, value) => {
    setPage(value)
    props.setPage(value);
  };
  return (
    <div className="reacttableParentDown">
    <div className="downPaginationMain">
    <div className="page">
    <Pagination page={page}  onChange={handleChange} count={props.totalPages} />
    </div>
      {/* <ul className="page">
        <li className="page__btn">
          <button className="material-icons downPaginationBTN">
            &laquo;
          </button>
        </li>
       
        <li className="page__numbers"> 1</li>
        <li className="page__numbers active">2</li>
        <li className="page__numbers">3</li>
        <li className="page__numbers">4</li>
        <li className="page__numbers">5</li>
        <li className="page__numbers">6</li>
        <li className="page__dots">...</li>
        <li className="page__numbers"> 10</li>
        <li className="page__btn">
          <button className="material-icons downPaginationBTN">
            &raquo;
          </button>
        </li>
      </ul> */}
    </div>
    <div className="downpaginationButtins">
      <input
        type="number"
        className="pageNumber"
        placeholder="شماره صفحه "
        min={1}
        max={props.totalPages}
        value={props.currentPage}
        
      />
      <select className="paginationSelector" value={props.numberOfRecordsPerPage} onChange={handleChangeSelect}>
        {[25, 50, 100].map((v, i) => (
          <option key={i} value={v}>
            {v}
          </option>
        ))}
      </select>
      <button className="sendForm">ارسال</button>
    </div>
  </div>

  )
}

export default TableBottom