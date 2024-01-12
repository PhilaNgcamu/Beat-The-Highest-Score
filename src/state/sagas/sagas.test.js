import { expectSaga } from "redux-saga-test-plan";
import { delay, takeLatest } from "redux-saga/effects";
import {
  timerWorker,
  resetTimerWorker,
  moveRedGhost,
  watchMoveRedGhost,
} from "./sagas";
import types from "../types";
import { resetTimer, setRedGhostPosition, setTimer } from "../actions";

describe("Timer Sagas", () => {
  test("should run the timer", () => {
    return expectSaga(timerWorker)
      .provide([
        [delay(1000), true],
        [delay(1000), true],
        [delay(1000), true],
      ])
      .put(setTimer(30))
      .dispatch(resetTimer())
      .put(setTimer(29))
      .silentRun();
  });

  test("should restart the timer", () => {
    return expectSaga(resetTimerWorker).put(setTimer(30)).run();
  });
});

describe("moveRedGhost saga", () => {
  test("should move the red ghost towards the player position", () => {
    const initialState = {
      playerPosition: { top: 100, left: 100 },
      redGhostSpeed: 1,
      boardSize: 600,
      redGhostPosition: { top: 200, left: 200 },
      timer: 30,
    };

    return expectSaga(moveRedGhost)
      .withState(initialState)
      .put(
        setRedGhostPosition({
          top: 199.29289321881345,
          left: 199.29289321881345,
        })
      )
      .dispatch({ type: types.PLAYER_POSITION })
      .silentRun();
  });
});

describe("watchMoveRedGhost saga", () => {
  test("should take latest PLAYER_POSITION action and call moveRedGhost", () => {
    return expectSaga(watchMoveRedGhost)
      .provide([[takeLatest(types.PLAYER_POSITION, moveRedGhost), {}]])
      .silentRun();
  });
});
