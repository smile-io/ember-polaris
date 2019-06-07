import { tagName, layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember/object";
import Component from '@ember/component';
import { guidFor } from '@ember/object/internals';
import {
  computedErrorId,
  computedHelpTextId,
} from '@smile-io/ember-polaris/utils/id';
import layout from '../templates/components/polaris-labelled';

/**
 * Internal Polaris labelled component, used to add labels to form fields.
 */
@tagName('')
@templateLayout(layout)
export default class PolarisLabelled extends Component {
 /**
  * A unique identifier for the label
  * Note that we default this to Ember's GUID for this component instance,
  * but the value can be overridden by the outside world.
  *
  * @type {String}
  * @public
  */
 @computed()
 get id() {
   return guidFor(this);
 }

 /**
  * Text for the label
  *
  * @type {String}
  * @public
  */
 label = null;

 /**
  * Error to display beneath the label
  *
  * @type {String|Component|Boolean}
  * @public
  */
 error = null;

 /**
  * An action
  *
  * @type {Object}
  * @public
  */
 action = null;

 /**
  * Additional hint text to display
  *
  * @type {String|Component}
  * @public
  */
 helpText = null;

 /**
  * Visually hide the label
  *
  * @type {Boolean}
  * @default false
  * @public
  */
 labelHidden = false;

 dataTestLabelled = true;

 /**
  * ID for the error message div
  *
  * @type {String}
  * @private
  */
 @computedErrorId('id').readOnly()
 errorId;

 /**
  * ID for the help text div
  *
  * @type {String}
  * @private
  */
 @computedHelpTextId('id').readOnly()
 helpTextId;

 /**
  * Flag indicating whether to render the error component
  *
  * @type {Boolean}
  * @private
  */
 @(computed('error').readOnly())
 get shouldRenderError() {
   let error = this.get('error');
   return error && typeof error !== 'boolean';
 }
}
