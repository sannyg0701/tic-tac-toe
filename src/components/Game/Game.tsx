import React, { useState } from "react";
import { SquareValue } from "../../types/types";
import { calculateWinner } from "../../util/calculateWinner";
import { Board } from "../Board/Board";
import styles from "./Game.module.css";

// Our 'Game' component
// This component contains 3 states
// 1- history : Keeps track of all of our moves so far.
// 2- stepNumber : Our current step number
// 3- isXNext : Determines if 'X' is going or 'O' is going.
// This component renders a board with some placeholder values.
// 'Game' does NOT take in any props.
//  We are using the 'useState' hook to set the default values
//  of 'isXNext', 'stepNumber' and 'history'. Similar to a ctor
export const Game: React.FC = () => {
    const [isXNext, setIsXNext] = useState<boolean>(true);
    const [stepNumber, setStepNumber] = useState<number>(0);
    const [history, setHistory] = useState<{ squares: SquareValue[] }[]>([
        {
            squares: Array(9).fill(null)
        }
    ]);


    // 'handleClick' is a function inside of the 'Game' component
    // This is where all of the heavy lifting happens
    // This method
    // 1- Determines if there is a winner
    // 2- Keeps a history of our moves
    // 3- Determines who goes next
    const handleClick = (i: number): void => {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;

        }
        squares[i] = isXNext ? "X" : "O";

        setHistory(newHistory.concat([
            {
                squares: squares
            }
        ]));
        setStepNumber(newHistory.length);
        setIsXNext(!isXNext);
    };

    const jumpTo = (step: number): void => {
        setStepNumber(step);
        setIsXNext((step % 2) === 0)
    };

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move} >
                <button onClick={() => jumpTo(move)}>
                    {desc}
                </button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (isXNext ? "X" : "O");
    }

    // The 'Game' component passes a part of the history called 'sqaures'
    // to the 'Board'component. We also passes a 'onClick' event to the 'Board' component.
    return (
        <div className={styles.game} >
            <div>
                <Board
                    squares={current.squares}
                    onClick={(i: any) => handleClick(i)}
                />
            </div>
            < div className={styles.gameInfo} >
                <div>{status} </div>
                < ol > {moves} </ol>
            </div>
        </div>
    );
};