import React, {Component} from 'react';
//import {Line} from 'react-chartjs-2';
import { FirebaseDatabaseProvider, FirebaseDatabaseNode } from "@react-firebase/database";
import firebase from "firebase/app";
import "firebase/database";
import './Graph.css';
import FirebaseConfig from '../../FirebaseConfig';
import {Line} from 'react-chartjs-2';
//import testdata from '../../test_data.json'

class Graph extends Component {

  getDataPoint = (index, sensorType, jsonData) => {
    const rawData = jsonData[sensorType][index]; //{"sensor": "Sensor1","date": "20200625","values": [11246,6243,513453,14623,123532]}
    const labels = ["060000", "090000", "120000", "150000", "180000"];
    var datasets = [];
    const title = rawData.date
    datasets.push(
      {
        label: rawData.sensor,
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
        data: rawData.values
      }
    );
    const outputData = {
      labels: labels,
      datasets: datasets
    };
    return([outputData,title])
  };

  render() {
    return(
      <FirebaseDatabaseProvider firebase={firebase} {...FirebaseConfig}>
        <FirebaseDatabaseNode path="/" orderByKey>
          {data => {
            if (data.value === null) return null;
            return(
              <Line
                data={this.getDataPoint(0,this.props.sensor, data.value)[0]}
                options={{
                    title:{
                    display:true,
                    text:this.getDataPoint(0,this.props.sensor, data.value)[1],
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'right'
                    }
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
