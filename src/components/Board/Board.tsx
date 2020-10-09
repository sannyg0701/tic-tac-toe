import React, { ReactNode } from "react";
import { BoardProps } from "../../types/types";
import { Square } from "../Square/Square";
import styles from "./Board.module.css";

// Our 'Board' component
// This component renders 9 'Square' components and passes the value which could be
// NULL, X or O and the 'onClick' event to the 'Square' component.
export const Board: React.FC<BoardProps> = props => {
    // 'renderSquare' is a function inside of this functional component.
    // It returns the 'Square' component declared above. How do we do this? 
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
            <div className={styles.boardRow} >
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className={styles.boardRow} >
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className={styles.boardRow} >
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}