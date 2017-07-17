import Ember from 'ember';
import layout from '../../templates/components/polaris-popover/content';

const {
  Component,
} = Ember;

export default Component.extend({
  tagName: '',

  layout,

  /*
   * Public attributes.
   */
  /**
   * Automatically add wrap content in a section
   *
   * @property sectioned
   * @type {boolean}
   * @default false
   */
  sectioned: false,

  /**
   * Content wrapper component.
   *
   * @property contentComponent
   * @type {component}
   * @default: null
   */
  contentComponent: null,

  /**
   * Simple text for quick popovers.
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @type {string}
   * @default: null
   */
  text: null,

  didRender() {
    this._super(...arguments);

    // Position the tip div correctly.
    // TODO: make this less hacky!
    const trigger = Ember.$('div.ember-basic-dropdown-trigger')[0];
    const content = Ember.$('div#ember-basic-dropdown-wormhole')[0];
    const left = (trigger.getBoundingClientRect().width / 2) - content.getBoundingClientRect().left;
    Ember.$('div.Polaris-Popover__Tip').css({ left });
  },
});
