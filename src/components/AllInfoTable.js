import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { prettyPrintStat } from "../utils/util";

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});

const StyledTableCell = withStyles((theme) => ({
  body: {
    fontSize: 14,
    color: "#05386B",
    fontWeight: "bold",
  },
}))(TableCell);

export default function AllInfoTable({ countryInfo }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableBody>
          <TableRow>
            <StyledTableCell component="th" scope="row">
              Population
            </StyledTableCell>
            <StyledTableCell align="right">
              {prettyPrintStat(countryInfo.population)}
            </StyledTableCell>
          </TableRow>

          <TableRow>
            <StyledTableCell component="th" scope="row">
              Tests
            </StyledTableCell>
            <StyledTableCell align="right">
              {prettyPrintStat(countryInfo.tests)}
            </StyledTableCell>
          </TableRow>

          <TableRow>
            <StyledTableCell component="th" scope="row">
              Cases
            </StyledTableCell>
            <StyledTableCell align="right">
              {prettyPrintStat(countryInfo.cases)}
            </StyledTableCell>
          </TableRow>

          <TableRow>
            <StyledTableCell component="th" scope="row">
              Active
            </StyledTableCell>
            <StyledTableCell align="right">
              {prettyPrintStat(countryInfo.active)}
            </StyledTableCell>
          </TableRow>

          <TableRow>
            <StyledTableCell component="th" scope="row">
              Recovered
            </StyledTableCell>
            <StyledTableCell align="right">
              {prettyPrintStat(countryInfo.recovered)}
            </StyledTableCell>
          </TableRow>

          <TableRow>
            <StyledTableCell component="th" scope="row">
              Critical
            </StyledTableCell>
            <StyledTableCell align="right">
              {prettyPrintStat(countryInfo.critical)}
            </StyledTableCell>
          </TableRow>

          <TableRow>
            <StyledTableCell component="th" scope="row">
              Deaths
            </StyledTableCell>
            <StyledTableCell align="right">
              {prettyPrintStat(countryInfo.deaths)}
            </StyledTableCell>
          </TableRow>

          <TableRow>
            <StyledTableCell component="th" scope="row">
              Today Cases
            </StyledTableCell>
            <StyledTableCell align="right">
              {prettyPrintStat(countryInfo.todayCases)}
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell component="th" scope="row">
              Toay Deaths
            </StyledTableCell>
            <StyledTableCell align="right">
              {prettyPrintStat(countryInfo.todayDeaths)}
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell component="th" scope="row">
              Today Recored
            </StyledTableCell>
            <StyledTableCell align="right">
              {prettyPrintStat(countryInfo.todayRecovered)}
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
