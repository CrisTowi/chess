<script>
import { blackPieces, whitePieces } from '../store/store';
import { getPieceByCoord } from '../helpers/helpers';

import Cell from './Cell.svelte';
import { grid } from '../store/store';


const handleDropInside = (pieceId, pos) => {
  let toUpdate = whitePieces;
  if (pieceId.includes('white')) {
    toUpdate = whitePieces;
  } else if (pieceId.includes('black')) {
    toUpdate = blackPieces;
  }

  toUpdate.update((oldValues) => {
    return {
      ...oldValues,
      [pieceId]: {
        ...oldValues[pieceId],
        pos,
      }
    }
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
        color={cell.color}
        column={cell.column}
        pos={{x: cell.x, y: cell.y}}
        piece={getPieceByCoord(cell.x, cell.y, {...$blackPieces, ...$whitePieces})}
        row={cell.row} />
    {/each}
  {/each}
</div>