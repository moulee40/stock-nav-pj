import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Overview from './Overview';
import ExchangeStats from './ExchangeStats';
import Analysis from './Analysis';
import Financial from './Financial';


const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    
  },
  appBar_root:{
    width: '25%',
    boxShadow: 'none',
    
  },
  tab_root:{
    fontSize:'25px',
    marginBottom:'20px'
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
        <AppBar position="static" className={classes.appBar_root}>
          <Tabs orientation="vertical" className={classes.root} value={value} onChange={this.handleChange} centered textColor="primary">
            <Tab className={classes.tab_root} label="Summary" href="#basic-tabs"/>
            <Tab className={classes.tab_root} label="Statistics" href="#basic-tabs"/>
            <Tab className={classes.tab_root} label="Analysis" href="#basic-tabs" />
            <Tab className={classes.tab_root} label="Financial" href="#basic-tabs" />
          </Tabs>
        </AppBar>
        {value === 0 && <Overview/>}
        {value === 1 && <ExchangeStats/>}
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