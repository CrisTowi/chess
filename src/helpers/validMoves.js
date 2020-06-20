export const inValidMoves = (validMoves, pos) => {
  for (let i = 0; i < validMoves.length; i++) {
    if (validMoves[i].x === pos.x && validMoves[i].y === pos.y) {
      return true;
    }
  }

  return false;
};

export const getValidPawnMoves = (piece, grid) => {
  let result = [];
  let moveDirection = -1;
  let otherColor = 'black';

  if (piece.color === 'black') {
    moveDirection = 1;
    otherColor = 'white';
  }

  result.push({ y: piece.pos.y + moveDirection, x: piece.pos.x });

  if (!piece.moved) {
    result.push({ y: piece.pos.y + (moveDirection * 2), x: piece.pos.x });
  }

  if (piece.pos.x !== 0
    && grid[piece.pos.y + moveDirection][piece.pos.x - 1].piece
    && grid[piece.pos.y + moveDirection][piece.pos.x - 1].piece.color === otherColor
  ) {
    result.push({ y: piece.pos.y + moveDirection, x: piece.pos.x - 1 });
  }

  if (piece.pos.x !== 7
    && grid[piece.pos.y + moveDirection][piece.pos.x + 1].piece
    && grid[piece.pos.y + moveDirection][piece.pos.x + 1].piece.color === otherColor
  ) {
    result.push({ y: piece.pos.y + moveDirection, x: piece.pos.x + 1 });
  }

  return result;
};