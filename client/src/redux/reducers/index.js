import {combineReducers} from 'redux';

import { JOIN_ROOM, CREATE_ROOM } from "../constants/action-types";

const initialState = {
  room: {},
  game: {},
  connected: false
};

function roomReducer(state = initialState, action) {
  switch(action.type) {
    case CREATE_ROOM:
      return {
        ...state,
        room : action.payload.room,
        connected: true
      };

    case JOIN_ROOM:
      return {
        ...state,
        room : action.payload.room,
        connected: true
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  roomReducer
});

export default rootReducer;
