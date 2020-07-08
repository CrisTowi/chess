<script>
import { turn } from '../store/store';
import Piece from './Piece.svelte';

export let color;
export let column;
export let onDropInside;
export let piece;
export let pos;
export let reachable;
export let row;
export let inCheck;

const handleDragStart = (e, id) => {
  if (!id.includes($turn)) {
    e.preventDefault();
    return;
  }

  e.dataTransfer.setData("piece_id", id);
};

const handleDrop = (e) => {
  const pieceId = e.dataTransfer.getData("piece_id");
  onDropInside(pieceId, pos);
};

</script>
<style>
.Cell {
  background: #D6C5C5;
  border-collapse: collapse;
  cursor: grab;
}

.Cell--black {
  background: #957656;
}

.Cell--incheck {
  background: red;
}

.Marks-container {
  height: 100%;
  position: relative;
  width: 100%;
}

.row-mark {
  color: #D6C5C5;
  font-weight: 600;
  left: 5px;
  position: absolute;
  top: 5px;
}

.row-mark--black {
  color: #957656;
}

.column-mark {
  bottom: 5px;
  color: #D6C5C5;
  font-weight: 600;
  position: absolute;
  right: 5px;
  text-align: right;
}

.column-mark--black {
  color: #957656;
}

@media screen and (max-width: 450px) {
  .row-mark {
    font-size: 12px;
  }

  .column-mark {
    font-size: 12px;
  }
}
</style>

<div
  on:drop={handleDrop}
  ondragover="return false"
  class={`Cell ${color === 'black' ? 'Cell--black' : ''} ${inCheck ? 'Cell--incheck' : ''}`}>
  <div class="Marks-container">
    {#if row}
      <div class={`row-mark ${color === 'white' ? 'row-mark--black' : ''}`}>
        {row}
      </div>
    {/if}
    {#if column}
      <div class={`column-mark ${color === 'white' ? 'column-mark--black' : ''}`}>
        {column}
      </div>
    {/if}
    {#if piece}
      <Piece onDragStart={handleDragStart} piece={piece} />
    {/if}
  </div>
</div>