<script>
import { socket } from '../services/SocketIO';

import PieceIcon from '../components/PieceIcon.svelte';
import PromotePiecesOptions from '../components/PromotePiecesOptions.svelte';
import AsidePieces from '../components/AsidePieces.svelte';
import AsideTimer from '../components/AsideTimer.svelte';

import { turn, grid,  pieces, whiteRemaining, blackRemaining, toPromotePiece, room, gameType } from '../store/store';
import { getTimeObjFromMs, getOtherColor } from '../helpers/helpers';
import { handlePromotePieceSelected } from '../helpers/chessActions';

let blackEatedPieces = [];
let whiteEatedPieces = [];
let blackRemainObj = getTimeObjFromMs($blackRemaining);
let whiteRemainObj = getTimeObjFromMs($whiteRemaining);

pieces.subscribe(() => {
  blackEatedPieces = Object.keys($pieces)
    .filter(key => key.includes('black') && !$pieces[key].alive)
    .map((pieceKey) => $pieces[pieceKey]);
  whiteEatedPieces = Object.keys($pieces)
    .filter(key => key.includes('white') && !$pieces[key].alive)
    .map((pieceKey) => $pieces[pieceKey]);
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

@media screen and (max-height: 890px), screen and (max-width: 1255px) {
  .Aside {
    margin-top: 20px;
    display: flex;
  }
}

</style>

<div class="Aside">
  <AsidePieces
    pieces={blackEatedPieces}
    toPromotePiece={$toPromotePiece}
    handlePromotePieceSelected={handlePromotePieceSelected}
    color='black'
  />
  <AsideTimer
    myColor={$gameType === 'network' && $room
    ? $room.white === socket.id ? 'white' : 'black'
    : null}
    blackRemainObj={blackRemainObj}
    whiteRemainObj={whiteRemainObj}
  />
  <AsidePieces
    pieces={whiteEatedPieces}
    toPromotePiece={$toPromotePiece}
    handlePromotePieceSelected={handlePromotePieceSelected}
    color='white'
  />
</div>