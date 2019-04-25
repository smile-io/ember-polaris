import Component from '@ember/component';
import layout from '../templates/components/polaris-banner';
import { computed } from '@ember/object';
import { bool } from '@ember/object/computed';
import { isBlank, isPresent } from '@ember/utils';
import { guidFor } from '@ember/object/internals';
import { capitalize } from '@ember/string';
import { invokeAction } from 'ember-invoke-action';
import { handleMouseUpByBlurring } from '../utils/focus';

// TODO icon-update: use new icon names here when @shopify/polaris-icons
// is consumable by Ember apps.
const bannerIcons = {
  success: {
    iconName: 'circle-check-mark',
    color: 'greenDark',
  },
  info: {
    iconName: 'circle-information',
    color: 'tealDark',
  },
  warning: {
    iconName: 'circle-alert',
    color: 'yellowDark',
  },
  critical: {
    iconName: 'circle-barred',
    color: 'redDark',
  },
  default: {
    iconName: 'flag',
    color: 'inkLighter',
  },
};

const supportedStatuses = ['success', 'info', 'warning', 'critical'];

/**
 * TODO @vlad get rid of `ember-truth-helpers` dependency and replace with a child
 * component `polaris-banner/content`
 */
export default Component.extend({
  attributeBindings: [
    'tabIndex',
    'role',
    'ariaLive:aria-live',
    'contentId:aria-describedby',
    'headingId:aria-labelledby',
    'data-test-banner',
  ],

  classNames: ['Polaris-Banner'],

  classNameBindings: [
    'statusClass',
    'hasDismiss:Polaris-Banner--hasDismiss',
    'withinContentContainer:Polaris-Banner--withinContentContainer:Polaris-Banner--withinPage',
  ],

  layout,

  /**
   * Title content for the banner.
   *
   * @property title
   * @type {String}
   * @default null
   */
  title: null,

  /**
   * Icon to display in the banner.
   *
   * @property icon
   * @type {String}
   * @default null
   */
  icon: null,

  /**
   * Sets the status of the banner.
   *
   * @property status
   * @type {String}
   * @default null
   */
  status: null,

  /**
   * Action for banner.
   *
   * @property action
   * @type {Object}
   * @default null
   */
  action: null,

  /**
   * Displays a secondary action.
   *
   * @property secondaryAction
   * @type {Object}
   * @default null
   */
  secondaryAction: null,

  /**
   * Callback when banner is dismissed
   *
   * @property onDismiss
   * @type {Func}
   * @default null
   */
  onDismiss: null,

  tabIndex: '0',

  ariaLive: 'polite',

  /**
   * Temporary workaround for not having appProvider/withAppProvider equivalents implemented yet.
   * Pass `withinContentContainer` true if banner is in a modal/card component.
   *
   * TODO implement appProvider/withAppProvider
   */
  withinContentContainer: false,

  mouseUp: handleMouseUpByBlurring,

  'data-test-banner': '',

  hasDismiss: bool('onDismiss').readOnly(),

  role: computed('status', function() {
    let status = this.get('status');
    if (status === 'warning' || status === 'critical') {
      return 'alert';
    }

    return 'status';
  }).readOnly(),

  iconName: computed('icon', 'status', function() {
    let icon = this.get('icon');
    if (isPresent(icon)) {
      return icon;
    }

    let status = this.get('status');
    if (isBlank(status) || !supportedStatuses.includes(status)) {
      status = 'default';
    }

    return bannerIcons[status].iconName;
  }).readOnly(),

  iconColor: computed('status', function() {
    let status = this.get('status');
    if (isBlank(status) || !supportedStatuses.includes(status)) {
      status = 'default';
    }

    return bannerIcons[status].color;
  }).readOnly(),

  headingId: computed('title', function() {
    if (isBlank(this.get('title'))) {
      return;
    }

    return `${guidFor(this)}-heading`;
  }).readOnly(),

  statusClass: computed('status', function() {
    let status = this.get('status');
    if (isBlank(status) || !supportedStatuses.includes(status)) {
      return;
    }

    return `Polaris-Banner--status${capitalize(status)}`;
  }).readOnly(),

  didRender() {
    this._super(...arguments);

    let hasContentWrapper = this.$().find('div.Polaris-Banner__Content').length;
    let contentId = hasContentWrapper ? `${guidFor(this)}-content` : null;
    this.set('contentId', contentId);
  },

  actions: {
    triggerAction(action, event) {
      if (event) {
        event.stopPropagation();
      }

      return invokeAction(this, action.onAction);
    },
  },
});
