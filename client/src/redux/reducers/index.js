import {combineReducers} from 'redux';

import { JOIN_ROOM, CREATE_ROOM, ADD_PLAYER } from "../constants/action-types";

const initialState = {
  room: null,
  chat: [],
  creator: null,
  username: null,
  users: [],
  game: {},
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
        }
      }
      return state;

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  roomReducer
});

export default rootReducer;
