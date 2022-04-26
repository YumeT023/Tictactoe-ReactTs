import React, { useContext, useState } from 'react'
import './Game.css'
import { Board } from './components/Board'


export const Game = () => {

    const [state, setHistory] = useState({
        history: [{
            squares: Array(9).fill(null)
        }],
        xIsNext: true,
        stepNums: 0,
        recordC: Array(9).fill(null),
        lClick: 0
    })

    const calcWinner = (square: string[]): number[] | null => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        
        for (let i in lines) {
            const [a, b, c] = lines[i];
            if (square[a] && square[a] == square[b] && square[a] == square[c])
                return lines[i]
        }
        return null
    }

    const handleClick = (i: number) => {
        const history = state.history.slice(0, state.stepNums + 1)
        const current = history[history.length - 1]
        const squares = current.squares.slice();
        const recordUpdate = state.recordC.slice();

        if (calcWinner(squares) || squares[i])
            return;

        recordUpdate[state.stepNums] = i
        squares[i] = state.xIsNext ? 'X' : 'O'
        setHistory({
            history: history.concat([{
                squares: squares
            }]),
            stepNums: history.length,
            xIsNext: !state.xIsNext,
            recordC: recordUpdate,
            lClick: i
        })
    }

    const jumpTo = (step: number) => {
        setHistory({
            history: state.history,
            xIsNext: (step % 2) === 0,
            stepNums: step,     
            recordC: state.recordC,
            lClick: state.recordC[step - 1]
        })
    }
    
    const history =  state.history
    const current = history[state.stepNums]
    const winner = calcWinner(current.squares);

    const moves = history.map((step, move) => {
        const description = move ?
        'Go to the #' + move :
        'Go to game start'
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })


    let status: string;
    if (winner)
        status = 'Winner: ' + winner[0]
    else
        status = 'Next player: ' + (state.xIsNext ? 'X' : 'O')


    return (
        <div className="Game">
        <div className="game-board">
          <Board
            squares={current.squares}
            isColored={state.lClick}
            winLine={winner ? winner : []}
            onClick={(i: number) => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
}