import React from "react";
import { Offcanvas } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const LeftSideContainer = ({
  columnSideBar,
  setColumnSideBar,
  checkAllC,
  checkAllHandler,
  productsColumns,
  filteredColumns,
  unSelected,
  CheckBoxChangeHandler,
}) => {
  const {t}=useTranslation()

  
  return (
    <Offcanvas show={columnSideBar} onHide={()=>setColumnSideBar(false)} placement={"start"} name={"start"} responsive="sm">
    <Offcanvas.Header closeButton>
    </Offcanvas.Header>
    <Offcanvas.Body>
    <div className="checkBoxTableParentForAll">
            <div></div>
            <input
              type="radio"
              checked={checkAllC}
              id="checkAll"
              name="checkall"
              onChange={checkAllHandler}
            />
            <input
              type="radio"
              checked={!checkAllC}
              id="unCheckAll"
              name="checkall"
              onChange={checkAllHandler}
            />
            <div></div>
          </div>
          {productsColumns
            .filter((p, i) => !filteredColumns.includes(p["Header"]))
            .map((column, index) => (
              <div className="checkBoxTableParent" key={index}>
                <label htmlFor="todo" data-content="Get out of bed">
                  {t(column["Header"])}
                </label>
                <input
                  type="checkbox"
                  id="todo"
                  checked={unSelected.includes(column["Header"]) ? false : true}
                  name="todo"
                  value="todo"
                  onChange={(e) => CheckBoxChangeHandler(e, column["Header"])}
                />
              </div>
            ))}
    </Offcanvas.Body>
  </Offcanvas>
  );
};

export default LeftSideContainer;
