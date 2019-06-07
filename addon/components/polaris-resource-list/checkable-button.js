import { className, classNames, layout as templateLayout } from "@ember-decorators/component";
import { not, and } from "@ember/object/computed";
import Component from '@ember/component';
import mapEventToAction from '@smile-io/ember-polaris/utils/map-event-to-action';
import layout from '../../templates/components/polaris-resource-list/checkable-button';

@classNames('Polaris-ResourceList-CheckableButton')
@templateLayout(layout)
export default class CheckableButton extends Component {
 /**
  * @type {String}
  * @default null
  * @property accessibilityLabel
  */
 accessibilityLabel = null;

 /**
  * @type {String}
  * @default ''
  * @property label
  */
 label = '';

 /**
  *
  * Checkbox is selected. `indeterminate` shows a horizontal line in the checkbox
  *
  * @type {Boolean|String}
  * @default null
  * @property selected
  */
 selected = null;

 /**
  * @type {Boolean}
  * @default false
  * @property selectMode
  */
 selectMode = false;

 /**
  * @type {Boolean}
  * @default false
  * @property plain
  */
 @className("Polaris-ResourceList-CheckableButton__CheckableButton--plain")
 plain = false;

 /**
  * @type {Boolean}
  * @default false
  * @property measuring
  */
 measuring = false;

 /**
  * @type {Boolean}
  * @default false
  * @property disabled
  */
 disabled = false;

 /**
  * @type {Function}
  * @default noop
  * @property onToggleAll
  */
  click = mapEventToAction('onToggleAll');

 @not('plain')
 isNotPlain;

 @and('isNotPlain', 'selectMode')
 @className("Polaris-ResourceList-CheckableButton__CheckableButton--selectMode")
 shouldApplySelectModeClass;

 @and('isNotPlain', 'selected')
 @className("Polaris-ResourceList-CheckableButton__CheckableButton--selected")
 shouldApplySelectedClass;

 @and('isNotPlain', 'measuring')
 @className("Polaris-ResourceList-CheckableButton__CheckableButton--measuring")
 shouldApplyMeasuringClass;
}
