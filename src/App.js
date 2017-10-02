import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Room from './components/room.js';

class App extends Component {

  constructor(props) {
  super(props);

  }

  state = {users: []}

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetch(`/users?lat=${position.coords.latitude}&lng=${position.coords.longitude}`)
        .then(response => {
            response.text().then(text => {

              let hipFound = false;

              (text === 'true') ? hipFound = true : hipFound = false;

              this.setState({
                 status: text,
                 isHipFound: hipFound
              })
           });
         })
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        })

      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to MeetHip</h1>
        </header>
        <p className="App-intro">
          Meethip
        </p>
        <p>Latitude: {this.state.latitude}</p>
        <p>Longitude: {this.state.longitude}</p>
        {this.state.error ? <p>Error: {this.state.error}</p> : null}

        {this.state.isHipFound ? (
          <Room />
        ) : (
          <p>{"No hips found"}</p>
        )}

      </div>
    );
  }
}



export default App;
