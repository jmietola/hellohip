import React from 'react'
const io = require('socket.io-client')
const socket = io()

class Room extends React.Component {
  constructor(props) {
    super(props)
    socket.on('add user', (user) => this.addUser(user));
  }

  addUser(user) {
    // Add User
  }

  render() {
    return (
      <div>
        <h1>Chat Room</h1>

      </div>

    )
  }
}

export default Room;
