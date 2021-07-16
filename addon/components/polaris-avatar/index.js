import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { classify } from '@ember/string';
import { arg } from '@smile-io/ember-polaris/utils/decorators/arg';

const SIZE = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

const STATUS = {
  pending: 'PENDING',
  loaded: 'LOADED',
  errored: 'ERRORED',
};

const STYLE_CLASSES = ['one', 'two', 'three', 'four', 'five'];

const styleClass = (name) =>
  name
    ? STYLE_CLASSES[name.charCodeAt(0) % STYLE_CLASSES.length]
    : STYLE_CLASSES[0];

export default class PolarisAvatar extends Component {
  /**
   * Size of avatar
   *
   * @type {String}
   * @default 'medium'
   */
  @arg
  size = SIZE.medium;

  /**
   * The name of the person
   *
   * @type {String}
   */
  name;

  /**
   * Initials of person to display
   *
   * @type {String}
   */
  initials;

  /**
   * Whether the avatar is for a customer
   *
   * @type {Boolean}
   */
  customer;

  /**
   * URL of the avatar image which falls back to initials if the image fails to load
   *
   * @type {String}
   */
  source;

  /**
   * Callback fired when the image fails to load
   * @type {Function}
   */
  onError;

  /**
   * Accessible label for the avatar image
   *
   * @type {String}
   */
  accessibilityLabel;

  @tracked status = STATUS.pending;

  /**
   * Name to use (if any)
   * @type {String}
   */
  get nameString() {
    return this.args.name || this.args.initials;
  }

  /**
   * Whether we have an image to use
   * @type {Boolean}
   */
  get hasImage() {
    return this.args.source && this.status !== STATUS.errored;
  }

  /**
   * Accessibility label to apply to avatar
   * @type {String}
   */
  get label() {
    const { accessibilityLabel, name, initials } = this.args;

    if (accessibilityLabel) {
      return accessibilityLabel;
    }

    if (name) {
      return name;
    }

    if (initials) {
      const splitInitials = initials.split('').join(' ');
      return `Avatar with initials ${splitInitials}`;
    }

    return 'Avatar';
  }

  get classNames() {
    let classNames = ['Polaris-Avatar'];
    const {
      nameString,
      hasImage,
      status,
      size,
      args: { customer, initials },
    } = this;

    if (size) {
      classNames.push(`Polaris-Avatar--size${classify(size)}`);
    }
    if (!customer) {
      classNames.push(
        `Polaris-Avatar--style${classify(styleClass(nameString))}`
      );
    }
    if (
      (hasImage || (initials && initials.length === 0)) &&
      status !== STATUS.loaded
    ) {
      classNames.push('Polaris-Avatar--hidden');
    }
    if (hasImage) {
      classNames.push('Polaris-Avatar--hasImage');
    }

    return classNames.join(' ');
  }

  @action
  handleError() {
    this.status = STATUS.errored;
    this.args.onError?.();
  }

  @action
  handleLoad() {
    this.status = STATUS.loaded;
  }

  @action
  resetStatus() {
    console.log('triggered error');
    // If the source changes, set the status back to pending
    this.status = STATUS.pending;
  }
}
