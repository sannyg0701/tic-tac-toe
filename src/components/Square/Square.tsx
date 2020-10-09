import React from "react";
import { SquareProps } from "../../types/types";
import styles from "./Square.module.css";

export const Square = (props: SquareProps) => {
    return (
        <button className={styles.square} onClick={props.onClick} >
            {props.value}
        </button>
    );
}