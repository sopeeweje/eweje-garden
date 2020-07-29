import React, {Fragment} from 'react';
import {db} from "../Firebase/Firebase";
import classnames from "classnames";

export default class TableContent extends React.Component {
  constructor() {
    super();
    this.state = {
        sensorNames: [],
        temp_data: {},
        temp_delta: {},
        moisture_data: {},
        moisture_delta: {},
        humidity_data: {},
        humidity_delta: {},
        light_data: {},
        light_delta: {},
        range: {}
  }}

  componentDidMount() {
    db.ref('data').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      this.setState({
        sensorNames: '',
        temp_data: this.getDataFromRange(0, this.props.range, data, "temp"),
        temp_delta: this.getDataFromRange(this.props.range, 2*this.props.range, data, "temp"),

        moisture_data: this.getDataFromRange(0, this.props.range, data, "soil_moisture"),
        moisture_delta: this.getDataFromRange(this.props.range,2*this.props.range,data,"soil_moisture"),

        humidity_data: this.getDataFromRange(0, this.props.range, data, "humidity"),
        humidity_delta: this.getDataFromRange(this.props.range,2*this.props.range,data,"humidity"),

        light_data: this.getDataFromRange(0, this.props.range, data, "light"),
        light_delta: this.getDataFromRange(this.props.range,2*this.props.range,data,"light"),

        range: this.props.range
      });
    });
  }

  getDataFromRange = (recent, past, jsonData, sensorType) =>{
    var currentDate = new Date();
    var pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - past);
    currentDate.setDate(currentDate.getDate() - recent);

    var pointDate;
    var pointsInRange = [];
    for (var point in jsonData){
      pointDate = new Date(jsonData[point]["date"]);
      pointDate.setHours(jsonData[point]["time"].substring(0,2));
      pointDate.setMinutes(jsonData[point]["time"].substring(2,4));
      pointDate.setSeconds(jsonData[point]["time"].substring(4));
      if (pointDate >= pastDate && pointDate <= currentDate ){
        jsonData[point]["datetime"] = pointDate.getTime();
        pointsInRange.push(jsonData[point]);
      }
    }
    var newData = [];
    for (var i = 0; i < pointsInRange.length; i++){
      if (pointsInRange[i][sensorType] !== "-"){
        const key = pointsInRange[i]["sensor"];
        var newPoint = {};
        newPoint[key] =  pointsInRange[i][sensorType];
        newPoint["datetime"] = pointsInRange[i]["datetime"];
        newData.push(newPoint);
        //pointsInRange[i]
      }
    }
    return(newData);
    /*[{Sensor1: 77.01468, datetime: 12340982343},
       {Sensor2: 42.01468, datetime: 32450921342},
       ...]*/
  }

  getAverage = (data, sensor) => {
    var total = 0;
    var totalPoints = 0;
    for(var i = 0; i < data.length; i++) {
        if (sensor in data[i] && data[i][sensor] !== "-"){
            total += data[i][sensor];
            totalPoints += 1;
        }
    }
    var avg = total / totalPoints;
    return avg.toFixed(1);
  }

  getDelta = (currentData, pastData, sensor) => {
    var total = 0;
    var totalPoints = 0;
    for(var i = 0; i < currentData.length; i++) {
        if (sensor in currentData[i] && currentData[i][sensor] !== "-"){
            total += currentData[i][sensor];
            totalPoints += 1;
        }
    }
    var currentAvg = total / totalPoints;

    var pastTotal = 0;
    var pastTotalPoints = 0;
    for(var j = 0; j < pastData.length; j++) {
      if (sensor in pastData[j] && pastData[j][sensor] !== "-"){
          pastTotal += pastData[j][sensor];
          pastTotalPoints += 1;
      }
    }
    var pastAvg = pastTotal / pastTotalPoints;

    var change = 100*(currentAvg-pastAvg)/pastAvg;

    if (isNaN(change)){
      return(<td className="text-center">N/a</td>)
    }
    else if (change >= 0){
      return(<td className="text-center text-success">{(change).toFixed(1).toString().concat("%")}</td>);
    }
    else{
      return(<td className="text-center text-danger">{(change).toFixed(1).toString().concat("%")}</td>);
    }
    
  }

  static getDerivedStateFromProps(props, current_state) {
    if (current_state.sensorNames !== props.sensorNames || current_state.range !== props.range) {
      return {
        range: props.range,
        sensorNames: props.sensorNames
      }
    }
    return null
  }

  getTable = () => {
    var rows = [];
    for (var i = 0; i < this.state.sensorNames.length; i++){
      var sensor = this.state.sensorNames[i];
      rows.push(
        <tr>
          <td className="text-center">{sensor}</td>
          <td className="text-center">{this.getAverage(this.state.temp_data, sensor)}</td>
          {this.getDelta(this.state.temp_data, this.state.temp_delta, sensor)}

          <td className="text-center">{this.getAverage(this.state.moisture_data, sensor)}</td>
          {this.getDelta(this.state.moisture_data, this.state.moisture_delta, sensor)}

          <td className="text-center">{this.getAverage(this.state.light_data, sensor)}</td>
          {this.getDelta(this.state.light_data, this.state.light_delta, sensor)}

          <td className="text-center">{this.getAverage(this.state.humidity_data, sensor)}</td>
          {this.getDelta(this.state.humidity_data, this.state.humidity_delta, sensor)}

        </tr>
      )
    }
    return(
      <Fragment>
        {rows}
      </Fragment>
    )
  }

  render() {
    return (
        <table className="align-middle mb-0 table table-borderless table-striped table-hover">
            <thead>
            <tr>
                <th className="text-center">Sensor</th>
                <th className="text-center">Avg. Temp</th>
                <th className="text-center">&Delta;Temp</th>
                <th className="text-center">Avg. Moisture</th>
                <th className="text-center">&Delta;Moisture</th>
                <th className="text-center">Avg. Sunlight</th>
                <th className="text-center">&Delta;Sunlight</th>
                <th className="text-center">Avg. Humidity</th>
                <th className="text-center">&Delta;Humidity</th>
            </tr>
            </thead>
            <tbody>
                {this.getTable()}
            </tbody>
        </table>
    );
  }
}
