import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { bool, or } from '@ember/object/computed';
import { isBlank, isPresent } from '@ember/utils';
import { guidFor } from '@ember/object/internals';
import { capitalize } from '@ember/string';
import { deprecate } from '@ember/application/deprecations';
import { handleMouseUpByBlurring } from '../utils/focus';

const bannerIcons = {
  success: {
    iconName: 'CircleTickMajor',
    color: 'greenDark',
  },
  info: {
    iconName: 'CircleInformationMajor',
    color: 'tealDark',
  },
  warning: {
    iconName: 'CircleAlertMajor',
    color: 'yellowDark',
  },
  critical: {
    iconName: 'CircleDisabledMajor',
    color: 'redDark',
  },
  default: {
    iconName: 'FlagMajor',
    color: 'inkLighter',
  },
};

const supportedStatuses = ['success', 'info', 'warning', 'critical'];

/**
 * TODO @vlad get rid of `ember-truth-helpers` dependency and replace with a child
 * component `polaris-banner/content`
 */
export default class PolarisBanner extends Component {
  /**
   * Title content for the banner.
   *
   * @type {String}
   * @default null
   * @public
   */
  title;

  /**
   * Icon to display in the banner.
   *
   * @type {String}
   * @default null
   * @public
   */
  icon;

  /**
   * Sets the status of the banner.
   *
   * @type {String}
   * @default null
   * @public
   */
  status;

  /**
   * Action for banner.
   * NOTE: This is the equivalent for Shopify's `action` argument.
   *
   * @type {Object}
   * @default null
   * @public
   */
  primaryAction;

  /**
   * Displays a secondary action.
   *
   * @type {Object}
   * @default null
   * @public
   */
  secondaryAction;

  /**
   * Callback when banner is dismissed
   *
   * @type {Func}
   * @default null
   * @public
   */
  onDismiss;

  /**
   * Temporary workaround for not having appProvider/withAppProvider equivalents implemented yet.
   * Pass `withinContentContainer` true if banner is in a modal/card component.
   *
   * TODO implement appProvider/withAppProvider
   */
  withinContentContainer = false;

  handleMouseUpByBlurring = handleMouseUpByBlurring;

  @bool('onDismiss')
  hasDismiss;

  @or('primaryAction', 'action')
  mainAction;

  get role() {
    let { status } = this;
    if (status === 'warning' || status === 'critical') {
      return 'alert';
    }

    return 'status';
  }

  get iconName() {
    let { icon, status } = this;
    if (isPresent(icon)) {
      return icon;
    }

    if (isBlank(status) || !supportedStatuses.includes(status)) {
      status = 'default';
    }

    return bannerIcons[status].iconName;
  }

  get iconColor() {
    let { status } = this;
    if (isBlank(status) || !supportedStatuses.includes(status)) {
      status = 'default';
    }

    return bannerIcons[status].color;
  }

  get headingId() {
    if (isBlank(this.title)) {
      return null;
    }

    return `${guidFor(this)}-heading`;
  }

  @computed('status')
  get statusClass() {
    let { status } = this;
    if (isBlank(status) || !supportedStatuses.includes(status)) {
      return null;
    }

    return `Polaris-Banner--status${capitalize(status)}`;
  }

  @computed('statusClass', 'hasDismiss', 'withinContentContainer', 'class')
  get cssClasses() {
    let cssClasses = ['Polaris-Banner'];
    if (this.statusClass) {
      cssClasses.push(this.statusClass);
    }
    if (this.hasDismiss) {
      cssClasses.push('Polaris-Banner--hasDismiss');
    }
    if (this.withinContentContainer) {
      cssClasses.push('Polaris-Banner--withinContentContainer');
    } else {
      cssClasses.push('Polaris-Banner--withinPage');
    }
    if (this.class) {
      cssClasses.push(this.class);
    }

    return cssClasses.join(' ');
  }

  init() {
    super.init(...arguments);

    deprecate(
      `[PolarisBanner] Passing 'action' is deprecated! Please use 'primaryAction' instead`,
      !this.action,
      {
        id: 'ember-polaris.polaris-banner.action-arg',
        until: '7.0.0',
      }
    );
  }

  @action
  triggerAction(actionObj, event) {
    if (event) {
      event.stopPropagation();
    }

    return actionObj?.onAction();
  }

  @action
  setContentId(element, [value]) {
    value = typeof value === 'undefined' ? `${guidFor(this)}-content` : value;
    this.set('contentId', value);
  }
}
