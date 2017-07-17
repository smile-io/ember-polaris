import Ember from 'ember';
import layout from '../../templates/components/polaris-popover/content';

const {
  $,
  Component,
  isNone,
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

  /**
   * `ember-basic-dropdown`'s generated ID, used to look up
   *
   * @property uniqueId
   * @type {string}
   * @default: null
   */
  uniqueId: null,

  /*
   * Lifecycle hooks.
   */
  didRender() {
    this._super(...arguments);

    // Position the tip div correctly.
    const uniqueId = this.get('uniqueId');
    if (isNone(uniqueId)) {
      return;
    }

    const trigger = $(`div.ember-basic-dropdown-trigger[data-ebd-id="${uniqueId}-trigger"]`)[0];
    const content = $(`div#ember-basic-dropdown-content-${uniqueId}`)[0];

    if (isNone(trigger) || isNone(content)) {
      return;
    }

    const left = (trigger.getBoundingClientRect().width / 2) - content.parentNode.getBoundingClientRect().left;
    $('div.Polaris-Popover__Tip', content).css({ left });
  },
});
