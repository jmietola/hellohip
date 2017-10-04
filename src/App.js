import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Room from './components/room.js';
const io = require('socket.io-client');
const socket = io(window.location.href);


class App extends Component {

  constructor(props) {
  super(props);
  this.state = {
  color: "1"
  };

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
                 isHipFound: hipFound,
                 latitude: position.coords.latitude,
                 longitude: position.coords.longitude,
                 error: null,
              })

           });
         })
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    let room = "abc123";
    socket.emit('room', room);


    let self = this;
    socket.on('hipMatch', function(data){
      console.log("hipMatch", data);
      console.log(this.state);
      self.setState({isHipFound: true});
    });
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
          <Room socket={socket}locationFromApp={this.state.latitude}/>
        ) : (
          <p>{"No hips found"}</p>
        )}

      </div>
    );
  }
}



export default App;
