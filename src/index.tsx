import React, {ReactNode, useState} from 'react'
import ReactDOM from 'react-dom';
import "./index.css"

// Declaring 'SquareValue' here for re-use
type SquareValue = 'X'| 'O' | null;

// Function that contains all of the possible winning combinations
const calculateWinner = (squares: SquareValue[]): SquareValue => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Interface : Tells us what props(or parameters) a functional component will be using.
interface SquareProps{
    onClick(): void;
    value: SquareValue;
}

// Our 'Square' component
// This component renders a button on the screen
// React.FC : Interface provided by Typescript to help write React components.
const Square: React.FC<SquareProps> = props => {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

  interface BoardProps{
    onClick(i : number): void;
    squares: SquareValue[];
  }
  
  // Our 'Board' component
  // This component renders 9 'Square' component
  const Board: React.FC<BoardProps> = props => {
    // 'renderSquare' is a function inside of this functional component.
    //  It returns the 'Square' component declared above. How do we do this? 
    // By importing 'ReactNode'.
    const renderSquare = (i: number): ReactNode => {
      return (
        <Square
          value={props.squares[i]}
          onClick={() => props.onClick(i)}
        />
      );
    }

    return (
    <div>
        <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        </div>
        <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        </div>
        <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
        </div>
    </div>
    );
  }
  
  // Our 'Game' component
  // This component renders a board with some placeholder values.
  // 'Game' does NOT take in any props.
  //  We are using the 'useState' hook to set the default values
  //  of 'xIsNext', 'stepNumber' and 'history'. Similar to a ctor
  const Game: React.FC = () => {
    const[xIsNext, setXIsNext] = useState<boolean>(true);
    const[stepNumber, setStepNumber] = useState<number>(0);
    const[history, setHistory] = useState<{squares: SquareValue[]}[]>([
      {
        squares : Array(9).fill(null)
      }
    ]);
    
  
     // 'handleClick' is a function inside of the 'Game' component
     // This is where all of the heavy lifting happens
     // This method
     // 1- Determines if there is a winner
     // 2- Determines who goes next
     // 3- Keeps a history of our moves
     const handleClick = (i : number): void => {
      const newHistory = history.slice(0, stepNumber + 1);
      const current = newHistory[history.length - 1];
      const squares = current.squares.slice();

      if (calculateWinner(squares) || squares[i]) {
        return;

      }
      squares[i] = xIsNext ? "X" : "O";

      setHistory(newHistory.concat([
        {
          squares: squares
        }
      ]));
      setStepNumber(newHistory.length);
      setXIsNext(!xIsNext);
    };
  
    const jumpTo = (step : number): void => {
      setStepNumber(step);
      setXIsNext((step % 2) === 0)
    };
  
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  };
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById("root"));
  