import Component from '@ember/component';
import { computed } from '@ember/object';
import { or, gt } from '@ember/object/computed';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-page/header';
import TaglessCssDeprecation from '../../mixins/tagless-css-deprecation';

@tagName('')
@layout(template)
export default class HeaderComponent extends Component.extend(
  TaglessCssDeprecation
) {
  /**
   * Page title, in large type
   *
   * @type {String}
   * @default null
   * @public
   */
  title = null;

  /**
   * Important and non-interactive status information shown immediately after the title
   *
   * @type {String|Component}
   * @default null
   * @public
   */
  titleMetadata = null;

  /**
   * Visually hide the title (stand-alone app use only)
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  titleHidden = false;

  /**
   * Application icon for identifying embedded applications
   *
   * @type {String}
   * @default null
   * @public
   * TODO: not implemented yet
   */
  icon = null;

  /**
   * Collection of breadcrumbs
   *
   * @type {Array}
   * @default null
   * @public
   */
  breadcrumbs = null;

  /**
   * Adds a border to the bottom of the page header (stand-alone app use only)
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  separator = false;

  /**
   * Collection of secondary page-level actions
   *
   * @type {Array}
   * @default null
   * @public
   */
  secondaryActions = null;

  /**
   * Collection of page-level groups of secondary actions
   *
   * Properties:
   *
   * @property {String} title Action group title
   * @property {String} icon Icon to display
   * @property {Object[]} actions List of actions
   * @property {String|Component|Object} details Action details
   * @property {Function} onActionAnyItem Callback when any action takes place
   *
   * @type {Object[]}
   * @default null
   * @public
   */
  actionGroups = null;

  /**
   * Primary page-level action
   *
   * @type {Object}
   * @default null
   * @public
   */
  primaryAction = null;

  /**
   * Page-level pagination (stand-alone app use only)
   *
   * @type {Object}
   * @default null
   * @public
   * TODO: not implemented yet
   */
  pagination = null;

  @gt('breadcrumbs.length', 0)
  hasBreadcrumbs;

  @or('hasBreadcrumbs', 'pagination')
  hasNavigation;

  @or('primaryAction', 'secondaryActions')
  hasActions;

  @gt('secondaryActions.length', 0)
  hasSecondaryActions;

  @gt('actionGroups.length', 0)
  hasActionGroups;

  @computed('primaryAction.primary')
  get shouldRenderPrimaryActionAsPrimary() {
    let { primaryAction } = this;

    return (
      primaryAction &&
      (primaryAction.primary === undefined ? true : primaryAction.primary)
    );
  }

  @computed('secondaryActions.length', 'actionGroups.length')
  get hasRollup() {
    let secondaryActions = this.secondaryActions || [];
    let actionGroups = this.actionGroups || [];

    return secondaryActions.length + actionGroups.length >= 1;
  }

  @computed('actionGroups.[]')
  get actionGroupsAsActionListSections() {
    let actionGroups = this.actionGroups || [];

    return actionGroups.map(({ title, actions }) => {
      return { title, items: actions };
    });
  }

  @computed(
    'titleHidden',
    'separator',
    'hasBreadcrumbs',
    'hasSecondaryActions',
    'hasRollup',
    'class'
  )
  get cssClasses() {
    let cssClasses = ['Polaris-Page-Header'];

    if (this.titleHidden) {
      cssClasses.push('Polaris-Page-Header__Title--hidden');
    }

    if (this.separator) {
      cssClasses.push('Polaris-Page-Header__Header--hasSeparator');
    }

    if (this.hasBreadcrumbs) {
      cssClasses.push('Polaris-Page-Header__Header--hasBreadcrumbs');
    }

    if (this.hasSecondaryActions) {
      cssClasses.push('Polaris-Page-Header__Header--hasSecondaryActions');
    }

    if (this.hasRollup) {
      cssClasses.push('Polaris-Page-Header__Header--hasRollup');
    }

    if (this.class) {
      cssClasses.push(this.class);
    }

    return cssClasses.join(' ');
  }
}
