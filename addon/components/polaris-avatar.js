import Component from '@ember/component';
import { isNone } from '@ember/utils';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';
import { classify } from '@ember/string';
import layout from '../templates/components/polaris-avatar';

const allowedSizes = [
  'small',
  'medium',
  'large'
];
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
  'avatarNine'
];

const styleClasses = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six'
];

export default Component.extend({
  tagName: 'span',
  attributeBindings: [
    'role',
    'label:aria-label'
  ],
  classNames: ['Polaris-Avatar'],
  classNameBindings: [
    'styleClass',
    'sizeClass'
  ],

  layout,

  /**
   * Size of avatar
   *
   * @property size
   * @type {String}
   * @default 'medium'
   */
  size: defaultSize,

  /**
   * The name of the person
   *
   * @property name
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
   * @type {boolean}
   * @default false
   */
  customer: false,

  /**
   * URL of the avatar image
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
   * Image source to use (if any)
   * @property finalSource
   * @private
   * @type {String}
   */
  finalSource: or('source', 'customerImageSource').readOnly(),

  /**
   * Name to use (if any)
   * @property finalName
   * @private
   * @type {String}
   */
  finalName: or('name', 'initials').readOnly(),

  /**
   * Accessibility label to apply to avatar
   * @property label
   * @private
   * @type {String}
   */
  label: computed('accessibilityLabel', 'name', 'initials', function() {
    let { accessibilityLabel, name, initials } = this.getProperties('accessibilityLabel', 'name', 'initials');

    if (accessibilityLabel) {
      return accessibilityLabel;
    }

    if (name) {
      return name;
    }

    if (initials) {
      return `Avatar with initials ${ initials.split('').join(' ') }`;
    }

    return 'Avatar';
  }).readOnly(),

  /**
   * Class name to set avatar style
   * @property styleClass
   * @private
   * @type {String}
   */
  styleClass: computed('finalName', function() {
    let name = this.get('finalName');
    let styleIndex = isNone(name) ? 0 : name.charCodeAt(0) % styleClasses.length;
    let style = styleClasses[styleIndex];

    return `Polaris-Avatar--style${ classify(style) }`;
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

    return `Polaris-Avatar--size${ classify(size) }`;
  }).readOnly(),

  /**
   * Image source when displaying a customer avatar
   * @property customerImageSource
   * @private
   * @type {String}
   */
  customerImageSource: computed('customer', 'finalName', function() {
    if (!this.get('customer')) {
      return null;
    }

    let name = this.get('finalName');
    let avatarIndex = isNone(name) ? 0 : name.charCodeAt(0) % avatarImages.length;
    return `${ this.get('avatarSourcePath') }/avatar-${ ++avatarIndex }.svg`;
  }).readOnly(),
});
