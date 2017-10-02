import React from 'react'
import './room.css';
const io = require('socket.io-client')
const socket = io()

class Room extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    socket.on('add user', (user) => this.addUser(user));
  }

  addUser(user) {
    // Add User
  }

  handleSubmit (event) {
    console.log("handle submit");
  var socket = io();
  event.preventDefault();
  socket.emit('chat message', document.getElementById('m').value);
  document.getElementById('m').value = '';

  }

  render() {
    return (
      <div>
        <h1>Chat Room</h1>
        <ul id="messages"></ul>
        <form action="" onSubmit={this.handleSubmit}>
          <input id="m" autocomplete="off" /><button>Send</button>
        </form>
      </div>

    )
  }
}

export default Room;
