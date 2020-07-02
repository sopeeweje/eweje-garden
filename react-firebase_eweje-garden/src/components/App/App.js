import React, {Component} from 'react';
import Graph from "../Graph/Graph"
import Dropdown from "../Dropdown/Dropdown"
import './App.css';

class App extends Component {
  render() {
    return(
      <div>
        <Dropdown></Dropdown>
        <Graph sensor="humidity" />
        <Graph sensor="temp" />
        <Graph sensor="light" />
      </div>
    )
  }
}

export default App;
