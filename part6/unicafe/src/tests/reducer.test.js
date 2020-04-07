import deepFreeze from "deep-freeze";
import { GOOD, DO_NOTHING } from "../actions/types";
import counterReducer from "../reducers";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test("should return a proper initial state when called with undefined state", () => {
    const state = {};
    const action = {
      type: DO_NOTHING,
    };

    const newState = counterReducer(undefined, action);
    expect(newState.counter).toEqual(initialState);
  });

  test("good is incremented", () => {
    const action = {
      type: GOOD,
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState.counter).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });
});
