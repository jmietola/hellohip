import React from 'react'
import './room.css';
//const io = require('socket.io-client')
//const socket = io()

class Room extends React.Component {



  constructor(props) {

    super(props)

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { socket } = this.props;
    let room = "abc123";
    let data = {id:room, msg: true};



    //code before the pause
    setTimeout(function(){
      socket.emit('room', room);
      socket.emit('hipFound', data);
    }, 2000);



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

  hipFound(){

  }

  handleSubmit (event) {
    const { socket } = this.props;
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
    const { socket } = this.props;
    let room = "abc123";
    event.preventDefault();
    let data = {id:room, lat: this.props.locationFromApp};
    console.log("DATA", data);
    socket.emit('remove', data);
  }

  join (event) {
    console.log("join");
    const { socket } = this.props;
    let room = "abc123";
    socket.emit('room', room);
  }

  render() {
    return (
      <div>
        <ul id="messages"></ul>
        <form action="" onSubmit={this.handleSubmit}>
          <input id="m" autocomplete="off" /><button>Send</button>
        </form>
        <button onClick={this.disconnect.bind(this)}>Disconnect</button>
        <button onClick={this.join.bind(this)}>Join</button>
      </div>

    )
  }
}

export default Room;
