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
    backgroundColor: "#6b7280",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


class OverviewTable extends React.Component {
  state = {};

  render() {
    const {
      data,
      handleBack,
      shouldHighestVolumeChecked,
      shouldHighestPriceChecked,
      classes,
    } = this.props;
    const summaryTableArray = [
      { name: "Company Name", key: "companyName" },
      { name: "Company Symbol", key: "symbol" },
      { name: "Exchange", key: "exchange" },
      { name: "Start Date", key: "startDate" },
      { name: "End Date", key: "endDate" },
      shouldHighestPriceChecked && {
        name: "Highest Price and Date",
        key: "highestPriceAndDate",
      },
      shouldHighestVolumeChecked && {
        name: "Highest Volume and Date",
        key: "highestVolumeAndDate",
      },
    ];
    return (
      <div className="space-y-12 ml-14">
        <Button size="large" onClick={handleBack}>Back</Button>
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
                  <TableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell>{data[row.key]}</StyledTableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default withStyles(styles)(OverviewTable);
