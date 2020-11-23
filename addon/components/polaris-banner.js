import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { bool } from '@ember/object/computed';
import { isBlank, isPresent } from '@ember/utils';
import { guidFor } from '@ember/object/internals';
import { capitalize } from '@ember/string';
import { handleMouseUpByBlurring } from '../utils/focus';
import { arg } from '../utils/decorators/arg';

const supportedStatuses = ['success', 'info', 'warning', 'critical'];

/**
 * TODO @vlad get rid of `ember-truth-helpers` dependency and replace with a child
 * component `polaris-banner/content`
 */
export default class PolarisBanner extends Component {
  @service('polaris-app-provider') polaris;

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
   * Disables screen reader announcements when changing the content of the banner.
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  @arg stopAnnouncements = false;

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
  @arg withinContentContainer = false;

  handleMouseUpByBlurring = handleMouseUpByBlurring;

  @bool('onDismiss')
  hasDismiss;

  @tracked shouldShowFocus = false;

  get role() {
    let { status } = this.args;

    if (isBlank(status) || !supportedStatuses.includes(status)) {
      status = 'default';
    }

    return this.useBannerAttributes.ariaRoleType;
  }

  get iconName() {
    let { icon, status } = this.args;
    if (isPresent(icon)) {
      return icon;
    }

    if (isBlank(status) || !supportedStatuses.includes(status)) {
      status = 'default';
    }

    return this.useBannerAttributes.iconName;
  }

  get iconColor() {
    let { status } = this.args;
    if (isBlank(status) || !supportedStatuses.includes(status)) {
      status = 'default';
    }

    return this.useBannerAttributes.color;
  }

  get headingId() {
    if (isBlank(this.args.title)) {
      return null;
    }

    return `${guidFor(this)}Heading`;
  }

  get statusClass() {
    let { status } = this.args;
    if (isBlank(status) || !supportedStatuses.includes(status)) {
      return null;
    }

    return `Polaris-Banner--status${capitalize(status)}`;
  }

  @computed(
    'hasDismiss',
    'polaris.features.newDesignLanguage',
    'shouldShowFocus',
    'statusClass',
    'withinContentContainer'
  )
  get cssClasses() {
    let cssClasses = ['Polaris-Banner'];
    if (this.statusClass) {
      cssClasses.push(this.statusClass);
    }
    if (this.hasDismiss) {
      cssClasses.push('Polaris-Banner--hasDismiss');
    }

    if (this.shouldShowFocus) {
      cssClasses.push('Polaris-Banner--keyFocused');
    }

    if (this.withinContentContainer) {
      cssClasses.push('Polaris-Banner--withinContentContainer');
    } else {
      cssClasses.push('Polaris-Banner--withinPage');
    }

    if (this.polaris.features.newDesignLanguage) {
      cssClasses.push('Polaris-Banner--newDesignLanguage');
    }

    return cssClasses.join(' ');
  }

  @computed('args.status', 'polaris.features.newDesignLanguage')
  get useBannerAttributes() {
    let { newDesignLanguage } = this.polaris.features;

    switch (this.args.status) {
      case 'success':
        return {
          defaultIcon: 'CircleTickMajor',
          iconColor: newDesignLanguage ? 'success' : 'greenDark',
          ariaRoleType: 'status',
        };

      case 'info':
        return {
          defaultIcon: 'CircleInformationMajor',
          iconColor: newDesignLanguage ? 'highlight' : 'tealDark',
          ariaRoleType: 'status',
        };

      case 'warning':
        return {
          defaultIcon: 'CircleAlertMajor',
          iconColor: newDesignLanguage ? 'warning' : 'yellowDark',
          ariaRoleType: 'alert',
        };

      case 'critical':
        return {
          defaultIcon: 'CircleDisabledMajor',
          iconColor: newDesignLanguage ? 'critical' : 'redDark',
          ariaRoleType: 'alert',
        };

      default:
        return {
          defaultIcon: newDesignLanguage
            ? 'CircleInformationMajor'
            : 'FlagMajor',
          iconColor: newDesignLanguage ? 'base' : 'inkLighter',
          ariaRoleType: 'status',
        };
    }
  }

  @action
  handleBlur(e) {
    e.currentTarget.blur();
    this.shouldShowFocus = false;
  }

  @action
  handleKeyUp() {
    this.shouldShowFocus = true;
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
    this.contentId = value;
  }
}
