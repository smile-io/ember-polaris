import Component from '@glimmer/component';
import { computed, action } from '@ember/object';
import { handleMouseUpByBlurring } from '../utils/focus';

export default class PolarisBreadcrumbs extends Component {
  /**
   * Collection of breadcrumbs
   *
   * @type {Array}
   * @default []
   * @public
   */
  breadcrumbs;

  handleMouseUpByBlurring = handleMouseUpByBlurring;

  /**
   * The breadcrumb to render (the last of the list)
   * We're not always guaranteed to get an Ember array,
   * so we can't just use `breadcrumbs.lastObject` in the template.
   *
   * @type {Object}
   */
  @computed('breadcrumbs.[]')
  get breadcrumb() {
    let { breadcrumbs } = this.args;
    return breadcrumbs[breadcrumbs.length - 1];
  }

  @action
  handleClick() {
    this.breadcrumb.onAction();
  }
}
