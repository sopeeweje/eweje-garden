import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './GraphArea.css';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Graph from "../Graph/Graph";
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Dropdown() {
  const classes = useStyles();
  const [state, setState] = React.useState({range: "Last 24 hours", value: 1}); //initializes state and a function to change the state (setState)

  const handleChange = (event) => {
    setState({range: event.target.range, value: event.target.value});
  };

  return (
    <div>
      <h1>The Eweje Garden</h1>
      <a href="https://github.com/sopeeweje/eweje-garden" rel="noopener noreferrer" target="_blank">Click here for the docs!</a>
      <br></br>
      <FormControl className={classes.formControl}>
        <InputLabel id="graph-range-label">Time Range</InputLabel>
        <Select
          labelId="graph-range-label"
          id="graph range"
          value={state.value}
          onChange={handleChange}
        >
          <MenuItem value={1} range="Last 24 hours">Last 24 hours</MenuItem>
          <MenuItem value={7} range="Last Week">Last Week</MenuItem>
          <MenuItem value={30} range="Last Month">Last Month</MenuItem>
          <MenuItem value={1000} range="All Data">All Data</MenuItem>
        </Select>
      </FormControl>
      <div class="wrapper">
        <div class="chart-container"><Graph sensor="humidity" range={state.value}></Graph></div>
        <div class="chart-container"><Graph sensor="temp" range={state.value}></Graph></div>
        <div class="chart-container"><Graph sensor="light" range={state.value}></Graph></div>
        <div class="chart-container"><Graph sensor="soil_moisture" range={state.value}></Graph></div>
      </div>
    </div>
  );
}
