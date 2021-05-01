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
    backgroundColor: '#6b7280',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


class FinancialCalculationResult extends React.Component {
  render() {
    const { classes, data } = this.props;
    return (
      <div className="space-y-6 ml-14">
          <Button size="large" onClick={this.props.onBackChange}>Back</Button>
        <div>
          <p className="text-4xl mb-5 text-gray-700 text-center">{data[0].company}</p>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Symbol</StyledTableCell>
                  <StyledTableCell align="center">Year</StyledTableCell>
                  <StyledTableCell align="center">Month</StyledTableCell>
                  <StyledTableCell align="center">
                    PL for month per share
                  </StyledTableCell>
                  <StyledTableCell align="center">Quantity</StyledTableCell>
                  <StyledTableCell align="center">
                    PL for quantity
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.symbol}>
                    <StyledTableCell component="th" scope="row">
                      {row.symbol}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.tradeYear}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.tradeMonth}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.gainLossPerShare}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.allocatedLotSize}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.gainLossPerLot}
                    </StyledTableCell>
                  </TableRow>
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
