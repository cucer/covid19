import React, { useState } from "react";
import numeral from "numeral";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  table: {
    minWidth: 650,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: "#6F2232",
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
    color: "#05386B",
    fontWeight: "bold",
  },
}))(TableCell);

function StatTable({ countries }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader className={classes.table} aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Country</StyledTableCell>
              <StyledTableCell>Cases</StyledTableCell>
              <StyledTableCell>Recovered</StyledTableCell>
              <StyledTableCell>Deaths</StyledTableCell>
              <StyledTableCell>Tests</StyledTableCell>
              <StyledTableCell>Active</StyledTableCell>
              <StyledTableCell>Critical</StyledTableCell>
              <StyledTableCell>Population</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => (
                <TableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    {row.country}
                  </StyledTableCell>
                  <StyledTableCell>
                    {numeral(row.cases).format("0,0")}
                  </StyledTableCell>
                  <StyledTableCell>
                    {numeral(row.recovered).format("0,0")}
                  </StyledTableCell>
                  <StyledTableCell>
                    {numeral(row.deaths).format("0,0")}
                  </StyledTableCell>
                  <StyledTableCell>
                    {numeral(row.tests).format("0,0")}
                  </StyledTableCell>
                  <StyledTableCell>
                    {numeral(row.active).format("0,0")}
                  </StyledTableCell>
                  <StyledTableCell>
                    {numeral(row.critical).format("0,0")}
                  </StyledTableCell>
                  <StyledTableCell>
                    {numeral(row.population).format("0,0")}
                  </StyledTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={countries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default StatTable;
