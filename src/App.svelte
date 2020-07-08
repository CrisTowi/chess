<script>
import { onMount } from 'svelte';
import Board from './containers/Board.svelte';
import Aside from './containers/Aside.svelte';
import Modal from './containers/Modal.svelte';

import TimeSelect from './components/TimeSelect.svelte';

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

const handleStartGame = (time) => {
	toPromotePiece.update(() => null);
	inCheck.update(() => null);
	pieces.update(() => PIECES);
	grid.update(() => fillGridWithPieces(emptyGrid, PIECES));
	started.update(() => true);
	winner.update(() => null);
	turn.update(() => 'white');
	whiteRemaining.update(() => time);
	blackRemaining.update(() => time);
};

</script>

<style>
	:global(body) {
		margin: 0px;
		padding: 0px;
	}

	.App {
		height: 100vh;
		width: 100vw;
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
		<TimeSelect winner={$winner} onClick={handleStartGame} />
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
