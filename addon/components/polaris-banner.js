import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { bool, or } from '@ember/object/computed';
import { isBlank, isPresent } from '@ember/utils';
import { guidFor } from '@ember/object/internals';
import { capitalize } from '@ember/string';
import { deprecate } from '@ember/application/deprecations';
import { tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-banner';
import { handleMouseUpByBlurring } from '../utils/focus';
import deprecateClassArgument from '../utils/deprecate-class-argument';

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
@deprecateClassArgument
@tagName('')
@layout(template)
export default class PolarisBanner extends Component {
  /**
   * Title content for the banner.
   *
   * @type {String}
   * @default null
   * @public
   */
  title = null;

  /**
   * Icon to display in the banner.
   *
   * @type {String}
   * @default null
   * @public
   */
  icon = null;

  /**
   * Sets the status of the banner.
   *
   * @type {String}
   * @default null
   * @public
   */
  status = null;

  /**
   * Action for banner.
   * NOTE: This is the equivalent for Shopify's `action` argument.
   *
   * @type {Object}
   * @default null
   * @public
   */
  primaryAction = null;

  /**
   * Displays a secondary action.
   *
   * @type {Object}
   * @default null
   * @public
   */
  secondaryAction = null;

  /**
   * Callback when banner is dismissed
   *
   * @type {Func}
   * @default null
   * @public
   */
  onDismiss = null;

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

  @computed('status')
  get role() {
    let { status } = this;
    if (status === 'warning' || status === 'critical') {
      return 'alert';
    }

    return 'status';
  }

  @computed('icon', 'status')
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

  @computed('status')
  get iconColor() {
    let { status } = this;
    if (isBlank(status) || !supportedStatuses.includes(status)) {
      status = 'default';
    }

    return bannerIcons[status].color;
  }

  @computed('title')
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
