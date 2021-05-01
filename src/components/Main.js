import React from "react";
import Tab from "./Tab";
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="space-y-3 flex flex-col">
        <p className="text-4xl font-semibold text-indigo-900 text-center shadow-md py-5">
          ABM Finance Home
        </p>
        <Tab />
        {/* <div className="flex flex-grow">
          <div className="w-1/4"><MenuItems/></div>
          <div className="flex-grow">Menu Contents</div>
        </div> */}
      </div>
    );
  }
}

export default Main;
