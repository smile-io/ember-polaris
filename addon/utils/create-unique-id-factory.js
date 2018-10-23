export function createUniqueIDFactory(prefix) {
  let index = 1;
  return () => `${prefix}${index++}`;
}
