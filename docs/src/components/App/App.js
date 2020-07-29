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
  TabPane, Dropdown, 
  UncontrolledButtonDropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem
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
        time: 1,
        dropdownText: "Last 24 Hours"
    };
    this.toggle = this.toggle.bind(this);
    this.toggle1 = this.toggle1.bind(this);
    this.changeRange = this.changeRange.bind(this);
  }

  toggle() {
      this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
      }));
  }

  changeRange(range, text){
    console.log(range);//e.currentTarget.getAttribute.range);
    this.setState({
          time: range, //e.currentTarget.getAttribute.range,
          dropdownOpen: !this.state.dropdownOpen,
          dropdownText: text
        });
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
          <h1 className="mb-5"><b>The Eweje Garden</b></h1>
          <Button outline className="mb-3 mr-2 btn-transition" color="secondary"><a href="https://github.com/sopeeweje/eweje-garden"  target="_blank" rel="noopener noreferrer" className="text-white">(Link to docs)</a></Button>
        </section>
        <Fragment>
          <ReactCSSTransitionGroup
              component="div"
              transitionName="TabsAnimation"
              transitionAppear={true}
              transitionAppearTimeout={0}
              transitionEnter={false}
              transitionLeave={false}>
              <div className="m-4">
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
                                  <div className="btn-actions-pane-right container d-flex flex-wrap">
                                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="d-inline-block">
                                        <DropdownToggle caret color="dark">
                                            {this.state.dropdownText}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem header>Time frame</DropdownItem>
                                            <DropdownItem range={1} onClick={() => this.changeRange(1, "Last 24 Hours")}>Last 24 Hours</DropdownItem>
                                            <DropdownItem range={7} onClick={() => this.changeRange(7, "Last Week")}>Last Week</DropdownItem>
                                            <DropdownItem range={30} onClick={() => this.changeRange(30, "Last Month")}>Last Month</DropdownItem>
                                            <DropdownItem range={10000} onClick={() => this.changeRange(10000, "All Data")}>All Data</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                    {/* Tab buttons. Figure out how to change color to the one you want */}
                                    <Button outline
                                            className={"ml-1  btn-pill btn-wide border-0 btn-transition text-white bg-grow-early"}
                                            onClick={() => {
                                        this.toggle1('11');
                                    }}>Temp</Button>
                                    <Button outline
                                            className={"ml-1 btn-pill btn-wide border-0 btn-transition text-white bg-love-kiss"} // + classnames({active: this.state.activeTab1 === '22'})
                                            color="primary" onClick={() => {
                                        this.toggle1('22');
                                    }}>Humidity</Button>
                                    <Button outline
                                            className={"ml-1 btn-pill btn-wide border-0 btn-transition text-white bg-malibu-beach"}
                                            color="primary" onClick={() => {
                                        this.toggle1('33');
                                    }}>Moisture</Button>
                                    <Button outline
                                            className={"ml-1 btn-pill btn-wide border-0 btn-transition text-white bg-sunny-morning"}
                                            onClick={() => {
                                        this.toggle1('44');
                                    }}>Light</Button>
                                  </div>
                              </CardHeader>
                              <TabContent activeTab={this.state.activeTab1}>
                                  <TabPane tabId="11">{/* Temperature Tab */}
                                    <div className="widget-chart p-0">
                                        <GraphArea range={this.state.time} measurement="temp" colors={["#196F3D", "#52BE80", "#ABEBC6"]}></GraphArea>
                                    </div>
                                  </TabPane>
                                  <TabPane tabId="22">{/* Humidity Tab */}
                                      <div className="widget-chart p-0">
                                        <GraphArea range={this.state.time} measurement="humidity" colors={["#7B241C", "#C0392B", "#E6B0AA"]}></GraphArea>
                                      </div>
                                  </TabPane>
                                  <TabPane tabId="33">{/* Moisture Tab */} 
                                      <div className="widget-chart p-0">
                                        <GraphArea range={this.state.time} measurement="soil_moisture" colors={["#21618C", "#3498DB", "#AED6F1"]}></GraphArea>
                                      </div>
                                  </TabPane>
                                  <TabPane tabId="44">{/* Light Tab */}
                                      <div className="widget-chart p-0">
                                        <GraphArea range={this.state.time} measurement="light" colors={["#B7950B", "#F4D03F", "#FAD7A0"]}></GraphArea>
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
                                      </div>
                                  </div>
                              </Col>
                          </Row>
                      </Col>
                  </Row>
                  <Row>
                      <Col md="12">
                          <DataTable></DataTable>
                      </Col>
                  </Row>
              </div>
          </ReactCSSTransitionGroup>
      </Fragment>
      </div>
    )
  }
}

export default App;
