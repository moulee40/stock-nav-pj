import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
  table: {
    minWidth: 700,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

class SummaryTable extends React.Component {
  state = {};

  render() {
    const {
      data,
      handleBack,
      isHighestVolumeChecked,
      isHighestPriceChecked,
      classes,
    } = this.props;
    const summaryTableArray = [
      { name: "Company Name", key: "companyName" },
      { name: "Company Symbol", key: "symbol" },
      { name: "Exchange", key: "exchange" },
      { name: "Start Date", key: "startDate" },
      { name: "End Date", key: "endDate" },
      isHighestPriceChecked && {
        name: "Highest Price and Date",
        key: "highestPriceAndDate",
      },
      isHighestVolumeChecked && {
        name: "Highest Volume and Date",
        key: "highestVolumeAndDate",
      },
    ];
    return (
      <div className="space-y-12">
        <p
          className="max-w-min cursor-pointer underline text-2xl text-indigo-900 hover:text-purple-800"
          onClick={handleBack}
        >
          Back
        </p>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Result</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {summaryTableArray
                .filter((row) => row)
                .map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell>{data[row.key]}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default withStyles(styles)(SummaryTable);
