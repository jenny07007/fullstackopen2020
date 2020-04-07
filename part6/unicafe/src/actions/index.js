import { GOOD, DO_NOTHING, BAD, OK } from "./types";

export const doNothing = () => {
  return { type: DO_NOTHING };
};

export const good = () => {
  return { type: GOOD };
};

export const bad = () => {
  return { type: BAD };
};

export const ok = () => {
  return { type: OK };
};
