<script>
import {
  pieces,
  grid,
  turn,
  startTime,
  whiteRemaining,
  blackRemaining,
  toPromotePiece,
} from '../store/store';
import {
  getGridAfterMove,
  getOtherColor,
  getPieceByCoord,
  getPiecesObjectAfterMove,
  inJaque,
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

const handleDragStart = (pieceId) => {
  const piece = JSON.parse(JSON.stringify($pieces[pieceId]));
  let validMoves = [];

  grid.update((oldGrid) => {
    validMoves.forEach((move) => {
      oldGrid[move.y][move.x].reachable = true;
    });

    return oldGrid;
  });
}

const handleDropInside = (pieceId, pos) => {
  const piece = Object.assign({}, $pieces[pieceId]);
  const otherColor = getOtherColor(piece.color);

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
    case 'king':
      validMoves = getValidKingMoves(piece, $grid);
      break;
    case 'knight':
      validMoves = getValidKnightMoves(piece, $grid);
      break;
    default:
      validMoves = [];
  }

  if (!inValidMoves(validMoves, pos)) {
    return;
  }

  const updatedPiece = getPiecesObjectAfterMove($pieces, piece.id, {
    pos,
    moved: true,
  });

  const updatedGrid = getGridAfterMove($grid, piece.pos, pos, piece);

  pieces.update(() => {
    if ($grid[pos.y][pos.x].piece) {
      const eatedId = $grid[pos.y][pos.x].piece.id;
      return getPiecesObjectAfterMove(updatedPiece, eatedId, {
        alive: false,
        pos: null,
      });
    }

    return updatedPiece;
  });

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
    turn.update(() => otherColor);
  }

  const rivalKing = $pieces[`king_${otherColor}`];

  console.log(inJaque(rivalKing.pos, rivalKing.color, $pieces, $grid));
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