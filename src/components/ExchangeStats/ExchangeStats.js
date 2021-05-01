import React from "react";
import { withStyles,ThemeProvider,createMuiTheme } from "@material-ui/core/styles";
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
import { grey } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';

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
  root_textfield:{
    marginRight: "14px"
  }
});

const theme = createMuiTheme({
  palette: {
    primary: grey,
  },

});

const statisticsBaseUrl = "http://localhost:8080/stock/statistics/";

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
        alertMessage: "Please enter the Stock Code",
      });
    } else {
      const params = {
        days: displayCount,
        market: exchangeStatValue,
      };
      axios.get(`${statisticsBaseUrl}${stockCode}`, { params }).then((res) => {
        if (res.data.errorMessage) {
          this.setState({
            alertMessage: res.data.errorMessage,
          });
        } else {
          this.setState({
            exchangeStatTableData: res.data.companyStatisticData,
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
      <div className="flex ml-2 flex-grow">
        {!shouldDisplayTable && (
          <div className="flex flex-col ml-14 mt-10 ">
            <p className="text-2xl font-semibold text-gray-700">Exchange</p>
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
                  control={<Radio color="default" />}
                  label="ALL"
                />
                <FormControlLabel
                  value="AMEX"
                  control={<Radio color="default" />}
                  label="AMEX"
                />
                <FormControlLabel
                  value="NYSE"
                  control={<Radio color="default" />}
                  label="NYSE"
                />
                <FormControlLabel
                  value="NASDAQ"
                  control={<Radio color="default" />}
                  label="NASDAQ"
                />
              </RadioGroup>
            </FormControl>
            <div className="flex items-center mt-1">
              <p className="text-xl">Range</p>
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
            <ThemeProvider theme={theme}>
            <TextField
                onChange={this.handleStockCodeInputChange}
                value={stockCode}
                className={classes.root_textfield}
                label="Stock Code"
                variant="outlined"
             />
             </ThemeProvider>
              <Button
              size="large"
                variant="contained"
                onClick={this.handleSubmitClick}
              >
                Submit
              </Button>
            </div>
            {alertMessage !== "" && (
              <Alert className="mt-5" severity="error">
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
