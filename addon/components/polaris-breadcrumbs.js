import Component from '@ember/component';
import { get, computed } from '@ember/object';
import {
  attributeBindings,
  tagName,
  layout,
} from '@ember-decorators/component';
import { handleMouseUpByBlurring } from '../utils/focus';
import template from '../templates/components/polaris-breadcrumbs';

@tagName('nav')
@attributeBindings('role')
@layout(template)
export default class PolarisBreadcrumbs extends Component {
  /**
   * Collection of breadcrumbs
   *
   * @property breadcrumbs
   * @public
   * @type {Array}
   * @default null
   */
  breadcrumbs = null;

  /**
   * Role attribute
   *
   * @property role
   * @private
   * @type {String}
   * @default 'navigation'
   */
  role = 'navigation';

  'data-test-breadcrumbs' = true;
  handleMouseUpByBlurring = handleMouseUpByBlurring;

  /**
   * The breadcrumb to render (the last of the list)
   * We're not always guaranteed to get an Ember array,
   * so we can't just use `breadcrumbs.lastObject` in the template.
   *
   * @property breadcrumb
   * @private
   * @type {Object}
   */
  @(computed('breadcrumbs.[]').readOnly())
  get breadcrumb() {
    let breadcrumbs = this.get('breadcrumbs') || [];
    let breadcrumbsCount = get(breadcrumbs, 'length');
    return breadcrumbsCount && breadcrumbsCount > 0
      ? breadcrumbs[breadcrumbsCount - 1]
      : null;
  }
}
