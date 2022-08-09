import { t } from "i18next";
import React from "react";
import { Form, Table } from "react-bootstrap";
import { useTable } from "react-table";

const styles = {
  table: {
    fontSize: 11,
    whiteSpace: "nowrap",
    textAlign: "center",
  },
  td: {
    display: "flex",
    justifyContent:"center"
  },
};

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  column: columns,
  updateMyData, // This is a custom function that we supplied to our table instance
  isEditable,
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);
  const onChange = (e) => {
    if(columns.Type==="DateTime"&&e.target.value==="")
    return setValue(null);
    
    setValue(e.target.value);
  };
  const createSelect = (titles, value) => {
    return (
      <select
        value={value}
        aria-label="Default select"
        onChange={handleChangeSelect}
      >
        <option hidden>{t("selectAnOption")}</option>
        {titles.map((t) => (
          <option value={t.Id}>{t.Value}</option>
        ))}
      </select>
    );
  };
  const handleChangeSelect = (e) => {
    const val = e.target.value;
    updateMyData(index, id, val);
  };
  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };
  const checkDate=()=>{
    if(value==="")
    return  updateMyData(index, id, null);
    return value
  }
  const checkBoolean=()=>{
    if(typeof value !=="boolean")
    return  updateMyData(index, id, value.toLowerCase()==="true"?true:false);

    return typeof value==="boolean"?value:value.toLowerCase()==="true"?true:false
  }
  const handleChangeSwitch=(e)=>{
    const val = e.target.checked;
    updateMyData(index, id, val);
  }
  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return isEditable ? (
    columns.Type && columns.Type === "bool" ? (
      <Form.Check type="switch"  checked={checkBoolean()} onChange={handleChangeSwitch}/>
    ):columns.Type==="DateTime"?(<input value={checkDate()} onChange={onChange} onBlur={onBlur} />) : (
      <div style={styles.td}>
        <input value={value} onChange={onChange} onBlur={onBlur} />
        {columns.Parent && createSelect(columns.ParentTitle, value)}
      </div>
    )
  ) : (
    value
  );
};

const defaultPropGetter = () => ({});
const defaultColumn = {
  Cell: EditableCell,
};
const ReactTable = ({
  columns,
  data,
  getCellProps = defaultPropGetter,
  updateMyData,
  isEditable,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      defaultColumn,
      updateMyData,
      isEditable,
    });

  return (
    <Table style={styles.table} responsive {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps([
                    {
                      className: cell.column.className,
                      style: cell.column.style,
                    },
                    getCellProps(cell),
                  ])}
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ReactTable;
