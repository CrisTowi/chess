import io from 'socket.io-client';

export const socket = io(CHESS_SERVER_URI);
