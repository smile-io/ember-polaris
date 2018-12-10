import Component from '@ember/component';
import layout from '../templates/components/polaris-empty-search-result';

export default Component.extend({
  classNames: ['Polaris-EmptySearchResult'],

  layout,

  /**
   * @type {String}
   * @default null
   * @property title
   * @public
   */
  title: null,

  /**
   * @type {String}
   * @default null
   * @property description
   * @public
   */
  description: null,

  /**
   * @type {Boolean}
   * @default false
   * @property withIllustration
   * @public
   */
  withIllustration: false,
});
