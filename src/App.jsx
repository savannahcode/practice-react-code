import { useState } from 'react'

// This is JSX - closer to JS, than HTML. It represents an object.
// JSX can only have one element in the return statement, no spiblings. You can have elements inside the main element.
function Square({value, onClick}){
  return(
    <button className="btn btn-square btn-outline" onClick={onClick}>{value}</button>
  )
}

function Restart({onClick}){
  return(
    <button className="btn btn-outline" onClick={onClick}>Restart</button>
  )
}

function App() {
  const [squares, setSquare] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const winner = calculateWinner(squares)

  function getStatus(){
    if (winner) return "Winner: " + winner;
    else if (isBoardFull(squares)) return "It's a draw";
    return "Next player: " + (xIsNext ? 'X': 'O')
  }

  function renderSquare(i){
    return <Square value={squares[i]} onClick={() =>{
      /* Can't do this because it must be a pure function and not change the state of squares itself. You can't directly access squares in memory and change it. There is a pointer to that spot in memory.
      Instead make a new reference to the squares array and change that.
      squares[i] = 'X'
      setSquare(squares[i]) */
      if (winner || squares[i]) return
       
      const newSquares = squares.slice()
      newSquares[i] = xIsNext ? 'X': 'O'
      setSquare(newSquares)
      setXIsNext(!xIsNext)
    }}/>
  }

  function renderRestartGame(){
    return(
    <Restart onClick={()=>{
      setSquare(Array(9).fill(null))
      setXIsNext(true)
    }}/>
    )
  }

  function calculateWinner(squares){
    const possibleWins = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]

    // Loop through all possible wins
    for (let i=0; i<possibleWins.length; i++){
      // destructuring
      const [a,b,c] = possibleWins[i]
      // Check if the squares are not null & have the same value
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a]
    }
  }}

  function isBoardFull(squares){
    for (let i=0; i < squares.length; i++){
      // if any squares are null/ empty, the board is not full
      if (squares[i] === null) return false
    }
    // if all squares are full, the board is full
    return true
  }
  
  return(
    <div className="flex flex-col justify-center items-center m-5 gap-5">
      <h1 className='text-lg'>Tic Tac Toe</h1>
    <div className="flex-col">
    <div className="flex">
      {renderSquare(0)}
      {renderSquare(1)}
      {renderSquare(2)}
    </div>
    <div className="flex">
      {renderSquare(3)}
      {renderSquare(4)}
      {renderSquare(5)}
    </div>
    <div className="flex">
      {renderSquare(6)}
      {renderSquare(7)}
      {renderSquare(8)}
    </div>
    </div>
    <h2>{getStatus()}</h2>
    <div>{renderRestartGame()}</div>
    </div>
    
   //<button className="btn btn-primary">Hi</button>
   )
}

export default App

/*
STATE:
- who's turn it is
- what the board looks like
- who won
- how many moves have been made
- what squares have been clicked
Keep track of the state as close to the source as possible
(as close to the component that needs it as possible)
- if the state is only needed in one component, keep it in that component
2 States:
- Each individual square
- The entire board (Board state in app component & pass that down to the square components as a prop)
App level:
- Board state
- Turn state

LIFT STATE TO WHERE IT IS NEEDED

HOOKS:
- useState
- useEffect
- useContext
- useReducer
etc...
const [state, setState] = useState(initialState)
const [board, setBoard] = useState(Array(9).fill(null))
- arrays, objects and functions are complex data types where the value is a reference to the memory location of the data
- strings, numbers, and booleans create a new value in memory so you don't have to worry about changing the original value, or use a new copy to update the value in the UI
*/