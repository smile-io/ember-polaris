import Ember from 'ember';
import layout from '../templates/components/polaris-card';

const {
  Component,
} = Ember;

/**
 * Polaris card component.
 * See https://polaris.shopify.com/components/structure/card
 */
export default Component.extend({
  classNames: ['Polaris-Card'],
  classNameBindings: [
    'subdued:Polaris-Card--subdued',
  ],

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
   */
  subdued: false,

  /**
   * Auto wrap content in section
   *
   * @property sectioned
   * @type {boolean}
   * @default: false
   */
  sectioned: false,

  /**
   * Card header actions
   *
   * @property actions
   * @type {Action[]}
   * @default: null
   * TODO: not implemented, need to rename this to avoid collisions with actions hash
   */
  // actions: null,

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
