import React from "react";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { Input } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DisplayChart from "./DisplayChart";

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
  select_root: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});

const stockQuarterAnalysisUrl = "http://localhost:8080/stockapp/getCurrentQuarterDetail/";
const stockPriceComparisonUrl = "http://localhost:8080/stockapp/getComparisonDetail/";
const stockTrendUrl = "http://localhost:8080/stockapp/getMovingAverageDetail/";

class StockAnalysis extends React.Component {

  state = {
    stockQuarterAnalysisInput: "",
    stockSymbol1Input: "",
    stockSymbol2Input: "",
    stockTrendInput: "",
    stockYearInput: 1,
    validationMessage: "",
    fiftyDaysSelected: false,
    twoHundredDaysSelected: false,
    displayChart: false,
    stockQuarterAnalysisChart: false,
    stockTrendChart: false,
    stockPriceComparisonGraph: false,
    stockQuarterAnalysisResult: [],
    stockTrendResult: [],
    stockSymbol1Result: [],
    stockSymbol2Result: [],
  };

  stockQuarterAnalysisInputChange = (event) => {
    const value = event.target.value;
    this.setState({ stockQuarterAnalysisInput: value, validationMessage: "" });
  };

  stockSymbol1InputChange = (event) => {
    const value = event.target.value;
    this.setState({ stockSymbol1Input: value, validationMessage: "" });
  };

  stockSymbol2InputChange = (event) => {
    const value = event.target.value;
    this.setState({ stockSymbol2Input: value, validationMessage: "" });
  };

  stockTrendInputChange = (event) => {
    const value = event.target.value;
    this.setState({ stockTrendInput: value, validationMessage: "" });
  };
  
  stockTrendChange = (event) => {
    if (event.target.name === "fiftyDays Average") {
      this.setState({ fiftyDaysSelected: event.target.checked });
    } else {
      this.setState({ twoHundredDaysSelected: event.target.checked });
    }
  };

  stockYearInputChange = (event) => {
    const index = event.target.options.selectedIndex;
    if (index === 1) {
      this.setState({ stockYearInput: 3 });
    }

    if (index === 2) {
      this.setState({ stockYearInput: 5 });
    }

    if (index === 3) {
      this.setState({ stockYearInput: 10 });
    }

    if (index === 4) {
      this.setState({ stockYearInput: 20 });
    }
  };

  onBackChange = () => {
    this.setState({
      displayChart: false,
      stockQuarterAnalysisChart: false,
      stockTrendChart: false,
      stockPriceComparisonGraph: false,
      validationMessage: "",
    });
  };

  onStockQuarterAnalysisSubmit = (event) => {
    const { stockQuarterAnalysisInput } = this.state;
    if (stockQuarterAnalysisInput === "") {
      this.setState({
        validationMessage: "Please enter the Stock Code",
      });
    } else {
      const finalUrl = stockQuarterAnalysisUrl.concat(stockQuarterAnalysisInput);
      axios.get(finalUrl).then((res) => {
        if (!res.data.error) {
          this.setState({
            stockQuarterAnalysisResult: res.data.currentQuarterDetail,
            displayChart: true,
            stockQuarterAnalysisChart: true,
          });
        } else {
          this.setState({
            validationMessage: res.data.error,
          });
        }
      });
    }
  };

  onStockTrendSubmit = (event) => {
    const { stockTrendInput, stockYearInput } = this.state;
    if (stockTrendInput === "") {
      this.setState({
        validationMessage: "Please enter the Stock Code",
      });
    } else {
      const params = {
        years: stockYearInput,
      };
      const finalUrl = stockTrendUrl.concat(stockTrendInput);
      axios.get(finalUrl, { params }).then((res) => {
        if (!res.data.error) {
          this.setState({
            stockTrendResult: res.data.movingAverageDetail,
            displayChart: true,
            stockTrendChart: true,
          });
        } else {
          this.setState({
            validationMessage: res.data.error,
          });
        }
      });
    }
  };

