export const insideBounds = (pos) => {
  return pos.x >= 0 && pos.x <= 7 && pos.y >= 0 && pos.y <= 7;
};

export const getValidMovesUntilLimit = (pos, color, relativePos, grid) => {
  const tempPos = Object.assign({}, pos);
  const result = [];

  let otherColor = 'black';

  if (color === 'black') {
    otherColor = 'white';
  }

  tempPos.x = tempPos.x + relativePos.x;
  tempPos.y = tempPos.y + relativePos.y;

  while (insideBounds(tempPos) && !grid[tempPos.y][tempPos.x].piece) {
    result.push({ x: tempPos.x, y: tempPos.y });
    tempPos.x = tempPos.x + relativePos.x;
    tempPos.y = tempPos.y + relativePos.y;
  }

  if (tempPos.x >= 0
      && tempPos.x <= 7
      && tempPos.y >= 0
      && tempPos.y <= 7
      && grid[tempPos.y][tempPos.x].piece
      && grid[tempPos.y][tempPos.x].piece.color === otherColor
    ) {
    result.push({ x: tempPos.x, y: tempPos.y });
  }

  return result;
};

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

  // Vertical moves
  if (!grid[piece.pos.y + moveDirection][piece.pos.x].piece) {
    result.push({ y: piece.pos.y + moveDirection, x: piece.pos.x });
  }

  if (!piece.moved && !grid[piece.pos.y + (moveDirection * 2)][piece.pos.x].piece) {
    result.push({ y: piece.pos.y + (moveDirection * 2), x: piece.pos.x });
  }

  // Diagonal moves
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

export const getValidRookMoves = (piece, grid) => {
  const upValidMoves = getValidMovesUntilLimit(piece.pos, piece.color, { x: 0, y: -1}, grid);
  const downValidMoves = getValidMovesUntilLimit(piece.pos, piece.color, { x: 0, y: 1}, grid);
  const leftValidMoves = getValidMovesUntilLimit(piece.pos, piece.color, { x: -1, y: 0}, grid);
  const rightValidMoves = getValidMovesUntilLimit(piece.pos, piece.color, { x: 1, y: 0}, grid);

  return [...upValidMoves, ...downValidMoves, ...leftValidMoves, ...rightValidMoves];
};

export const getValidBishopMoves = (piece, grid) => {
  const upRightValidMoves = getValidMovesUntilLimit(piece.pos, piece.color, { x: 1, y: -1}, grid);
  const upLeftValidMoves = getValidMovesUntilLimit(piece.pos, piece.color, { x: -1, y: -1}, grid);
  const downRightValidMoves = getValidMovesUntilLimit(piece.pos, piece.color, { x: 1, y: 1}, grid);
  const downLeftValidMoves = getValidMovesUntilLimit(piece.pos, piece.color, { x: -1, y: 1}, grid);

  return [...upRightValidMoves, ...upLeftValidMoves, ...downRightValidMoves, ...downLeftValidMoves];
};

export const getValidQueenMoves = (piece, grid) => {
  const upRightValidMoves = getValidMovesUntilLimit(piece.pos, piece.color, { x: 1, y: -1}, grid);
  const upLeftValidMoves = getValidMovesUntilLimit(piece.pos, piece.color, { x: -1, y: -1}, grid);
  const downRightValidMoves = getValidMovesUntilLimit(piece.pos, piece.color, { x: 1, y: 1}, grid);
  const downLeftValidMoves = getValidMovesUntilLimit(piece.pos, piece.color, { x: -1, y: 1}, grid);
  const upValidMoves = getValidMovesUntilLimit(piece.pos, piece.color, { x: 0, y: -1}, grid);
  const downValidMoves = getValidMovesUntilLimit(piece.pos, piece.color, { x: 0, y: 1}, grid);
  const leftValidMoves = getValidMovesUntilLimit(piece.pos, piece.color, { x: -1, y: 0}, grid);
  const rightValidMoves = getValidMovesUntilLimit(piece.pos, piece.color, { x: 1, y: 0}, grid);

  return [
    ...upRightValidMoves, 
    ...upLeftValidMoves, 
    ...downRightValidMoves, 
    ...downLeftValidMoves,
    ...upValidMoves,
    ...downValidMoves,
    ...leftValidMoves,
    ...rightValidMoves,
  ];
};

export const getValidKingMoves = (piece, grid) => {
  let otherColor = 'black';

  if (piece.color === 'black') {
    otherColor = 'white';
  }

  const result = [
    { x: piece.pos.x + 0, y: piece.pos.y + 1 },
    { x: piece.pos.x + 0, y: piece.pos.y - 1 },
    { x: piece.pos.x + -1, y: piece.pos.y + 1 },
    { x: piece.pos.x + -1, y: piece.pos.y + 0 },
    { x: piece.pos.x + -1, y: piece.pos.y + -1 },
    { x: piece.pos.x + 1, y: piece.pos.y + 1 },
    { x: piece.pos.x + 1, y: piece.pos.y + 0 },
    { x: piece.pos.x + 1, y: piece.pos.y - 1 },
  ];

  return result.filter((pos) => {
    return (
      insideBounds(pos) && !grid[pos.y][pos.x].piece
      || insideBounds(pos) && grid[pos.y][pos.x].piece && grid[pos.y][pos.x].piece.color === otherColor
    );
  });
}

export const getValidKnightMoves = (piece, grid) => {
  let otherColor = 'black';

  if (piece.color === 'black') {
    otherColor = 'white';
  }

  const result = [
    { x: piece.pos.x + 2, y: piece.pos.y + 1 },
    { x: piece.pos.x + 2, y: piece.pos.y - 1 },
    { x: piece.pos.x + -2, y: piece.pos.y + 1 },
    { x: piece.pos.x + -2, y: piece.pos.y - 1 },
    { x: piece.pos.x + -1, y: piece.pos.y - 2 },
    { x: piece.pos.x + 1, y: piece.pos.y - 2 },
    { x: piece.pos.x + -1, y: piece.pos.y + 2 },
    { x: piece.pos.x + 1, y: piece.pos.y + 2 },
  ];

  return result.filter((pos) => {
    return (
      insideBounds(pos) && !grid[pos.y][pos.x].piece
      || insideBounds(pos) && grid[pos.y][pos.x].piece && grid[pos.y][pos.x].piece.color === otherColor
    );
  });
}

