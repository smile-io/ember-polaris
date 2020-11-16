import Component from '@glimmer/component';
import { htmlSafe } from '@ember/string';
import { inject as service } from '@ember/service';

export default class PolarisActionListItem extends Component {
  @service('polaris-app-provider') polaris;

  /**
   * Visually hidden text for screen readers
   * @type: {String}
   */
  accessibilityLabel;

  /**
   * Whether the action is active or not
   * @type {Boolean}
   */
  active;

  /**
   * @type {Object}
   * @property {String} content
   * @property {String} status
   */
  badge;

  /**
   * Content the action displays
   * @type {String}
   */
  text;

  /**
   * Destructive action
   * @type {Boolean}
   */
  destructive;

  /**
   * Whether or not the action is disabled
   * @type {Boolean}
   */
  disabled;

  /**
   * Add an ellipsis suffix to action content
   * @type {Boolean}
   */
  ellipsis;

  /**
   * Forces url to open in a new tab
   * @type {Boolean}
   */
  external;

  /**
   * Additional hint text to display with item
   * @type {String}
   */
  helpText;

  /**
   * Source of the icon
   * @type {String}
   */
  icon;

  /**
   * Image source
   * @type {String}
   */
  image;

  /**
   * Prefix source
   * @type {String|Component}
   */
  prefix;

  /**
   * Defines a role for the action
   * @type {String}
   */
  role;

  /**
   * Suffix source
   * @type {String|Component}
   */
  suffix;

  /**
   * A destination to link to, rendered in the action
   * @type {String}
   */
  url;

  /**
   * Callback when an action takes place
   *
   * @type {Function} () => void
   */
  onAction;

  get itemClasses() {
    let cssClasses = ['Polaris-ActionList__Item'];
    let { destructive, disabled, active } = this.args;

    if (destructive) {
      cssClasses.push('Polaris-ActionList--destructive');
    }

    if (disabled) {
      cssClasses.push('Polaris-ActionList--disabled');
    }

    if (active) {
      cssClasses.push('Polaris-ActionList--active');
    }
    if (this.polaris.features.newDesignLanguage) {
      cssClasses.push('Polaris-ActionList--newDesignLanguage');
    }
    return cssClasses.join(' ');
  }

  get imageBackgroundStyle() {
    return htmlSafe(`background-image: url(${this.args.image})`);
  }
}
