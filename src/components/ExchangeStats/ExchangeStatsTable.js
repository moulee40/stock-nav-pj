import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  table: {
    minWidth: 700,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#6b7280',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


class ExchangeStatsTable extends React.Component {

  render() {
    const { handleBack, classes, data } = this.props;

    return (
      <div className="space-y-6 ml-14">
<Button size="large" onClick={handleBack}>Back</Button>
        <div>
          <p className="text-4xl mb-5 text-gray-700 text-center">{data[0].company}</p>
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
                  <TableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {index}
                    </StyledTableCell>
                    <StyledTableCell>{row.date}</StyledTableCell>
                    <StyledTableCell>{row.open}</StyledTableCell>
                    <StyledTableCell>{row.close}</StyledTableCell>
                    <StyledTableCell>{row.high}</StyledTableCell>
                    <StyledTableCell>{row.low}</StyledTableCell>
                    <StyledTableCell>{row.volumeTraded}</StyledTableCell>
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

export default withStyles(styles)(ExchangeStatsTable);
