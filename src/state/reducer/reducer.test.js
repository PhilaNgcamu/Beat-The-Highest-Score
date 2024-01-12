import types from "../types";
import gameReducer, { initialState } from "./reducer";

const actionHandlers = {
  END_GAME: {
    payload: true,
    expectedState: { ...initialState, endGame: true },
  },

  GAME_ENDED_MESSAGE: {
    payload: "Congratulations! You beat the high score!",
    expectedState: {
      ...initialState,
      gameOverMessage: "Congratulations! You beat the high score!",
    },
  },

  PLAYER_POSITION: {
    payload: { top: 200, left: 200 },
    expectedState: {
      ...initialState,
      playerPosition: { top: 200, left: 200 },
    },
  },

  SANDWICH_POSITION: {
    payload: { top: 50, left: 50 },
    expectedState: {
      ...initialState,
      sandwichPosition: { top: 50, left: 50 },
    },
  },

  SANDWICH_POINTS: {
    payload: 10,
    expectedState: {
      ...initialState,
      sandwichPoints: 10,
    },
  },

  RED_GHOST_POSITION: {
    payload: { top: 200, left: 250 },
    expectedState: {
      ...initialState,
      redGhostPosition: { top: 200, left: 250 },
    },
  },

  DECREASE_BOARD_SIZE: {
    payload: 600,
    expectedState: {
      ...initialState,
      boardSize: 600,
    },
  },

  CHANGE_GHOST_SPEED: {
    payload: 0.7,
    expectedState: {
      ...initialState,
      redGhostSpeed: 0.7,
    },
  },

  SET_TIMER: {
    payload: 15,
    expectedState: {
      ...initialState,
      timer: 15,
    },
  },

  RESET_TIMER: {
    payload: undefined,
    expectedState: {
      ...initialState,
      timer: 30,
    },
  },

  DISPLAY_INSTRUCTIONS: {
    payload: false,
    expectedState: {
      ...initialState,
      displayInstructions: false,
    },
  },

  DISPLAY_HIGH_SCORE: {
    payload: 100,
    expectedState: {
      ...initialState,
      highScore: 100,
    },
  },
};

describe("gameReducer", () => {
  Object.keys(actionHandlers).forEach((actionType) => {
    const { payload, expectedState } = actionHandlers[actionType];

    test(`should handle ${actionType} action`, () => {
      const action = {
        type: types[actionType],
        payload,
      };

      const newState = gameReducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });
});
