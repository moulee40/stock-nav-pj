import React from "react";
import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class MovingAverageChart extends React.Component {
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

  handleActualPriceData() {
    const finalData = [];
    const movingAverageData = this.props.data;
    movingAverageData.map((data) => {
      let date = new Date(data.tradeDate);
      let tempData = { x: date, y: data.price };
      finalData.push(tempData);
    });
    return finalData;
  }

  handle50DaysAverageData() {
    const finalData = [];
    const movingAverageData = this.props.data;
    movingAverageData.map((data) => {
      let date = new Date(data.tradeDate);
      let tempData = { x: date, y: data.fiftyDayAverage };
      finalData.push(tempData);
    });
    return finalData;
  }

  handle200DaysAverageData() {
    const finalData = [];
    const movingAverageData = this.props.data;
    movingAverageData.map((data) => {
      let date = new Date(data.tradeDate);
      let tempData = { x: date, y: data.twoHundredDayAverage };
      finalData.push(tempData);
    });
    return finalData;
  }
  render() {
    const { fiftyDaysAverage, twoHundredDaysAverage } = this.props;
    const movingAverageData = this.props.data;

    const actualPriceData = {
      type: "line",
      name: "Actual Price",
      showInLegend: true,
      xValueFormatString: "MMMM-YYYY",
      yValueFormatString: "$#,##0",
      dataPoints: this.handleActualPriceData(),
    };

    const fiftyDaysAverageData = {
      type: "line",
      name: "50 Days Moving Average",
      showInLegend: true,
      xValueFormatString: "MMMM-YYYY",
      yValueFormatString: "$#,##0",
      dataPoints: this.handle50DaysAverageData(),
    };
    const twoHundredDaysAverageData = {
      type: "line",
      name: "200 Days Moving Average",
      markerBorderColor: "white",
      markerBorderThickness: 2,
      showInLegend: true,
      xValueFormatString: "MMMM-YYYY",
      yValueFormatString: "$#,##0",
      dataPoints: this.handle200DaysAverageData(),
    };

    const data = {
      animationEnabled: true,
      colorSet: "colorSet2",
      title: {
        text: movingAverageData[0].companyName,
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
        itemclick: this.toggleDataSeries,
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

export default MovingAverageChart;
