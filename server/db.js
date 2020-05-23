var loki = require('lokijs'); // https://github.com/techfort/LokiJS/wiki

var db = new loki('rooms.db');

var rooms = db.addCollection('rooms');

function roomExists(roomName) {
  var room = rooms.findOne({'name': roomName});
  if(room === null){
    return false;
  }
  return true;
}

function userExistsInRoom(roomName, user) {
  var room = rooms.findOne({'name': roomName});

  if(room.users.includes(user)){
    return true
  }
  return false;
}

exports.createRoom =  function(roomName, creator) {
  if(roomExists(roomName)){
    return [false, 'Room already exists'];
  }
  rooms.insert({name: roomName, creator: creator, users: [creator], chat: []});
  return [true, rooms.findOne({'name': roomName})];
}

exports.joinRoom = function(roomName, user) {
  if(roomExists(roomName) === false){
    return [false, 'Room ' + roomName + ' does not exist'];
  }
  // check if user already exists in this room
  if(userExistsInRoom(roomName, user)){
    return [false, 'User ' + user + ' already exists in the room'];
  }

  var room = rooms.findOne({'name': roomName});
  room.users.push(user);
  rooms.update(room);

  console.log(room);
  return [true, room];
}

exports.addChatMessage =  function(message){
  if(!roomExists(message.room)){
    return [false, 'Room does not exist'];
  }
  // Check if sender is in the room
  if(!userExistsInRoom(message.room, message.user)){
    return [false, 'User ' + message.user + ' does not exist in the room'];
  }

  var room = room.findOne({'name': message.room});
  room.chat.push({user: message.user, message: message.text});
  rooms.update(room);

  return [true, 'Success'];
}
