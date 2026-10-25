export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Rect extends Point, Size {}

/**
 * Window titles that mean "a Riot game is in the foreground".
 * TFT's in-game window is still titled "League of Legends (TM) Client".
 */
const GAME_TITLE_PATTERNS = [/league of legends/i, /teamfight tactics/i];

export function isGameTitle(title: string | undefined | null): boolean {
  const value = (title ?? '').trim();
  if (!value) return false;
  if (/wild rift/i.test(value)) return false;
  return GAME_TITLE_PATTERNS.some((pattern) => pattern.test(value));
}

/** Keeps the overlay fully reachable inside the screen's work area. */
export function clampWindow(position: Point, size: Size, area: Rect): Point {
  const maxX = area.x + area.width - size.width;
  const maxY = area.y + area.height - size.height;
  return {
    x: Math.round(Math.min(Math.max(position.x, area.x), Math.max(area.x, maxX))),
    y: Math.round(Math.min(Math.max(position.y, area.y), Math.max(area.y, maxY))),
  };
}

/** Default dock: top-right of the screen, just below a typical game HUD bar. */
export function defaultPosition(size: Size, area: Rect): Point {
  return clampWindow(
    { x: area.x + area.width - size.width - 24, y: area.y + Math.round(area.height * 0.08) },
    size,
    area,
  );
}
