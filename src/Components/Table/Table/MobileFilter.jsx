import React from 'react'
import { Offcanvas } from 'react-bootstrap'
import TableFilter from './TableFilter'

const MobileFilter = ({mobileFilter,setMobileFilter,filteres,filterObj,setfilterObj,handleClearFilter,handleClickSendFilter}) => {
  return (
    <Offcanvas
      show={mobileFilter}
      onHide={() => setMobileFilter(false)}
      placement={"end"}
      name={"end"}
      responsive="sm"
    >
      <Offcanvas.Header closeButton>
      </Offcanvas.Header>
      <Offcanvas.Body>
      <TableFilter
              filteres={filteres}
              filterObj={filterObj}
              setfilterObj={setfilterObj}
              handleClearFilter={handleClearFilter}
              handleClickSendFilter={()=>{handleClickSendFilter();setMobileFilter(false)}}
              />
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default MobileFilter