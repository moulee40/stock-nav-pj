import React from "react";
import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class StockComparisonChart extends React.Component {
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
  state = {};
  handleSymbolData1() {
    const finalData = [];
    const data1 = this.props.data1;
    data1.map((data) => {
      let openPrice = data.openPrice;
      let highPrice = data.highPrice;
      let lowPrice = data.lowPrice;
      let closePrice = data.closePrice;
      let date = new Date(data.tradeDate);
      let tempData = { x: date, y: openPrice };
      finalData.push(tempData);
    });
    return finalData;
  }
  handleSymbolData2() {
    const finalData = [];
    const data2 = this.props.data2;
    data2.map((data) => {
      let openPrice = data.openPrice;
      let highPrice = data.highPrice;
      let lowPrice = data.lowPrice;
      let closePrice = data.closePrice;
      let date = new Date(data.tradeDate);
      let tempData = { x: date, y: openPrice };
      finalData.push(tempData);
    });
    return finalData;
  }
  render() {
    const data1 = this.props.data1;
    const data2 = this.props.data2;
    const stock1 = data1[0].companyName;
    const stock2 = data2[0].companyName;
    const data = {
      animationEnabled: true,
      colorSet: "colorSet2",
      title: {
        text: stock1.concat(" vs ").concat(stock2),
      },
      axisX: {
        valueFormatString: "MMMM-YYYY",
      },
      axisY: {
        includeZero: false,
        prefix: "$",
        title: "Price (in USD)",
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: "pointer",
        itemclick: this.toggleDataSeries,
        verticalAlign: "top",
      },
      data: [
        {
          type: "line",
          name: stock1,
          showInLegend: true,
          xValueFormatString: "MMMM-YYYY",
          yValueFormatString: "$###0.00",
          dataPoints: this.handleSymbolData1(),
        },
        {
          type: "line",
          name: stock2,
          showInLegend: true,
          xValueFormatString: "MMMM-YYYY",
          yValueFormatString: "$###0.00",
          dataPoints: this.handleSymbolData2(),
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
        <CanvasJSChart options={data} onRef={(ref) => (this.chart = ref)} />
      </div>
    );
  }
}

export default StockComparisonChart;
