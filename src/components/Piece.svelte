<script>
import PieceIcon from './PieceIcon.svelte';

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
  font-size: 70px;
}

@media screen and (max-width: 785px) {
  .Piece-container {
    font-size: 45px;
  }
}

@media screen and (max-width: 550px) {
  .Piece-container {
    font-size: 30px;
  }
}

@media screen and (max-width: 450px) {
  .Piece-container {
    font-size: 20px;
  }
}

</style>

<div draggable={true} on:dragstart={(e) => onDragStart(e, piece.id)} class="Piece">
  <div class="Piece-container">
    <PieceIcon
      name={piece.name}
      color={piece.color}
    />
  </div>
</div>