import { JOIN_ROOM } from "../constants/action-types";

export function joinRoom(payload) {
  return { type: JOIN_ROOM, payload }
};
