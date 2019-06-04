import { tagName, layout as templateLayout } from "@ember-decorators/component";
import { or } from "@ember/object/computed";
import Component from '@ember/component';
import layout from '../templates/components/polaris-connected';

@tagName('')
@templateLayout(layout)
export default class PolarisConnected extends Component {
 /**
  * An element connected to the left of the yielded content
  *
  * @property left
  * @public
  * @type {String|Component}
  * @default null
  */
 left = null;

 /**
  * An element connected to the right of the yielded content
  *
  * @property right
  * @public
  * @type {String|Component}
  * @default null
  */
 right = null;

 dataTestConnected = true;

 /**
  * Whether or not a `left` or `right` connection has been passed-in
  *
  * @property hasConnection
  * @private
  * @type {Boolean}
  */
 @(or('left', 'right').readOnly())
 hasConnection;
}
