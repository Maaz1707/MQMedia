// Shared timing so the intro overlay's exit and the hero's entrance
// animation land together instead of drifting out of sync.
export const INTRO_HOLD_MS = 1100;
export const INTRO_FADE_MS = 600;
export const INTRO_TOTAL_MS = INTRO_HOLD_MS + INTRO_FADE_MS;
export const INTRO_TOTAL_S = INTRO_TOTAL_MS / 1000;
