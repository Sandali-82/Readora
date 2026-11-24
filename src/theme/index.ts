import { colors } from './colors';
import { radius } from './radius';
import { spacing, touchTarget } from './spacing';
import { fontSizes, fontWeights, typography } from './typography';

export const theme = {
  colors,
  spacing,
  radius,
  typography,
  touchTarget,
} as const;

export type Theme = typeof theme;

export { colors, radius, spacing, touchTarget, fontSizes, fontWeights, typography };