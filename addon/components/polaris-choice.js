import Component from '@ember/component';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';
import { tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-choice';

/**
 * Polaris choice component.
 * Wrapper for checkbox and radiobutton components.
 */
@tagName('')
@layout(template)
export default class PolarisChoice extends Component {
  /**
   * A unique identifier for the choice
   *
   * @type {String}
   * @default: null
   * @public
   */
  inputId = null;

  /**
   * Label for the choice
   *
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
   * @type {String | Component}
   * @default null
   * @public
   */
  labelComponent = null;

  /**
   * Whether the associated form control is disabled
   *
   * @type {Boolean}
   * @default: null
   * @public
   */
  disabled = null;

  /**
   * Display an error message
   *
   * @type {String|Boolean}
   * @default: null
   * @public
   */
  error = null;

  /**
   * Visually hide the label
   *
   * @type {boolean}
   * @default: false
   * @public
   */
  labelHidden = false;

  /**
   * Additional text to aide in use
   *
   * @type {String|Component|Object}
   * @default: null
   * @public
   */
  helpText = null;

  @or('error', 'helpText')
  hasDescription;

  @computed('error')
  get shouldRenderError() {
    let { error } = this;
    return error && typeof error !== 'boolean';
  }

  @computed('inputId')
  get helpTextId() {
    return `${this.inputId}HelpText`;
  }
}
