const express = require('express');
const path = require('path');

const app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// User (from client browser) connects to the socket
io.on('connection', () => {
  console.log('a user is connected');
});

// Start the server
var server = http.listen(4000, () => {
  console.log('GAME SERVER is running on port ', server.address().port);
});
