import {
  getValidPawnMoves,
  getValidRookMoves,
  getValidBishopMoves,
  getValidQueenMoves,
  getValidKingMoves,
  getValidKnightMoves,
} from './validMoves';

export const nextChar = (c) => {
  return String.fromCharCode(c.charCodeAt(0) + 1);
};

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
};

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
};

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
};

export const getTimeObjFromMs = (t) => {
  const min = Math.floor((t / 1000) / 60);
  const rem = t - (min * 1000 * 60);
  const sec = Math.floor(rem / 1000);
  const ms = (rem - (sec * 1000)) / 10;

  return {
    min: min <= 9 ? `0${min}` : min,
    sec: sec <= 9 ? `0${sec}` : sec,
    ms: ms <= 9 ? `0${ms}` : ms,
  };
};

export const getOtherColor = (color) => {
  if (color === 'black') return 'white';
  return 'black';
};

export const getPiecesByColor = (color, pieces) => {
  return Object.keys(pieces)
    .map((piece) => pieces[piece])
    .filter((piece) => piece.color === color && piece.alive);
};

export const isInCheck = (king, rivalPieces, grid) => {
  return rivalPieces.reduce((prevVal, piece) => {
    let validMoves = [];

    switch(piece.name) {
      case 'pawn':
        validMoves = getValidPawnMoves(piece, grid);
        break;
      case 'rook':
        validMoves = getValidRookMoves(piece, grid);
        break;
      case 'bishop':
        validMoves = getValidBishopMoves(piece, grid);
        break;
      case 'queen':
        validMoves = getValidQueenMoves(piece, grid);
        break;
      case 'king':
        validMoves = getValidKingMoves(piece, grid);
        break;
      case 'knight':
        validMoves = getValidKnightMoves(piece, grid);
        break;
      default:
        validMoves = [];
    }

    return validMoves.some(move => move.x === king.pos.x && move.y === king.pos.y) || prevVal;
  }, false);
};

export const hasNotValidMovesOutoFCheck = (piece, pieces, grid) => {
  const gridClone = JSON.parse(JSON.stringify(grid));
  const otherColor = getOtherColor(piece.color);
  const rivalPieces = getPiecesByColor(otherColor, pieces);
  const rivalKing = pieces['king_' + otherColor];

  for (let i = 0; i < rivalPieces.length; i++) {
    const validMoves = getPieceValidMoves(rivalPieces[i], gridClone);

    for (let j = 0; j < validMoves.length; j++) {
      const updatedGrid = getGridAfterMove(gridClone, rivalPieces[i].pos, validMoves[j], rivalPieces[i]);
      let currentPieces = getPiecesByColor(piece.color, pieces);

      if (gridClone[validMoves[j].y][validMoves[j].x].piece
          && gridClone[validMoves[j].y][validMoves[j].x].piece.color === piece.color) {
        const eatedPiece = gridClone[validMoves[j].y][validMoves[j].x].piece;

        currentPieces = currentPieces.filter((currentPiece) => {
          return currentPiece.id !== eatedPiece.id
        });
      }

      let kingEval = rivalKing;

      if (rivalPieces[i].name === 'king') {
        kingEval = {
          ...rivalKing,
          pos: validMoves[j]
        };
      }

      if (!isInCheck(kingEval, currentPieces, updatedGrid, rivalPieces[i].id === 'pawn_8_black')) {
        return false;
      }
    }
  }

  return true;
}

export const getPiecesObjectAfterMove = (pieces, pieceId, toUpdate) => {
  const piecesClone = JSON.parse(JSON.stringify(pieces));

  const updated = {
    ...piecesClone,
    [pieceId]: {
      ...piecesClone[pieceId],
      ...toUpdate,
    }
  };

  return updated;
};

export const getGridAfterMove = (grid, oldPos, newPos, piece) => {
  const gridClone = JSON.parse(JSON.stringify(grid));

  gridClone[oldPos.y][oldPos.x].piece = null;
  gridClone[newPos.y][newPos.x].piece = {
    ...piece,
    pos: newPos,
  };

  return gridClone;
};

export const getGridAfterSwitchPieceProp = (grid, pos, piece) => {
  const gridClone = JSON.parse(JSON.stringify(grid));
  gridClone[pos.y][pos.x].piece = piece;

  return gridClone;
};

export const getPieceValidMoves = (piece, grid) => {
  let validMoves = [];

  switch(piece.name) {
    case 'pawn':
      validMoves = getValidPawnMoves(piece, grid);
      break;
    case 'rook':
      validMoves = getValidRookMoves(piece, grid);
      break;
    case 'bishop':
      validMoves = getValidBishopMoves(piece, grid);
      break;
    case 'queen':
      validMoves = getValidQueenMoves(piece, grid);
      break;
    case 'king':
      validMoves = getValidKingMoves(piece, grid);
      break;
    case 'knight':
      validMoves = getValidKnightMoves(piece, grid);
      break;
    default:
      validMoves = [];
  }

  return validMoves;
}
