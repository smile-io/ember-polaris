import Component from '@ember/component';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';
import { tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-page';

/**
 * Polaris page component.
 * See https://polaris.shopify.com/components/structure/page
 */
@tagName('')
@layout(template)
export default class PolarisPageComponent extends Component {
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
   * @type {Array}
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

  /**
   * The contents of the page
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @type {String}
   * @default null
   * @public
   */
  text = null;

  /**
   * Remove the normal max-width on the page
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  fullWidth = false;

  /**
   * Decreases the maximum layout width. Intended for single-column layouts
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  singleColumn = false;

  /**
   * Force render in page and do not delegate to the app bridge TitleBar action
   *
   * @type {Boolean}
   * @default false
   * @public
   *
   * TODO: not implemented yet (only for embedded apps)
   */
  forceRender = false;

  @or(
    'title',
    'primaryAction',
    'secondaryActions',
    'actionGroups',
    'breadcrumbs'
  )
  hasHeaderContent;

  @computed('fullWidth', 'singleColumn')
  get classes() {
    let classes = ['Polaris-Page'];
    if (this.fullWidth) {
      classes.push('Polaris-Page--fullWidth');
    }

    if (this.singleColumn) {
      classes.push('Polaris-Page--singleColumn');
    }

    return classes.join(' ');
  }
}
