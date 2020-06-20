<script>
import { pieces, grid } from '../store/store';
import { getPieceByCoord } from '../helpers/helpers';
import {
  inValidMoves,
  getValidPawnMoves,
  getValidRookMoves,
  getValidBishopMoves,
  getValidQueenMoves,
} from '../helpers/validMoves';

import Cell from './Cell.svelte';

const handleDragStart = (pieceId) => {
  const piece = JSON.parse(JSON.stringify($pieces[pieceId]));
  let validMoves = [];

  switch(piece.name) {
    case 'pawn':
      validMoves = getValidPawnMoves(piece, $grid);
      break;
    case 'rook':
      validMoves = getValidRookMoves(piece, $grid);
      break;
    case 'bishop':
      validMoves = getValidBishopMoves(piece, $grid);
      break;
    case 'queen':
      validMoves = getValidQueenMoves(piece, $grid);
      break;
    default:
      validMoves = [];
  }

  grid.update((oldGrid) => {
    validMoves.forEach((move) => {
      oldGrid[move.y][move.x].reachable = true;
    });

    return oldGrid;
  });
}

const handleDropInside = (pieceId, pos) => {
  const piece = JSON.parse(JSON.stringify($pieces[pieceId]));
  let validMoves = [];

  switch(piece.name) {
    case 'pawn':
      validMoves = getValidPawnMoves(piece, $grid);
      break;
    case 'rook':
      validMoves = getValidRookMoves(piece, $grid);
      break;
    case 'bishop':
      validMoves = getValidBishopMoves(piece, $grid);
      break;
    case 'queen':
      validMoves = getValidQueenMoves(piece, $grid);
      break;
    default:
      validMoves = [];
  }


  if (!inValidMoves(validMoves, pos)) {
    return;
  }

  pieces.update((oldPieces) => {
    return {
      ...oldPieces,
      [pieceId]: {
        ...oldPieces[pieceId],
        pos,
        moved: true,
      }
    }
  });

  grid.update((oldGrid) => {
    validMoves.forEach((move) => {
      oldGrid[move.y][move.x].reachable = false;
    });
    oldGrid[piece.pos.y][piece.pos.x].piece = null;
    oldGrid[pos.y][pos.x].piece = {
      ...piece,
      pos,
      id: pieceId
    };

    return oldGrid;
  });
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
        onDragStart={handleDragStart}
        color={cell.color}
        column={cell.column}
        pos={{x: cell.x, y: cell.y}}
        piece={cell.piece}
        reachable={cell.reachable}
        row={cell.row} />
    {/each}
  {/each}
</div>