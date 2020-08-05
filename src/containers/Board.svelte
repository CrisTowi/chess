<script>
import {
  grid,
  pieces,
  inCheck,
  gameType,
  room,
} from '../store/store';

import {
  handlePieceMove,
  handleCastling,
} from '../helpers/moves';

import { socket } from '../services/SocketIO';

import Cell from '../components/Cell.svelte';

const handlePieceMoved = (pieceId, pos) => {
  const piece = Object.assign({}, $pieces[pieceId]);
  const posPiece = $grid[pos.y][pos.x].piece;
  let clearPath = false;

  if (
    piece.name === 'king'
    && posPiece
    && posPiece.name === 'rook'
    && posPiece.color === piece.color
    && !piece.moved
    && !posPiece.moved
  ) {

    if (piece.pos.x > posPiece.pos.x) {
      clearPath = !$grid[piece.pos.y][piece.pos.x - 1].piece
        || !$grid[piece.pos.y][piece.pos.x - 2].piece
        || !$grid[piece.pos.y][piece.pos.x - 3].piece;
    } else if (piece.pos.x < posPiece.pos.x) {
      clearPath = !$grid[piece.pos.y][piece.pos.x + 1].piece
        || !$grid[piece.pos.y][piece.pos.x + 2].piece;
    }

    if (clearPath) {
      handleCastling(piece, posPiece); 
    }
  } else {
    handlePieceMove(piece, pos);
  }
}

socket.on('chess-move', ({ move: { pieceId, pos } }) => {
  handlePieceMoved(pieceId, pos);
});

const handleDropInside = (pieceId, pos) => {
  if ($gameType === 'network') {
    socket.emit('chess-move', { pieceId, pos });
  } else {
    handlePieceMoved(pieceId, pos);
  }
};

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
        color={cell.color}
        column={cell.column}
        onDropInside={handleDropInside}
        piece={cell.piece}
        pos={{x: cell.x, y: cell.y}}
        reachable={cell.reachable}
        row={cell.row}
        inCheck={$inCheck && ($inCheck.pos.x === cell.x && $inCheck.pos.y === cell.y)}
      />
    {/each}
  {/each}
</div>