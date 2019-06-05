import { action } from "@ember-decorators/object";
import { tagName, layout as templateLayout } from "@ember-decorators/component";
import Component from '@ember/component';
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
  * @property text
  * @type {String}
  * @default null
  * @public
  */
 text = null;

 /**
  * Card header action
  *
  * @property action
  * @type {Object}
  * @default null
  * @public
  */
 primaryAction = null;

 /**
  * Sets toggle state to enabled or disabled
  *
  * @property enabled
  * @type {boolean}
  * @default null
  * @public
  */
 enabled = null;

 @action
 fireAction(primaryAction) {
   invokeAction(primaryAction, 'onAction');
 }
}
