export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
} as const;

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const typography = {
  title: { fontSize: fontSizes.xxl, fontWeight: fontWeights.bold },
  heading: { fontSize: fontSizes.xl, fontWeight: fontWeights.semibold },
  subheading: { fontSize: fontSizes.lg, fontWeight: fontWeights.semibold },
  body: { fontSize: fontSizes.md, fontWeight: fontWeights.regular },
  button: { fontSize: fontSizes.md, fontWeight: fontWeights.semibold },
  caption: { fontSize: fontSizes.sm, fontWeight: fontWeights.regular },
  small: { fontSize: fontSizes.xs, fontWeight: fontWeights.regular },
} as const;