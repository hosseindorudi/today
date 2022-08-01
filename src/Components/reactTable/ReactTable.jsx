import React from 'react'
import { Form, Table } from 'react-bootstrap';
import { useTable } from "react-table";
import { CustomReactMultiSelect } from '../Select/customReactSelect';
const styles = {
    table: {
      fontSize: 11,
      whiteSpace: "nowrap",
      textAlign: "center",
    },
    td:{
      display:"flex",
     
    }
  };


  const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
    isEditable
  }) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)
  
    const onChange = e => {
      setValue(e.target.value)
    }
  
    // We'll only update the external data when the input is blurred
    const onBlur = () => {
      updateMyData(index, id, value)
    }
  
    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
  
    return isEditable?<div style={styles.td}><input value={value} onChange={onChange} onBlur={onBlur} /><select><option>{id}</option></select></div>:value
  }

  const defaultPropGetter = () => ({})
  const defaultColumn = {
    Cell:EditableCell,
  }
const ReactTable = ({columns,data, getCellProps = defaultPropGetter,updateMyData,isEditable}) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      defaultColumn,
      updateMyData,
      isEditable
    });
  return (
    <Table style={styles.table} responsive {...getTableProps()}>
    <thead>
      {headerGroups.map((headerGroup)=>(
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column)=>(
            <th {...column.getHeaderProps()}>
              {column.render("Header")}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>{
        rows.map((row,i)=>{
          prepareRow(row)
          return <tr {...row.getRowProps()}>
            {row.cells.map((cell)=>(
              <td {...cell.getCellProps([
                {
                  className: cell.column.className,
                  style: cell.column.style,
                },
                getCellProps(cell),
              ])}>{cell.render("Cell")}</td>
            ))}
          </tr>
        })
    }
      </tbody>
  </Table>
  )
}

export default ReactTable