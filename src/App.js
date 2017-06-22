import React, { Component } from 'react';
import axios from 'axios';

import { Config, initState } from './config'
import './App.css';

export default class AppContainer extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = initState;
  }
  
  getAllTimeCampers(){
    return axios.get(Config.urls.allTime);
  }
  
  getRecentCampers(){
    return axios.get(Config.urls.recent);
  }
  
  fetchData() {
    axios.all( [this.getAllTimeCampers(), this.getRecentCampers()] )
    .then( ([allTime, recent]) => {
      this.setState( {
        ...this.state,
        campers: {
          ...this.state.campers,
          allTime: {
            ...this.state.campers.allTime,
            data: Array.from(allTime.data),
          },
          recent: {
            ...this.state.campers.recent,
            data:  Array.from(recent.data),
          }
        }
      });
    })
    .catch(function (error) {
      console.log(error);
      throw Error(error);
    });
  }
  
  componentWillMount() {
    this.fetchData();
  }

  toggleShowing() {
    const { campers, showing: currentShowing } = this.state;
    const showingKeys = Object.keys(campers);
    const indexCurrent = showingKeys.findIndex( (e) => e===currentShowing );
    if ( indexCurrent === -1 ) {   throw Error("Error de showing key")   }

    this.setState( {
      ...this.state,
      showing: showingKeys[ (indexCurrent+1)%showingKeys.length ],
    })
  }
  
  render() {
    const { campers, showing } = this.state;
    const { showName, data} = campers[showing];

    const showingKeys = Object.keys(campers);
    const indexCurrent = showingKeys.findIndex( (e) => e===showing );
    if ( indexCurrent === -1 ) {   throw Error("Error de showing key")  } 
    const toShowName = showingKeys[ (indexCurrent+1)%showingKeys.length ];

    return (
    <App
    title="Campers Leaderboard"
    showing={showName}
    toShowName = {toShowName}
    campers={data}
    onToggleShowing={this.toggleShowing.bind(this)}
    ></App>
    )
  }
}


export class App extends Component {
  
  render() {
    const campers = this.props.campers.map( (e,i) => {
      return (
        <tr key={i}>
          <td>{i+1}</td>
          <td><img src={e.img} className="camper-logo" />{"  "+e.username}</td>
          <td>{e.recent}</td>
          <td>{e.alltime}</td>
        </tr>
      )
    })

    return (
    <div className="container">
      <div className="header">
        <h1>{this.props.title}</h1>
        <button onClick={this.props.onToggleShowing} className="toggleButton button-primary">{"Show "+this.props.toShowName}</button>
      </div>
      
    
      <div className="content">
        <table className="u-full-width">
          <thead>
            <tr>
              <th colSpan={4} className="showing-info">Showing {this.props.showing}</th>
            </tr>
            <tr>
              <th>#</th>
              <th>Camper Name</th>
              <th>Recent points</th>
              <th>All time points</th>
            </tr>
          </thead>
          <tbody>
            {campers}
          </tbody>
        </table>
      </div>

    </div>
    );
  }
}