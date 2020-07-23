import socket from './socket.js';

export function afterCreate(roomName, user){
  socket.emit('created', roomName, user);
}

export function afterJoin(roomName, user){
  socket.emit('joined', roomName, user);
}

export function sendMessage(roomName, user, message){
  socket.emit('message', roomName, user, message);
}

export function startGame(roomName, user, game){
  socket.emit('start game', roomName, user, game);
}

export function sendSpades(roomName, user, action, data){
  console.log('SEND SPADES');
  socket.emit('spades', roomName, user, action, data);
}
