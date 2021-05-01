import React from "react";
import CanvasJSReact from "../canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class FinancialCalculationChart extends React.Component {
  constructor() {
    super();
    this.chartDataSeries = this.chartDataSeries.bind(this);
  }

  chartDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  }

  onFinancialChartSubmit() {
    const resultData = [];
    const financialChartData = this.props.data;
    financialChartData.map((data) => {
      let openPrice = data.openPrice;
      let highPrice = data.highPrice;
      let lowPrice = data.lowPrice;
      let closePrice = data.closePrice;
      let date = new Date(data.tradeDate);
      let jsonData = {
        x: date,
        y: [openPrice, highPrice, lowPrice, closePrice],
      };
      resultData.push(jsonData);
    });
    return resultData;
  }

  render() {
    const financialChartData = this.props.data;

    const options = {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: financialChartData[0].companyName,
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
          name: financialChartData[0].companyName,
          yValueFormatString: "$###0.00",
          xValueFormatString: "MMMM-YYYY",
          dataPoints: this.onFinancialChartSubmit(),
        },
      ],
    };
    return (
      <div className="space-y-6">
        <p className="max-w-min cursor-pointer underline text-2xl text-indigo-900 hover:text-purple-800"
          onClick={this.props.onBackChange}> Back </p>
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
      </div>
    );
  }
}
export default FinancialCalculationChart;
