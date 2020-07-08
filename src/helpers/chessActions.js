// Libraries
import { get } from 'svelte/store';

// Store
import {
  grid,
  pieces,
  toPromotePiece,
  turn,
} from '../store/store';

// Helpers
import { getOtherColor } from '../helpers/helpers';

export const handlePromotePieceSelected = (piece) => {
  const $toPromotePiece = get(toPromotePiece);
  const otherColor = getOtherColor($toPromotePiece.color);

  pieces.update((oldPieces) => {
    const newObject = {
      ...oldPieces,
      [$toPromotePiece.id]: {
        ...oldPieces[$toPromotePiece.id],
        name: piece
      }
    };

    return newObject; 
  });

  grid.update((oldGrid) => {
    const pos = {
      x: $toPromotePiece.pos.x,
      y: $toPromotePiece.pos.y,
    }

    oldGrid[pos.y][pos.x].piece = {
      ...$toPromotePiece,
      name: piece,
      pos,
    };

    return oldGrid;
  });

  turn.update(() => otherColor);
  toPromotePiece.update(() => null);
}