import type { Locale } from '../../../src/lib/types';

export interface OverlaySettings {
  opacity: number;
  scale: number;
  locale: Locale;
  clickThrough: boolean;
  autoShow: boolean;
  visible: boolean;
  x: number | null;
  y: number | null;
  width: number;
  height: number;
}

export interface Bootstrap {
  settings: OverlaySettings;
  version: string;
  platform: string;
  game: boolean;
  hotkeyErrors: string[];
  gameDetection: boolean;
}

export type Command =
  | { type: 'select-comp'; index: number }
  | { type: 'clickthrough'; value: boolean }
  | { type: 'shown'; interactive: boolean }
  | { type: 'hidden' }
  | { type: 'game'; running: boolean };

export interface OverlayApi {
  bootstrap(): Promise<Bootstrap>;
  update(patch: Partial<OverlaySettings>): void;
  hide(): void;
  setInteractive(value: boolean): void;
  resetPosition(): void;
  quit(): void;
  openUrl(url: string): void;
  onCommand(handler: (command: Command) => void): () => void;
}

declare global {
  interface Window {
    tftOverlay?: OverlayApi;
  }
}

export const overlayApi: OverlayApi | null =
  typeof window !== 'undefined' && window.tftOverlay ? window.tftOverlay : null;

/** True inside Electron; false when the renderer is previewed in a browser. */
export const isDesktop = overlayApi !== null;

export const HOTKEY_HINTS = {
  toggle: 'Ctrl+Shift+O',
  interactive: 'Ctrl+Shift+L',
  pick: 'Ctrl+Shift+1…6',
};
