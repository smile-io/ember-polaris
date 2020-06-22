import Component from '@ember/component';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';
import { classify } from '@ember/string';
import {
  classNames,
  attributeBindings,
  classNameBindings,
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';
import layout from '../templates/components/polaris-icon';
import SvgHandling from '../mixins/components/svg-handling';

// TODO: look into importing icons properly.
@tagName('span')
@attributeBindings('accessibilityLabel:aria-label')
@classNames('Polaris-Icon')
@classNameBindings(
  'colorClass',
  'isColored:Polaris-Icon--isColored',
  'backdrop:Polaris-Icon--hasBackdrop'
)
@templateLayout(layout)
export default class PolarisIcon extends Component.extend(SvgHandling) {
  /**
   * The SVG contents to display in the icon
   * If the source doesn't have a slash in the name, it will look for Polaris
   * icons in the namespace specified by `sourcePath` property.
   *
   * @type {String}
   * @default null
   * @public
   */
  source = null;

  /**
   * Sets the color for the SVG fill
   *
   * @type {String}
   * @default null
   * @public
   */
  color = null;

  /**
   * Show a backdrop behind the icon
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  backdrop = false;

  /**
   * Descriptive text to be read to screenreaders
   *
   * @type {String}
   * @default null
   * @public
   */
  accessibilityLabel = null;

  /**
   * Path under which `ember-svg-jar` serves the Polaris SVG icons
   *
   * @type {String}
   * @default 'polaris'
   * @public
   */
  sourcePath = 'polaris';

  'data-test-icon' = true;

  /**
   * Whether the component should leave space for an icon
   *
   * @type {Boolean}
   */
  @(equal('source', 'placeholder').readOnly())
  showPlaceholder;

  /**
   * Class to apply to color the icon
   *
   * @type {String}
   */
  @(computed('color').readOnly())
  get colorClass() {
    let color = this.get('color');

    if (isEmpty(color)) {
      return null;
    }

    return `Polaris-Icon--color${classify(color)}`;
  }

  /**
   * Whether a color has been specified for the icon
   *
   * @type {Boolean}
   */
  @(computed('color').readOnly())
  get isColored() {
    let color = this.get('color');

    if (isEmpty(color)) {
      return false;
    }

    return color !== 'white';
  }

  /**
   * Final source for the icon SVG
   *
   * @type {String}
   */
  @(computed('sourcePath', 'source').readOnly())
  get iconSource() {
    let source = this.get('source');
    source =
      source.indexOf('/') === -1
        ? `${this.get('sourcePath')}/${source}`
        : source;

    return source;
  }
}
