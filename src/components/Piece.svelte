<script>
export let piece;
export let onDragStart;

</script>

<style>
.Piece {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.Piece-container {  
  text-align: center;
}

.piece-icon {
  font-size: 20px;
}

.piece-icon--white {
  color: white;
}

@media screen and (max-width: 785px) {
  .piece-icon {
    font-size: 45px;
  }
}

@media screen and (max-width: 550px) {
  .piece-icon {
    font-size: 30px;
  }
}

@media screen and (max-width: 450px) {
  .piece-icon {
    font-size: 20px;
  }
}

</style>

<div draggable={true} on:dragstart={(e) => onDragStart(e, piece.id)} class="Piece">
  <div class="Piece-container">
    {#if piece.name === 'king'}
      <i class={`piece-icon piece-icon--${piece.color} fas fa-chess-king`}>{piece.name}</i>
    {/if}
    {#if piece.name === 'queen'}
      <i class={`piece-icon piece-icon--${piece.color} fas fa-chess-queen`}>{piece.name}</i>
    {/if}
    {#if piece.name === 'rook'}
      <i class={`piece-icon piece-icon--${piece.color} fas fa-chess-rook`}>{piece.name}</i>
    {/if}
    {#if piece.name === 'pawn'}
      <i class={`piece-icon piece-icon--${piece.color} fas fa-chess-pawn`}>{piece.name}</i>
    {/if}
    {#if piece.name === 'knight'}
      <i class={`piece-icon piece-icon--${piece.color} fas fa-chess-knight`}>{piece.name}</i>
    {/if}
    {#if piece.name === 'bishop'}
      <i class={`piece-icon piece-icon--${piece.color} fas fa-chess-bishop`}>{piece.name}</i>
    {/if}
  </div>
</div>