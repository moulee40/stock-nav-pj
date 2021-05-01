import React from "react";
import CanvasJSReact from "../canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class CanvasChart extends React.Component {
 
  render() {
    return (
      <div className="space-y-6">
              <CanvasJSChart options={this.props.resultData} onRef={(ref) => (this.chart = ref)} />
      </div>
    );
  }
}
export default CanvasChart;
