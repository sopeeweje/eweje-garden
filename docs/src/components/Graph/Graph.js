import React, {Component} from 'react';
import './Graph.css';
import {db, auth} from "../Firebase/Firebase";
import {LineChart, Line, Tooltip, XAxis, YAxis, Legend, ResponsiveContainer} from 'recharts'; 

class Graph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      range: props.range,
      data: null,
      colors: []
    };
  }

  componentDidMount() {
    auth.signInAnonymously().catch(function(error) {
      // Handle Errors here.
      console.log("Failed sign in")
      console.log(error.code);
      console.log(error.message)
      // ...
    });

    auth.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        //var isAnonymous = user.isAnonymous;
        //console.log(user.uid);
        // ...
      } else {
        // User is signed out.
        // ...
      }
      // ...
    });

    db.ref('data').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      this.setState({
        data: data,
      });
    });
  }

  getDataFromRange = (period, jsonData, sensorType) =>{
    const currentDate = new Date();
    var pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - period);

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

  static getDerivedStateFromProps(props, current_state) {
    if (current_state.range !== props.range || current_state.colors !== props.colors) {
      return {
        range: props.range,
        colors: props.colors
      }
    }
    return null
  }

  getLabel = (input) =>{
    const map = {
      "temp": "Temperature (\u00B0F)",
      "humidity": "Humidity (%)",
      "soil_moisture": "Soil Moisture",
      "light": "Light (lux)"
    };
    return map[input]
  }

  graphTheThing = (stateData) =>{
    return(
      <ResponsiveContainer height="100%" width="100%">
        <LineChart
          data={this.getDataFromRange(this.state.range, stateData, this.props.measurement)} 
          //margin={{top: 5, right: 30, left: 20, bottom: 5}}
        > 
          {/*chart is from https://recharts.org/en-US/*/}
          <XAxis hide={true} type="number" dataKey="datetime" domain={['dataMin','dataMax']} tick={false}/>
          <YAxis hide={true} domain={['dataMin','dataMax']} tick={false} tickFormatter={value => parseFloat(value).toFixed(0)} /*label={{ value: this.getLabel(this.props.measurement), angle: -90, position: 'insideLeft' }}*//>
          <Line type="monotone" dataKey="Sensor1" stroke={this.state.colors[0]} strokeWidth={2} dot={false} isAnimationActive={false} connectNulls={true}/>
          <Line type="monotone" dataKey="Sensor2" stroke={this.state.colors[1]} strokeWidth={2} dot={false} isAnimationActive={false} connectNulls={true}/>
          <Line type="monotone" dataKey="Sensor3" stroke={this.state.colors[2]} strokeWidth={2} dot={false} isAnimationActive={false} connectNulls={true}/>
          {/*<Legend layout="vertical" align="right" verticalAlign="top"/>*/}
          <Tooltip labelFormatter={(name) => (new Date(name)).toString()}/>
        </LineChart>
      </ResponsiveContainer>
    )
  }

  render() {
    return(
      <div style={{height:"100%", width:"100%"}}>
        {this.graphTheThing(this.state.data)}
      </div>
    );
  }
}

export default Graph;
