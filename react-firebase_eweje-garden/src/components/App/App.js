import React, {Component, Fragment} from 'react';
import GraphArea from "../GraphArea/GraphArea"
import DataTable from "../DataTable/DataTable"
import './App.css';
import '../../assets/base.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Trends from '../Trends/Trends'
import {
  Row, Col,
  Button,
  CardHeader,
  Card,
  CardBody,
  Progress,
  TabContent,
  TabPane,
} from 'reactstrap';

import {
  ResponsiveContainer,
} from 'recharts';

//import {Line} from 'react-chartjs-2';

import {
  faAngleUp,
  faArrowRight,
  faArrowUp,
  faArrowLeft,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class App extends Component {
  constructor() {
    super();
    this.state = {
        dropdownOpen: false,
        activeTab1: '11',

    };
    this.toggle = this.toggle.bind(this);
    this.toggle1 = this.toggle1.bind(this);
  }

  toggle() {
      this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
      }));
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
    return(
      <div>
        <section id="banner">
          <h1><b>CHIIN</b></h1>
          <h3>The COVID-19 Healthcare Information Integration Network</h3>
          <h4>Bringing locally relevant, up-to-date informmation regarding the pandemic to Africa's frontline healthcare workers.</h4>
			  </section>
        <Fragment>
          <ReactCSSTransitionGroup
              component="div"
              transitionName="TabsAnimation"
              transitionAppear={true}
              transitionAppearTimeout={0}
              transitionEnter={false}
              transitionLeave={false}>
              <div>
                  <Row>
                      <Col md="12" lg="6">{/* sm, md, lg, xl set relative break points for different size screens */}
                          <Card className="mb-3">
                              {/* mb-3 is for margins and padding or something, from bootstrap. Most of these classes are from bootstrap, which you don't know but that's fine */}
                              <CardHeader className="card-header-tab"> {/* This is the header of the card */}
                                  <div className="card-header-title">
                                      <i className="header-icon lnr-chart-bars icon-gradient bg-deep-blue"> </i>
                                      Live Data
                                      {/* 
                                      lnr icon is from https://linearicons.com/ 
                                      icon bg color is from https://jspwiki-wiki.apache.org/Wiki.jsp?page=Background%20Gradients  
                                      */}
                                  </div>
                                  <div className="btn-actions-pane-right">
                                      {/* Tab buttons. Figure out how to change color to the one you want */}
                                      <Button outline
                                              className={"ml-1  btn-pill btn-wide border-0 btn-transition bg-grow-early"}
                                              onClick={() => {
                                          this.toggle1('11');
                                      }}>Temp</Button>
                                      <Button outline
                                              className={"ml-1 btn-pill btn-wide border-0 btn-transition bg-love-kiss"} // + classnames({active: this.state.activeTab1 === '22'})
                                              color="primary" onClick={() => {
                                          this.toggle1('22');
                                      }}>Humidity</Button>
                                      <Button outline
                                              className={"ml-1 btn-pill btn-wide border-0 btn-transition bg-malibu-beach"}
                                              color="primary" onClick={() => {
                                          this.toggle1('33');
                                      }}>Moisture</Button>
                                      <Button outline
                                              className={"ml-1 btn-pill btn-wide border-0 btn-transition bg-sunny-morning"}
                                              onClick={() => {
                                          this.toggle1('44');
                                      }}>Light</Button>
                                  </div>
                              </CardHeader>
                              <TabContent activeTab={this.state.activeTab1}>
                                  <TabPane tabId="11">{/* Temperature Tab */}
                                      <div className="widget-chart p-0">
                                          <ResponsiveContainer height={395}>
                                              <GraphArea measurement="temp"></GraphArea>
                                          </ResponsiveContainer>
                                      </div>
                                  </TabPane>
                                  <TabPane tabId="22">{/* Humidity Tab */}
                                      <div className="widget-chart p-0">
                                          <ResponsiveContainer height={395}>
                                              <GraphArea measurement="humidity"></GraphArea>
                                          </ResponsiveContainer>
                                      </div>
                                  </TabPane>
                                  <TabPane tabId="33">{/* Moisture Tab */} 
                                      <div className="widget-chart p-0">
                                          <ResponsiveContainer height={395}>
                                              <GraphArea measurement="soil_moisture"></GraphArea>
                                          </ResponsiveContainer>
                                      </div>
                                  </TabPane>
                                  <TabPane tabId="44">{/* Light Tab */}
                                      <div className="widget-chart p-0">
                                          <ResponsiveContainer height={395}>
                                              <GraphArea measurement="light"></GraphArea>
                                          </ResponsiveContainer>
                                      </div>
                                  </TabPane>
                              </TabContent>
                          </Card>
                      </Col>
                      <Col md="12" lg="6">
                          <Row>
                              <Col md="6">
                                  {/* bg colors https://demo.uifort.com/bamburgh-admin-dashboard-pro/examples/colors.html */}
                                  <div className="card mb-3 bg-sunny-morning widget-chart text-white card-border">
                                      <div className="icon-wrapper rounded-circle">
                                          <div className="icon-wrapper-bg bg-white opacity-4"/>
                                          <i className="lnr-sun"/> {/*  icon-gradient bg-sunny-morning */}
                                      </div>
                                      <div className="widget-numbers">
                                          <Trends measurement="light"></Trends>
                                      </div>
                                      <div className="widget-subheading">
                                          Avg. Sunlight
                                      </div>
                                      <div className="widget-description text-white">
                                          <FontAwesomeIcon icon={faAngleUp}/>
                                          <span className="pl-1">54.9%</span>
                                      </div>
                                  </div>
                              </Col>
                              <Col md="6">
                                  <div className="card mb-3 bg-malibu-beach widget-chart text-white card-border">
                                      <div className="icon-wrapper rounded">
                                          <div className="icon-wrapper-bg bg-white opacity-4"/>
                                          <i className="lnr-drop"/>
                                      </div>
                                      <div className="widget-numbers">
                                          <Trends measurement="soil_moisture"></Trends>
                                      </div>
                                      <div className="widget-subheading">
                                          Avg. Moisture
                                      </div>
                                      <div className="widget-description text-white">
                                          <span className="pr-1">62,7%</span>
                                          <FontAwesomeIcon icon={faArrowLeft}/>
                                      </div>
                                  </div>
                              </Col>
                              <Col md="6">
                                  <div className="card mb-3 bg-grow-early widget-chart text-white card-border">
                                      <div className="icon-wrapper rounded">
                                          <div className="icon-wrapper-bg bg-white opacity-4"/>
                                          <i className="lnr-earth"/>
                                      </div>
                                      <div className="widget-numbers">
                                          <Trends measurement="temp"></Trends>
                                      </div>
                                      <div className="widget-subheading">
                                          Avg. Temperature
                                      </div>
                                      <div className="widget-description text-white">
                                          <FontAwesomeIcon icon={faArrowRight}/>
                                          <span className="pl-1">72.1%</span>
                                      </div>
                                  </div>
                              </Col>
                              <Col md="6">
                                  <div className="card mb-3 bg-love-kiss widget-chart card-border">
                                      <div className="widget-chart-content text-white">
                                          <div className="icon-wrapper rounded-circle">
                                              <div className="icon-wrapper-bg bg-white opacity-4"/>
                                              <i className="lnr-cloud"/>
                                          </div>
                                          <div className="widget-numbers">
                                              <Trends measurement="humidity"></Trends>
                                          </div>
                                          <div className="widget-subheading">
                                              Avg. Humidity
                                          </div>
                                          <div className="widget-description">
                                              <FontAwesomeIcon className="text-white opacity-5" icon={faAngleUp}/>
                                              <span className="text-white">175.5%</span>
                                          </div>
                                      </div>
                                  </div>
                              </Col>
                          </Row>
                      </Col>
                  </Row>
                  <Row>
                      <Col md="12">
                          <Card className="main-card mb-3">
                              <div className="card-header">Active Users
                                  <div className="btn-actions-pane-right">
                                      <div role="group" className="btn-group-sm btn-group">
                                          <button className="active btn btn-info">Last Week</button>
                                          <button className="btn btn-info">All Month</button>
                                      </div>
                                  </div>
                              </div>
                              <div className="table-responsive">
                                  <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                                      <thead>
                                      <tr>
                                          <th className="text-center">#</th>
                                          <th>Name</th>
                                          <th className="text-center">City</th>
                                          <th className="text-center">Status</th>
                                          <th className="text-center">Actions</th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                      <tr>
                                          <td className="text-center text-muted">#345</td>
                                          <td>
                                              <div className="widget-content p-0">
                                                  <div className="widget-content-wrapper">
                                                      <div className="widget-content-left mr-3">
                                                          <div className="widget-content-left">
                                                              
                                                          </div>
                                                      </div>
                                                      <div className="widget-content-left flex2">
                                                          <div className="widget-heading">John Doe</div>
                                                          <div className="widget-subheading opacity-7">Web Developer</div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </td>
                                          <td className="text-center">Madrid</td>
                                          <td className="text-center">
                                              <div className="badge badge-warning">Pending</div>
                                          </td>
                                          <td className="text-center">
                                              <button type="button" className="btn btn-primary btn-sm">Details</button>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td className="text-center text-muted">#347</td>
                                          <td>
                                              <div className="widget-content p-0">
                                                  <div className="widget-content-wrapper">
                                                      <div className="widget-content-left mr-3">
                                                          <div className="widget-content-left">
                                                              
                                                          </div>
                                                      </div>
                                                      <div className="widget-content-left flex2">
                                                          <div className="widget-heading">Ruben Tillman</div>
                                                          <div className="widget-subheading opacity-7">Etiam sit amet orci eget</div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </td>
                                          <td className="text-center">Berlin</td>
                                          <td className="text-center">
                                              <div className="badge badge-success">Completed</div>
                                          </td>
                                          <td className="text-center">
                                              <button type="button" className="btn btn-primary btn-sm">Details</button>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td className="text-center text-muted">#321</td>
                                          <td>
                                              <div className="widget-content p-0">
                                                  <div className="widget-content-wrapper">
                                                      <div className="widget-content-left mr-3">
                                                          <div className="widget-content-left">
                                                              
                                                          </div>
                                                      </div>
                                                      <div className="widget-content-left flex2">
                                                          <div className="widget-heading">Elliot Huber</div>
                                                          <div className="widget-subheading opacity-7">Lorem ipsum dolor sic</div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </td>
                                          <td className="text-center">London</td>
                                          <td className="text-center">
                                              <div className="badge badge-danger">In Progress</div>
                                          </td>
                                          <td className="text-center">
                                              <button type="button" className="btn btn-primary btn-sm">Details</button>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td className="text-center text-muted">#55</td>
                                          <td>
                                              <div className="widget-content p-0">
                                                  <div className="widget-content-wrapper">
                                                      <div className="widget-content-left mr-3">
                                                          <div className="widget-content-left">
                                                              
                                                          </div>
                                                      </div>
                                                      <div className="widget-content-left flex2">
                                                          <div className="widget-heading">Vinnie Wagstaff</div>
                                                          <div className="widget-subheading opacity-7">UI Designer</div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </td>
                                          <td className="text-center">Amsterdam</td>
                                          <td className="text-center">
                                              <div className="badge badge-info">On Hold</div>
                                          </td>
                                          <td className="text-center">
                                              <button type="button" className="btn btn-primary btn-sm">Details</button>
                                          </td>
                                      </tr>
                                      </tbody>
                                  </table>
                              </div>
                              <div className="d-block text-center card-footer">
                                  <button className="mr-2 btn-icon btn-icon-only btn btn-outline-danger"><i className="pe-7s-trash btn-icon-wrapper"> </i></button>
                                  <button className="btn-wide btn btn-success">Save</button>
                              </div>
                          </Card>
                      </Col>
                  </Row>
              </div>
          </ReactCSSTransitionGroup>
      </Fragment>
      <DataTable></DataTable>
      </div>
    )
  }
}

export default App;
