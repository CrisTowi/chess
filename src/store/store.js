import { writable } from 'svelte/store';
import { createGrid, fillGridWithPieces } from '../helpers/helpers';

const PIECES = {
  'bishop_1_black': { pos: { y: 0, x: 2 }, moved: false, color: 'black', name: 'bishop', alive: true },
  'bishop_2_black': { pos: { y: 0, x: 5 }, moved: false, color: 'black', name: 'bishop', alive: true },
  'king_black': { pos: { y: 0, x: 4 }, moved: false, color: 'black', name: 'king', alive: true },
  'knight_1_black': { pos: { y: 0, x: 1 }, moved: false, color: 'black', name: 'knight', alive: true },
  'knight_2_black': { pos: { y: 0, x: 6 }, moved: false, color: 'black', name: 'knight', alive: true },
  'pawn_1_black': { pos: { y: 1, x: 0 }, moved: false, color: 'black', name: 'pawn', alive: true },
  'pawn_2_black': { pos: { y: 1, x: 1 }, moved: false, color: 'black', name: 'pawn', alive: true },
  'pawn_3_black': { pos: { y: 1, x: 2 }, moved: false, color: 'black', name: 'pawn', alive: true },
  'pawn_4_black': { pos: { y: 1, x: 3 }, moved: false, color: 'black', name: 'pawn', alive: true },
  'pawn_5_black': { pos: { y: 1, x: 4 }, moved: false, color: 'black', name: 'pawn', alive: true },
  'pawn_6_black': { pos: { y: 1, x: 5 }, moved: false, color: 'black', name: 'pawn', alive: true },
  'pawn_7_black': { pos: { y: 1, x: 6 }, moved: false, color: 'black', name: 'pawn', alive: true },
  'pawn_8_black': { pos: { y: 1, x: 7 }, moved: false, color: 'black', name: 'pawn', alive: true },
  'queen_black': { pos: { y: 0, x: 3 }, moved: false, color: 'black', name: 'queen', alive: true },
  'rook_1_black': { pos: { y: 0, x: 0 }, moved: false, color: 'black', name: 'rook', alive: true },
  'rook_2_black': { pos: { y: 0, x: 7 }, moved: false, color: 'black', name: 'rook', alive: true },
  'bishop_1_white': { pos: { y: 7, x: 2 }, moved: false, color: 'white', name: 'bishop', alive: true },
  'bishop_2_white': { pos: { y: 7, x: 5 }, moved: false, color: 'white', name: 'bishop', alive: true },
  'king_white': { pos: { y: 7, x: 4 }, moved: false, color: 'white', name: 'king', alive: true },
  'knight_1_white': { pos: { y: 7, x: 1 }, moved: false, color: 'white', name: 'knight', alive: true },
  'knight_2_white': { pos: { y: 7, x: 6 }, moved: false, color: 'white', name: 'knight', alive: true },
  'pawn_1_white': { pos: { y: 6, x: 0 }, moved: false, color: 'white', name: 'pawn', alive: true },
  'pawn_2_white': { pos: { y: 6, x: 1 }, moved: false, color: 'white', name: 'pawn', alive: true },
  'pawn_3_white': { pos: { y: 6, x: 2 }, moved: false, color: 'white', name: 'pawn', alive: true },
  'pawn_4_white': { pos: { y: 6, x: 3 }, moved: false, color: 'white', name: 'pawn', alive: true },
  'pawn_5_white': { pos: { y: 6, x: 4 }, moved: false, color: 'white', name: 'pawn', alive: true },
  'pawn_6_white': { pos: { y: 6, x: 5 }, moved: false, color: 'white', name: 'pawn', alive: true },
  'pawn_7_white': { pos: { y: 6, x: 6 }, moved: false, color: 'white', name: 'pawn', alive: true },
  'pawn_8_white': { pos: { y: 6, x: 7 }, moved: false, color: 'white', name: 'pawn', alive: true },
  'queen_white': { pos: { y: 7, x: 3 }, moved: false, color: 'white', name: 'queen', alive: true },
  'rook_1_white': { pos: { y: 7, x: 0 }, moved: false, color: 'white', name: 'rook', alive: true },
  'rook_2_white': { pos: { y: 7, x: 7 }, moved: false, color: 'white', name: 'rook', alive: true },
};

const emptyGrid = createGrid();

export const grid = writable(fillGridWithPieces(emptyGrid, PIECES));
export const pieces = writable(PIECES);

