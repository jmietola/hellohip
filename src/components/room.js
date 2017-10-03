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

    socket.on('user left', function(data){
    console.log("user left", data);

    var div = document.getElementById('messages');
    div.innerHTML += "<li>" +"Hip: " + data + "</li>";

  });
  }

  addUser(user) {
    // Add User
  }

  handleSubmit (event) {
 console.log("handle submit");
  let room = "abc123";
  event.preventDefault();

  let div = document.getElementById('messages');
  div.innerHTML += "<li>" + "Me: " + document.getElementById('m').value + "</li>";


  let data = {id:room, msg: document.getElementById('m').value};
  socket.emit('say to', data);
  document.getElementById('m').value = '';

  }

  disconnect (event) {
    let room = "abc123";
    event.preventDefault();
    let data = {id:room, lat: this.props.locationFromApp};
    console.log("DATA", data);
    socket.emit('remove', data);
  }

  render() {
    return (
      <div>
        <ul id="messages"></ul>
        <form action="" onSubmit={this.handleSubmit}>
          <input id="m" autocomplete="off" /><button>Send</button>
        </form>
        <button onClick={this.disconnect.bind(this)}>Disconnect</button>
      </div>

    )
  }
}

export default Room;
