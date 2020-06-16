<script>
import Board from './components/Board.svelte';
</script>

<style>
	:global(body) {
		margin: 0px;
		padding: 0px;
	}

	.Board-container {
		height: 100vh;
		width: 100vh;
		margin-left: auto;
		margin-right: auto;
	}
</style>

<main>
	<div class="Board-container">
		<Board />
	</div>
</main>
