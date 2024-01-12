import { put, delay, takeLatest, select, all, take } from "redux-saga/effects";
import types from "../types";
import { setRedGhostPosition, setTimer } from "../actions";

export function* timerWorker() {
  while (true) {
    yield take(types.RESET_TIMER);

    for (let currentTime = 30; currentTime >= 0; currentTime--) {
      yield put(setTimer(currentTime));
      yield delay(1000);
    }
  }
}

export function* timerWatcher() {
  yield takeLatest(types.END_GAME, timerWorker);
}

export function* resetTimerWorker() {
  yield put(setTimer(30));
}

export function* watchResetTimer() {
  yield takeLatest(types.RESET_TIMER, resetTimerWorker);
}

export function* moveRedGhost() {
  while (true) {
    const {
      playerPosition,
      redGhostSpeed,
      boardSize,
      redGhostPosition,
      timer,
    } = yield select((state) => ({
      playerPosition: state.playerPosition,
      redGhostSpeed: state.redGhostSpeed,
      boardSize: state.boardSize,
      redGhostPosition: state.redGhostPosition,
      timer: state.timer,
    }));

    if (timer > 0) {
      const deltaX = playerPosition.left - redGhostPosition.left;
      const deltaY = playerPosition.top - redGhostPosition.top;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance > 20) {
        const directionX = deltaX / distance;
        const directionY = deltaY / distance;

        const newTop = redGhostPosition.top + directionY * redGhostSpeed;
        const newLeft = redGhostPosition.left + directionX * redGhostSpeed;

        const withinBoundaryTop = Math.min(Math.max(newTop, 0), boardSize - 30);
        const withinBoundaryLeft = Math.min(
          Math.max(newLeft, 0),
          boardSize - 30
        );

        yield put(
          setRedGhostPosition({
            top: withinBoundaryTop,
            left: withinBoundaryLeft,
          })
        );
      }
    }

    yield delay(15);
  }
}

export function* watchMoveRedGhost() {
  yield takeLatest(types.PLAYER_POSITION, moveRedGhost);
}

export default function* rootSaga() {
  yield all([watchResetTimer(), timerWatcher(), watchMoveRedGhost()]);
}
