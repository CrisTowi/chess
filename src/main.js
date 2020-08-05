import { socket } from './services/SocketIO';
import App from './App.svelte';
import {
	blackRemaining,
	emptyGrid,
	grid,
	inCheck,
	pieces,
	PIECES,
	started,
	toPromotePiece,
	turn,
	whiteRemaining,
	winner,
	room,
	gameType,
} from './store/store';

import {
	fillGridWithPieces,
} from './helpers/helpers';

const URLParams = new URLSearchParams(window.location.search);

socket.on('room-created', (data) => {
	room.update(() => data);
});

socket.on('room-full', (data) => {
	console.error('Sorry the room is full');
});

socket.on('room-ready', (data) => {
	room.update(() => data);
	whiteRemaining.update((	) => data.time);
	blackRemaining.update(() => data.time);
	toPromotePiece.update(() => null);
	inCheck.update(() => null);
	pieces.update(() => PIECES);
	grid.update(() => fillGridWithPieces(emptyGrid, PIECES));
	started.update(() => true);
	winner.update(() => null);
	turn.update(() => 'white');
	gameType.update(() => 'network');
});

if (URLParams.get('room')) {
	socket.emit('join-room', { room: URLParams.get('room') });
}

const app = new App({
	target: document.body,
});

export default app;