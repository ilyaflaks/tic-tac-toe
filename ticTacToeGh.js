function checkWinner(state) {
  const win = [
    //horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < win.length; i++) {
    const [a, b, c] = win[i];
    if (state[a] == state[b] && state[a] == state[c] && state[a] != null) {
      return state[a];
    }
  }
  return null;
}

const Square = ({ id, winner, choosePlayer, newState, state }) => {
  const [status, setStatus] = React.useState(null);
  const xorO = ["O", "X"];

  return (
    <button
      onClick={() => {
        if (winner || state[id] != null) {
          return;
        }
        choosePlayer();
        let nextPlayer = newState(id);
        console.log("Button Click");
        console.log("i: " + id);
        setStatus(nextPlayer);
      }}
    >
      <h1>{xorO[status]}</h1>
    </button>
  );
};

const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [state, setState] = React.useState(Array(9).fill(null));
  const xorO = ["O", "X"];

  let status = `Player ${player} (${xorO[player]})`;

  let winner = checkWinner(state);
  if (winner != null) {
    status = `Player ${winner} wins!`;
  }

  function choosePlayer() {
    setPlayer((player + 1) % 2);
    status = `Player ${player}`;
  }

  const newState = (idOfSquare) => {
    let thePlayer = player;
    state[idOfSquare] = player; // player is present player
    setState(state); //state is an array of 0 or 1 or null
    let nextPlayer = (player + 1) % 2;
    setPlayer(nextPlayer);
    return thePlayer; //need to return the present player
  };

  function renderSquare(i) {
    return (
      <Square
        id={i}
        state={state}
        winner={winner}
        choosePlayer={choosePlayer}
        newState={newState}
      ></Square>
    );
  }

  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <span className="status">{status}</span>
        {winner && (
          <button
            className="new-game"
            type="button"
            onClick={() => {
              console.log("new game clicked");
              document.location.reload(true);
            }}
          >
            New Game
          </button>
        )}
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
