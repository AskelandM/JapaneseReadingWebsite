import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

//Rows is an array of arrays, Columns is an array of column names
const DisplayTable = ({ rows, columns, removeCallback }) => {
  const handleRemoveEntry = (key) => {
    removeCallback(key);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((colName) => (
              <TableCell key={colName} align="left">
                {colName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              {row.map((value) => (
                <TableCell key={value} align="left">
                  {value}
                </TableCell>
              ))}
              <button key={row[0]} onClick={() => handleRemoveEntry(row[0])}>
                Remove
              </button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DisplayTable;
