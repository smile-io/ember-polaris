import Component from '@ember/component';
import { action } from '@ember/object';
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
  action = null;

  /**
   * Sets toggle state to enabled or disabled
   *
   * @type {boolean}
   * @default null
   * @public
   */
  enabled = null;

  @action
  fireAction(action) {
    invokeAction(action, 'onAction');
  }
}
