import Component from '@ember/component';
import { or } from '@ember/object/computed';
import { deprecate } from '@ember/application/deprecations';
import { tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-connected';

@tagName('')
@layout(template)
export default class PolarisConnected extends Component {
  /**
   * An element connected to the left of the yielded content
   *
   * @type {String|Component}
   * @default null
   * @public
   */
  left = null;

  /**
   * An element connected to the right of the yielded content
   *
   * @type {String|Component}
   * @default null
   * @public
   */
  right = null;

  /**
   * Whether or not a `left` or `right` connection has been passed-in
   *
   * @type {Boolean}
   */
  @or('left', 'right')
  hasConnection;

  /**
   * @deprecated
   */
  dataTestConnected = true;

  init() {
    super.init(...arguments);

    deprecate(
      `[PolarisConnected] Passing 'dataTestConnected' is deprecated! Switch to angle bracket invocation and pass an HTML attribute instead`,
      this.dataTestConnected === true,
      {
        id: 'ember-polaris.polaris-connected.dataTestConnected-arg',
        until: '7.0.0',
      }
    );
    this.dataTestConnected = this.dataTestConnected || true;
  }
}
