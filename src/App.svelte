<script>
import { onMount } from 'svelte';
import { socket } from './services/SocketIO';
import Board from './containers/Board.svelte';
import Aside from './containers/Aside.svelte';
import Modal from './containers/Modal.svelte';

import TimeSelect from './components/TimeSelect.svelte';
import GameSelect from './components/GameSelect.svelte';
import ShareGame from './components/ShareGame.svelte';
import Winner from './components/Winner.svelte';

import {
	blackRemaining,
	emptyGrid,
	grid,
	inCheck,
	pieces,
	PIECES,
	started,
	timerInterval,
	toPromotePiece,
	turn,
	whiteRemaining,
	winner,
	gameType,
	room,
} from './store/store';

import {
	getOtherColor,
	fillGridWithPieces,
} from './helpers/helpers';

turn.subscribe(() => {
	if ($started) {
		clearInterval($timerInterval);
	
		timerInterval.update(() => {
			return setInterval(() => {
				if ($turn === 'white') {
					whiteRemaining.update((oldValue) => {
						const toReturnValue = oldValue - 10;
						if (toReturnValue === 0) {
							winner.update(() => getOtherColor($turn));
							turn.update(() => null);
						}
	
						return toReturnValue;
					});
				} else if ($turn === 'black') {
					blackRemaining.update((oldValue) => {
						const toReturnValue = oldValue - 10;
						if (toReturnValue === 0) {
							winner.update(() => getOtherColor($turn));
							turn.update(() => null);
						}
	
						return toReturnValue;
					});
				}
			}, 10)
		});
	}
});

winner.subscribe((winnerValue) => {
	if (winnerValue) {
		clearInterval($timerInterval);
	}
});

const handleStartGame = () => {
	toPromotePiece.update(() => null);
	inCheck.update(() => null);
	pieces.update(() => PIECES);
	grid.update(() => fillGridWithPieces(emptyGrid, PIECES));
	started.update(() => true);
	winner.update(() => null);
	turn.update(() => 'white');
};

const handleStartRoom = (time) => {
	socket.emit('start-room', { time });
};

const handleTimeSelect = (time) => {
	whiteRemaining.update(() => time);
	blackRemaining.update(() => time);

	if ($gameType === 'local') {
		handleStartGame();
	} else {
		handleStartRoom(time);
	}
};

const handleGameSelect = (type) => {
	gameType.update(() => type);
};

</script>

<style>
	:global(body) {
		margin: 0px;
		padding: 0px;
	}

	.App {
		height: 100vh;
		width: calc(100vw - (100vw - 100%));
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		box-sizing: border-box;
		background: #75BFA6;
	}

	.square {
		position: relative;
		width: 80%;
		max-width: calc(100vh - 40px);
	}

	.square:after {
		content: "";
		display: block;
		padding-bottom: 100%;
	}

	.Board-container {
		position: absolute;
		height: 100%;
		width: 100%;
	}

	.Aside-container {
		flex: 1;
		height: 100%;
	}

	@media screen and (max-width: 1255px) {
		.square {
			width: 100%;
		}

		.App {
			flex-direction: column;
			height: auto;
			min-height: 100vh;
		}

		.Aside-container {
			width: 100%;
		}
	}

	@media screen and (max-height: 890px) {
		.square {
			width: 100%;
		}

		.App {
			flex-direction: column;
			height: auto;
			min-height: 100vh;
		}

		.Aside-container {
			width: 100%;
		}
	}
</style>

<div class="App">
	<Modal visible={!$started || $winner}>
		{#if $winner}
			<Winner winner={$winner} />
		{/if}
		{#if !$winner && !$gameType}
			<GameSelect onClick={handleGameSelect} />
		{/if}
		{#if !$winner && $gameType && !$whiteRemaining && !$blackRemaining}
			<TimeSelect onClick={handleTimeSelect} />
		{/if}
		{#if !$winner && $gameType && $whiteRemaining && $blackRemaining}
			<ShareGame url={$room ? `${window.location.origin}?room=${$room._id}` : ''} />
		{/if}
	</Modal>
	<div class="square">
		<div class="Board-container">
			<Board />
		</div>
	</div>
	<div class="Aside-container">
		<Aside />
	</div>
</div>
