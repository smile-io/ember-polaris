import Component from '@ember/component';
import { action } from '@ember/object';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-form';
import { normalizeAutoCompleteProperty } from '../utils/normalize-auto-complete';
import deprecateClassArgument from '../utils/deprecate-class-argument';

@deprecateClassArgument
@tagName('')
@templateLayout(layout)
export default class PolarisForm extends Component {
  /**
   * Space separated list of character encodings
   *
   * @type {String}
   * @default null
   * @public
   */
  acceptCharset = null;

  /**
   * Where to send form-data on submittal
   *
   * @type {String}
   * @default null
   * @public
   */
  action = null;

  /**
   * Grants the broswer the ability to autocomplete input elements
   *
   * @type {Boolean}
   * @default null
   * @public
   */
  autoComplete = null;

  /**
   * Media type when submiting content to server
   *
   * @type {String}
   * @default null
   * @public
   */
  encType = null;

  /**
   * Toggles if form submits on Enter keypress. Defaults to true.
   *
   * @type {Boolean}
   * @default true
   * @public
   */
  implicitSubmit = true;

  /**
   * Method used to submit form.
   * Can be one of 'post', 'get' or 'action'.
   *
   * @type {String}
   * @default 'post'
   * @public
   */
  method = 'post';

  /**
   * A unique name for the form
   *
   * @type {String}
   * @default null
   * @public
   */
  name = null;

  /**
   * Whether or not form is validated when submitting
   *
   * @type {Boolean}
   * @default null
   * @public
   */
  noValidate = null;

  /**
   * Blocks the default form action
   *
   * @type {Boolean}
   * @default true
   * @public
   */
  preventDefault = true;

  /**
   * Where to display response after form submittal
   *
   * @type {String}
   * @default null
   * @public
   */
  target = null;

  /**
   * Callback when form is submitted
   *
   * @type {Function}
   * @params {event} HTMLFormElement
   * @public
   */
  onSubmit() {}

  @normalizeAutoCompleteProperty('autoComplete')
  autoCompleteInputs;

  @action
  handleSubmit(event) {
    let { preventDefault, onSubmit } = this;
    if (!preventDefault) {
      return;
    }

    event.preventDefault();
    onSubmit(event);
  }
}
