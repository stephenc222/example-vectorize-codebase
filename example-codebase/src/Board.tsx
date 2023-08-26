import React from "react"

type ID = {
  row: number
  column: number
}

export type CellData = {
  value: number | undefined
  id: ID
  config: boolean
  valid?: boolean
}

export type Row = CellData[]

const Cell = ({
  value,
  onClick,
  active,
  sameRow,
  sameColumn,
  row,
  column,
  valid,
}: any) => (
  <button
    onClick={onClick}
    style={{
      width: 60,
      height: 60,
      fontSize: 18,
      color: valid === true ? "blue" : valid === false ? "coral" : undefined,
      padding: "0.5em",
      borderTop:
        row === 3 || row === 6 ? "2px solid black" : "1px solid #bdbdbd",
      borderBottom: "1px solid #bdbdbd",
      borderLeft: "1px solid #bdbdbd",
      borderRight:
        column === 2 || column === 5 ? "2px solid black" : "1px solid #bdbdbd",
      // borderRight: undefined,
      // borderBottom: undefined,
      backgroundColor: active
        ? "skyblue"
        : sameRow || sameColumn
        ? "#daeff8"
        : "white",
    }}
  >
    {value}
  </button>
)

const Board = ({
  activeCell,
  board = [[]],
  onClick = () => {},
}: {
  activeCell: CellData
  board: Row[]
  onClick: (id: CellData["id"], config: boolean, value?: number) => void
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",
      }}
    >
      {board.map((row, index) => (
        <div style={{ display: "flex" }} key={`row_${index}`}>
          {row.map(({ config, id, value, valid }) => (
            <Cell
              key={`${id.row}_$${id.column}`}
              value={value}
              valid={valid}
              row={id.row}
              column={id.column}
              sameRow={activeCell?.id?.row === id.row}
              sameColumn={activeCell?.id?.column === id.column}
              active={
                id.row === activeCell?.id?.row &&
                id.column === activeCell?.id?.column
              }
              onClick={() => onClick(id, config, value)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
