import React from 'react';
import { Card, Button, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import TableContent from "../TableContent/TableContent";

export default class DataTable extends React.Component {
  constructor() {
    super();
    this.state = {
        activeTab1: '11',

    };
    this.toggle1 = this.toggle1.bind(this);
  }

  toggle1(tab) {
    if (this.state.activeTab1 !== tab) {
        this.setState({
            activeTab1: tab
        });
        console.log(tab);
    }
  }

  render() {
    return (
      <Card className="main-card mb-3">
          <div className="card-header">Your Data
              <div className="btn-actions-pane-right">
                  <div role="group" className="btn-group-sm btn-group">
                      <button outline
                              className={"btn btn-info"+ classnames({active: this.state.activeTab1 === '11'})}
                              onClick={() => {
                          this.toggle1('11');
                      }}>24 hours</button>
                      <button outline
                              className={"btn btn-info"+ classnames({active: this.state.activeTab1 === '22'})}
                              onClick={() => {
                          this.toggle1('22');
                      }}>Week</button>
                      <button outline
                              className={"btn btn-info"+ classnames({active: this.state.activeTab1 === '33'})}
                              onClick={() => {
                          this.toggle1('33');
                      }}>Month</button>
                      <button outline
                              className={"btn btn-info"+ classnames({active: this.state.activeTab1 === '44'})}
                              onClick={() => {
                          this.toggle1('44');
                      }}>All time</button>
                  </div>
              </div>
          </div>
          <div className="table-responsive">
            <TabContent activeTab={this.state.activeTab1}>
            <TabPane tabId="11">{/* 24 hours */}
                <TableContent sensorNames={["Sensor1", "Sensor2", "Sensor3"]} range={1}></TableContent>
            </TabPane>
            <TabPane tabId="22">{/* Week */}
                <TableContent sensorNames={["Sensor1", "Sensor2", "Sensor3"]} range={7}></TableContent>
            </TabPane>
            <TabPane tabId="33">{/* Month */} 
                <TableContent sensorNames={["Sensor1", "Sensor2", "Sensor3"]} range={30}></TableContent>
            </TabPane>
            <TabPane tabId="44">{/* All */}
                <TableContent sensorNames={["Sensor1", "Sensor2", "Sensor3"]} range={1000}></TableContent>
            </TabPane>
            </TabContent>
                  
          </div>
          <div className="d-block text-center card-footer">
              <button className="mr-2 btn-icon btn-icon-only btn btn-outline-danger"><i className="pe-7s-trash btn-icon-wrapper"> </i></button>
              <button className="btn-wide btn btn-success">Save</button>
          </div>
      </Card>
    );
  }
}
