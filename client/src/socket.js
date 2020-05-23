import io from 'socket.io-client';

const socket = io("http://localhost:4000");

socket.on('room log', (message) => {
  console.log(message);
});

export default socket;
