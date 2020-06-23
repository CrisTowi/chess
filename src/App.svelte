<script>
import Board from './containers/Board.svelte';
import Aside from './containers/Aside.svelte';
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
