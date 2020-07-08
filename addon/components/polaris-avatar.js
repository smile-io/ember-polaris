import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { or } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';
import { classify } from '@ember/string';
import { tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-avatar';
import deprecateClassArgument from '../utils/deprecate-class-argument';

const allowedSizes = ['small', 'medium', 'large'];
const defaultSize = 'medium';

// TODO currently we don't need these...recheck when icons are properly handled
const avatarImages = [
  'avatarOne',
  'avatarTwo',
  'avatarThree',
  'avatarFour',
  'avatarFive',
  'avatarSix',
  'avatarSeven',
  'avatarEight',
  'avatarNine',
];

const styleClasses = ['one', 'two', 'three', 'four', 'five', 'six'];

@deprecateClassArgument
@tagName('')
@layout(template)
export default class PolarisAvatar extends Component {
  /**
   * Size of avatar
   *
   * @type {String}
   * @default 'medium'
   * @public
   */
  size = defaultSize;

  /**
   * The name of the person
   *
   * @type {String}
   * @default null
   * @public
   */
  name = null;

  /**
   * Initials of person to display
   *
   * @type {String}
   * @default null
   * @public
   */
  initials = null;

  /**
   * Whether the avatar is for a customer
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  customer = false;

  /**
   * URL of the avatar image which falls back to initials if the image fails to load
   *
   * @type {String}
   * @default null
   * @public
   */
  source = null;

  /**
   * Accessible label for the avatar image
   *
   * @type {String}
   * @default null
   * @public
   */
  accessibilityLabel = null;

  /**
   * Path to the Polaris avatar images
   * TODO: read this from config? Need a way to set this by default?
   * @type {String}
   */
  avatarSourcePath = '';

  /**
   * @type {Boolean}
   * @default false
   */
  hasError = false;

  /**
   * @type {Boolean}
   * @default false
   */
  hasLoaded = false;

  /**
   * Image source to use (if any)
   * @type {String}
   */
  @or('source', 'customerImageSource')
  finalSource;

  /**
   * Name to use (if any)
   * @type {String}
   */
  @or('name', 'initials')
  nameString;

  /**
   * Whether we have an image to use
   * @type {Boolean}
   */
  @computed('source', 'customer', 'hasError')
  get hasImage() {
    let { source, customer, hasError } = this;
    return (source || customer) && !hasError;
  }

  /**
   * Accessibility label to apply to avatar
   * @type {String}
   */
  @computed('accessibilityLabel', 'name', 'initials')
  get label() {
    let { accessibilityLabel, name, initials } = this;

    if (accessibilityLabel) {
      return accessibilityLabel;
    }

    if (name) {
      return name;
    }

    if (initials) {
      return `Avatar with initials ${initials.split('').join(' ')}`;
    }

    return 'Avatar';
  }

  /**
   * Class name to set avatar style
   * @type {String}
   */
  @computed('nameString')
  get styleClass() {
    let { nameString } = this;
    let styleIndex = isEmpty(nameString)
      ? 0
      : nameString.charCodeAt(0) % styleClasses.length;
    let style = styleClasses[styleIndex];

    return `Polaris-Avatar--style${classify(style)}`;
  }

  /**
   * Class name to set avatar size
   * @type {String}
   */
  @computed('size')
  get sizeClass() {
    let { size } = this;
    if (allowedSizes.indexOf(size) === -1) {
      size = defaultSize;
    }

    return `Polaris-Avatar--size${classify(size)}`;
  }

  /**
   * Class name to hide avatar when loading
   * @type {String}
   */
  @computed('hasImage', 'hasLoaded')
  get hiddenClass() {
    let { hasImage, hasLoaded } = this;
    return hasImage && !hasLoaded ? 'Polaris-Avatar--hidden' : null;
  }

  /**
   * Image source when displaying a customer avatar
   * @type {String}
   */
  @computed('avatarSourcePath', 'customer', 'nameString')
  get customerImageSource() {
    if (!this.customer) {
      return null;
    }

    let { nameString } = this;
    let avatarIndex = isEmpty(nameString)
      ? 0
      : nameString.charCodeAt(0) % avatarImages.length;
    return `${this.avatarSourcePath}/avatar-${++avatarIndex}.svg`;
  }

  /**
   * Flag controlling whether the avatar initials should be rendered
   * @type {Boolean}
   */
  @computed('initials', 'hasImage')
  get shouldShowInitials() {
    let { initials, hasImage } = this;
    return initials && !hasImage;
  }

  /**
   * Flag controlling whether the avatar image should be rendered
   * @type {Boolean}
   */
  @computed('finalSource', 'hasError')
  get shouldShowImage() {
    let { finalSource, hasError } = this;
    return finalSource && !hasError;
  }

  @action
  handleError() {
    this.setProperties({ hasError: true, hasLoaded: false });
  }

  @action
  handleLoad() {
    this.setProperties({ hasLoaded: true, hasError: false });
  }

  @action
  resetImage() {
    this.setProperties({
      hasError: false,
      hasLoaded: false,
    });
  }
}
