import React from 'react'
import './room.css';
const io = require('socket.io-client')
const socket = io()

class Room extends React.Component {



  constructor(props) {

    super(props)

    this.handleSubmit = this.handleSubmit.bind(this);


      let room = "abc123";
      socket.emit('room', room);

    socket.on('chat message', function(data){
      console.log("chat message", data);

      var div = document.getElementById('messages');
      div.innerHTML += "<li>" + data + "</li>";

    });
  }

  addUser(user) {
    // Add User
  }

  handleSubmit (event) {
 console.log("handle submit");

  event.preventDefault();



  var data = {id:'abc123', msg: document.getElementById('m').value};
  socket.emit('say to', data);
  document.getElementById('m').value = '';

  }

  render() {
    return (
      <div>
        <ul id="messages"></ul>
        <form action="" onSubmit={this.handleSubmit}>
          <input id="m" autocomplete="off" /><button>Send</button>
        </form>
      </div>

    )
  }
}

export default Room;
