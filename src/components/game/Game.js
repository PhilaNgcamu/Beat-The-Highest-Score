import "./Game.css";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateDistance, randomizePosition } from "../../utils/utils";
import Instructions from "../instructions/Instructions";
import Board from "../board/Board";
import Player from "../player/Player";
import Sandwich from "../sandwich/Sandwich";
import {
  changeGhostSpeed,
  decreaseBoardSize,
  displayHighScore,
  displaySandwichPoints,
  endGame,
  gameEndedMessage,
  resetTimer,
  restartGame,
  setPlayerPosition,
  setSandwichPosition,
} from "../../state/actions";
import SandwichPoints from "../sandwich_points/SandwichPoints";
import RedGhost from "../red_ghost/RedGhost";
import EndGameMessage from "../end_game_message/EndGameMessage";

const Game = () => {
  const isGameOver = useSelector((state) => state.endGame);
  const gameOverMessage = useSelector((state) => state.gameOverMessage);
  const playerPosition = useSelector((state) => state.playerPosition);
  const sandwichPosition = useSelector((state) => state.sandwichPosition);
  const sandwichPoints = useSelector((state) => state.sandwichPoints);
  const redGhostPosition = useSelector((state) => state.redGhostPosition);
  const boardSize = useSelector((state) => state.boardSize);
  const redGhostSpeed = useSelector((state) => state.redGhostSpeed);
  const timer = useSelector((state) => state.timer);
  const instructions = useSelector((state) => state.displayInstructions);
  const highScore = useSelector((state) => state.highScore);

  const dispatch = useDispatch();

  const move = useCallback(
    (x, y) => {
      const newTop = Math.min(
        Math.max(playerPosition.top + y, 0),
        boardSize - 30
      );
      const newLeft = Math.min(
        Math.max(playerPosition.left + x, 0),
        boardSize - 30
      );
      dispatch(setPlayerPosition({ top: newTop, left: newLeft }));
    },
    [dispatch, playerPosition, boardSize]
  );

  const updateHighScore = useCallback(
    (score) => {
      if (score > highScore) {
        dispatch(displayHighScore(score));
        localStorage.setItem("highScore", score);
      }
    },
    [dispatch, highScore]
  );

  const randomizeSandwichPosition = useCallback(() => {
    const newTop = randomizePosition(boardSize);
    const newLeft = randomizePosition(boardSize);
    dispatch(
      setSandwichPosition({
        top: Math.min(newTop, boardSize - 60),
        left: Math.min(newLeft, boardSize - 60),
      })
    );
  }, [boardSize, dispatch]);

  const startGame = useCallback(() => {
    dispatch(restartGame());
    dispatch(setPlayerPosition({ top: 150, left: 150 }));
    dispatch(endGame(false));
    dispatch(resetTimer());
  }, [dispatch]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!isGameOver) {
        const { key } = event;
        switch (key) {
          case "ArrowUp":
          case "w":
            move(0, -30);
            break;
          case "ArrowRight":
          case "d":
            move(30, 0);
            break;
          case "ArrowDown":
          case "s":
            move(0, 30);
            break;
          case "ArrowLeft":
          case "a":
            move(-30, 0);
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [move, isGameOver, startGame]);

  useEffect(() => {
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore) {
      dispatch(displaySandwichPoints(parseInt(storedHighScore)));
    }
  }, [dispatch]);

  const updateAfterEatingSandwich = useCallback(() => {
    dispatch(displaySandwichPoints(sandwichPoints + 1));
    dispatch(decreaseBoardSize(boardSize - 30));
    dispatch(changeGhostSpeed(redGhostSpeed + 0.3));
    randomizeSandwichPosition();

    const newPlayerPosition = {
      top: Math.min(playerPosition.top, boardSize - 60),
      left: Math.min(playerPosition.left, boardSize - 60),
    };

    dispatch(setPlayerPosition(newPlayerPosition));
  }, [
    dispatch,
    randomizeSandwichPosition,
    boardSize,
    playerPosition,
    redGhostSpeed,
    sandwichPoints,
  ]);

  const checkGameOver = useCallback(() => {
    const distance = calculateDistance(playerPosition, redGhostPosition);
    const distanceThreshold = 20;

    if (timer === 0 || distance < distanceThreshold) {
      dispatch(endGame(true));

      if (sandwichPoints > highScore) {
        dispatch(
          gameEndedMessage("Congratulations! You beat the highest score!")
        );
        updateHighScore(sandwichPoints);
      } else {
        dispatch(
          gameEndedMessage("You didn't beat the highest score. Try again!")
        );
        dispatch(changeGhostSpeed(-redGhostSpeed));
      }
    }
  }, [
    dispatch,
    updateHighScore,
    timer,
    redGhostPosition,
    playerPosition,
    sandwichPoints,
    redGhostSpeed,
    highScore,
  ]);

  const actions = useCallback(() => {
    if (
      playerPosition.left === sandwichPosition.left &&
      playerPosition.top === sandwichPosition.top
    ) {
      updateAfterEatingSandwich();
    }
    checkGameOver();
  }, [
    updateAfterEatingSandwich,
    checkGameOver,
    playerPosition.left,
    playerPosition.top,
    sandwichPosition.left,
    sandwichPosition.top,
  ]);

  useEffect(() => {
    if (!isGameOver) {
      actions();
    }
  }, [isGameOver, actions]);

  return (
    <div className="game-container" data-testid="game-container">
      {instructions && <Instructions startGame={startGame} />}
      {!instructions && (
        <Board>
          {!isGameOver && (
            <button className="restart-button" onClick={startGame}>
              Restart Game
            </button>
          )}
          <div className="timer">{timer} seconds</div>
          <Player />
          <Sandwich />
          <RedGhost />
          <SandwichPoints />
          {isGameOver && gameOverMessage && (
            <EndGameMessage onStartNewGame={startGame} />
          )}
        </Board>
      )}
    </div>
  );
};

export default Game;
