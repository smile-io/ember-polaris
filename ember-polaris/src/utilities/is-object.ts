export function isObject(value: object) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}
