import {
  attribute,
  className,
  classNames,
  layout as templateLayout,
} from '@ember-decorators/component';
import { action as actionDecorator, computed } from '@ember/object';
import { bool } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../templates/components/polaris-banner';
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
@classNames('Polaris-Banner')
@templateLayout(layout)
export default class PolarisBanner extends Component {
  /**
   * Title content for the banner.
   *
   * @property title
   * @type {String}
   * @default null
   */
  title = null;

  /**
   * Icon to display in the banner.
   *
   * @property icon
   * @type {String}
   * @default null
   */
  icon = null;

  /**
   * Sets the status of the banner.
   *
   * @property status
   * @type {String}
   * @default null
   */
  status = null;

  /**
   * Action for banner.
   *
   * @property primaryAction
   * @type {Object}
   * @default null
   */
  action = null;

  /**
   * Displays a secondary action.
   *
   * @property secondaryAction
   * @type {Object}
   * @default null
   */
  secondaryAction = null;

  /**
   * Callback when banner is dismissed
   *
   * @property onDismiss
   * @type {Func}
   * @default null
   */
  onDismiss = null;

  @attribute
  tabIndex = '0';

  @attribute('aria-live')
  ariaLive = 'polite';

  /**
   * Temporary workaround for not having appProvider/withAppProvider equivalents implemented yet.
   * Pass `withinContentContainer` true if banner is in a modal/card component.
   *
   * TODO implement appProvider/withAppProvider
   */
  @className(
    'Polaris-Banner--withinContentContainer',
    'Polaris-Banner--withinPage'
  )
  withinContentContainer = false;

  mouseUp = handleMouseUpByBlurring;
  'data-test-banner' = '';

  @(bool('onDismiss').readOnly())
  @className('Polaris-Banner--hasDismiss')
  hasDismiss;

  @(computed('status').readOnly())
  @attribute
  get role() {
    let status = this.get('status');
    if (status === 'warning' || status === 'critical') {
      return 'alert';
    }

    return 'status';
  }

  @(computed('icon', 'status').readOnly())
  get iconName() {
    let icon = this.get('icon');
    if (isPresent(icon)) {
      return icon;
    }

    let status = this.get('status');
    if (isBlank(status) || !supportedStatuses.includes(status)) {
      status = 'default';
    }

    return bannerIcons[status].iconName;
  }

  @(computed('status').readOnly())
  get iconColor() {
    let status = this.get('status');
    if (isBlank(status) || !supportedStatuses.includes(status)) {
      status = 'default';
    }

    return bannerIcons[status].color;
  }

  @(computed('title').readOnly())
  @attribute('aria-labelledby')
  get headingId() {
    if (isBlank(this.get('title'))) {
      return null;
    }

    return `${guidFor(this)}-heading`;
  }

  @(computed('status').readOnly())
  @className
  get statusClass() {
    let status = this.get('status');
    if (isBlank(status) || !supportedStatuses.includes(status)) {
      return null;
    }

    return `Polaris-Banner--status${capitalize(status)}`;
  }

  didRender() {
    super.didRender(...arguments);

    let hasContentWrapper = isPresent(
      this.element.querySelector('div.Polaris-Banner__Content')
    );
    let contentId = hasContentWrapper ? `${guidFor(this)}-content` : null;
    this.set('contentId', contentId);
  }

  @actionDecorator
  triggerAction(action, event) {
    if (event) {
      event.stopPropagation();
    }

    return invokeAction(this, action.onAction);
  }
}
