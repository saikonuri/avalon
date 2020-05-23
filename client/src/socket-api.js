import socket from './socket.js';

export function afterCreate(roomName, user){
  socket.emit('created', roomName, user);
}

export function afterJoin(roomName, user){
  socket.emit('joined', roomName, user);
}
