import React from "react";
import CanvasChart from "./CanvasChart";
import Button from '@material-ui/core/Button';


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
      let openPrice = data.open;
      let date = new Date(data.date);
      let jsonData = { x: date, y: openPrice };
      resultData.push(jsonData);
    });
    return resultData;
  }
  stockSymbol2Data() {
    const resultData = [];
    const stockSymbol2Data = this.props.data2;
    stockSymbol2Data.map((data) => {
      let openPrice = data.open;
      let date = new Date(data.date);
      let jsonData = { x: date, y: openPrice };
      resultData.push(jsonData);
    });
    return resultData;
  }

  render() {
    const stockSymbol1Data = this.props.data1;
    const stockSymbol2Data = this.props.data2;
    const company1 = stockSymbol1Data[0].company;
    const company2 = stockSymbol2Data[0].company;
    const data = {
      animationEnabled: true,
      theme: "dark2",
      title: {
        text: company1.concat(" vs ").concat(company2),
      },
      axisX: {
        valueFormatString: "MMM-YYYY",
      },
      axisY: {
        includeZero: false,
        prefix: "$",
        title: "Price",
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
          xValueFormatString: "MMM-YYYY",
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
        <Button size="large" onClick={this.props.onBackChange}>Back</Button>
        <CanvasChart resultData={data} />
      </div>
    );
  }
}

export default StockPriceComparisonChart;
