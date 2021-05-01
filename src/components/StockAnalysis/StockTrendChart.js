import React from "react";
import CanvasJSReact from "../canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class StockTrendChart extends React.Component {
  constructor() {
    super();
    this.grapgDataSeries = this.grapgDataSeries.bind(this);
  }
  grapgDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  }
  state = {};

  actualStockPriceResult() {
    const resultData = [];
    const stockTrendResultData = this.props.data;
    stockTrendResultData.map((data) => {
      let date = new Date(data.tradeDate);
      let jsonData = { x: date, y: data.price };
      resultData.push(jsonData);
    });
    return resultData;
  }

  fiftyDaysAverageResult() {
    const resultData = [];
    const stockTrendResultData = this.props.data;
    stockTrendResultData.map((data) => {
      let date = new Date(data.tradeDate);
      let jsonData = { x: date, y: data.fiftyDayAverage };
      resultData.push(jsonData);
    });
    return resultData;
  }

  twoHundredDaysAverageResult() {
    const resultData = [];
    const stockTrendResultData = this.props.data;
    stockTrendResultData.map((data) => {
      let date = new Date(data.tradeDate);
      let jsonData = { x: date, y: data.twoHundredDayAverage };
      resultData.push(jsonData);
    });
    return resultData;
  }
  render() {
    const { fiftyDaysAverage, twoHundredDaysAverage } = this.props;
    const stockTrendResultData = this.props.data;

    const actualPriceData = {
      type: "line",
      name: "Actual Price",
      showInLegend: true,
      xValueFormatString: "MMMM-YYYY",
      yValueFormatString: "$#,##0",
      dataPoints: this.actualStockPriceResult(),
    };

    const fiftyDaysAverageData = {
      type: "line",
      name: "50 Days Moving Average",
      showInLegend: true,
      xValueFormatString: "MMMM-YYYY",
      yValueFormatString: "$#,##0",
      dataPoints: this.fiftyDaysAverageResult(),
    };
    const twoHundredDaysAverageData = {
      type: "line",
      name: "200 Days Moving Average",
      markerBorderColor: "white",
      markerBorderThickness: 2,
      showInLegend: true,
      xValueFormatString: "MMMM-YYYY",
      yValueFormatString: "$#,##0",
      dataPoints: this.twoHundredDaysAverageResult(),
    };

    const data = {
      animationEnabled: true,
      colorSet: "colorSet2",
      title: {
        text: stockTrendResultData[0].companyName,
      },
      axisX: {
        valueFormatString: "MMMM-YYYY",
      },
      axisY: {
        prefix: "$",
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: "pointer",
        itemclick: this.grapgDataSeries,
        verticalAlign: "top",
      },
      data: [
        actualPriceData,
        fiftyDaysAverage ? fiftyDaysAverageData : {},
        twoHundredDaysAverage ? twoHundredDaysAverageData : {},
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

export default StockTrendChart;
