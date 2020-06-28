<script>
import PieceIcon from './PieceIcon.svelte';

export let onClick;
export let color;

const PIECES = [
  'queen',
  'rook',
  'bishop',
  'knight',
];

</script>

<style>
.PromotePiecesOptions {
  width: 100%;
  height: 30px;

  display: flex;
  font-size: 30px;
  justify-content: space-between;
}

.PromotePiecesOptions-Option {
  cursor: pointer;
}
</style>

<div class="PromotePiecesOptions">
  {#each PIECES as piece}
    <div class="PromotePiecesOptions-Option" on:click={() => onClick(piece)}>
      <PieceIcon name={piece} color={color} />
    </div>
  {/each}
</div>