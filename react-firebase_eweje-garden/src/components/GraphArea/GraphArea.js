import React, {Component} from 'react';
import './GraphArea.css';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Graph from "../Graph/Graph";
import MenuItem from '@material-ui/core/MenuItem';

class GraphArea extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      range: "Last Month",
      value: 30,
      measurement: null
    };
  }

  handleChange = (event) => {
    this.setState({range: event.target.range, value: event.target.value});
  };

  componentDidMount() {
    this.setState({measurement: this.props.measurement})
  }

  render() {
    return (
      <div>
        <FormControl>
          <InputLabel id="graph-range-label">Time Range</InputLabel>
          <Select
            labelId="graph-range-label"
            id="graph range"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <MenuItem value={1} range="Last 24 hours">Last 24 hours</MenuItem>
            <MenuItem value={7} range="Last Week">Last Week</MenuItem>
            <MenuItem value={30} range="Last Month">Last Month</MenuItem>
            <MenuItem value={1000} range="All Data">All Data</MenuItem>
          </Select>
        </FormControl>
        <div class="wrapper">
          <div class="chart-container"><Graph range={this.state.value} measurement={this.state.measurement}></Graph></div>
        </div>
      </div>
    );
  }
}

export default GraphArea;