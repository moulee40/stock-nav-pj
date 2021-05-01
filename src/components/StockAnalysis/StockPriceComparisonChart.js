import React from "react";
import CanvasJSReact from "../canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class StockPriceComparisonChart extends React.Component {
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

  stockSymbol1Data() {
    const resultData = [];
    const stockSymbol1Data = this.props.data1;
    stockSymbol1Data.map((data) => {
      let openPrice = data.openPrice;
      let date = new Date(data.tradeDate);
      let jsonData = { x: date, y: openPrice };
      resultData.push(jsonData);
    });
    return resultData;
  }
  stockSymbol2Data() {
    const resultData = [];
    const stockSymbol2Data = this.props.data2;
    stockSymbol2Data.map((data) => {
      let openPrice = data.openPrice;
      let date = new Date(data.tradeDate);
      let jsonData = { x: date, y: openPrice };
      resultData.push(jsonData);
    });
    return resultData;
  }

  render() {
    const stockSymbol1Data = this.props.data1;
    const stockSymbol2Data = this.props.data2;
    const company1 = stockSymbol1Data[0].companyName;
    const company2 = stockSymbol2Data[0].companyName;
    const data = {
      animationEnabled: true,
      colorSet: "colorSet2",
      title: {
        text: company1.concat(" vs ").concat(company2),
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
        itemclick: this.graphDataSeries,
        verticalAlign: "top",
      },
      data: [
        {
          type: "line",
          name: company1,
          showInLegend: true,
          xValueFormatString: "MMMM-YYYY",
          yValueFormatString: "$###0.00",
          dataPoints: this.stockSymbol1Data(),
        },
        {
          type: "line",
          name: company2,
          showInLegend: true,
          xValueFormatString: "MMMM-YYYY",
          yValueFormatString: "$###0.00",
          dataPoints: this.stockSymbol2Data(),
        },
      ],
    };

    return (
      <div className="space-y-6">
        <p className="max-w-min cursor-pointer underline text-2xl text-indigo-900 hover:text-purple-800"
          onClick={this.props.onBackChange} > Back  </p>
        <CanvasJSChart options={data} onRef={(ref) => (this.chart = ref)} />
      </div>
    );
  }
}

export default StockPriceComparisonChart;
