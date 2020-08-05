import io from 'socket.io-client';

export const socket = io(process.env.CHESS_SERVER_URI);
