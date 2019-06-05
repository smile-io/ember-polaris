import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../templates/components/polaris-choice';

/**
 * Polaris choice component.
 * Wrapper for checkbox and radiobutton components.
 */
@tagName('')
@templateLayout(layout)
export default class PolarisChoice extends Component {
  /**
   * A unique identifier for the choice
   *
   * @property inputId
   * @type {String}
   * @default: null
   * @public
   */
  inputId = null;

  /**
   * Label for the choice
   *
   * @property label
   * @type {String|Component}
   * @default: null
   * @public
   */
  label = null;

  /**
   * Component to render for the choice's label
   *
   * DEPRECATED: pass the component as `label` instead.
   *
   * @property labelComponent
   * @type {String | Component}
   * @default null
   * @public
   */
  labelComponent = null;

  /**
   * Whether the associated form control is disabled
   *
   * @property disabled
   * @type {Boolean}
   * @default: null
   * @public
   */
  disabled = null;

  /**
   * Display an error message
   *
   * @property error
   * @type {String|Boolean}
   * @default: null
   * @public
   */
  error = null;

  /**
   * Visually hide the label
   *
   * @property labelHidden
   * @type {boolean}
   * @default: false
   * @public
   */
  labelHidden = false;

  /**
   * Additional text to aide in use
   *
   * @property helpText
   * @type {String|Component|Object}
   * @default: null
   * @public
   */
  helpText = null;

  /**
   * @private
   */
  @or('error', 'helpText')
  hasDescription;

  /**
   * @private
   */
  @computed('error')
  get shouldRenderError() {
    let error = this.get('error');

    return error && typeof error !== 'boolean';
  }

  /**
   * @private
   */
  @(computed('inputId').readOnly())
  get helpTextId() {
    return `${this.get('inputId')}HelpText`;
  }
}
