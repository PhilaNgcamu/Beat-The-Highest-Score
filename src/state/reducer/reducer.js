import types from "../types";

export const initialState = {
  endGame: false,
  gameOverMessage: "",
  playerPosition: { top: 150, left: 150 },
  sandwichPosition: { top: 30, left: 30 },
  sandwichPoints: 0,
  redGhostPosition: { top: 270, left: 270 },
  boardSize: 480,
  redGhostSpeed: 0.5,
  timer: 30,
  displayInstructions: true,
  highScore: 0,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RESTART_GAME:
      return {
        ...state,
        gameOverMessage: "",
        sandwichPosition: { top: 30, left: 30 },
        sandwichPoints: 0,
        redGhostPosition: { top: 270, left: 270 },
        boardSize: 480,
        redGhostSpeed: 0.5,
        displayInstructions: false,
      };

    case types.END_GAME:
      return { ...state, endGame: action.payload };

    case types.GAME_ENDED_MESSAGE:
      return { ...state, gameOverMessage: action.payload };

    case types.PLAYER_POSITION:
      return { ...state, playerPosition: action.payload };

    case types.SANDWICH_POSITION:
      return { ...state, sandwichPosition: action.payload };

    case types.SANDWICH_POINTS:
      return { ...state, sandwichPoints: action.payload };

    case types.RED_GHOST_POSITION:
      return { ...state, redGhostPosition: action.payload };

    case types.DECREASE_BOARD_SIZE:
      return { ...state, boardSize: action.payload };

    case types.CHANGE_GHOST_SPEED:
      return { ...state, redGhostSpeed: action.payload };

    case types.SET_TIMER:
      return { ...state, timer: action.payload };

    case types.DISPLAY_INSTRUCTIONS:
      return { ...state, displayInstructions: action.payload };

    case types.DISPLAY_HIGH_SCORE:
      return { ...state, highScore: action.payload };

    default:
      return state;
  }
};

export default gameReducer;
