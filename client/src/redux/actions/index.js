import {
  JOIN_ROOM,
  CREATE_ROOM ,
  ADD_PLAYER
} from "../constants/action-types";

export function joinRoom(payload) {
  return { type: JOIN_ROOM, payload }
};

export function createRoom(payload) {
  return {type: CREATE_ROOM, payload};
}

export function addPlayer(payload) {
  return {type: ADD_PLAYER, payload};
}
