import { palette } from "./palette";
import { typography as typo } from "./typo";
import { spacing } from "./spacing";

export const theme = {
  palette,
  typo,
  spacing,
};

export type KeyOfTheme = keyof typeof theme;

export type TypeOfPalette = typeof palette;
export type KeyOfPalette = keyof typeof palette;

export type TypeOfTypo = typeof typo;
export type KeyOfTypo = keyof typeof typo;

export type TypeOfSpacing = typeof spacing;
export type KeyOfSpacing = keyof typeof spacing;
