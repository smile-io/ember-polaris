import Component from '@ember/component';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { isBlank } from '@ember/utils';
import { classify } from '@ember/string';
import { layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-stack';
import { wrapChildren, rejectNodesByClassName } from '../utils/dom';

/**
 * Polaris stack component.
 * See https://polaris.shopify.com/components/structure/stack
 */
@layout(template)
export default class PolarisStackComponent extends Component {
  /**
   * Elements to display inside stack
   *
   * @type {string}
   * @default null
   * @public
   */
  text = null;

  /**
   * Stack the elements vertically
   *
   * @type {boolean}
   * @default false
   * @public
   */
  vertical = false;

  /**
   * Adjust spacing between elements
   *
   * @type {enum}
   * @default null
   * @public
   */
  spacing = null;

  /**
   * Adjust alignment of elements
   *
   * @type {enum}
   * @default null
   * @public
   */
  alignment = null;

  /**
   * Adjust distribution of elements
   *
   * @type {enum}
   * @default baseline
   * @public
   */
  distribution = 'baseline';

  /**
   * Wrap stack elements to additional rows as needed on small screens (Defaults to true)
   *
   * @type {boolean}
   * @default true
   * @public
   */
  wrap = true;

  'data-test-stack' = true;

  @(equal('wrap', false).readOnly())
  noWrap;

  @computed('spacing')
  get spacingClassName() {
    const spacing = this.get('spacing');
    if (isBlank(spacing)) {
      return null;
    }

    return `Polaris-Stack--spacing${classify(spacing)}`;
  }

  @computed('alignment')
  get alignmentClassName() {
    const alignment = this.get('alignment');
    if (isBlank(alignment)) {
      return null;
    }

    return `Polaris-Stack--alignment${classify(alignment)}`;
  }

  @computed('distribution')
  get distributionClassName() {
    const distribution = this.get('distribution');
    if (isBlank(distribution) || distribution === 'baseline') {
      return null;
    }

    return `Polaris-Stack--distribution${classify(distribution)}`;
  }

  @computed(
    'spacingClassName',
    'alignmentClassName',
    'distributionClassName',
    'vertical'
  )
  get classNames() {
    let classNames = [
      'Polaris-Stack',
      this.spacingClassName,
      this.alignmentClassName,
      this.distributionClassName,
    ];
    if (this.vertical) {
      classNames.push('Polaris-Stack--vertical');
    }
    if (this.noWrap) {
      classNames.push('Polaris-Stack--noWrap');
    }

    return classNames.join(' ');
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
