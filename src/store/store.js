import { writable } from 'svelte/store';
import { createGrid, fillGridWithPieces } from '../helpers/helpers';

const PIECES = {
  'bishop_1_black': { id: 'bishop_1_black', pos: { y: 0, x: 2 }, moved: false, color: 'black', name: 'bishop', alive: true },
  'bishop_2_black': { id: 'bishop_2_black', pos: { y: 0, x: 5 }, moved: false, color: 'black', name: 'bishop', alive: true },
  'king_black': { id: 'king_black', pos: { y: 0, x: 4 }, moved: false, color: 'black', name: 'king', alive: true },
  'knight_1_black': { id: 'knight_1_black', pos: { y: 0, x: 1 }, moved: false, color: 'black', name: 'knight', alive: true },
  'knight_2_black': { id: 'knight_2_black', pos: { y: 0, x: 6 }, moved: false, color: 'black', name: 'knight', alive: true },
  'pawn_1_black': { id: 'pawn_1_black', pos: { y: 1, x: 0 }, moved: false, color: 'black', name: 'pawn', alive: true },
  'pawn_2_black': { id: 'pawn_2_black', pos: { y: 1, x: 1 }, moved: false, color: 'black', name: 'pawn', alive: true },
  'pawn_3_black': { id: 'pawn_3_black', pos: { y: 1, x: 2 }, moved: false, color: 'black', name: 'pawn', alive: true },
  'pawn_4_black': { id: 'pawn_4_black', pos: { y: 1, x: 3 }, moved: false, color: 'black', name: 'pawn', alive: true },
  'pawn_5_black': { id: 'pawn_5_black', pos: { y: 1, x: 4 }, moved: false, color: 'black', name: 'pawn', alive: true },
  'pawn_6_black': { id: 'pawn_6_black', pos: { y: 1, x: 5 }, moved: false, color: 'black', name: 'pawn', alive: true },
  'pawn_7_black': { id: 'pawn_7_black', pos: { y: 1, x: 6 }, moved: false, color: 'black', name: 'pawn', alive: true },
  'pawn_8_black': { id: 'pawn_8_black', pos: { y: 1, x: 7 }, moved: false, color: 'black', name: 'pawn', alive: true },
  'queen_black': { id: 'queen_black', pos: { y: 0, x: 3 }, moved: false, color: 'black', name: 'queen', alive: true },
  'rook_1_black': { id: 'rook_1_black', pos: { y: 0, x: 0 }, moved: false, color: 'black', name: 'rook', alive: true },
  'rook_2_black': { id: 'rook_2_black', pos: { y: 0, x: 7 }, moved: false, color: 'black', name: 'rook', alive: true },
  'bishop_1_white': { id: 'bishop_1_white', pos: { y: 7, x: 2 }, moved: false, color: 'white', name: 'bishop', alive: true },
  'bishop_2_white': { id: 'bishop_2_white', pos: { y: 7, x: 5 }, moved: false, color: 'white', name: 'bishop', alive: true },
  'king_white': { id: 'king_white', pos: { y: 7, x: 4 }, moved: false, color: 'white', name: 'king', alive: true },
  'knight_1_white': { id: 'knight_1_white', pos: { y: 7, x: 1 }, moved: false, color: 'white', name: 'knight', alive: true },
  'knight_2_white': { id: 'knight_2_white', pos: { y: 7, x: 6 }, moved: false, color: 'white', name: 'knight', alive: true },
  'pawn_1_white': { id: 'pawn_1_white', pos: { y: 6, x: 0 }, moved: false, color: 'white', name: 'pawn', alive: true },
  'pawn_2_white': { id: 'pawn_2_white', pos: { y: 6, x: 1 }, moved: false, color: 'white', name: 'pawn', alive: true },
  'pawn_3_white': { id: 'pawn_3_white', pos: { y: 6, x: 2 }, moved: false, color: 'white', name: 'pawn', alive: true },
  'pawn_4_white': { id: 'pawn_4_white', pos: { y: 6, x: 3 }, moved: false, color: 'white', name: 'pawn', alive: true },
  'pawn_5_white': { id: 'pawn_5_white', pos: { y: 6, x: 4 }, moved: false, color: 'white', name: 'pawn', alive: true },
  'pawn_6_white': { id: 'pawn_6_white', pos: { y: 6, x: 5 }, moved: false, color: 'white', name: 'pawn', alive: true },
  'pawn_7_white': { id: 'pawn_7_white', pos: { y: 6, x: 6 }, moved: false, color: 'white', name: 'pawn', alive: true },
  'pawn_8_white': { id: 'pawn_8_white', pos: { y: 6, x: 7 }, moved: false, color: 'white', name: 'pawn', alive: true },
  'queen_white': { id: 'queen_white', pos: { y: 7, x: 3 }, moved: false, color: 'white', name: 'queen', alive: true },
  'rook_1_white': { id: 'rook_1_white', pos: { y: 7, x: 0 }, moved: false, color: 'white', name: 'rook', alive: true },
  'rook_2_white': { id: 'rook_2_white', pos: { y: 7, x: 7 }, moved: false, color: 'white', name: 'rook', alive: true },
};

const emptyGrid = createGrid();

export const grid = writable(fillGridWithPieces(emptyGrid, PIECES));
export const pieces = writable(PIECES);
export const turn = writable('white');
export const whiteRemaining = writable(1000);
export const blackRemaining = writable(1000);
export const startTime = writable(new Date());
export const timerInterval = writable(null);
export const toPromotePiece = writable(null);
export const inCheck = writable(null);
export const winner = writable(null);
