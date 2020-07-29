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
app.use(express.static(path.join(__dirname, './client/build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Create a private room
app.post('/api/new', (req, res) => {
  const [success, data] = db.createRoom(req.body.roomName, req.body.username);

  if(success){
    res.status(200).send(data);
  } else {
    res.status(500).send(data);
  }
});

// Join a private room
app.post('/api/join', (req, res) => {
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
  socket.on('disconnect', (reason) => {
    console.log(socket.id + ' is disconnected: ' + reason);

  });

  socket.on('resubscribe', (room) => {
    console.log('reconnecting to room: ' + room);
    socket.join(room);
  });
  // socket.on('resubscribe', (room) => {
  //   console.log(socket.id + ' rejoining')
  //   socket.join(room);
  // });

  socket.on('created', (roomName, user) => {
    socket.join(roomName);
    io.in(roomName).emit('room log', user + ' created room');
  });

  socket.on('joined', (roomName, user) => {
    socket.join(roomName);
    io.in(roomName).emit('room log', user + ' joined room');
    io.in(roomName).emit('joined', user);
  });

  socket.on('message', (roomName, user, message) => {
    db.addChatMessage({room: roomName, user: user, text: message});
    io.in(roomName).emit('message', user, message);
  });

  socket.on('start game', (roomName, user, game) => {
    var created = db.startGame(roomName, user, game);
    io.in(roomName).emit('start game', created);
  });

  socket.on('skull', (roomName, user, action, data) => {
    var update = db.skullAction(roomName, user, action, data);
    io.in(roomName).emit('skull', user, action, update);
  });

  socket.on('spades', (roomName, user, action, data) => {
    if(action == 'SHUFFLE'){
      data = db.shuffleSpades(roomNamedata)
    }

    if(action == 'SET TEAMS'){
      data = db.setTeamsSpades(roomName, data);
    }

    if(action == 'RESTART'){
      data = db.restartSpades(roomName);
    }

    if(action == 'START'){
      data = db.startSpades(roomName);
    }

    if(action == 'PREDICT'){
      data = db.predictSpades(roomName, user, data);
    }

    if(action == 'DISCARD'){
      data = db.discardSpades(roomName, user, data);
      var prev = data.prev;
    }

    console.log(data);
    io.in(roomName).emit('spades', user, action, data, prev);
  });

});

const PORT = process.env.PORT || 4000;
// Start the server
var server = http.listen(PORT, () => {
  console.log('GAME SERVER is running on port ', server.address().port);
});
