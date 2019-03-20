import Component from '@ember/component';
import { isEmpty } from '@ember/utils';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';
import { classify } from '@ember/string';
import layout from '../templates/components/polaris-avatar';

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

export default Component.extend({
  tagName: 'span',
  attributeBindings: ['role', 'label:aria-label'],
  classNames: ['Polaris-Avatar'],
  classNameBindings: [
    'styleClass',
    'sizeClass',
    'hiddenClass',
    'hasImage:Polaris-Avatar--hasImage',
  ],

  layout,

  /**
   * Size of avatar
   *
   * @property size
   * @public
   * @type {String}
   * @default 'medium'
   */
  size: defaultSize,

  /**
   * The name of the person
   *
   * @property name
   * @public
   * @type {String}
   * @default null
   */
  name: null,

  /**
   * Initials of person to display
   *
   * @property initials
   * @public
   * @type {String}
   * @default null
   */
  initials: null,

  /**
   * Whether the avatar is for a customer
   *
   * @property customer
   * @public
   * @type {Boolean}
   * @default false
   */
  customer: false,

  /**
   * URL of the avatar image which falls back to initials if the image fails to load
   *
   * @property source
   * @public
   * @type {String}
   * @default null
   */
  source: null,

  /**
   * Accessible label for the avatar image
   *
   * @property accessibilityLabel
   * @public
   * @type {String}
   * @default null
   */
  accessibilityLabel: null,

  /**
   * Path to the Polaris avatar images
   * TODO: read this from config? Need a way to set this by default?
   * @property avatarSourcePath
   * @private
   * @type {String}
   */
  avatarSourcePath: '',

  /**
   * Role attribute value
   * @property role
   * @private
   * @type {String}
   */
  role: 'img',

  /**
   * @property hasError
   * @type {Boolean}
   * @default false
   * @private
   */
  hasError: false,

  /**
   * @property hasLoaded
   * @type {Boolean}
   * @default false
   * @private
   */
  hasLoaded: false,

  /**
   * @property prevSource
   * @type {String}
   * @default null
   * @private
   */
  prevSource: null,

  /**
   * Image source to use (if any)
   * @property finalSource
   * @private
   * @type {String}
   */
  finalSource: or('source', 'customerImageSource').readOnly(),

  /**
   * Name to use (if any)
   * @property nameString
   * @private
   * @type {String}
   */
  nameString: or('name', 'initials').readOnly(),

  /**
   * Whether we have an image to use
   * @property
   * @private
   * @type {Boolean}
   */
  hasImage: computed('source', 'customer', 'hasError', function() {
    let { source, customer, hasError } = this.getProperties(
      'source',
      'customer',
      'hasError'
    );

    return (source || customer) && !hasError;
  }).readOnly(),

  /**
   * Accessibility label to apply to avatar
   * @property label
   * @private
   * @type {String}
   */
  label: computed('accessibilityLabel', 'name', 'initials', function() {
    let { accessibilityLabel, name, initials } = this.getProperties(
      'accessibilityLabel',
      'name',
      'initials'
    );

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
  }).readOnly(),

  /**
   * Class name to set avatar style
   * @property styleClass
   * @private
   * @type {String}
   */
  styleClass: computed('nameString', function() {
    let nameString = this.get('nameString');
    let styleIndex = isEmpty(nameString)
      ? 0
      : nameString.charCodeAt(0) % styleClasses.length;
    let style = styleClasses[styleIndex];

    return `Polaris-Avatar--style${classify(style)}`;
  }).readOnly(),

  /**
   * Class name to set avatar size
   * @property sizeClass
   * @private
   * @type {String}
   */
  sizeClass: computed('size', function() {
    let size = this.get('size');
    if (allowedSizes.indexOf(size) === -1) {
      size = defaultSize;
    }

    return `Polaris-Avatar--size${classify(size)}`;
  }).readOnly(),

  /**
   * Class name to hide avatar when loading
   * @property hiddenClass
   * @private
   * @type {String}
   */
  hiddenClass: computed('hasImage', 'hasLoaded', function() {
    let { hasImage, hasLoaded } = this;

    return hasImage && !hasLoaded ? 'Polaris-Avatar--hidden' : null;
  }).readOnly(),

  /**
   * Image source when displaying a customer avatar
   * @property customerImageSource
   * @private
   * @type {String}
   */
  customerImageSource: computed('customer', 'nameString', function() {
    if (!this.get('customer')) {
      return null;
    }

    let nameString = this.get('nameString');
    let avatarIndex = isEmpty(nameString)
      ? 0
      : nameString.charCodeAt(0) % avatarImages.length;
    return `${this.get('avatarSourcePath')}/avatar-${++avatarIndex}.svg`;
  }).readOnly(),

  /**
   * Flag controlling whether the avatar initials should be rendered
   * @property shouldShowInitials
   * @private
   * @type {Boolean}
   */
  shouldShowInitials: computed('initials', 'hasImage', function() {
    let { initials, hasImage } = this.getProperties('initials', 'hasImage');
    return initials && !hasImage;
  }).readOnly(),

  /**
   * Flag controlling whether the avatar image should be rendered
   * @property shouldShowImage
   * @private
   * @type {Boolean}
   */
  shouldShowImage: computed('finalSource', 'hasError', function() {
    let { finalSource, hasError } = this.getProperties(
      'finalSource',
      'hasError'
    );
    return finalSource && !hasError;
  }).readOnly(),

  didReceiveAttrs() {
    if (this.source !== this.prevSource) {
      this.setProperties({
        prevSource: this.source,
        hasError: false,
        hasLoaded: false,
      });
    }
  },

  actions: {
    handleError() {
      this.setProperties({ hasError: true, hasLoaded: false });
    },

    handleLoad() {
      this.setProperties({ hasLoaded: true, hasError: false });
    },
  },
});
