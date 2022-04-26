import React from 'react'
import { Square } from './Square'

interface Boardprops {
    squares: string[]
    onClick(i: number): any
    isColored: number
    winLine: number[]
}

export const Board = (props: Boardprops) => {
    const winLine = (i: number) => {
        const [a, b, c] = props.winLine
        return i == a || i == b || i == c ? 'winLine' : ''
    }
    const renderSquare = (i: number) => {
        return (
            <Square 
                value={props.squares[i]}
                winLine={props.winLine ? winLine(i) : ''}
                color={props.isColored == i}
                onClick={() => props.onClick(i)}
            />
        )
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
    )
}