import { palette } from "./palette";
import { typography as typo } from "./typo";

export const theme = {
  palette,
  typo,
};

export type TypeOfPalette = typeof palette;
export type KeyOfPalette = keyof typeof palette;

export type KeyOfTheme = keyof typeof theme;

export type TypeOfTypo = typeof typo;
export type KeyOfTypo = keyof typeof typo;
