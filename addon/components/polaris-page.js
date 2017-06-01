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
  /*
   * title
   * string
   * Page title, in large type
   */
  title: null,

  /*
   * icon
   * string
   * App icon, for pages that are part of Shopify apps
   * TODO: needs polaris-icon component.
   */
  icon: null,

  /*
   * breadcrumbs
   * BreadcrumbProps["breadcrumbs"]
   * Collection of breadcrumbs
   * TODO: not implemented yet
   */
  breadcrumbs: null,

  /*
   * children
   * React.ReactNode
   * The contents of the page
   * NOTE: this component can ONLY be used in block form,
   * so `children` will be ignored if supplied.
   */
  // children: null,

  /*
   * fullWidth
   * boolean
   * Remove the normal max-width on the page
   */
  fullWidth: null,

  /*
   * secondaryActions
   * ComplexAction[]
   * Collection of secondary page-level actions
   * TODO: not implemented yet
   */
  secondaryActions: null,

  /*
   * primaryAction
   * DisableableAction
   * Primary page-level action
   */
  primaryAction: null,

  /*
   * pagination
   * PaginationDescriptor
   * Page-level pagination
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
