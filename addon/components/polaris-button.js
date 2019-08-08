import Component from '@ember/component';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';
import { isPresent } from '@ember/utils';
import { classify } from '@ember/string';
import { deprecate } from '@ember/application/deprecations';
import { tagName, layout } from '@ember-decorators/component';
import { handleMouseUpByBlurring } from '../utils/focus';
import template from '../templates/components/polaris-button';

const SIZES = {
  slim: 'slim',
  medium: 'medium',
  large: 'large',
};
const DEFAULT_SIZE = 'medium';

/**
 * Polaris button component.
 * See https://polaris.shopify.com/components/actions/button
 */
@tagName('')
@layout(template)
export default class PolarisButtonComponent extends Component {
  /**
   * The content to display inside the button.
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`.
   *
   * @property text
   * @type {String}
   * @default null
   * @public
   */
  text = null;

  /**
   * A destination to link to, rendered in the href attribute of a link
   *
   * @property url
   * @type {String}
   * @default null
   * @public
   */
  url = null;

  /**
   * A unique identifier for the button
   *
   * @property id
   * @type {String}
   * @default null
   * @public
   */
  // eslint-disable-next-line smile-ember/order-in-components
  id = null;

  /**
   * Provides extra visual weight and identifies the primary action in a set of buttons
   *
   * @property primary
   * @type {Boolean}
   * @default false
   * @public
   */
  primary = false;

  /**
   * Indicates a dangerous or potentially negative action
   *
   * @property destructive
   * @type {Boolean}
   * @default false
   * @public
   */
  destructive = false;

  /**
   * Disables the button, disallowing merchant interaction
   *
   * @property disabled
   * @type {Boolean}
   * @default false
   * @public
   */
  disabled = false;

  /**
   * Replaces button text with a spinner while a background action is being performed
   *
   * @property loading
   * @type {Boolean}
   * @default false
   * @public
   */
  loading = false;

  /**
   * Changes the size of the button, giving it more or less padding
   *
   * @property size
   * @type {String}
   * @default 'medium'
   * @public
   */
  size = DEFAULT_SIZE;

  /**
   * Gives the button a subtle alternative to the default button styling, appropriate for certain backdrops
   *
   * @property outline
   * @type {Boolean}
   * @default false
   * @public
   */
  outline = false;

  /**
   * Allows the button to grow to the width of its container
   *
   * @property fullWidth
   * @type {Boolean}
   * @default false
   * @public
   */
  fullWidth = false;

  /**
   * Displays the button with a disclosure icon
   *
   * @property disclosure
   * @type {Boolean}
   * @default false
   * @public
   */
  disclosure = false;

  /**
   * Allows the button to submit a form
   *
   * @property submit
   * @type {Boolean}
   * @default false
   * @public
   */
  submit = false;

  /**
   * Renders a button that looks like a link
   *
   * @property plain
   * @type {Boolean}
   * @default false
   * @public
   */
  plain = false;

  /**
   * Makes `plain` and `outline` Button colors (text, borders, icons) the same as the current text color. Also adds an underline to `plain` Buttons
   *
   * @property monochrome
   * @type {Boolean}
   * @default false
   * @public
   */
  monochrome = false;

  /**
   * Forces url to open in a new tab
   *
   * @property external
   * @type {Boolean}
   * @default false
   * @public
   */
  external = false;

  /**
   * Tells the browser to download the url instead of opening it. Provides a hint for the downloaded filename if it is a string value.
   *
   * @property download
   * @type {String/Boolean}
   * @default null
   * @public
   */
  download = null;

  /**
   * Icon to display to the left of the button content
   *
   * @property icon
   * @type {String|Component}
   * @default null
   * @public
   */
  icon = null;

  /**
   * Visually hidden text for screen readers
   *
   * @property accessibilityLabel
   * @type {String}
   * @default null
   * @public
   */
  accessibilityLabel = null;

  /**
   * Id of the element the button controls
   *
   * @property ariaControls
   * @type {String}
   * @default null
   * @public
   */
  ariaControls = null;

  /**
   * Tells screen reader the controlled element is expanded
   *
   * @property ariaExpanded
   * @type {Boolean}
   * @default false
   * @public
   */
  ariaExpanded = false;

  /**
   * Tells screen reader the element is pressed
   *
   * @property ariaPressed
   * @type {Boolean}
   * @default false
   * @public
   */
  ariaPressed = false;

  /**
   * Callback when clicked
   *
   * @property onClick
   * @type {Function}
   * @default noop
   * @public
   */
  onClick() {}

  /**
   * Callback when button becomes focussed
   *
   * @property onFocus
   * @type {Function}
   * @default noop
   * @public
   */
  onFocus() {}

  /**
   * Callback when focus leaves button
   *
   * @property onBlur
   * @type {Function}
   * @default noop
   * @public
   */
  onBlur() {}

  /**
   * Callback when a keypress event is registered on the button
   *
   * @property onKeyPress
   * @type {Function}
   * @default noop
   * @public
   */
  onKeyPress() {}

  /**
   * Callback when a keyup event is registered on the button
   *
   * @property onKeyUp
   * @type {Function}
   * @default noop
   * @public
   */
  onKeyUp() {}

  /**
   * Callback when a keydown event is registered on the button
   *
   * @property onKeyDown
   * @type {Function}
   * @default noop
   * @public
   */
  onKeyDown() {}

  handleMouseUpByBlurring = handleMouseUpByBlurring;

  @or('disabled', 'loading')
  isDisabled;

  @computed('icon', 'text')
  get isIconOnly() {
    let { icon, text } = this;
    return icon && text == null;
  }

  @computed(
    'class',
    'primary',
    'outline',
    'destructive',
    'isDisabled',
    'loading',
    'plain',
    'monochrome',
    'size',
    'fullWidth',
    'isIconOnly'
  )
  get classes() {
    let {
      class: externalClasses,
      primary,
      outline,
      destructive,
      isDisabled,
      loading,
      plain,
      monochrome,
      size,
      fullWidth,
      isIconOnly,
    } = this;
    let classes = ['Polaris-Button'];

    if (isPresent(externalClasses)) {
      classes.push(externalClasses);
    }

    if (primary) {
      classes.push('Polaris-Button--primary');
    }

    if (outline) {
      classes.push('Polaris-Button--outline');
    }

    if (destructive) {
      classes.push('Polaris-Button--destructive');
    }

    if (isDisabled) {
      classes.push('Polaris-Button--disabled');
    }

    if (loading) {
      classes.push('Polaris-Button--loading');
    }

    if (plain) {
      classes.push('Polaris-Button--plain');
    }

    if (monochrome) {
      classes.push('Polaris-Button--monochrome');
    }

    if (size && size !== DEFAULT_SIZE) {
      size = SIZES[size] || null;
      if (size) {
        classes.push(`Polaris-Button--size${classify(size)}`);
      }
    }

    if (fullWidth) {
      classes.push('Polaris-Button--fullWidth');
    }

    if (isIconOnly) {
      classes.push('Polaris-Button--iconOnly');
    }

    return classes.join(' ');
  }

  init() {
    super.init(...arguments);

    deprecate(
      `[polaris-button] Passing 'externalClasses' is deprecated! Switch to angle bracket invocation and pass an HTML attribute instead`,
      !this.externalClasses,
      {
        id: 'ember-polaris.polaris-button.externalClasses-arg',
        until: '6.0.0',
      }
    );
  }
}
