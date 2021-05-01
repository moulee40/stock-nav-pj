import React from "react";
import { withStyles,ThemeProvider,createMuiTheme } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from '@material-ui/core/TextField';
import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import OverviewTable from "./OverviewTable";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { grey } from '@material-ui/core/colors';

const styles = (theme) => ({
  root: {
    display: "flex",
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

const summaryBaseUrl = "http://localhost:8080/stockapp/getSummaryDetail/";

class Overview extends React.Component {
  state = {
    shouldHighestPriceChecked: false,
    shouldHighestVolumeChecked: false,
    stockCode: "",
    shouldDisplayTable: false,
    overviewTableData: {},
    alertMessage: "",
  };
  
  handleSubmitClick = (event) => {
    const { stockCode } = this.state;
    if (stockCode === "") {
      this.setState({
        alertMessage: "Please enter the Stock Code",
      });
    } else {
      axios.get(`${summaryBaseUrl}${stockCode}`).then((res) => {
        if (res.data.error) {
          this.setState({
            alertMessage: res.data.error,
          });
        } else {
          this.setState({
            overviewTableData: res.data.summaryDetail,
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

  handleChangeForCheckBox = (event) => {
    if (event.target.name === "Highest Price") {
      this.setState({ shouldHighestPriceChecked: event.target.checked });
    } else {
      this.setState({ shouldHighestVolumeChecked: event.target.checked });
    }
  };
  
  handleStockCodeInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ stockCode: inputValue, alertMessage: "" });
  };



  render() {
    const {
      shouldHighestPriceChecked,
      shouldHighestVolumeChecked,
      shouldDisplayTable,
      overviewTableData,
      alertMessage,
      stockCode,
    } = this.state;
    const { classes } = this.props;
    return (
      <div className="flex ml-2 flex-grow">
        {!shouldDisplayTable && (
          <div className="flex flex-col ml-14 mt-10">
            <p className="text-3xl font-semibold text-gray-700">
              Information
            </p>
            <FormControl component="fieldset">
              <FormGroup className="mt-5 ml-6">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={shouldHighestPriceChecked}
                      onChange={this.handleChangeForCheckBox}
                      name="Highest Price"
                      color="default"
                    />
                  }
                  label="Highest Price"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={shouldHighestVolumeChecked}
                      onChange={this.handleChangeForCheckBox}
                      name="Highest Volume"
                      color="default"
                    />
                  }
                  label="Highest Volume"
                />
              </FormGroup>
              {/* <FormHelperText>Be careful</FormHelperText> */}
            </FormControl>
            <div className="flex items-center mt-6">
            <ThemeProvider theme={theme}>
            <TextField
                onChange={this.handleStockCodeInputChange}
                value={stockCode}
                className={classes.root_textfield}
                label="Stock Code"
                variant="outlined"
             />
             </ThemeProvider>
              {/* <p className="text-xl mr-4">Stock Code</p>
              <Input
                classes={{ root: classes.root_input }}
                value={stockCode}
                autoFocus
                disableUnderline
                onChange={this.handleStockCodeInputChange}
              /> */}
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
            <OverviewTable
              handleBack={this.handleBack}
              data={overviewTableData}
              shouldHighestVolumeChecked={shouldHighestVolumeChecked}
              shouldHighestPriceChecked={shouldHighestPriceChecked}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Overview);
