/**
 * Where the cursor ring is drawn (components/CursorRing.tsx), shared with the
 * background graph so its links meet the ring rather than an empty spot.
 * A plain module object: both components run in the same client bundle.
 */
export const cursorRing = { x: 0, y: 0, active: false };
