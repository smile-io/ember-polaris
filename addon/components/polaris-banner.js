import Ember from 'ember';
import layout from '../templates/components/polaris-banner';
import { invokeAction } from 'ember-invoke-action';

const {
  computed,
  isPresent,
  isBlank,
  guidFor,
  String: EmberString,
  Component,
} = Ember;

const { capitalize } = EmberString;
const { bool } = computed;

const bannerIcons = {
  success: {
    iconName: 'circle-check-mark',
    color: 'greenDark',
  },
  info: {
    iconName: 'flag',
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
    iconName: 'confetti',
    color: 'ink',
  },
};

const supportedStatuses = ['success', 'info', 'warning', 'critical'];

export default Component.extend({
  layout,
  classNames: ['Polaris-Banner'],

  classNameBindings: [
    'statusClass',
    'hasDismiss:Polaris-Banner__hasDismiss',
  ],

  attributeBindings: [
    'tabIndex',
    'roleAttr:role',
    'contentId:aria-describedby',
    'headingId:aria-labelledby',
  ],

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

  hasDismiss: bool('onDismiss').readOnly(),

  roleAttr: computed('status', function() {
    let role = 'banner';
    let status = this.get('status');
    if (isBlank(status) || !supportedStatuses.includes(status)) {
      return role;
    }

    return `${ role } ${ status }`;
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

    return `${ guidFor(this) }-heading`;
  }).readOnly(),

  statusClass: computed('status', function() {
    let status = this.get('status');
    if (isBlank(status) || !supportedStatuses.includes(status)) {
      return;
    }

    return `Polaris-Banner--status${ capitalize(status) }`;
  }).readOnly(),

  /**
   * Lifecycle hooks.
   */
  didRender() {
    this._super(...arguments);

    let hasContent = this.$().find('div.Polaris-Banner__Content').length;
    if (hasContent) {
      this.set('contentId', `${ guidFor(this) }-content`);
    }
  },

  actions: {
    triggerAction(action, event) {
      if (event) {
        event.stopPropagation();
      }

      return invokeAction(this, action.action);
    }
  }
});
