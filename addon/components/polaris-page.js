import Ember from 'ember';
import layout from '../templates/components/polaris-page';

const {
  Component,
  computed,
} = Ember;

const {
  notEmpty,
  or,
} = computed;

/**
 * Polaris page component.
 * See https://polaris.shopify.com/components/structure/page
 */
export default Component.extend({
  classNames: ['Polaris-Page'],
  classNameBindings: ['fullWidth:Polaris-Page--fullWidth'],

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
   * TODO: find out why the React example only shows the last breadcrumb...
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
   * @type {Array}
   * @default null
   */
  secondaryActions: null,

  /**
   * Primary page-level action
   *
   * @property primaryAction
   * @type {Object}
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
  hasBreadcrumbs: notEmpty('breadcrumbs'),
  headerClass: computed('hasBreadcrumbs', function() {
    const classNames = [
      'Polaris-Page__Header',
    ];

    if (this.get('hasBreadcrumbs')) {
      classNames.push('Polaris-Page__Header--hasBreadcrumbs');
    }

    return classNames.join(' ');
  }).readOnly(),

  hasActions: or('primaryAction', 'secondaryActions'),
});
