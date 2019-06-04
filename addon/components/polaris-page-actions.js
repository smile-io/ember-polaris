import { classNames, layout as templateLayout } from "@ember-decorators/component";
import { action, computed } from "@ember-decorators/object";
import Component from '@ember/component';
import { isArray } from '@ember/array';
import { invokeAction } from 'ember-invoke-action';
import layout from '../templates/components/polaris-page-actions';

/**
 * Polaris page actions component.
 * See https://polaris.shopify.com/components/structure/page-actions
 */
@classNames('Polaris-PageActions')
@templateLayout(layout)
export default class PolarisPageActions extends Component {
 /**
  * The primary action for the page
  *
  * @property primaryAction
  * @type {Object}
  * @default null
  * @public
  */
 primaryAction = null;

 /**
  * The secondary actions for the page
  *
  * @property secondaryActions
  * @type {Array}
  * @default null
  * @public
  */
 secondaryActions = null;

 /**
  * @private
  */
 @(computed('secondaryActions').readOnly())
 get showSecondaryActions() {
   return isArray(this.get('secondaryActions'));
 }

 @action
 fireAction(action) {
   invokeAction(action, 'onAction');
 }
}
