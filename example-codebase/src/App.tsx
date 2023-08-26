import { useEffect, useState } from "react"
import Board, { Row, CellData } from "./Board"
import Controls from "./Controls"
import {
  ROWS,
  COLUMNS,
  SQUARES_ARRAY,
  EMPTY_CELLS,
  TOTAL_CELLS,
} from "./constants"
import { Sudoku } from "./sudoku"

// copying:
// https://sudoku.com/
// more blanks, more easy

const found = (board: Row[], num: number, row: number, column: number) => {
  // check the horizontal row for duplicates
  // finally, check the "square" 3x3 of the given row and column

  for (let i = 0; i < COLUMNS; ++i) {
    if (board[i]?.[column]?.value === num) {
      return true
    }
  }

  // check the vertical column for duplicates
  for (let i = 0; i < ROWS; ++i) {
    if (board[row]?.[i]?.value === num) {
      return true
    }
  }
  const { start, end }: any = SQUARES_ARRAY.find(
    (square) =>
      row >= square.start.row &&
      row <= square.end.row &&
      column >= square.start.column &&
      column <= square.end.column
  )

  for (let i = start.row; i <= end.row; ++i) {
    for (let j = start.column; j <= end.column; ++j) {
      if (board[i]?.[j]?.value === num) {
        return true
      }
    }
  }

  return false
}

const getRandomBoard = (emptyCells = EMPTY_CELLS) => {
  const board: Row[] = [[]]
  const sudoku = new Sudoku(TOTAL_CELLS - emptyCells)
  const rawBoard: number[][] = sudoku.generate().getBoard()

  for (let i = 0; i < ROWS; ++i) {
    if (!board[i]) {
      board[i] = []
    }
    for (let j = 0; j < COLUMNS; ++j) {
      const value = rawBoard[i][j] as unknown as number | string
      board[i][j] = {
        value: (value === "" ? undefined : value) as number,
        id: { row: i, column: j },
        config: value !== "",
      }
    }
  }
  return { board, numBlanks: emptyCells }
}

function App() {
  const [board, setBoard] = useState<Row[]>([[]])
  const [reset, setReset] = useState(true)
  const [numBlanks, setNumBlanks] = useState(0)
  const [activeCell, setActiveCell] = useState<CellData>()
  const onNumberClick = (value: number) => {
    const nextBoard = board.slice()
    if (activeCell?.id && !activeCell?.config) {
      const valid = !found(
        board,
        value,
        activeCell.id.row,
        activeCell.id.column
      )
      nextBoard[activeCell.id.row][activeCell.id.column].valid = valid
      if (valid) {
        setNumBlanks(numBlanks - 1)
      }
      nextBoard[activeCell.id.row][activeCell.id.column].value = value
      setBoard(nextBoard)
    }
  }

  const onRestart = () => {
    localStorage.removeItem("sudoku_game_board")
    setReset(true)
  }
  const onCellClick = (id: CellData["id"], config: boolean, value?: number) => {
    setActiveCell({ id, config, value })
  }

  useEffect(() => {
    // live board, not initial state
    if (board[0][0]) {
      localStorage.setItem("sudoku_game_board", JSON.stringify(board))
      localStorage.setItem(
        "sudoku_game_board_blanks",
        JSON.stringify(numBlanks)
      )
    }
  }, [board, numBlanks])

  useEffect(() => {
    const gameBoard =
      localStorage.getItem("sudoku_game_board") &&
      JSON.parse(localStorage.getItem("sudoku_game_board") as string)
    if (reset && !gameBoard) {
      const { board: nextGameBoard, numBlanks } = getRandomBoard()
      localStorage.setItem("sudoku_game_board", JSON.stringify(nextGameBoard))
      localStorage.setItem(
        "sudoku_game_board_blanks",
        JSON.stringify(numBlanks)
      )
      setBoard(nextGameBoard)
      setNumBlanks(numBlanks)
      setReset(false)
    }
    if (reset && gameBoard) {
      setBoard(gameBoard)
      setNumBlanks(
        JSON.parse(
          localStorage.getItem("sudoku_game_board_blanks") as string
        ) as number
      )
      setReset(false)
    }
  }, [reset])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.code.match(/Digit[1-9]/) &&
        activeCell?.id &&
        !activeCell?.config
      ) {
        const nextBoard = board.slice()
        const value = parseInt(event.key)
        const valid = !found(
          board,
          value,
          activeCell.id.row,
          activeCell.id.column
        )

        nextBoard[activeCell.id.row][activeCell.id.column].valid = valid
        nextBoard[activeCell.id.row][activeCell.id.column].value = value
        if (valid) {
          setNumBlanks(numBlanks - 1)
        }
        setBoard(nextBoard)
      }
    }
    document.addEventListener("keydown", onKeyDown)

    return () => document.removeEventListener("keydown", onKeyDown)
  }, [board, activeCell, numBlanks])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <main style={{ display: "flex", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ width: "100%", textAlign: "center" }}>React Sudoku</h1>
          {numBlanks > 0 && (
            <Board
              activeCell={activeCell as CellData}
              onClick={onCellClick}
              board={board}
            />
          )}
        </div>
        <div
          style={{
            padding: "2em",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          {numBlanks > 0 ? `Blanks remaining: ${numBlanks}` : "You won!"}
          <button onClick={onRestart}>New Game</button>
          {numBlanks !== 0 && (
            <Controls onClick={onNumberClick} onRestart={onRestart} />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
