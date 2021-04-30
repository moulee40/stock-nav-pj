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

class StatisticsTable extends React.Component {
  state = {};

  render() {
    const { handleBack, classes, data } = this.props;

    return (
      <div className="space-y-6">
        <p
          className="max-w-min cursor-pointer underline text-2xl text-indigo-900 hover:text-purple-800"
          onClick={handleBack}
        >
          Back
        </p>
        <div>
          <p className="text-4xl mb-5 text-center">{data[0].companyName}</p>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Index</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Open</StyledTableCell>
                  <StyledTableCell>Close</StyledTableCell>
                  <StyledTableCell>High</StyledTableCell>
                  <StyledTableCell>Low</StyledTableCell>
                  <StyledTableCell>Volume</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {index}
                    </StyledTableCell>
                    <StyledTableCell>{row.tradeDate}</StyledTableCell>
                    <StyledTableCell>{row.openPrice}</StyledTableCell>
                    <StyledTableCell>{row.closePrice}</StyledTableCell>
                    <StyledTableCell>{row.highPrice}</StyledTableCell>
                    <StyledTableCell>{row.lowPrice}</StyledTableCell>
                    <StyledTableCell>{row.volume}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(StatisticsTable);
