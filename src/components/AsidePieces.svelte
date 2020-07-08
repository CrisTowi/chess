<script>
import PieceIcon from './PieceIcon.svelte';
import PromotePiecesOptions from './PromotePiecesOptions.svelte';

export let pieces;
export let color;
export let toPromotePiece;
export let handlePromotePieceSelected;
</script>

<style>
.AsidePieces {
  box-sizing: border-box;
  margin: 0px 0px 0px 20px;
  padding: 20px;
  background: #D3D3D3;
  height: 33.33%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.AsidePieces-container {
  display: flex;
  align-items: center;
}

.Piece-container {
  width: 40px;
  height: 40px;
  font-size: 40px;
  margin-right: 10px;
  text-align: center;
}

@media screen and (max-height: 890px), screen and (max-width: 1255px) {
  .AsidePieces {
    padding: 5px;
    flex: 1;
    margin: 0px;
    height: 143px;
  }
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

<div class="AsidePieces">
  <div class="AsidePieces-container">
    {#each pieces as piece}
      <div class="Piece-container">
        <PieceIcon name={piece.name} color={piece.color} />
      </div>
    {/each}
  </div>
  {#if toPromotePiece && toPromotePiece.color === color}
    <PromotePiecesOptions onClick={handlePromotePieceSelected} color={color} />
  {/if}
</div>