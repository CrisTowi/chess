<script>
import {
  grid,
  pieces,
} from '../store/store';

import {
  handlePieceMove,
  handleCastling,
} from '../helpers/moves';

import Cell from '../components/Cell.svelte';

const handleDropInside = (pieceId, pos) => {
  const piece = Object.assign({}, $pieces[pieceId]);
  const posPiece = $grid[pos.y][pos.x].piece;

  if (
    piece.name === 'king'
    && posPiece
    && posPiece.color === piece.color
    && !piece.moved
    && !posPiece.moved
  ) {
    handleCastling(piece, posPiece); 
  } else {
    handlePieceMove(piece, pos);
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