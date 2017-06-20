import Ember from 'ember';
import layout from '../templates/components/polaris-page';

const {
  Component,
  computed,
} = Ember;

/**
 * Polaris page component.
 * See https://polaris.shopify.com/components/structure/page
 */
export default Component.extend({
  classNames: ['Polaris-Page'],
  classNameBindings: ['fullWidthClassName'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * Page title, in large type
   *
   * @property title
   * @type {string}
   * @default null
   */
  title: null,

  /**
   * App icon, for pages that are part of Shopify apps
   *
   * @property icon
   * @type {string}
   * @default null
   * TODO: needs polaris-icon component.
   */
  icon: null,

  /**
   * Collection of breadcrumbs
   *
   * @property breadcrumbs
   * @type {BreadcrumbProps["breadcrumbs"]}
   * @default null
   * TODO: not implemented yet
   */
  breadcrumbs: null,

  /**
   * The contents of the page
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @type {String}
   * @default null
   */
  text: null,

  /**
   * Remove the normal max-width on the page
   *
   * @property fullWidth
   * @type {boolean}
   * @default false
   */
  fullWidth: false,

  /**
   * Collection of secondary page-level actions
   *
   * @property secondaryActions
   * @type {ComplexAction[]}
   * @default null
   * TODO: not implemented yet
   */
  secondaryActions: null,

  /**
   * Primary page-level action
   *
   * @property primaryAction
   * @type {DisableableAction}
   * @default null
   */
  primaryAction: null,

  /**
   * Page-level pagination
   *
   * @property pagination
   * @type {PaginationDescriptor}
   * @default null
   * TODO: not implemented yet
   */
  pagination: null,

  /**
   * Computed properties.
   */
  hasActions: computed.or('primaryAction', 'secondaryActions'),

  fullWidthClassName: computed('fullWidth', function() {
    const fullWidth = this.get('fullWidth');
    return fullWidth ? 'Polaris-Page--fullWidth' : null;
  }).readOnly(),
});
