/**
 * Type designating a square in TicTacToe
 * 
 * @type {string|null}
 */
export type SquareValue = 'X' | 'O' | null;

/**
 * Our 'SquareProps' interface
 * 
 * @property {Function} onClick
 * @property {SquareValue} value
 */
export interface SquareProps {
    onClick(): void;
    value: SquareValue;
}

/**
 * Our 'BoardProps' interface
 * 
 * @property {Function} onClick
 * @property {SquareValue[]} squares
 */
export interface BoardProps {
    onClick(i: number): void;
    squares: SquareValue[];
}