import {
  className,
  classNames,
  layout as templateLayout,
} from '@ember-decorators/component';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import Component from '@ember/component';
import { isBlank } from '@ember/utils';
import { classify } from '@ember/string';
import layout from '../templates/components/polaris-stack';
import { wrapChildren, rejectNodesByClassName } from '../utils/dom';

/**
 * Polaris stack component.
 * See https://polaris.shopify.com/components/structure/stack
 */
@classNames('Polaris-Stack')
@templateLayout(layout)
export default class PolarisStack extends Component {
  /**
   * Elements to display inside stack
   *
   * @property text
   * @public
   * @type {string}
   * @default null
   */
  text = null;

  /**
   * Stack the elements vertically
   *
   * @property vertical
   * @public
   * @type {boolean}
   * @default false
   */
  @className('Polaris-Stack--vertical')
  vertical = false;

  /**
   * Adjust spacing between elements
   *
   * @property spacing
   * @public
   * @type {enum}
   * @default null
   */
  spacing = null;

  /**
   * Adjust alignment of elements
   *
   * @property alignment
   * @public
   * @type {enum}
   * @default null
   */
  alignment = null;

  /**
   * Adjust distribution of elements
   *
   * @property distribution
   * @public
   * @type {enum}
   * @default baseline
   */
  distribution = 'baseline';

  /**
   * Wrap stack elements to additional rows as needed on small screens (Defaults to true)
   *
   * @property wrap
   * @public
   * @type {boolean}
   * @default true
   */
  wrap = true;

  'data-test-stack' = true;

  /**
   * @private
   */
  @(equal('wrap', false).readOnly())
  @className('Polaris-Stack--noWrap')
  noWrap;

  /**
   * @private
   */
  @(computed('spacing').readOnly())
  @className
  get spacingClassName() {
    const spacing = this.get('spacing');
    if (isBlank(spacing)) {
      return null;
    }

    return `Polaris-Stack--spacing${classify(spacing)}`;
  }

  /**
   * @private
   */
  @(computed('alignment').readOnly())
  @className
  get alignmentClassName() {
    const alignment = this.get('alignment');
    if (isBlank(alignment)) {
      return null;
    }

    return `Polaris-Stack--alignment${classify(alignment)}`;
  }

  /**
   * @private
   */
  @(computed('distribution').readOnly())
  @className
  get distributionClassName() {
    const distribution = this.get('distribution');
    if (isBlank(distribution) || distribution === 'baseline') {
      return null;
    }

    return `Polaris-Stack--distribution${classify(distribution)}`;
  }

  didRender() {
    super.didRender(...arguments);

    // Wrap each child element that isn't already a stack item.
    let nodesToWrap = rejectNodesByClassName(
      this.element.children,
      'Polaris-Stack__Item'
    );
    let wrapper = document.createElement('div');

    wrapper.classList.add('Polaris-Stack__Item');
    wrapper.setAttribute('data-test-stack-item', true);
    wrapChildren(nodesToWrap, wrapper);
  }
}
