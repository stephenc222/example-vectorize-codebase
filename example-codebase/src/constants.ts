export const ROWS = 9
export const COLUMNS = 9
export const EMPTY_CELLS = 10
export const TOTAL_CELLS = 81

export const SQUARES_ARRAY = [
  // top left square
  {
    start: { row: 0, column: 0 },
    end: { row: 2, column: 2 },
  },
  // top middle square
  {
    start: { row: 0, column: 3 },
    end: { row: 2, column: 5 },
  },
  // top right square
  {
    start: { row: 0, column: 6 },
    end: { row: 2, column: 8 },
  },
  // middle left square
  {
    start: { row: 3, column: 0 },
    end: { row: 5, column: 2 },
  },
  // middle middle square
  {
    start: { row: 3, column: 3 },
    end: { row: 5, column: 5 },
  },
  // middle right square
  {
    start: { row: 3, column: 6 },
    end: { row: 5, column: 8 },
  },
  // bottom left square
  {
    start: { row: 6, column: 0 },
    end: { row: 8, column: 2 },
  },
  // bottom middle square
  {
    start: { row: 6, column: 3 },
    end: { row: 8, column: 5 },
  },
  // bottom right square
  {
    start: { row: 6, column: 6 },
    end: { row: 8, column: 8 },
  },
]
