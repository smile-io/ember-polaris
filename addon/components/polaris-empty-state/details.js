import { classNames, layout as templateLayout } from "@ember-decorators/component";
import Component from '@ember/component';
import layout from '../../templates/components/polaris-empty-state/details';

@classNames('Polaris-EmptyState__Details')
@templateLayout(layout)
export default class Details extends Component {
 /**
  * The empty state heading
  *
  * @property heading
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
  * @property text
  * @type {String}
  * @default null
  */
 text = null;

 /**
  * Primary action for empty state
  *
  * @property action
  * @type {Object}
  * @default null
  */
 action = null;

 /**
  * Secondary action for empty state
  *
  * @property secondaryAction
  * @type {Object}
  * @default null
  */
 secondaryAction = null;

 'data-test-empty-state-details' = true;
}
