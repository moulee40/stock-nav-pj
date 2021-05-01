import React from "react";
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
        <p className="text-4xl font-semibold text-gray-700 text-center shadow-md py-5">
          ABM Finance Home
        </p>
        {/* <Tab /> */}
        <div className="flex flex-grow space-x-3">
          <div className="ml-1 w-96 shadow-xl"><MenuItem handleMenuItemClick={this.handleMenuItemClick} currentNavItem={currentNavItem}/></div>
          <div className="mr-1 flex-grow shadow-xl"><MenuContent currentNavItem={currentNavItem}/></div>
        </div>
      </div>
    );
  }
}

export default Index;
