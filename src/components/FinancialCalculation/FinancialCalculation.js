import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import { Input } from "@material-ui/core";
import { withStyles,ThemeProvider,createMuiTheme } from "@material-ui/core/styles";
import FinancialResultSummary from "./FinancialResultSummary";
import { grey } from '@material-ui/core/colors';

const styles = (theme) => ({
  input: {
    paddingLeft: "8px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid grey",
    borderRadius: "5px",
    font: "normal normal 300 17px/35px Roboto",
    color: "grey",
    height: "40px",
    marginRight: "18px",
  },
  
  form_input: {
    display: "flex",
    flexWrap: "wrap",
    paddingRight: "50px",
  },
  text_input: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  root_textfield:{
    marginRight: "14px"
  }
});

const theme = createMuiTheme({
  palette: {
    primary: grey,
  },
});

const financialCalculationChartUrl = "http://localhost:8080/stockapp/getFinancialReportDetail/";
const financialCalculationResultUrl = "http://localhost:8080/stockapp/getMonthlyFinancialDetail/";

class FinancialCalculation extends React.Component {
  
  state = {
    chartInput: "",
    resultInput: "",
    chartData: [],
    resultData: [],
    validationMessage: "",
    resultQuantityInput: "",
    displayChart: false,
    showFinancialChart: false,
    showFinancialResult: false,
    chartFromDate: "1998-08-08",
    chartToDate: "2004-07-20",
    resultFromDate: "1998-08-08",
    resultToDate: "2004-07-20",
  };

  onBackChange = () => {
    this.setState({
      displayChart: false,
      showFinancialChart: false,
      showFinancialResult: false,
      validationMessage: "",
    });
  };

  chartFromDateChange = (event) => {
    this.setState({
      chartFromDate: event.target.value,
    });
  };

  chartToDateChange = (event) => {
    this.setState({
      chartToDate: event.target.value,
    });
  };

  resultFromDateChange = (event) => {
    this.setState({
      resultFromDate: event.target.value,
    });
  };

  resultToDateChange = (event) => {
    this.setState({
      resultToDate: event.target.value,
    });
  };

  chartInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ chartInput: inputValue, validationMessage: "" });
  };

  resultInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ resultInput: inputValue, validationMessage: "" });
  };

  resultQuantityInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ resultQuantityInput: inputValue, validationMessage: "" });
  };

  financialResult = (event) => {
    const {resultInput, resultFromDate, resultToDate,resultQuantityInput} = this.state;
    if (resultInput === "" && resultQuantityInput === "") {
      this.setState({
        validationMessage: "Please enter the Stock Code and Quantity",
      });
    } else if (resultInput === "") {
      this.setState({
        validationMessage: "Please enter the Stock Code",
      });
    } else if (resultQuantityInput === "") {
      this.setState({
        validationMessage: "Please enter the Quantity",
      });
    } else {
      const params = {
        fromDate: resultFromDate,
        toDate: resultToDate,
        lotSize: resultQuantityInput,
      };
      const tableAnalysisUrl = financialCalculationResultUrl.concat(resultInput);
      axios.get(tableAnalysisUrl, { params }).then((res) => {
        if (!res.data.error) {
          this.setState({
            resultData: res.data.monthlyReportDetail,
            displayChart: true,
            showFinancialResult: true,
          });
        } else {
          this.setState({
            validationMessage: res.data.error,
          });
        }
      });
    }
  };

  financialChart = (event) => {
    const { chartInput, chartFromDate, chartToDate } = this.state;
    if (chartInput === "") {
      this.setState({
        validationMessage: "Please enter the Stock",
      });
    } else {
      const params = {
        fromDate: chartFromDate,
        toDate: chartToDate,
      };
      const finalUrl = financialCalculationChartUrl.concat(chartInput);
      axios.get(finalUrl, { params }).then((res) => {
        if (!res.data.error) {
          this.setState({
            chartData: res.data.financialDetail,
            displayChart: true,
            showFinancialChart: true,
          });
        } else {
          this.setState({
            validationMessage: res.data.error,
          });
        }
      });
    }
  };

  render() {
    const {
      displayChart, showFinancialResult,chartData, validationMessage, showFinancialChart, resultData,chartInput,
      resultInput, resultQuantityInput} = this.state;
    const { classes } = this.props;
    return (

      <div className="flex ml-2 flex-grow">
        {!displayChart && (
          <div className="flex flex-col ml-14 mt-10 ">
            <p className="text-3xl font-semibold text-gray-700">
              Financial Chart Result
            </p>
            <div className="flex  ml-6 mt-5">
              <form className={classes.form_input} noValidate>
                <span className="text-xl mr-7">From</span>
                <TextField
                  id="date"
                  type="date"
                  defaultValue="1998-08-08"
                  className={classes.text_input}
                  onChange={this.chartFromDateChange}
                />
              </form>
              <form className={classes.form_input} noValidate>
                <span className="text-xl mr-4">To</span>
                <TextField
                  id="date"
                  type="date"
                  defaultValue="2004-07-20"
                  className={classes.text_input}
                  onChange={this.chartToDateChange}
                />
              </form>
            </div>
            <div className="ml-6 mt-6 flex items-center">
            <ThemeProvider theme={theme}>
            <TextField
                onChange={this.chartInputChange}
                value={chartInput}
                className={classes.root_textfield}
                label="Stock Code"
                variant="outlined"
             />
             </ThemeProvider>
              <Button
                variant="contained"
                size="large"
                onClick={this.financialChart}
              >
                Submit
              </Button>
            </div>
            <p className="text-3xl font-semibold text-gray-700 mt-8">
              Financial Result Summary
            </p>
            <div className="flex mt-5 ml-6">
              <form className={classes.form_input} noValidate>
                <span className="text-xl mr-7">From</span>
                <TextField
                  id="date"
                  type="date"
                  defaultValue="1998-08-08"
                  className={classes.text_input}
                  onChange={this.resultFromDateChange}
                />
              </form>
              <form className={classes.form_input} noValidate>
                <span className="text-xl mr-4">To</span>
                <TextField
                  id="date"
                  type="date"
                  defaultValue="2004-07-20"
                  className={classes.text_input}
                  onChange={this.resultToDateChange}
                />
              </form>
            </div>

            <div className="ml-6 mt-6">
            <ThemeProvider theme={theme}>
            <TextField
                onChange={this.resultInputChange}
                value={resultInput}
                className={classes.root_textfield}
                label="Stock Code"
                variant="outlined"
             />
             </ThemeProvider>
            </div>
            <div className="ml-6 mt-6 flex items-center">
            <ThemeProvider theme={theme}>
            <TextField
                onChange={this.resultQuantityInputChange}
                value={resultQuantityInput}
                className={classes.root_textfield}
                label="Quantity"
                variant="outlined"
             />
             </ThemeProvider>
              <Button
                variant="contained"
                size="large"
                onClick={this.financialResult}
              >
                Submit
              </Button>
            </div>
            {validationMessage !== "" && (
              <Alert className="mt-5" severity="error">
                {validationMessage}
              </Alert>
            )}
          </div>
        )}
       {displayChart && <FinancialResultSummary onBackChange={this.onBackChange} chartData={chartData} resultData={resultData}
        displayChart={displayChart} financialChart={showFinancialChart} financialResult={showFinancialResult}>
        </FinancialResultSummary>}
      </div>
    );
  }
}

export default withStyles(styles)(FinancialCalculation);
