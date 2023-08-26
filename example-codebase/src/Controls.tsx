import React from "react"

const Controls = ({ onClick }: any) => {
  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "1em" }}
      ></div>
      <div>
        <div>
          <button
            style={{ margin: "0.25em", width: 40, height: 40 }}
            onClick={() => onClick(1)}
          >
            1
          </button>
          <button
            style={{ margin: "0.25em", width: 40, height: 40 }}
            onClick={() => onClick(2)}
          >
            2
          </button>
          <button
            style={{ margin: "0.25em", width: 40, height: 40 }}
            onClick={() => onClick(3)}
          >
            3
          </button>
        </div>
        <div>
          <button
            style={{ margin: "0.25em", width: 40, height: 40 }}
            onClick={() => onClick(4)}
          >
            4
          </button>
          <button
            style={{ margin: "0.25em", width: 40, height: 40 }}
            onClick={() => onClick(5)}
          >
            5
          </button>
          <button
            style={{ margin: "0.25em", width: 40, height: 40 }}
            onClick={() => onClick(6)}
          >
            6
          </button>
        </div>
        <div>
          <button
            style={{ margin: "0.25em", width: 40, height: 40 }}
            onClick={() => onClick(7)}
          >
            7
          </button>
          <button
            style={{ margin: "0.25em", width: 40, height: 40 }}
            onClick={() => onClick(8)}
          >
            8
          </button>
          <button
            style={{ margin: "0.25em", width: 40, height: 40 }}
            onClick={() => onClick(9)}
          >
            9
          </button>
        </div>
      </div>
    </div>
  )
}

export default Controls
