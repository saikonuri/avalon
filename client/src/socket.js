import io from 'socket.io-client';
import {addPlayer, receiveMessage, startGame, spades, spadesDelay} from './redux/actions';
import {store} from './index.js';


const socket = io("http://localhost:4000");

socket.on('room log', (message) => {
  console.log(message);
});

socket.on('reconnect', () => {
  let room = store.getState().roomReducer.room;
  console.log(store.getState());
  if(room !== null){
    socket.emit('resubscribe', room);
  }
});

socket.on('joined', (user) => {
  store.dispatch(addPlayer(user));
});

socket.on('message', (user, message) => {
  store.dispatch(receiveMessage({sender: user, message: message}));
});

socket.on('start game', (game) => {
  store.dispatch(startGame(game));
})

socket.on('spades', (user, action, data, prev) => {
  console.log('RECEIVE SPADES: ' + data);
  if(prev != null && prev != undefined){
    store.dispatch(spadesDelay({user: user, action: action, data: prev}));
    setTimeout(() => {
      store.dispatch(spades({user: user, action: action, data: data}))
    }, 3000)
    // store.dispatch(spades({user: user, action: action, data: data}));
  } else {
    store.dispatch(spades({user: user, action: action, data: data}));
  }
});

export default socket;
