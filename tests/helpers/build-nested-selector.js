export default function (...selectors) {
  return selectors.join('>');
}
