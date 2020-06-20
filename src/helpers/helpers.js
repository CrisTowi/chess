export const nextChar = (c) => {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}

export const createGrid = () => {
  const boardCells = [];
  let colorBool = true;
  let rows = 8;
  let columns = 'A';

  for (let i = 0; i < 8; i++) {
    boardCells.push([]);
    for (let j = 0; j < 8; j++) {
      let row = null;
      let column = null;
      if (j === 0) {
        row = rows;
        rows -= 1;
      }

      if (i === 7) {
        column = columns;
        columns = nextChar(columns);
      }

      boardCells[i].push({
        color: colorBool ? 'white' : 'black',
        column,
        row,
        x: j,
        y: i,
      });
      colorBool = !colorBool;
    }
    colorBool = !colorBool;
  }

  return boardCells;
}

export const fillGridWithPieces = (grid, pieces) => {
  const piecesKeys = Object.keys(pieces);

  piecesKeys.forEach((key) => {
    const piece = pieces[key];
    grid[piece.pos.y][piece.pos.x].piece = {
      ...piece,
      id: key,
    };
  });

  return grid;
}

export const getPieceByCoord = (x, y, pieces) => {
  const piecesKeys = Object.keys(pieces);
  for (let i = 0; i < piecesKeys.length; i++) {
    if (pieces[piecesKeys[i]].pos.x === x && pieces[piecesKeys[i]].pos.y === y) {
      return {
        ...pieces[piecesKeys[i]],
        id: piecesKeys[i],
      };
    }
  }

  return null;
}
