<script>
import { onMount } from 'svelte';
import Board from './containers/Board.svelte';
import Aside from './containers/Aside.svelte';

import {
	blackRemaining,
	startTime,
	timerInterval,
	turn,
	whiteRemaining,
	winner,
} from './store/store';

import {
  getOtherColor,
} from './helpers/helpers';

turn.subscribe(() => {
	clearInterval($timerInterval);

	timerInterval.update(() => {
		return setInterval(() => {
			if ($turn === 'white') {
				whiteRemaining.update((oldValue) => {
					const toReturnValue = oldValue - 10;
					if (toReturnValue === 0) {
						winner.update(() => getOtherColor($turn));
					}

					return toReturnValue;
				});
			} else if ($turn === 'black') {
				blackRemaining.update((oldValue) => {
					const toReturnValue = oldValue - 10;
					if (toReturnValue === 0) {
						winner.update(() => getOtherColor($turn));
					}

					return toReturnValue;
				});
			}
		}, 10)
	});
});

winner.subscribe((winnerValue) => {
	if (winnerValue) {
		clearInterval($timerInterval);
	}
});

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

	.Board-container {
		height: calc(100vmin - 40px);
		width: calc(100vmin - 40px);
	}

	.Aside-container {
		flex: 1;
		height: 100%;
	}
</style>

<div class="App">
	<div class="Board-container">
		<Board />
	</div>
	<div class="Aside-container">
		<Aside />
	</div>
</div>
