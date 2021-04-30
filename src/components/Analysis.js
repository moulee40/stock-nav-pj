import React from "react";
import Button from "@material-ui/core/Button";
import { Input } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import QuarterAnalysisChart from "./QuarterAnalysisChart";
import MovingAverageChart from "./MovingAverageChart";
import StockComparisonChart from "./StockComparisonChart";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Alert from "@material-ui/lab/Alert";

const quarterAnalysisBaseUrl =
  "http://localhost:8080/stockapp/getCurrentQuarterDetail/";
const stockComparisonBaseUrl =
  "http://localhost:8080/stockapp/getComparisonDetail/";
const movingAverageBaseUrl =
  "http://localhost:8080/stockapp/getMovingAverageDetail/";

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
});
class Analysis extends React.Component {
  constructor() {
    super();
  }
  state = {
    is50Dayschecked: false,
    is200Dayschecked: false,
    isShouldDisplayGraph: false,
    isQuarterAnalysisGraph: false,
    isMovingAverageGraph: false,
    isStockComparisonGraph: false,
    QuarterAnalysisData: [],
    movingAverageData: [],
    stockComparisonFirstData: [],
    stockComparisonSecondData: [],
    quarterAnalysisInput: "",
    stockComparsionFirstInput: "",
    stockComparsionSecondInput: "",
    movingAverageInput: "",
    rangeInput: 1,
    alertMessage: "",
  };
  handleCheckBoxChange = (event) => {
    if (event.target.name === "50Days Average") {
      this.setState({ is50Dayschecked: event.target.checked });
    } else {
      this.setState({ is200Dayschecked: event.target.checked });
    }
  };

  handleRangeInput = (event) => {
    const selectedIndex = event.target.options.selectedIndex;
    if (selectedIndex === 1) {
      this.setState({ rangeInput: 5 });
    }

    if (selectedIndex === 2) {
      this.setState({ rangeInput: 10 });
    }

    if (selectedIndex === 3) {
      this.setState({ rangeInput: 20 });
    }
  };

  handleBack = () => {
    this.setState({
      isShouldDisplayGraph: false,
      isQuarterAnalysisGraph: false,
      isMovingAverageGraph: false,
      isStockComparisonGraph: false,
      alertMessage: "",
    });
  };

  handleSubmit = (event) => {
    this.setState({ isShouldDisplayGraph: true });
  };

  handleQuarterAnalysis = (event) => {
    const { quarterAnalysisInput } = this.state;
    if (quarterAnalysisInput === "") {
      this.setState({
        alertMessage: "Please enter the Symbol and click Submit",
      });
    } else {
      const quarterAnalysisUrl = quarterAnalysisBaseUrl.concat(
        quarterAnalysisInput
      );
      axios.get(quarterAnalysisUrl).then((res) => {
        if (!res.data.error) {
          this.setState({
            QuarterAnalysisData: res.data.currentQuarterDetail,
            isShouldDisplayGraph: true,
            isQuarterAnalysisGraph: true,
          });
        } else {
          this.setState({
            alertMessage: res.data.error,
          });
        }
      });
    }
  };

  handleMovingAverage = (event) => {
    const { movingAverageInput, rangeInput } = this.state;
    if (movingAverageInput === "") {
      this.setState({
        alertMessage: "Please enter the Symbol and click Submit",
      });
    } else {
      const params = {
        years: rangeInput,
      };
      const movingAverageUrl = movingAverageBaseUrl.concat(movingAverageInput);
      axios.get(movingAverageUrl, { params }).then((res) => {
        if (!res.data.error) {
          this.setState({
            movingAverageData: res.data.movingAverageDetail,
            isShouldDisplayGraph: true,
            isMovingAverageGraph: true,
          });
        } else {
          this.setState({
            alertMessage: res.data.error,
          });
        }
      });
    }
  };

  handleStockComparison = (event) => {
    const {
      stockComparsionFirstInput,
      stockComparsionSecondInput,
    } = this.state;
    if (stockComparsionFirstInput === "" && stockComparsionSecondInput === "") {
      this.setState({
        alertMessage: "Please enter the Symbol 1 and Symbol 2 and click Submit",
      });
    } else if (stockComparsionFirstInput === "") {
      this.setState({
        alertMessage: "Please enter the Symbol 1 and click Submit",
      });
    } else if (stockComparsionSecondInput === "") {
      this.setState({
        alertMessage: "Please enter the Symbol 2 and click Submit",
      });
    } else {
      const stockComparisonUrl = stockComparisonBaseUrl
        .concat(stockComparsionFirstInput)
        .concat("/")
        .concat(stockComparsionSecondInput);
      axios.get(stockComparisonUrl).then((res) => {
        if (!res.data.error) {
          this.setState({
            stockComparisonFirstData: res.data.symbol1,
            stockComparisonSecondData: res.data.symbol2,
            isShouldDisplayGraph: true,
            isStockComparisonGraph: true,
          });
        } else {
          this.setState({
            alertMessage: res.data.error,
          });
        }
      });
    }
  };

  handleQuarterAnalysisChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ quarterAnalysisInput: inputValue, alertMessage: "" });
  };

  handleStockComparsionFirstInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ stockComparsionFirstInput: inputValue, alertMessage: "" });
  };

  handleStockComparsionSecondInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ stockComparsionSecondInput: inputValue, alertMessage: "" });
  };

  handleMovingAverageInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ movingAverageInput: inputValue, alertMessage: "" });
  };

  render() {
    const {
      QuarterAnalysisData,
      movingAverageData,
      stockComparisonFirstData,
      stockComparisonSecondData,
      is50Dayschecked,
      is200Dayschecked,
      isShouldDisplayGraph,
      isQuarterAnalysisGraph,
      isMovingAverageGraph,
      isStockComparisonGraph,
      quarterAnalysisInput,
      stockComparsionFirstInput,
      stockComparsionSecondInput,
      movingAverageInput,
      alertMessage,
    } = this.state;
    const { classes } = this.props;
    return (
      <div className="flex justify-center">
        {!isShouldDisplayGraph && (
          <div className="flex flex-col justify-center mt-10">
            <p className="text-2xl font-semibold text-indigo-900">
              Quarter Analysis
            </p>
            <div className="mt-5 ml-6 flex items-center">
              <span className="text-xl mr-4">Symbol</span>
              <Input
                classes={{ root: classes.root_input }}
                value={quarterAnalysisInput}
                onChange={this.handleQuarterAnalysisChange}
                autoFocus
                disableUnderline
              />
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleQuarterAnalysis}
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
                <FormControl className={classes.formControl}>
                  <NativeSelect
                    defaultValue={1}
                    onChange={this.handleRangeInput}
                  >
                    <option value={1}>1 year</option>
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
                      checked={is50Dayschecked}
                      onChange={this.handleCheckBoxChange}
                      name="50Days Average"
                      color="primary"
                    />
                  }
                  label="50 Days Moving Average"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={is200Dayschecked}
                      onChange={this.handleCheckBoxChange}
                      name="200Days Average"
                      color="primary"
                    />
                  }
                  label="200 Days Moving Average"
                />
              </FormGroup>
              <div className="flex items-center mt-4">
                <span className="text-xl mr-4 ml-6">Symbol</span>
                <Input
                  classes={{ root: classes.root_input }}
                  value={movingAverageInput}
                  onChange={this.handleMovingAverageInputChange}
                  autoFocus
                  disableUnderline
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleMovingAverage}
                >
                  Submit
                </Button>
              </div>
            </div>
            <p className="text-2xl font-semibold text-indigo-900 mt-8">
              Stock Comparison
            </p>
            <div className="flex items-center mt-5 ml-6">
              <span className="text-xl mr-4">Symbol 1</span>
              <Input
                classes={{ root: classes.root_input }}
                value={stockComparsionFirstInput}
                onChange={this.handleStockComparsionFirstInputChange}
                autoFocus
                disableUnderline
              />
            </div>
            <div className="flex items-center mt-4 ml-6">
              <span className="text-xl mr-4">Symbol 2</span>
              <Input
                classes={{ root: classes.root_input }}
                value={stockComparsionSecondInput}
                onChange={this.handleStockComparsionSecondInputChange}
                autoFocus
                disableUnderline
              />
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleStockComparison}
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
        {isShouldDisplayGraph && isQuarterAnalysisGraph && (
          <div className="flex flex-col justify-center mt-10 space-y-2 w-2/4">
            <QuarterAnalysisChart
              handleBack={this.handleBack}
              data={QuarterAnalysisData}
            />
          </div>
        )}
        {isShouldDisplayGraph && isMovingAverageGraph && (
          <div className="flex flex-col justify-center mt-10 space-y-2 w-2/4">
            <MovingAverageChart
              handleBack={this.handleBack}
              fiftyDaysAverage={is50Dayschecked}
              twoHundredDaysAverage={is200Dayschecked}
              data={movingAverageData}
            />
          </div>
        )}
        {isShouldDisplayGraph && isStockComparisonGraph && (
          <div className="flex flex-col justify-center mt-10 space-y-2 w-2/4">
            <StockComparisonChart
              handleBack={this.handleBack}
              data1={stockComparisonFirstData}
              data2={stockComparisonSecondData}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Analysis);
