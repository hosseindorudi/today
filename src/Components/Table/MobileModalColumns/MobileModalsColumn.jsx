import { useTranslation } from 'react-i18next'
import './mobileModalsColumn.css'

const MobileModalsColumn = ({
    setMobileModalColumns,
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

    <div className="mobileModalsColumnmain">

        <div className="mainAllColumns">
            <h1 className="mobileModalColumnHeader">فیلتر ستون ها</h1>
        <div className="hiddenSectionCheck1">
        <div className="mainUnderCloseBtn">
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
        </div>
      </div>

        </div>
        <div className="mobileModalsColumnButton">
            <button className="btnMobileColumns" onClick={()=> setMobileModalColumns(false)}>بازگشت</button>
        </div>
    </div>
  )
}

export default MobileModalsColumn