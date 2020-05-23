var db = require('./db');

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

var http = require('http').Server(app);
var io = require('socket.io')(http);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Create a private room
app.post('/api/new', (req, res) => {
  console.log("CREATING NEW ROOM");
  console.log(req.body);

  const [success, data] = db.createRoom(req.body.roomName, req.body.username);

  if(success){
    res.status(200).send(data);
  } else {
    res.status(500).send(data);
  }
});

// Join a private room
app.post('/api/join', (req, res) => {
  console.log("JOINING ROOM");
  console.log(req.body);

  const [success, data] = db.joinRoom(req.body.roomName, req.body.username);

  if(success){
    res.status(200).send(data);
  } else {
    res.status(500).send(data);
  }
});

// User (from client browser) connects to the socket
io.on('connection', (socket) => {
  console.log(socket.id + ' is connected');
  socket.on('disconnect', () => {
    console.log(socket.id + ' is disconnected');
  });

  socket.on('created', (roomName, user) => {
    console.log(user + ' created: ' + roomName);
    socket.join(roomName);
    io.in(roomName).emit('room log', user + ' created room');
  });

  socket.on('joined', (roomName, user) => {
    console.log(user + ' joined: ' + roomName);
    socket.join(roomName);
    io.in(roomName).emit('room log', user + ' joined room');
  });

});

// Start the server
var server = http.listen(4000, () => {
  console.log('GAME SERVER is running on port ', server.address().port);
});
