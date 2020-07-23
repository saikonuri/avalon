import {combineReducers} from 'redux';

import {
  JOIN_ROOM,
  CREATE_ROOM,
  ADD_PLAYER,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  START_GAME,
  SPADES
} from "../constants/action-types";
import { GiAnnexation } from 'react-icons/gi';

const initialState = {
  room: null,
  chat: [],
  creator: null,
  username: null,
  users: [],
  game: null,
  connected: false
};

function roomReducer(state = initialState, action) {
  switch(action.type) {
    case CREATE_ROOM:
      return {
        ...state,
        room : action.payload.room.name,
        chat: action.payload.room.chat,
        creator: action.payload.room.creator,
        username: action.payload.room.username,
        users: action.payload.room.users,
        connected: true
      };

    case JOIN_ROOM:
      return {
        ...state,
        room : action.payload.room.name,
        chat: action.payload.room.chat,
        creator: action.payload.room.creator,
        username: action.payload.room.username,
        users: action.payload.room.users,
        connected: true
      };

    case ADD_PLAYER:
      if(state.username !== action.payload){
        return {
          ...state,
          users: state.users.concat(action.payload)
        };
      };
      return state;

    case SEND_MESSAGE:
      return {
        ...state,
        chat: state.chat.concat({...action.payload, me: true})
      }

    case RECEIVE_MESSAGE:
      if(state.username !== action.payload.sender){
        return {
          ...state,
          chat: state.chat.concat({...action.payload, me: false})
        };
      };
      return state;

    case START_GAME:
      return {
        ...state,
        game: action.payload
      }

    case SPADES:
      console.log("SPADES REACHED REDUCER");
      if(action.payload.action == "SET TEAMS"){
        let game = {...state.game};
        game.teams = action.payload.data.teams;
        game.players = action.payload.data.players;
        game.order = action.payload.data.order;

        return {
          ...state,
          game: game
        };
      }

      if(action.payload.action == "START"){
        let game = {...state.game};
        game.round = action.payload.data.round;
        game.deck = action.payload.data.deck;
        game.players = action.payload.data.players;

        return {
          ...state,
          game: game
        };
      }

      if(action.payload.action == "RESTART"){
        let game = {...state.game};
        game.round = action.payload.data.round;
        game.deck = action.payload.data.deck;
        game.players = action.payload.data.players;
        game.teams = action.payload.data.teams;
        game.stage = action.payload.data.stage;
        game.turn = action.payload.data.turn;
        game.dealer = action.payload.data.dealer;
        for(var i = 0; i < game.order.length; i++){
          game.players[game.order[i]] = action.payload.data.players[game.order[i]];
        }

        return {
          ...state,
          game: game
        };
      }

      if(action.payload.action == "PREDICT"){
        let game = {...state.game};
        game.teams = action.payload.data.teams;
        game.turn = action.payload.data.turn;
        game.stage = action.payload.data.stage;

        return {
          ...state,
          game: game
        }
      }

      return {
        ...state
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  roomReducer
});

export default rootReducer;
