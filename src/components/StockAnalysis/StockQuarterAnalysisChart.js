import React from "react";
import CanvasJSReact from "../canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class StockQuarterAnalysisChart extends React.Component {
  constructor() {
    super();
    this.graphDataSeries = this.graphDataSeries.bind(this);
  }

  graphDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  }

  stockQuarterAnalysisResult() {
    const resultData = [];
    const stockQuarterAnalysisResultData = this.props.data;
    stockQuarterAnalysisResultData.map((data) => {
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
    const stockQuarterAnalysisResultData = this.props.data;
    const data = {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: stockQuarterAnalysisResultData[0].companyName,
      },
      axisX: {
        valueFormatString: "MMMM-YYYY",
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
          name: stockQuarterAnalysisResultData[0].companyName,
          yValueFormatString: "$###0.00",
          xValueFormatString: "MMMM-YYYY",
          dataPoints: this.stockQuarterAnalysisResult(),
        },
      ],
    };
    return (
      <div className="space-y-6">
        <p className="max-w-min cursor-pointer underline text-2xl text-indigo-900 hover:text-purple-800" 
        onClick={this.props.onBackChange} > Back </p>
        <CanvasJSChart options={data} onRef={(ref) => (this.chart = ref)} />
      </div>
    );
  }
}
export default StockQuarterAnalysisChart;
