<script>
import Board from './components/Board.svelte';
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
	}

	.Board-container {
		height: 100vmin;
		width: 100vmin;
	}
</style>

<div class="App">
	<div class="Board-container">
		<Board />
	</div>
</div>
