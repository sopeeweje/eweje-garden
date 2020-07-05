import React, {Component} from 'react';
//import {Line} from 'react-chartjs-2';
import { FirebaseDatabaseProvider, FirebaseDatabaseNode } from "@react-firebase/database";
import firebase from "firebase/app";
import "firebase/database";
import './Graph.css';
import FirebaseConfig from '../../FirebaseConfig';
import {Line} from 'react-chartjs-2';

class Graph extends Component {

  getDataFromRange = (sensorType, period, jsonData) =>{
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
        pointsInRange.push(jsonData[point])
      }
    }
    var rawData = [];
    var labels = [];
    for (var i = 0; i < pointsInRange.length; i++){
      rawData.push(pointsInRange[i][sensorType]);
      labels.push(pointsInRange[i]["time"]);
    }
    var datasets = [];
    const title = sensorType;
    datasets.push(
      {
        label: sensorType,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: rawData
      }
    );
    const outputData = {
      labels: labels,
      datasets: datasets
    };
    return([outputData,title])
  }

  render() {
    return(
      <FirebaseDatabaseProvider firebase={firebase} {...FirebaseConfig}>
        <FirebaseDatabaseNode path="/data/" orderByKey>
          {data => {
            if (data.value === null) return null;
            return(
              <Line
                data={this.getDataFromRange(this.props.sensor, this.props.range, data.value)[0]}
                options={{
                    title:{
                    display:true,
                    text:this.getDataFromRange(this.props.sensor, this.props.range, data.value)[1],
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'right'
                    },
                    animation: {
                      duration: 0 // general animation time
                    },
                    hover: {
                      animationDuration: 0 // duration of animations when hovering an item
                    },
                    responsiveAnimationDuration: 0 // animation duration after a resize
                }}
              />
            )
          }}
        </FirebaseDatabaseNode>
      </FirebaseDatabaseProvider>
    );
  }
}

export default Graph;
