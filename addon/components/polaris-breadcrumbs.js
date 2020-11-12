import Component from '@glimmer/component';
import { action } from '@ember/object';
import { handleMouseUpByBlurring } from '../utils/focus';

export default class PolarisBreadcrumbs extends Component {
  /**
   * Collection of breadcrumbs
   *
   * @type {Array}
   * @default []
   * @public
   */
  breadcrumbs; // add @tracked if we're setting a default without a getter

  handleMouseUpByBlurring = handleMouseUpByBlurring;

  /**
   * The breadcrumb to render (the last of the list)
   * We're not always guaranteed to get an Ember array,
   * so we can't just use `breadcrumbs.lastObject` in the template.
   *
   * @type {Object}
   */
  get breadcrumb() {
    let { breadcrumbs } = this.args;
    return breadcrumbs[breadcrumbs.length - 1];
  }

  @action
  handleClick() {
    this.breadcrumb.onAction();
  }
}
