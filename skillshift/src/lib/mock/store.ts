// Deprecated mock store. Do not use. Left only to avoid accidental imports during
// the transition to real data backends. All calls should go through DataProvider.
export const mockDB: Record<string, never> = {};
export function add(): never { throw new Error('mock store removed'); }
export function list(): never { throw new Error('mock store removed'); }
