import {
  classNames,
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../templates/components/polaris-page/action-icon';

@tagName('span')
@classNames('Polaris-Header-Action__ActionIcon')
@templateLayout(layout)
export default class ActionIcon extends Component {
  /**
   * The icon to display
   *
   * @property icon
   * @type {String}
   * @default null
   */
  icon = null;
}
