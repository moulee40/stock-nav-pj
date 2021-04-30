import React from "react";
import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class FinancialAnalysisChart extends React.Component {
  constructor() {
    super();
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
  }

  toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  }

  handleFinancialAnalysisData() {
    const finalData = [];
    const financialAnalysisData = this.props.data;
    financialAnalysisData.map((data) => {
      let openPrice = data.openPrice;
      let highPrice = data.highPrice;
      let lowPrice = data.lowPrice;
      let closePrice = data.closePrice;
      let date = new Date(data.tradeDate);
      let tempData = {
        x: date,
        y: [openPrice, highPrice, lowPrice, closePrice],
      };
      finalData.push(tempData);
    });
    return finalData;
  }

  render() {
    const financialAnalysisData = this.props.data;

    const options = {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: financialAnalysisData[0].companyName,
      },
      axisX: {
        valueFormatString: "MMM-YYYY",
      },
      axisY: {
        includeZero: false,
        prefix: "$",
        title: "Price (in USD)",
      },
      data: [
        {
          type: "candlestick",
          showInLegend: true,
          name: financialAnalysisData[0].companyName,
          yValueFormatString: "$###0.00",
          xValueFormatString: "MMMM-YYYY",
          dataPoints: this.handleFinancialAnalysisData(),
        },
      ],
    };
    return (
      <div className="space-y-6">
        <p
          className="max-w-min cursor-pointer underline text-2xl text-indigo-900 hover:text-purple-800"
          onClick={this.props.handleBack}
        >
          Back
        </p>
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
      </div>
    );
  }
}
export default FinancialAnalysisChart;
