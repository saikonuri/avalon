import { JOIN_ROOM, CREATE_ROOM } from "../constants/action-types";

export function joinRoom(payload) {
  return { type: JOIN_ROOM, payload }
};

export function createRoom(payload) {
  return {type: CREATE_ROOM, payload};
}
