// Libraries
import { get } from 'svelte/store';

// Store
import {
  grid,
  pieces,
  toPromotePiece,
  turn,
  inCheck,
  winner,
} from '../store/store';

// Helpers
import {
  getOtherColor,
  isInCheck,
  isInCheckMate,
  getPiecesObjectAfterMove,
  getGridAfterSwitchPieceProp,
  getPiecesByColor,
} from '../helpers/helpers';

export const handlePromotePieceSelected = (piece) => {
  const $toPromotePiece = get(toPromotePiece);
  const $pieces = get(pieces);
  const $grid = get(grid);

  const otherColor = getOtherColor($toPromotePiece.color);

  let updatedPieces = getPiecesObjectAfterMove($pieces, $toPromotePiece.id, {
    name: piece
  });

  let updatedGrid = getGridAfterSwitchPieceProp($grid, $toPromotePiece.pos, updatedPieces[$toPromotePiece.id]);

  pieces.update(() => updatedPieces);
  grid.update(() => updatedGrid);

  const currentPieces = getPiecesByColor($toPromotePiece.color, updatedPieces);
  const rivalPieces = getPiecesByColor(otherColor, updatedPieces);

  handleCheckAndCheckMate(piece, currentPieces, rivalPieces, updatedPieces, updatedGrid)

  turn.update(() => otherColor);
  toPromotePiece.update(() => null);
}

export const handlePromote = (piece, pos) => {
  const otherColor = getOtherColor(piece.color);

  // Handle promotion
  if (
    piece.name === 'pawn' && piece.color === 'white' && piece.pos.y === 1 ||
    piece.name === 'pawn' && piece.color === 'black' && piece.pos.y === 6
  ) {
    toPromotePiece.update(() => ({
      ...piece,
      pos
    }));
  } else {
    turn.update(() => otherColor);
  }
}

export const handleCheckAndCheckMate = (piece, currentPieces, rivalPieces, updatedPieces, updatedGrid) => {
  const currentKing = currentPieces.find((p) => p.name === 'king');
  const rivalKing = rivalPieces.find((p) => p.name === 'king');

  if (isInCheck(rivalKing, currentPieces, updatedGrid)) {
    inCheck.update(() => rivalKing);

    if (isInCheckMate(piece, updatedPieces, updatedGrid)) {
      winner.update(() => piece.color);
      turn.update(() => null);
    }
  } else if (!isInCheck(currentKing, rivalPieces, updatedGrid)) {
    inCheck.update(() => null);
  }
}