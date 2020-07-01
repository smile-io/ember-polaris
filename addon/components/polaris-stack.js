import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { equal } from '@ember/object/computed';
import { isBlank } from '@ember/utils';
import { classify } from '@ember/string';
import { layout, tagName } from '@ember-decorators/component';
import template from '../templates/components/polaris-stack';
import AutoWrapper from '../-private/auto-wrapper';
import TaglessCssDeprecation from '../mixins/tagless-css-deprecation';

/**
 * Polaris stack component.
 * See https://polaris.shopify.com/components/structure/stack
 */
@tagName('')
@layout(template)
export default class PolarisStackComponent extends Component.extend(
  TaglessCssDeprecation
) {
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

  @(equal('wrap', false).readOnly())
  noWrap;

  @computed('spacing')
  get spacingClassName() {
    const { spacing } = this;
    if (isBlank(spacing)) {
      return null;
    }

    return `Polaris-Stack--spacing${classify(spacing)}`;
  }

  @computed('alignment')
  get alignmentClassName() {
    const { alignment } = this;
    if (isBlank(alignment)) {
      return null;
    }

    return `Polaris-Stack--alignment${classify(alignment)}`;
  }

  @computed('distribution')
  get distributionClassName() {
    const { distribution } = this;
    if (isBlank(distribution) || distribution === 'baseline') {
      return null;
    }

    return `Polaris-Stack--distribution${classify(distribution)}`;
  }

  @computed(
    'spacingClassName',
    'alignmentClassName',
    'distributionClassName',
    'vertical',
    'noWrap',
    'class'
  )
  get cssClasses() {
    let cssClasses = ['Polaris-Stack'];

    let { spacingClassName, alignmentClassName, distributionClassName } = this;
    if (spacingClassName) {
      cssClasses.push(spacingClassName);
    }
    if (alignmentClassName) {
      cssClasses.push(alignmentClassName);
    }
    if (distributionClassName) {
      cssClasses.push(distributionClassName);
    }
    if (this.vertical) {
      cssClasses.push('Polaris-Stack--vertical');
    }
    if (this.noWrap) {
      cssClasses.push('Polaris-Stack--noWrap');
    }
    if (this.class) {
      cssClasses.push(this.class);
    }

    return cssClasses.join(' ');
  }

  @action
  setupAutoWrapper(stackElement) {
    this.autoWrapper = new AutoWrapper(stackElement, 'Polaris-Stack__Item', {
      'data-test-stack-item': true,
    });
  }

  @action
  teardownAutoWrapper() {
    this.autoWrapper.teardown();
  }
}
