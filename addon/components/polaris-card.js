import Ember from 'ember';
import layout from '../templates/components/polaris-card';

const {
  Component,
} = Ember;

/**
 * Polaris page component.
 * See https://polaris.shopify.com/components/structure/card
 */
export default Component.extend({
  classNames: ['Polaris-Card'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * Title content for the card
   *
   * @property title
   * @type {string}
   * @default: null
   */
  title: null,

  /**
   * Inner content of the card
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @type {React.ReactNode}
   * @default: null
   */
  text: null,

  /**
   * A less prominent card
   *
   * @property subdued
   * @type {boolean}
   * @default: false
   * TODO: not implemented
   */
  subdued: false,

  /**
   * Auto wrap content in section
   *
   * @property sectioned
   * @type {boolean}
   * @default: true
   * TODO: not implemented
   */
  sectioned: true,

  /**
   * Card header actions
   *
   * @property actions
   * @type {Action[]}
   * @default: null
   * TODO: not implemented
   */
  actions: null,

  /**
   * Primary action in the card footer
   *
   * @property primaryFooterAction
   * @type {Action}
   * @default: null
   * TODO: not implemented
   */
  primaryFooterAction: null,

  /**
   * Secondary action in the card footer
   *
   * @property secondaryFooterAction
   * @type {Action}
   * @default: null
   * TODO: not implemented
   */
  secondaryFooterAction: null,
});
