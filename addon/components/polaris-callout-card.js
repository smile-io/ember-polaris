import { classNames, layout as templateLayout } from "@ember-decorators/component";
import Component from '@ember/component';
import layout from '../templates/components/polaris-callout-card';

/**
 * Polaris callout card component.
 * See https://polaris.shopify.com/components/structure/callout-card
 */
@classNames('Polaris-Card')
@templateLayout(layout)
export default class PolarisCalloutCard extends Component {
 /**
  * The content to display inside the callout card.
  *
  * This component can be used in block form,
  * in which case the block content will be used
  * instead of `text`
  *
  * @property text
  * @type {String}
  * @default null
  */
 text = null;

 /**
  * The title of the card
  *
  * @property title
  * @type {String}
  * @default null
  */
 title = null;

 /**
  * URL to the card illustration
  *
  * @property illustration
  * @type {String}
  * @default null
  */
 illustration = null;

 /**
  * Primary action for the card
  *
  * @property primaryAction
  * @type {Object}
  * @default null
  */
 primaryAction = null;

 /**
  * Secondary action for the card
  *
  * @property secondaryAction
  * @type {Object}
  * @default null
  */
 secondaryAction = null;

 /**
  * Callback when banner is dismissed
  *
  * @property onDismiss
  * @type {Function}
  * @default null
  */
 onDismiss = null;
}
