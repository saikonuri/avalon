import io from 'socket.io-client';
import {addPlayer} from './redux/actions';
import {store} from './index.js';


const socket = io("http://localhost:4000");

socket.on('room log', (message) => {
  console.log(message);
});

socket.on('joined', (user) => {
  store.dispatch(addPlayer(user));
});

export default socket;
