import React, {Component} from 'react';
import './Trends.css';
import {db} from "../Firebase/Firebase";

class Trends extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      avg: null,
    };
  }

  getAverage = (measurement, data) => {
    var num_data = [];
    for (var point in data){
      if (data[point][measurement] !== "-"){
        num_data.push(data[point][measurement])
      }
    }
    var total = 0;
    for(var i = 0; i < num_data.length; i++) {
        total += num_data[i];
    }
    var avg = total / num_data.length;
    return avg.toFixed(1);
  }

  componentDidMount() {
    db.ref('data').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      this.setState({
        data: data,
        avg: this.getAverage(this.props.measurement, data)
      });
    });
  }

  render() {
    return(
      <div>
        {this.state.avg}
      </div>
    );
  }
}

export default Trends;
