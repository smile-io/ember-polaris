import { className, classNames, layout as templateLayout } from "@ember-decorators/component";
import Component from '@ember/component';
import layout from '../../templates/components/polaris-button-group/item';

@classNames('Polaris-ButtonGroup__Item')
@templateLayout(layout)
export default class Item extends Component {
 /**
  * Elements to display inside group item
  *
  * @property text
  * @public
  * @type {string}
  * @default null
  */
 text = null;

 /**
  * Use a plain style for the group item
  *
  * @property plain
  * @public
  * @type {boolean}
  * @default false
  */
 @className("Polaris-ButtonGroup__Item--plain")
 plain = false;

 /**
  * Whether the group item is focused
  *
  * @property focused
  * @private
  * @type {boolean}
  * @default false
  */
 @className("Polaris-ButtonGroup__Item--focused")
 focused = false;

 'data-test-button-group-item' = true;

 /**
  * Events.
  */
 focusIn() {
   this.set('focused', true);
 }

 focusOut() {
   this.set('focused', false);
 }
}
