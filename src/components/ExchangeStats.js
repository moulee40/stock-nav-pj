import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ExchangeStatsTable from "./ExchangeStatsTable";
import { Input } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import NativeSelect from "@material-ui/core/NativeSelect";
import axios from "axios";

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
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
});

//eg:http://localhost:8080/stockapp/getStatisticsDetail/AAPL?pastDaysCount=5&exchange=NASDAQ

const statisticsBaseUrl = "http://localhost:8080/stockapp/getStatisticsDetail/";

class ExchangeStats extends React.Component {
  state = {
    displayCount: 10,
    exchangeStatValue: "ALL",
    shouldDisplayTable: false,
    stockCode: "",
    alertMessage: "",
    exchangeStatTableData: [],
  };

  handleDisplayCountChange = (event) => {
    this.setState({ displayCount: event.target.value });
  };

  handleExchangeStatRadioButton = (event) => {
    this.setState({ exchangeStatValue: event.target.value });
  };

  handleSubmitClick = (event) => {
    const { stockCode, displayCount, exchangeStatValue } = this.state;
    if (stockCode === "") {
      this.setState({
        alertMessage: "Please enter the Stock Code and click Submit",
      });
    } else {
      const params = {
        pastDaysCount: displayCount,
        exchange: exchangeStatValue,
      };
      axios.get(`${statisticsBaseUrl}${stockCode}`, { params }).then((res) => {
        if (res.data.error) {
          this.setState({
            alertMessage: res.data.error,
          });
        } else {
          this.setState({
            exchangeStatTableData: res.data.statisticsDetail,
            shouldDisplayTable: true,
            alertMessage: "",
          });
        }
      });
    }
  };

  handleBack = () => {
    this.setState({ shouldDisplayTable: false });
  };

  handleStockCodeInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ stockCode: inputValue, alertMessage: "" });
  };

  render() {
    const { classes } = this.props;
    const {
      exchangeStatValue,
      shouldDisplayTable,
      stockCode,
      alertMessage,
      exchangeStatTableData,
    } = this.state;
    return (
      <div className="flex ml-2 flex-grow shadow-xl">
        {!shouldDisplayTable && (
          <div className="flex flex-col ml-14 mt-10 ">
            <p className="text-2xl font-semibold text-indigo-900">Exchange</p>
            <FormControl component="fieldset">
              <RadioGroup
                className="ml-6 mt-5"
                aria-label="exchange"
                name="exchange1"
                value={exchangeStatValue}
                onChange={this.handleExchangeStatRadioButton}
              >
                <FormControlLabel
                  value="ALL"
                  control={<Radio color="primary" />}
                  label="ALL"
                />
                <FormControlLabel
                  value="AMEX"
                  control={<Radio color="primary" />}
                  label="AMEX"
                />
                <FormControlLabel
                  value="NYSE"
                  control={<Radio color="primary" />}
                  label="NYSE"
                />
                <FormControlLabel
                  value="NASDAQ"
                  control={<Radio color="primary" />}
                  label="NASDAQ"
                />
              </RadioGroup>
            </FormControl>
            <div className="flex items-center mt-1">
              <p className="text-xl">Display</p>
              <FormControl className={classes.formControl}>
                <NativeSelect
                  defaultValue={10}
                  onChange={this.handleDisplayCountChange}
                >
                  <option value={10}>Last 10 Days</option>
                  <option value={100}>Last 100 Days</option>
                  <option value={250}>Last 250 Days</option>
                </NativeSelect>
              </FormControl>
            </div>

            <div className="flex items-center mt-3">
              <span className="text-xl mr-4">Stock Code</span>
              <Input
                classes={{ root: classes.root_input }}
                value={stockCode}
                autoFocus
                disableUnderline
                onChange={this.handleStockCodeInputChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmitClick}
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
        {shouldDisplayTable && (
          <div className="flex flex-col justify-center mt-10 space-y-2">
            <ExchangeStatsTable
              handleBack={this.handleBack}
              data={exchangeStatTableData}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(ExchangeStats);
