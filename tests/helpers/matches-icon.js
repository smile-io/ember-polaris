import { find } from '@ember/test-helpers';
import { svgJar } from '../../helpers/svg-jar';

/**
 * Checks if <PolarisIcon> renders correct SVG using ember-svg-jar asset IDs.
 *
 * @param {HTMLElement|String} iconElement  Polaris icon component HTML element.
 * @param {String} source                   The source of an icon as asset ID for ember-svg-jar
 * @returns {Boolean}
 */
export function matchesIcon(iconElement, source) {
  if (typeof iconElement === 'string') {
    iconElement = find(iconElement);
  }

  let sourceSvg = svgJar(source, {
    class: 'Polaris-Icon__Svg',
    focusable: 'false',
    'aria-hidden': 'true',
  }).string;

  let domParser = new DOMParser();
  let sourceSvgElement = domParser.parseFromString(sourceSvg, 'image/svg+xml');
  let iconSvgElement = domParser.parseFromString(
    iconElement.innerHTML,
    'image/svg+xml'
  );

  return sourceSvgElement.isEqualNode(iconSvgElement);
}
