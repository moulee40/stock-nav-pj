import React from "react";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import StatisticsTable from "./StatisticsTable";
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

class Statistics extends React.Component {
  state = {
    count: 10,
    exchangeValue: "ALL",
    shouldDisplayTable: false,
    symbol: "",
    errorMessage: "",
    statisticsTableData: [],
  };

  handleDisplayChange = (event) => {
    this.setState({ count: event.target.value });
  };

  handleExchangeRadioButton = (event) => {
    this.setState({ exchangeValue: event.target.value });
  };

  handleSubmit = (event) => {
    const { symbol, count, exchangeValue } = this.state;
    if (symbol === "") {
      this.setState({
        errorMessage: "Please enter the Symbol and click Submit",
      });
    } else {
      const params = {
        pastDaysCount: count,
        exchange: exchangeValue,
      };
      axios.get(`${statisticsBaseUrl}${symbol}`, { params }).then((res) => {
        if (res.data.error) {
          this.setState({
            errorMessage: res.data.error,
          });
        } else {
          this.setState({
            statisticsTableData: res.data.statisticsDetail,
            shouldDisplayTable: true,
            errorMessage: "",
          });
        }
      });
    }
  };

  handleBack = () => {
    this.setState({ shouldDisplayTable: false });
  };

  handleSymbolInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ symbol: inputValue, errorMessage: "" });
  };

  render() {
    const { classes } = this.props;
    const {
      count,
      exchangeValue,
      shouldDisplayTable,
      symbol,
      errorMessage,
      statisticsTableData,
    } = this.state;
    return (
      <div className="flex justify-center">
        {!shouldDisplayTable && (
          <div className="flex flex-col justify-center mt-10 ">
            <p className="text-2xl font-semibold text-indigo-900">Exchange</p>
            <FormControl component="fieldset">
              <RadioGroup
                className="ml-6 mt-5"
                aria-label="exchange"
                name="exchange1"
                value={exchangeValue}
                onChange={this.handleExchangeRadioButton}
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
                  onChange={this.handleDisplayChange}
                >
                  <option value={10}>Last 10 Days</option>
                  <option value={100}>Last 100 Days</option>
                  <option value={250}>Last 250 Days</option>
                </NativeSelect>
              </FormControl>
            </div>

            <div className="flex items-center mt-3">
              <span className="text-xl mr-4">Symbol</span>
              <Input
                classes={{ root: classes.root_input }}
                value={symbol}
                autoFocus
                disableUnderline
                onChange={this.handleSymbolInputChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </div>
            {errorMessage !== "" && (
              <Alert className="mt-5" severity="warning">
                {errorMessage}
              </Alert>
            )}
          </div>
        )}
        {shouldDisplayTable && (
          <div className="flex flex-col justify-center mt-10 space-y-2">
            <StatisticsTable
              handleBack={this.handleBack}
              data={statisticsTableData}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Statistics);
