import React, {Component} from 'react';
//import {Line} from 'react-chartjs-2';
import { FirebaseDatabaseProvider, FirebaseDatabaseNode } from "@react-firebase/database";
import firebase from "firebase/app";
import "firebase/database";
import './Graph.css';
import FirebaseConfig from '../../FirebaseConfig';
import {Line} from 'react-chartjs-2';

class Graph extends Component {

  getDataFromRange = (sensorType, doi, range, jsonData) =>{
    //calculate ms from current date
    //past = doi - range
    //calculate ms from past
    //for each point in data
      //calculate ms of date
      //confirm that it is in range, add to outputdata
    return null
  }

  getAllData = (sensorType, jsonData) => {
    var rawData = [];
    var labels = [];
    for (var point in jsonData){
      rawData.push(jsonData[point][sensorType]);
      labels.push(jsonData[point]["time"]);
    }
    var datasets = [];
    const title = "All Data"
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
  };

  render() {
    return(
      <FirebaseDatabaseProvider firebase={firebase} {...FirebaseConfig}>
        <FirebaseDatabaseNode path="/data/" orderByKey>
          {data => {
            if (data.value === null) return null;
            return(
              <Line
                data={this.getAllData(this.props.sensor, data.value)[0]}
                options={{
                    title:{
                    display:true,
                    text:this.getAllData(this.props.sensor, data.value)[1],
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
