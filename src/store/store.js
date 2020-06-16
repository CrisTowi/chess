import { writable } from 'svelte/store';
import { createGrid } from '../helpers/helpers';

export const grid = writable(createGrid());
