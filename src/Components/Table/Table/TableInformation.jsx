import React from 'react'
import { useTranslation } from 'react-i18next';
import * as fa from "react-icons/fa";
const TableInformation = ({totalRecord,sortedBy,isAssending}) => {
    const {t}=useTranslation()
  return (
    <div className='informationWrapper'>
      <span className="sort">{totalRecord === 0 ? (
                ""
              ) : isAssending ? (
                <fa.FaLongArrowAltUp />
              ) : (
                <fa.FaLongArrowAltDown />
              )}</span>
        <div className='verticalLine'></div>
      <span className="sortBy">{totalRecord === 0 ? "" : t(sortedBy)}</span>
      <div className='verticalLine'></div>
      <span className="totalRecord">{totalRecord}</span>
    </div>
  )
}

export default TableInformation