import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { tagName, layout } from '@ember-decorators/component';
import { handleMouseUpByBlurring } from '../utils/focus';
import template from '../templates/components/polaris-breadcrumbs';
import deprecateClassArgument from '../utils/deprecate-class-argument';

@deprecateClassArgument
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
   * @type {Object}
   */
  @computed('breadcrumbs.[]')
  get breadcrumb() {
    let { breadcrumbs } = this;
    return breadcrumbs[breadcrumbs.length - 1];
  }

  @action
  handleClick() {
    this.breadcrumb.onAction();
  }
}
