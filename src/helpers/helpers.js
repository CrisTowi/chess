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
        piece: null,
        reachable: false,
        color: colorBool ? 'white' : 'black',
        row,
        column,
      });
      colorBool = !colorBool;
    }
    colorBool = !colorBool;
  }

  console.log(boardCells);

  return boardCells;
}