<script>
import PieceIcon from '../components/PieceIcon.svelte';
import { pieces, whiteRemaining, blackRemaining } from '../store/store';
import { getTimeObjFromMs } from '../helpers/helpers';

let blackEatedPieces = [];
let whiteEatedPieces = [];
let blackRemainObj = getTimeObjFromMs($blackRemaining);
let whiteRemainObj = getTimeObjFromMs($whiteRemaining);

pieces.subscribe(() => {
  blackEatedPieces = Object.keys($pieces)
    .filter(key => key.includes('black') && !$pieces[key].alive)
    .map((pieceKey) => $pieces[pieceKey])
  whiteEatedPieces = Object.keys($pieces)
    .filter(key => key.includes('white') && !$pieces[key].alive)
    .map((pieceKey) => $pieces[pieceKey])
});

blackRemaining.subscribe(() => {
  blackRemainObj = getTimeObjFromMs($blackRemaining);
});

whiteRemaining.subscribe(() => {
  whiteRemainObj = getTimeObjFromMs($whiteRemaining);
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
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.Aside-Timer-Title {
  font-weight: 900;
  font-size: 30px;
  color: #FFFFFF;
}

.Aside-Timer-color {
  width: 45%;
  border: 1px solid #FFFFFF;
  color: #FFFFFF;
}

.Min-label {
  font-size: 40px;
  font-weight: 600;
}

.Sec-label {
  font-size: 30px;
}

.Ms-label {
  font-size: 20px;
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
    <div class="Aside-Timer-color">
      <p class="Aside-Timer-Title">Black</p>
      <p>
        <span class="Min-label">{blackRemainObj.min}</span>
        <span class="Sec-label">{blackRemainObj.sec}</span>
        <span class="Ms-label">{blackRemainObj.ms}</span>
      </p>
    </div>
    <div class="Aside-Timer-color">
      <p class="Aside-Timer-Title">White</p>
      <p>
        <span class="Min-label">{whiteRemainObj.min}</span>
        <span class="Sec-label">{whiteRemainObj.sec}</span>
        <span class="Ms-label">{whiteRemainObj.ms}</span>
      </p>
    </div>
  </div>
  <div class="Aside-Pieces">
    {#each whiteEatedPieces as piece}
      <div class="Piece-container">
        <PieceIcon name={piece.name} color={piece.color} />
      </div>
    {/each}
  </div>
</div>