import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Summary from './Summary';
import Statistics from './Statistics';
import Analysis from './Analysis';
import Financial from './Financial';


const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    
  }
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs className={classes.root} value={value} onChange={this.handleChange} centered textColor="primary" indicatorColor="primary">
            <Tab  label="Summary" href="#basic-tabs"/>
            <Tab  label="Statistics" href="#basic-tabs"/>
            <Tab label="Analysis" href="#basic-tabs" />
            <Tab label="Financial" href="#basic-tabs" />
          </Tabs>
        </AppBar>
        {value === 0 && <Summary/>}
        {value === 1 && <Statistics/>}
        {value === 2 && <Analysis/>}
        {value === 3 && <Financial/>}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);