import * as migration_20260708_235133_initial from './20260708_235133_initial';

export const migrations = [
  {
    up: migration_20260708_235133_initial.up,
    down: migration_20260708_235133_initial.down,
    name: '20260708_235133_initial'
  },
];
