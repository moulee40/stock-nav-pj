import React from "react";
import FinancialCalculationResult from "./FinancialCalculationResult";

class FinancialResultSummary extends React.Component {

  render() {
  
    const { classes,onBackChange,chartData,resultData,displayChart,financialChart,financialResult } = this.props;
    return (
      <div className="flex ml-2 flex-grow">
        {displayChart && financialResult && (
          <div className="flex flex-col justify-center mt-10 space-y-2 w-2/4">
            <FinancialCalculationResult onBackChange={onBackChange} data={resultData}/>
          </div>
        )}
      </div>
    );
  }
}

export default FinancialResultSummary;
