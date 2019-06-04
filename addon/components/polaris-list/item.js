import { classNames, tagName, layout as templateLayout } from "@ember-decorators/component";
import Component from '@ember/component';
import layout from '../../templates/components/polaris-list/item';

@tagName('li')
@classNames('Polaris-List__Item')
@templateLayout(layout)
export default class Item extends Component {
 /**
  * The content to display for this list item
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
}
