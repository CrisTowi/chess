<script>
import PieceIcon from '../components/PieceIcon.svelte';
import { pieces, grid, turn } from '../store/store';

let blackEatedPieces = [];
let whiteEatedPieces = [];

pieces.subscribe((pieces) => {
  blackEatedPieces = Object.keys($pieces)
    .filter(key => key.includes('black') && !$pieces[key].alive)
    .map((pieceKey) => $pieces[pieceKey])
  whiteEatedPieces = Object.keys($pieces)
    .filter(key => key.includes('white') && !$pieces[key].alive)
    .map((pieceKey) => $pieces[pieceKey])
});
</script>

<style>
.Aside {
  width: 100%;
  height: 100%;
}

.Aside-Pieces {
  box-sizing: border-box;
  margin: 0px 20px;
  padding: 20px;
  display: flex;
  background: #D3D3D3;
  height: 33.33%;
}

.Aside-Timer {
  height: 33.33%;
}

.Piece-container {
  width: 20px;
  height: 20px;
}
</style>

<div class="Aside">
  <div class="Aside-Pieces">
    {#each blackEatedPieces as piece}
      <div class="Piece-container">
        <PieceIcon name={piece.name} color={piece.color} />
      </div>
    {/each}
  </div>
  <div class="Aside-Timer">
    
  </div>
  <div class="Aside-Pieces">
    {#each whiteEatedPieces as piece}
      <div class="Piece-container">
        <PieceIcon name={piece.name} color={piece.color} />
      </div>
    {/each}
  </div>
</div>