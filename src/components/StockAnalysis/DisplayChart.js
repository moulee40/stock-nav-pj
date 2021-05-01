import React from "react";
import { withStyles } from "@material-ui/core/styles";
import StockQuarterAnalysisChart from "./StockQuarterAnalysisChart";
import StockTrendChart from "./StockTrendChart";
import StockPriceComparisonChart from "./StockPriceComparisonChart";

const styles = (theme) => ({
   
  });
class DisplayChart extends React.Component {

  render() {
    const { classes,onBackChange,display,stockQuarterAnalysisDisplay,stockQuarterAnalysisdata,stockTrendDisplay,stockPriceComparisonDisplay,
        fiftyDaysAverage,twoHundredDaysAverage,stockTrendData,stockSymbolData1,stockSymbolData2} = this.props;
    return (
      <div className="flex ml-2 flex-grow shadow-xl">
       
        {display && stockQuarterAnalysisDisplay && (
          <div className="flex flex-col justify-center mt-10 space-y-2 w-2/4">
            <StockQuarterAnalysisChart
              onBackChange={onBackChange}
              data={stockQuarterAnalysisdata}
            />
          </div>
        )}
        {display && stockTrendDisplay && (
          <div className="flex flex-col justify-center mt-10 space-y-2 w-2/4">
            <StockTrendChart
              onBackChange={onBackChange}
              fiftyDaysAverage={fiftyDaysAverage}
              twoHundredDaysAverage={twoHundredDaysAverage}
              data={stockTrendData}
            />
          </div>
        )}
        {display && stockPriceComparisonDisplay && (
          <div className="flex flex-col justify-center mt-10 space-y-2 w-2/4">
            <StockPriceComparisonChart
              onBackChange={onBackChange}
              data1={stockSymbolData1}
              data2={stockSymbolData2}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(DisplayChart);
