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
      //range: "Last 24 hours",
      range: 1,
      measurement: null,
      colors: []
    };
  }

  /*handleChange = (event) => {
    this.setState({range: event.target.range, value: event.target.value});
  };*/

  componentDidMount() {
    this.setState({measurement: this.props.measurement})
  }

  static getDerivedStateFromProps(props, current_state) {
    if (current_state.range !== props.range || current_state.colors !== props.colors) {
      return {
        range: props.range,
        colors: props.colors
      }
    }
    return null
  }

  render() {
    return (
      <div style={{height: 320}}>
        <Graph colors={this.state.colors} range={this.state.range} measurement={this.state.measurement}></Graph>
      </div>
    );
  }
}

export default GraphArea;