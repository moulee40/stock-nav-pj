import React from "react";
import Tab from "./Tab";
import MenuItem from "./MenuItem";
import MenuContent from "./MenuContent";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNavItem : 0
    };
  }

  handleMenuItemClick = index =>{
    this.setState({currentNavItem:index});
  }
  render() {
    const {currentNavItem} = this.state;
    return (
      <div className="space-y-3 flex flex-col flex-grow">
        <p className="text-4xl font-semibold text-indigo-900 text-center shadow-md py-5">
          ABM Finance Home
        </p>
        {/* <Tab /> */}
        <div className="flex flex-grow space-x-3">
          <div className="ml-1 w-1/4 shadow-xl"><MenuItem handleMenuItemClick={this.handleMenuItemClick}/></div>
          <div className="mr-1 flex-grow shadow-xl"><MenuContent currentNavItem={currentNavItem}/></div>
        </div>
      </div>
    );
  }
}

export default Index;
