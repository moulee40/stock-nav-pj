import React from "react";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { Input } from "@material-ui/core";
import { withStyles,ThemeProvider,createMuiTheme } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DisplayChart from "./DisplayChart";
import { grey } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  input: {
    font: "normal normal 300 17px/35px Roboto",
    color: "grey",
    height: "40px",
    marginRight: "18px",
    paddingLeft: "8px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid grey",
    borderRadius: "5px",
  },
  select_root: {
    minWidth: 120,
    margin: theme.spacing(1),
  },
  root_textfield:{
    marginRight: "14px"
  },
  root_textfield_stock1:{
    width:'76%'
  }
});

const theme = createMuiTheme({
  palette: {
    primary: grey,
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
        validationMessage: "Please enter the Stock Code 1 and Stock Code 2",
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
      <div className="flex ml-2 flex-grow w-2/6 ">
        {!displayChart && (
          <div className="flex flex-col ml-14 mt-10 flex-grow">
            <p className="text-3xl font-semibold text-gray-700">
              Stock Comparison
            </p>
            <div className="flex items-center mt-5 ml-6">
            <ThemeProvider theme={theme}>
            <TextField
                onChange={this.stockSymbol1InputChange}
                value={stockSymbol1Input}
                className={classes.root_textfield_stock1}
                label="Stock Code 1"
                variant="outlined"
             />
             </ThemeProvider>
            </div>
            <div className="flex items-center mt-4 ml-6">
            <ThemeProvider theme={theme}>
            <TextField
                onChange={this.stockSymbol2InputChange}
                fullWidth
                value={stockSymbol2Input}
                className={classes.root_textfield}
                label="Stock Code 2"
                variant="outlined"
             />
             </ThemeProvider>
              <Button
                variant="contained"
                size="large"
                onClick={this.onStockPriceComparisonSubmit}
              >
                Submit
              </Button>
            </div>
            <p className="text-3xl font-semibold text-gray-700 mt-8">
              Quarter Analysis
            </p>
            <div className="mt-5 ml-6 flex items-center">
              {/* <span className="text-xl mr-4">Stock Code</span>
              <Input
                classes={{ root: classes.input }}
                value={stockQuarterAnalysisInput}
                onChange={this.stockQuarterAnalysisInputChange}
                autoFocus
                disableUnderline
              /> */}
            <ThemeProvider theme={theme}>
            <TextField
                onChange={this.stockQuarterAnalysisInputChange}
                fullWidth
                value={stockQuarterAnalysisInput}
                className={classes.root_textfield}
                label="Stock Code"
                variant="outlined"
             />
             </ThemeProvider>
              <Button
                variant="contained"
                size="large"
                onClick={this.onStockQuarterAnalysisSubmit}
              >
                Submit
              </Button>
            </div>
            <p className="text-3xl font-semibold text-gray-700 mt-8">
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
                      color="default"
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
                      color="default"
                    />
                  }
                  label="200 Days Moving Average"
                />
              </FormGroup>
              <div className="flex items-center mt-4 ml-6">
            <ThemeProvider theme={theme}>
            <TextField
                onChange={this.stockTrendInputChange}
                fullWidth
                value={stockTrendInput}
                className={classes.root_textfield}
                label="Stock Code"
                variant="outlined"
             />
             </ThemeProvider>
                <Button
                  variant="contained"
                  size="large"
                  onClick={this.onStockTrendSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>

            {validationMessage !== "" && (
              <Alert className="mt-5" severity="error">
                {validationMessage}
              </Alert>
            )}
          </div>
        )}
        {displayChart && <DisplayChart onBackChange={this.onBackChange} display={displayChart}  stockQuarterAnalysisDisplay={stockQuarterAnalysisChart} 
        stockTrendDisplay={stockTrendChart} stockPriceComparisonDisplay={stockPriceComparisonGraph} 
        stockQuarterAnalysisdata={stockQuarterAnalysisResult} fiftyDaysAverage={fiftyDaysSelected}
        twoHundredDaysAverage={twoHundredDaysSelected}  stockTrendData={stockTrendResult}
        stockSymbolData1={stockSymbol1Result} stockSymbolData2={stockSymbol2Result}></DisplayChart>}
      </div>
    );
  }
}

export default withStyles(styles)(StockAnalysis);
