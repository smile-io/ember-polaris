import Component from '@ember/component';
import { deprecate } from '@ember/application/deprecations';
import { or } from '@ember/object/computed';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-empty-state/details';
import TaglessCssDeprecation from '../../mixins/tagless-css-deprecation';

@tagName('')
@templateLayout(layout)
export default class PolarisEmptyStateDetails extends Component.extend(
  TaglessCssDeprecation
) {
  /**
   * The empty state heading
   *
   * @type {String}
   * @default null
   */
  heading = null;

  /**
   * Elements to display inside empty state
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @type {String}
   * @default null
   */
  text = null;

  /**
   * Primary action for empty state
   *
   * @type {Object}
   * @default null
   */
  action = null;

  /**
   * Secondary action for empty state
   *
   * @type {Object}
   * @default null
   */
  secondaryAction = null;

  @or('primaryAction', 'action')
  mainAction;

  init() {
    super.init(...arguments);

    deprecate(
      `[PolarisEmptyStateDetails] Passing 'action' is deprecated! Please use 'primaryAction' instead`,
      !this.action,
      {
        id: 'ember-polaris.polaris-empty-state-details.action-arg',
        until: '7.0.0',
      }
    );
  }
}
