<script>
export let name;
export let color;
</script>

<style>
.piece-icon {
  color: black;
}

.piece-icon--white {
  color: white;
}
</style>

<div class="PieceIcon">
  {#if name === 'king'}
    <i class={`piece-icon piece-icon--${color} fas fa-chess-king`}></i>
  {/if}
  {#if name === 'queen'}
    <i class={`piece-icon piece-icon--${color} fas fa-chess-queen`}></i>
  {/if}
  {#if name === 'rook'}
    <i class={`piece-icon piece-icon--${color} fas fa-chess-rook`}></i>
  {/if}
  {#if name === 'pawn'}
    <i class={`piece-icon piece-icon--${color} fas fa-chess-pawn`}></i>
  {/if}
  {#if name === 'knight'}
    <i class={`piece-icon piece-icon--${color} fas fa-chess-knight`}></i>
  {/if}
  {#if name === 'bishop'}
    <i class={`piece-icon piece-icon--${color} fas fa-chess-bishop`}></i>
  {/if}
</div>