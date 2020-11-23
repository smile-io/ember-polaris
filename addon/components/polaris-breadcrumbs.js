import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { handleMouseUpByBlurring } from '../utils/focus';
import { arg } from '../utils/decorators/arg';

export default class PolarisBreadcrumbs extends Component {
  @service('polaris-app-provider') polaris;

  /**
   * Collection of breadcrumbs
   *
   * @type {Array}
   * @default []
   * @public
   */
  @arg breadcrumbs = [];

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
