import React from "react";
import Button from "@material-ui/core/Button";
import { Input } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import FinancialAnalysisChart from "./FinancialAnalysisChart";
import FinancialAnalysisTable from "./FinancialAnalysisTable";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Alert from "@material-ui/lab/Alert";

const graphAnalysisBaseUrl =
  "http://localhost:8080/stockapp/getFinancialReportDetail/";
const tableAnalysisBaseUrl =
  "http://localhost:8080/stockapp/getMonthlyFinancialDetail/";

const styles = (theme) => ({
  root_input: {
    paddingLeft: "8px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid grey",
    borderRadius: "5px",
    font: "normal normal 300 17px/35px Roboto",
    color: "grey",
    height: "40px",
    marginRight: "18px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    paddingRight: "50px",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
});
class Financial extends React.Component {
  constructor() {
    super();
  }
  state = {
    isShouldDisplayGraph: false,
    isShowResultGraph: false,
    isShowResultTable: false,
    graphFromDate: "2000-04-26",
    graphToDate: "2006-04-26",
    tableFromDate: "2000-04-26",
    tableToDate: "2006-04-26",
    graphAnalysisInput: "",
    tableAnalysisInput: "",
    graphAnalysisData: [],
    tableAnalysisData: [],
    alertMessage: "",
    tableAnalysisLotInput: "",
  };

  graphAnalysis = (event) => {
    const { graphAnalysisInput, graphFromDate, graphToDate } = this.state;
    if (graphAnalysisInput === "") {
      this.setState({
        alertMessage: "Please enter the Symbol and click Submit",
      });
    } else {
      const params = {
        fromDate: graphFromDate,
        toDate: graphToDate,
      };
      const graphAnalysisUrl = graphAnalysisBaseUrl.concat(graphAnalysisInput);
      axios.get(graphAnalysisUrl, { params }).then((res) => {
        if (!res.data.error) {
          this.setState({
            graphAnalysisData: res.data.financialDetail,
            isShouldDisplayGraph: true,
            isShowResultGraph: true,
          });
        } else {
          this.setState({
            alertMessage: res.data.error,
          });
        }
      });
    }
  };

  tableAnalysis = (event) => {
    const {
      tableAnalysisInput,
      tableFromDate,
      tableToDate,
      tableAnalysisLotInput,
    } = this.state;
    if (tableAnalysisInput === "" && tableAnalysisLotInput === "") {
      this.setState({
        alertMessage: "Please enter the Symbol and Lot Size and click Submit",
      });
    } else if (tableAnalysisInput === "") {
      this.setState({
        alertMessage: "Please enter the Symbol and click Submit",
      });
    } else if (tableAnalysisLotInput === "") {
      this.setState({
        alertMessage: "Please enter the Lot Size and click Submit",
      });
    } else {
      const params = {
        fromDate: tableFromDate,
        toDate: tableToDate,
        lotSize: tableAnalysisLotInput,
      };
      const tableAnalysisUrl = tableAnalysisBaseUrl.concat(tableAnalysisInput);
      axios.get(tableAnalysisUrl, { params }).then((res) => {
        if (!res.data.error) {
          this.setState({
            tableAnalysisData: res.data.monthlyReportDetail,
            isShouldDisplayGraph: true,
            isShowResultTable: true,
          });
        } else {
          this.setState({
            alertMessage: res.data.error,
          });
        }
      });
    }
  };

  handleBack = () => {
    this.setState({
      isShouldDisplayGraph: false,
      isShowResultGraph: false,
      isShowResultTable: false,
      alertMessage: "",
    });
  };

  handleGraphFromDate = (event) => {
    this.setState({
      graphFromDate: event.target.value,
    });
  };

  handleGraphToDate = (event) => {
    this.setState({
      graphToDate: event.target.value,
    });
  };

  handleTableFromDate = (event) => {
    this.setState({
      tableFromDate: event.target.value,
    });
  };

  handleTableToDate = (event) => {
    this.setState({
      tableToDate: event.target.value,
    });
  };

  analysisGraphInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ graphAnalysisInput: inputValue, alertMessage: "" });
  };

  analysisTableInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ tableAnalysisInput: inputValue, alertMessage: "" });
  };

  analysisTableLotInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ tableAnalysisLotInput: inputValue, alertMessage: "" });
  };

  render() {
    const {
      isShouldDisplayGraph,
      isShowResultTable,
      graphAnalysisData,
      alertMessage,
      isShowResultGraph,
      tableAnalysisData,
      graphAnalysisInput,
      tableAnalysisInput,
      tableAnalysisLotInput,
    } = this.state;
    const { classes } = this.props;
    return (
      <div className="flex justify-center">
        {!isShouldDisplayGraph && (
          <div className="flex flex-col justify-center mt-10 ">
            <p className="text-2xl font-semibold text-indigo-900">
              Financial Chart
            </p>
            <div className="flex  ml-6 mt-5">
              <form className={classes.container} noValidate>
                <span className="text-xl mr-7">From</span>
                <TextField
                  id="date"
                  type="date"
                  defaultValue="2000-04-26"
                  className={classes.textField}
                  onChange={this.handleGraphFromDate}
                />
              </form>
              <form className={classes.container} noValidate>
                <span className="text-xl mr-4">To</span>
                <TextField
                  id="date"
                  type="date"
                  defaultValue="2006-04-26"
                  className={classes.textField}
                  onChange={this.handleGraphToDate}
                />
              </form>
            </div>
            <div className="ml-6 mt-6">
              <span className="text-xl mr-4">Symbol</span>
              <Input
                classes={{ root: classes.root_input }}
                onChange={this.analysisGraphInputChange}
                value={graphAnalysisInput}
                autoFocus
                disableUnderline
              />
              <Button
                variant="contained"
                color="primary"
                onClick={this.graphAnalysis}
              >
                Submit
              </Button>
            </div>
            <p className="text-2xl font-semibold text-indigo-900 mt-8">
              Profit and Loss
            </p>
            <div className="flex mt-5 ml-6">
              <form className={classes.container} noValidate>
                <span className="text-xl mr-7">From</span>
                <TextField
                  id="date"
                  type="date"
                  defaultValue="2000-04-26"
                  className={classes.textField}
                  onChange={this.handleTableFromDate}
                />
              </form>
              <form className={classes.container} noValidate>
                <span className="text-xl mr-4">To</span>
                <TextField
                  id="date"
                  type="date"
                  defaultValue="2006-04-26"
                  className={classes.textField}
                  onChange={this.handleTableToDate}
                />
              </form>
            </div>

            <div className="ml-6 mt-6">
              <span className="text-xl mr-4">Symbol</span>
              <Input
                classes={{ root: classes.root_input }}
                onChange={this.analysisTableInputChange}
                value={tableAnalysisInput}
                autoFocus
                disableUnderline
              />
            </div>
            <div className="ml-6 mt-6">
              <span className="text-xl mr-4">Lot Size</span>
              <Input
                classes={{ root: classes.root_input }}
                value={tableAnalysisLotInput}
                onChange={this.analysisTableLotInputChange}
                autoFocus
                disableUnderline
              />
              <Button
                variant="contained"
                color="primary"
                onClick={this.tableAnalysis}
              >
                Submit
              </Button>
            </div>
            {alertMessage !== "" && (
              <Alert className="mt-5" severity="warning">
                {alertMessage}
              </Alert>
            )}
          </div>
        )}
        {isShouldDisplayGraph && isShowResultGraph && (
          <div className="flex flex-col justify-center mt-10 space-y-2 w-2/4">
            <FinancialAnalysisChart
              handleBack={this.handleBack}
              data={graphAnalysisData}
            />
          </div>
        )}
        {isShouldDisplayGraph && isShowResultTable && (
          <div className="flex flex-col justify-center mt-10 space-y-2 w-2/4">
            <FinancialAnalysisTable
              handleBack={this.handleBack}
              data={tableAnalysisData}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Financial);
