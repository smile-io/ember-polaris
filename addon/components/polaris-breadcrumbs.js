import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { deprecate } from '@ember/application/deprecations';
import { tagName, layout } from '@ember-decorators/component';
import { handleMouseUpByBlurring } from '../utils/focus';
import template from '../templates/components/polaris-breadcrumbs';

@tagName('')
@layout(template)
export default class PolarisBreadcrumbs extends Component {
  /**
   * Collection of breadcrumbs
   *
   * @type {Array}
   * @default []
   * @public
   */
  breadcrumbs = [];

  handleMouseUpByBlurring = handleMouseUpByBlurring;

  /**
   * The breadcrumb to render (the last of the list)
   * We're not always guaranteed to get an Ember array,
   * so we can't just use `breadcrumbs.lastObject` in the template.
   *
   * @private
   * @type {Object}
   */
  @computed('breadcrumbs.[]')
  get breadcrumb() {
    let { breadcrumbs } = this;
    return breadcrumbs[breadcrumbs.length - 1];
  }

  init() {
    super.init(...arguments);

    deprecate(
      `[polaris-breadcrumbs] Passing 'class' argument is deprecated! Switch to angle bracket invocation and pass an HTML attribute instead`,
      !this.class,
      {
        id: 'ember-polaris.polaris-breadcrumbs.class-arg',
        until: '7.0.0',
      }
    );
  }

  @action
  handleClick() {
    this.breadcrumb.onAction();
  }
}
