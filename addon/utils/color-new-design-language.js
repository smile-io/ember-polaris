var NEW_DESIGN_LANGUAGE_COLORS = [
  'base',
  'subdued',
  'critical',
  'warning',
  'highlight',
  'success',
  'primary',
];

export function isNewDesignLanguageColor(color) {
  return NEW_DESIGN_LANGUAGE_COLORS.includes(color);
}
