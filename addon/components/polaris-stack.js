import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { equal } from '@ember/object/computed';
import { isBlank } from '@ember/utils';
import { classify } from '@ember/string';
import { deprecate } from '@ember/application/deprecations';
import { layout, tagName } from '@ember-decorators/component';
import template from '../templates/components/polaris-stack';
import AutoWrapper from '../-private/auto-wrapper';

/**
 * Polaris stack component.
 * See https://polaris.shopify.com/components/structure/stack
 */
@tagName('')
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
  get classes() {
    let classNames = ['Polaris-Stack'];

    let { spacingClassName, alignmentClassName, distributionClassName } = this;
    if (spacingClassName) {
      classNames.push(spacingClassName);
    }
    if (alignmentClassName) {
      classNames.push(alignmentClassName);
    }
    if (distributionClassName) {
      classNames.push(distributionClassName);
    }
    if (this.vertical) {
      classNames.push('Polaris-Stack--vertical');
    }
    if (this.noWrap) {
      classNames.push('Polaris-Stack--noWrap');
    }
    if (this.class) {
      classNames.push(this.class);
    }

    return classNames.join(' ');
  }

  init() {
    super.init(...arguments);

    deprecate(
      `[polaris-stack] Passing 'class' is deprecated! Switch to angle bracket invocation and pass an HTML attribute instead`,
      !this.class,
      {
        id: 'ember-polaris.polaris-stack.class-arg',
        until: '7.0.0',
      }
    );
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
