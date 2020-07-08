import Component from '@ember/component';
import { action } from '@ember/object';
import { or } from '@ember/object/computed';
import { deprecate } from '@ember/application/deprecations';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { invokeAction } from 'ember-invoke-action';
import layout from '../templates/components/polaris-setting-toggle';

/**
 * Polaris setting toggle component.
 * See https://polaris.shopify.com/components/actions/setting-toggle
 */
@tagName('')
@templateLayout(layout)
export default class PolarisSettingToggle extends Component {
  /**
   * Inner content of the card
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @type {String}
   * @default null
   * @public
   */
  text = null;

  /**
   * Card header action
   *
   * @type {Object}
   * @default null
   * @public
   */
  primaryAction = null;

  /**
   * Sets toggle state to enabled or disabled
   *
   * @type {boolean}
   * @public
   */
  enabled;

  @or('primaryAction', 'action')
  mainAction;

  init() {
    super.init(...arguments);

    deprecate(
      `[PolarisSettingToggle] Passing 'action' is deprecated! Please use 'primaryAction' instead`,
      !this.action,
      {
        id: 'ember-polaris.polaris-seting-toggle.action-arg',
        until: '7.0.0',
      }
    );
  }

  @action
  fireAction(primaryAction) {
    invokeAction(primaryAction, 'onAction');
  }
}