  onStockPriceComparisonSubmit = (event) => {
    const {
      stockSymbol1Input,
      stockSymbol2Input,
    } = this.state;
    if (stockSymbol1Input === "" && stockSymbol2Input === "") {
      this.setState({
        validationMessage: "Please enter the Stock Code 1 and Stock Code",
      });
    } else if (stockSymbol1Input === "") {
      this.setState({
        validationMessage: "Please enter the Stock Code 1",
      });
    } else if (stockSymbol2Input === "") {
      this.setState({
        validationMessage: "Please enter the Stock Code 2",
      });
    } else {
      const finalUrl = stockPriceComparisonUrl.concat(stockSymbol1Input).concat("/").concat(stockSymbol2Input);
      axios.get(finalUrl).then((res) => {
        if (!res.data.error) {
          this.setState({
            stockSymbol1Result: res.data.symbol1,
            stockSymbol2Result: res.data.symbol2,
            displayChart: true,
            stockPriceComparisonGraph: true,
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
      stockQuarterAnalysisInput,stockSymbol1Input,stockSymbol2Input,stockTrendInput,validationMessage,stockQuarterAnalysisResult,
      stockTrendResult,stockSymbol1Result,stockSymbol2Result,fiftyDaysSelected,twoHundredDaysSelected,displayChart,
      stockQuarterAnalysisChart,stockTrendChart,stockPriceComparisonGraph} = this.state;
    const { classes } = this.props;
    return (
      <div className="flex ml-2 flex-grow">
        {!displayChart && (
          <div className="flex flex-col ml-14 mt-10">
            <p className="text-2xl font-semibold text-indigo-900">
              Quarter Analysis
            </p>
            <div className="mt-5 ml-6 flex items-center">
              <span className="text-xl mr-4">Stock Code</span>
              <Input
                classes={{ root: classes.input }}
                value={stockQuarterAnalysisInput}
                onChange={this.stockQuarterAnalysisInputChange}
                autoFocus
                disableUnderline
              />
              <Button
                variant="contained"
                color="primary"
                onClick={this.onStockQuarterAnalysisSubmit}
              >
                Submit
              </Button>
            </div>
            <p className="text-2xl font-semibold text-indigo-900 mt-8">
              Stock Trend
            </p>
            <div>
              <div className="flex items-center mt-2">
                <span className="text-xl ml-6 mr-4">Range</span>
                <FormControl className={classes.select_root}>
                  <NativeSelect
                    defaultValue={1}
                    onChange={this.stockYearInputChange}
                  >
                    <option value={1}>1 year</option>
                    <option value={3}>3 Year</option>
                    <option value={5}>5 Year</option>
                    <option value={10}>10 Year</option>
                    <option value={20}>20 Year</option>
                  </NativeSelect>
                </FormControl>
              </div>
              <FormGroup className="mt-2 ml-6">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={fiftyDaysSelected}
                      onChange={this.stockTrendChange}
                      name="fiftyDays Average"
                      color="primary"
                    />
                  }
                  label="50 Days Moving Average"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={twoHundredDaysSelected}
                      onChange={this.stockTrendChange}
                      name="200Days Average"
                      color="primary"
                    />
                  }
                  label="200 Days Moving Average"
                />
              </FormGroup>
              <div className="flex items-center mt-4">
                <span className="text-xl mr-4 ml-6">Stock Code</span>
                <Input
                  classes={{ root: classes.input }}
                  value={stockTrendInput}
                  onChange={this.stockTrendInputChange}
                  autoFocus
                  disableUnderline
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.onStockTrendSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
            <p className="text-2xl font-semibold text-indigo-900 mt-8">
              Stock Comparison
            </p>
            <div className="flex items-center mt-5 ml-6">
              <span className="text-xl mr-4">Stock Code 1</span>
              <Input
                classes={{ root: classes.input }}
                value={stockSymbol1Input}
                onChange={this.stockSymbol1InputChange}
                autoFocus
                disableUnderline
              />
            </div>
            <div className="flex items-center mt-4 ml-6">
              <span className="text-xl mr-4">Stock Code 2</span>
              <Input
                classes={{ root: classes.input }}
                value={stockSymbol2Input}
                onChange={this.stockSymbol2InputChange}
                autoFocus
                disableUnderline
              />
              <Button
                variant="contained"
                color="primary"
                onClick={this.onStockPriceComparisonSubmit}
              >
                Submit
              </Button>
            </div>
            {validationMessage !== "" && (
              <Alert className="mt-5" severity="warning">
                {validationMessage}
              </Alert>
            )}
          </div>
        )}
        <DisplayChart onBackChange={this.onBackChange} display={displayChart}  stockQuarterAnalysisDisplay={stockQuarterAnalysisChart} 
        stockTrendDisplay={stockTrendChart} stockPriceComparisonDisplay={stockPriceComparisonGraph} 
        stockQuarterAnalysisdata={stockQuarterAnalysisResult} fiftyDaysAverage={fiftyDaysSelected}
        twoHundredDaysAverage={twoHundredDaysSelected}  stockTrendData={stockTrendResult}
        stockSymbolData1={stockSymbol1Result} stockSymbolData2={stockSymbol2Result}></DisplayChart>
      </div>
    );
  }
}

export default withStyles(styles)(StockAnalysis);
