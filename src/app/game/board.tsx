"use client";
import { useState } from "react";
import ChoiceComponent from "./choice";
import AlertComponent from "./alert.component";
import ProgressbarComponent from "./progressbar.component";
const O = "O";
const X = "X";
export type Cell = typeof X | typeof O | null;
const BoardComponent = () => {
  const [isEngaged, setEngaged] = useState<boolean>(true);
  const [turn, setTurn] = useState<0 | 1>(0);
  const [winner, setWinner] = useState<0 | 1>();
  const choices = (): Cell[][] =>
    Array.from({ length: 3 }).map(() =>
      Array.from({ length: 3 }, () => null)
    );
  const board = new Map<number, Cell>(
    Array.from({ length: 9 }, (_, index) => [index, null])
  );
  const [grid, setGrid] = useState(board);

  const [playerOne, setPlayerOne] = useState(choices());
  const [playerTwo, setPlayerTwo] = useState(choices());

  const isWinner = (board: Cell[][], symbol: Cell) => {
    // Check horizontal wins
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2] &&
        board[i][0] === symbol
      ) {
        return true;
      }
    }

    // Check vertical wins
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i] &&
        board[0][i] === symbol
      ) {
        return true;
      }
    }

    // Check diagonal wins
    if (
      (board[0][0] === board[1][1] &&
        board[1][1] === board[2][2] &&
        board[0][0] === symbol) ||
      (board[0][2] === board[1][1] &&
        board[1][1] === board[2][0] &&
        board[0][2] === symbol)
    ) {
      return true;
    }

    return false;
  };

  const onSelected = (n: number) => {
    let winnerIndex: 0 | 1 | undefined;
    const row = Math.floor(n / 3);
    const col = row > 0 ? (n / row - 3) * row : Math.floor(n / (row + 1));

    if (turn === 0) {
      playerOne[row][col] = X;
      grid.set(n, X);
      setPlayerOne(playerOne);
    } else {
      playerTwo[row][col] = O;
      grid.set(n, O);
      setPlayerTwo(playerTwo);
    }

    setGrid(new Map(grid));

    if (isWinner(playerOne, X)) {
      winnerIndex = 0;
    } else if (isWinner(playerTwo, O)) {
      winnerIndex = 1;
    }

    if (winnerIndex !== undefined) {
      setWinner(winnerIndex);
      setEngaged(false);
    }

    setTurn(!turn ? 1 : 0);

    if (winnerIndex === undefined && !remaining()) {
      setTurn(0);
      setWinner(undefined);
      setEngaged(false);
    }
  };

  const remaining = (): number =>
    9 - [...grid.values()].filter((c) => c !== null).length;

  const resetGame = () => {
    setTurn(winner || 0);
    setEngaged(true);
    setPlayerOne(choices());
    setPlayerTwo(choices());
    setGrid(board);
    setWinner(undefined);
  };

  const getSubTitle = () => {
    if (isEngaged) {
      return (
        <AlertComponent type="light">
          Next Player
          <span className="text-color-red">: {turn === 1 ? O : X}</span>
        </AlertComponent>
      );
    } else if (winner === 0 || winner === 1) {
      return (
        <>
          <AlertComponent type="success">
            Player {winner === 1 ? O : X} won.
          </AlertComponent>
        </>
      );
    } else {
      return <AlertComponent>Its a DRAW</AlertComponent>;
    }
  };

  const getProgress = () => {
    return ((9 - remaining()) / 9) * 100;
  };

  return (
    <>
      <>
        <div className="card  text-bg-primary">
          <div className="card-header pt-3">
            <h5>{getSubTitle()}</h5>

            <ProgressbarComponent progress={getProgress()} />
          </div>
          <div className="card-body pb-5">
            {isEngaged && (
              <div className="row row-cols-4 justify-content-center">
                {[...grid].map(([idx, choice], index) => (
                  <ChoiceComponent
                    key={index}
                    id={idx}
                    selection={choice}
                    onSelected={onSelected}
                  />
                ))}
              </div>
            )}
            {!isEngaged && (
              <div className="row justify-content-center">
                <div className="col-12">
                  <h3>Game Over!</h3>
                  <button
                    className="btn btn-success"
                    onClick={() => resetGame()}
                  >
                    Start Game
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default BoardComponent;
