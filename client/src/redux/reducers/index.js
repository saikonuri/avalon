import {combineReducers} from 'redux';

import { JOIN_ROOM } from "../constants/action-types";

const initialState = {
  room: undefined,
  connected: false,
  loading: false
};

function roomReducer(state = initialState, action) {
  if(action.type === JOIN_ROOM){
    return {
      ...state,
      room : action.payload
    }
  }
  return state;
};

const rootReducer = combineReducers({
  roomReducer
});

export default rootReducer;
