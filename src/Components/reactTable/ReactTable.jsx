import React from 'react'
import { Table } from 'react-bootstrap';
import { useTable } from "react-table";
const styles = {
    table: {
      fontSize: 11,
      whiteSpace: "nowrap",
      textAlign: "center",
    },
  };
const ReactTable = ({columns,data}) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
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
              <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
            ))}
          </tr>
        })
    }
      </tbody>
  </Table>
  )
}

export default ReactTable