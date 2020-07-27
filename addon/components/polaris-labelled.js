import Component from '@ember/component';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';
import { guidFor } from '@ember/object/internals';
import { deprecate } from '@ember/application/deprecations';
import { tagName, layout } from '@ember-decorators/component';
import { computedHelpTextId } from '@smile-io/ember-polaris/utils/id';
import template from '../templates/components/polaris-labelled';

/**
 * Internal Polaris labelled component, used to add labels to form fields.
 */
@tagName('')
@layout(template)
export default class PolarisLabelled extends Component {
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
  primaryAction = null;

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

  /**
   * A unique identifier for the label
   * Note that we default this to Ember's GUID for this component instance,
   * but the value can be overridden by the outside world.
   *
   * @type {String}
   * @public
   */
  get id() {
    if (this._id) {
      return this._id;
    }

    return guidFor(this);
  }

  set id(value) {
    this._id = value;
  }

  /**
   * @public
   * @deprecated
   */
  dataTestLabelled = true;

  /**
   * ID for the help text div
   *
   * @type {String}
   */
  @computedHelpTextId('id')
  helpTextId;

  @or('primaryAction', 'action')
  mainAction;

  /**
   * Flag indicating whether to render the error component
   *
   * @type {Boolean}
   */
  @computed('error')
  get shouldRenderError() {
    let { error } = this;
    return error && typeof error !== 'boolean';
  }

  init() {
    super.init(...arguments);

    deprecate(
      `[PolarisLabelled] Passing 'action' is deprecated! Please use 'primaryAction' instead`,
      !this.action,
      {
        id: 'ember-polaris.polaris-labelled.action-arg',
        until: '7.0.0',
      }
    );
    deprecate(
      `[PolarisLabelled] Passing 'dataTestLabelled' is deprecated! Switch to angle bracket invocation and pass an HTML attribute instead`,
      this.dataTestLabelled === true,
      {
        id: 'ember-polaris.polaris-labelled.dataTestLabelled-arg',
        until: '7.0.0',
      }
    );
    this.dataTestLabelled = this.dataTestLabelled || true;
  }
}
