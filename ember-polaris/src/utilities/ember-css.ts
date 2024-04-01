import { htmlSafe } from '@ember/template';

import { sanitizeCustomProperties } from './css';

export function htmlSafeStyle(styles: Record<string, string | number | undefined>) {
  if (!styles) {
    return undefined;
  }

  const sanitizedStyles = sanitizeCustomProperties(styles as React.CSSProperties);
  if (!sanitizedStyles) {
    return undefined;
  }

  const style = Object.entries(sanitizedStyles).map(([key, value]) => `${key}: ${value}`);

  return htmlSafe(style.join(';'));
}
