import React from "react";
import Table from "@material-ui/core/Table";
import { withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';

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

class FinancialCalculationResult extends React.Component {
  render() {
    const { classes, data } = this.props;
    return (
      <div className="space-y-6 ml-14">
          <Button size="large" onClick={this.props.onBackChange}>Back</Button>
        <div>
          <p className="text-4xl mb-5 text-center">{data[0].companyName}</p>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Symbol</StyledTableCell>
                  <StyledTableCell align="center">year</StyledTableCell>
                  <StyledTableCell align="center">month</StyledTableCell>
                  <StyledTableCell align="center">
                    GL for month per share
                  </StyledTableCell>
                  <StyledTableCell align="center">Percentage</StyledTableCell>
                  <StyledTableCell align="center">Lot size</StyledTableCell>
                  <StyledTableCell align="center">
                    GL for Lot size
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <StyledTableRow key={row.symbol}>
                    <StyledTableCell component="th" scope="row">
                      {row.symbol}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.year}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.month}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.glPerShare}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.glPercentage}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.lotSize}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.glPerLot}
                    </StyledTableCell>
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
export default FinancialCalculationResult;
