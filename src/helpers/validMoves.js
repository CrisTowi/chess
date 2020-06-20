export const inValidMoves = (validMoves, pos) => {
  for (let i = 0; i < validMoves.length; i++) {
    if (validMoves[i].x === pos.x && validMoves[i].y === pos.y) {
      return true;
    }
  }

  return false;
};

export const getValidPawnMoves = (piece, grid) => {
  if (piece.moved && piece) {

  }

  return [
    { y: 4, x: 0 },
    { y: 5, x: 0 },
  ]
};