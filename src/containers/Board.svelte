<script>
import {
  pieces,
  grid,
  turn,
  toPromotePiece,
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
} from '../helpers/helpers';
import {
  inValidMoves,
  getValidPawnMoves,
  getValidRookMoves,
  getValidBishopMoves,
  getValidQueenMoves,
  getValidKingMoves,
  getValidKnightMoves,
} from '../helpers/validMoves';

import Cell from '../components/Cell.svelte';

const handleDropInside = (pieceId, pos) => {
  const piece = Object.assign({}, $pieces[pieceId]);
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

  if ($inCheck !== piece.color && isInCheck(currentKing, rivalPieces, updatedGrid)) {
    return;
  } else if ($inCheck === piece.color) {
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
    // End turn
    turn.update(() => otherColor);
  }

  if (isInCheck(rivalKing, currentPieces, updatedGrid)) {
    inCheck.update(() => rivalKing.color);

    if (isInCheckMate(piece, updatedPieces, updatedGrid)) {
      winner.update(() => piece.color);
      turn.update(() => null);
    }
  } else if (!isInCheck(currentKing, rivalPieces, updatedGrid)) {
    inCheck.update(() => null);
  }
};
</script>

<style>
.Board {
  display: grid;
  grid-template-columns: repeat(8, 12.5%);
  grid-template-rows: repeat(8, 12.5%);
  height: 100%;
  width: 100%;
}
</style>

<div class="Board">
  {#each $grid as row}
    {#each row as cell}
      <Cell
        onDropInside={handleDropInside}
        color={cell.color}
        column={cell.column}
        pos={{x: cell.x, y: cell.y}}
        piece={cell.piece}
        reachable={cell.reachable}
        row={cell.row} />
    {/each}
  {/each}
</div>