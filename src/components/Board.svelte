<script>
import Cell from './Cell.svelte';
import { grid } from '../store/store';
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
        row={cell.row}
        column={cell.column}
        color={cell.color} />
    {/each}
  {/each}
</div>