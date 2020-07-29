import {
  JOIN_ROOM,
  CREATE_ROOM ,
  ADD_PLAYER,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  START_GAME,
  SPADES, SPADES_DELAY
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

export function sendMessage(payload) {
  return {type: SEND_MESSAGE, payload};
}

export function receiveMessage(payload) {
  return {type: RECEIVE_MESSAGE, payload};
}

export function startGame(payload) {
  return {type: START_GAME, payload};
}

export function spades(payload) {
  return {type: SPADES, payload};
}

export function spadesDelay(payload) {
  return {type: SPADES_DELAY, payload};
}
