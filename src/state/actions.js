import types from "./types";

export const restartGame = () => ({
  type: types.RESTART_GAME,
});

export const endGame = (isEnd) => ({
  type: types.END_GAME,
  payload: isEnd,
});

export const gameEndedMessage = (message) => ({
  type: types.GAME_ENDED_MESSAGE,
  payload: message,
});

export const setPlayerPosition = (position) => ({
  type: types.PLAYER_POSITION,
  payload: position,
});

export const setSandwichPosition = (position) => ({
  type: types.SANDWICH_POSITION,
  payload: position,
});

export const displaySandwichPoints = (count) => ({
  type: types.SANDWICH_POINTS,
  payload: count,
});

export const setRedGhostPosition = (position) => ({
  type: types.RED_GHOST_POSITION,
  payload: position,
});

export const decreaseBoardSize = (size) => ({
  type: types.DECREASE_BOARD_SIZE,
  payload: size,
});

export const changeGhostSpeed = (speed) => ({
  type: types.CHANGE_GHOST_SPEED,
  payload: speed,
});

export const setTimer = (time) => ({
  type: types.SET_TIMER,
  payload: time,
});

export const resetTimer = () => ({
  type: types.RESET_TIMER,
});

export const displayInstructions = (showInstructions) => ({
  type: types.DISPLAY_INSTRUCTIONS,
  payload: showInstructions,
});

export const displayHighScore = (score) => ({
  type: types.DISPLAY_HIGH_SCORE,
  payload: score,
});
