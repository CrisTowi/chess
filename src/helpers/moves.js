import { get } from 'svelte/store';

import {
  pieces,
  grid,
  turn,
  inCheck,
  winner,
} from '../store/store';

import {
  getGridAfterMove,
  getOtherColor,
  getPiecesObjectAfterMove,
  getPieceValidMoves,
  getPiecesByColor,
  isInCheck,
  isInCheckMate,
} from './helpers';

import {
  inValidMoves,
} from '../helpers/validMoves';

import {
  handlePromote, handleCheckAndCheckMate,
} from '../helpers/chessActions';

export const handleCastling = (king, rook) => {
  const $pieces = get(pieces);
  const $grid = get(grid);

  const otherColor = getOtherColor(king.color);
  const rivalKing = $pieces['king_' + otherColor];
  const rivalPieces = getPiecesByColor(otherColor, $pieces);

  const kingPos = king.pos.x - rook.pos.x < 0
    ? { y: king.pos.y, x: king.pos.x + 2 }
    : { y: king.pos.y, x: king.pos.x - 2 };

  const rookPos = king.pos.x - rook.pos.x < 0
  ? { y: rook.pos.y, x: kingPos.x - 1 }
  : { y: rook.pos.y, x: kingPos.x + 1 };


  // Move rook
  let updatedPieces = getPiecesObjectAfterMove($pieces, rook.id, {
    pos: rookPos,
    moved: true,
  });

  let updatedGrid = getGridAfterMove($grid, rook.pos, rookPos, rook);

  // Move king
  updatedPieces = getPiecesObjectAfterMove(updatedPieces, king.id, {
    pos: kingPos,
    moved: true,
  });

  updatedGrid = getGridAfterMove(updatedGrid, king.pos, kingPos, king);

  // Apply changes on the state
  pieces.update(() => updatedPieces);
  grid.update(() => updatedGrid);

  const currentPieces = getPiecesByColor(king.color, updatedPieces);

  turn.update(() => otherColor);

  if (isInCheck(rivalKing, currentPieces, updatedGrid)) {
    inCheck.update(() => rivalKing);

    if (isInCheckMate(king, updatedPieces, updatedGrid)) {
      winner.update(() => king.color);
      turn.update(() => null);
    }
  } else if (!isInCheck(updatedPieces[king.id], rivalPieces, updatedGrid)) {
    inCheck.update(() => null);
  }
};

export const handlePieceMove = (piece, pos) => {
  const $pieces = get(pieces);
  const $grid = get(grid);
  const $inCheck = get(inCheck);

  const otherColor = getOtherColor(piece.color);
  const currentKing = $pieces['king_' + piece.color];
  const rivalKing = $pieces['king_' + otherColor];

  // Pieces calculation
  const rivalPieces = getPiecesByColor(otherColor, $pieces);

  let piaceValidMoves = getPieceValidMoves(piece, $grid);

  if (!inValidMoves(piaceValidMoves, pos)) return;

  // Get updated state of the game after the move before applying
  let updatedPieces = getPiecesObjectAfterMove($pieces, piece.id, {
    pos,
    moved: true,
  });

  let updatedGrid = getGridAfterMove($grid, piece.pos, pos, piece);

  if ($grid[pos.y][pos.x].piece) {
    const eatedId = $grid[pos.y][pos.x].piece.id;
    updatedPieces = getPiecesObjectAfterMove(updatedPieces, eatedId, {
      alive: false,
      pos: null,
    });
  }

  const currentPieces = getPiecesByColor(piece.color, updatedPieces);

  // If you are in check, you have to get out of check
  if (($inCheck && (inCheck.color !== piece.color)) && isInCheck(currentKing, rivalPieces, updatedGrid)) {
    return;
  } else if ($inCheck && ($inCheck.color === piece.color)) {
    let kingEval = currentKing;

    if (piece.name === 'king') {
      kingEval = {
        ...currentKing,
        pos
      };
    }

    if (isInCheck(kingEval, rivalPieces, updatedGrid)) {
      return;
    }
  }

  // Apply changes on the state
  pieces.update(() => updatedPieces);
  grid.update(() => updatedGrid);


  handlePromote(piece, pos);
  handleCheckAndCheckMate(piece, currentPieces, rivalPieces, updatedPieces, updatedGrid);
}