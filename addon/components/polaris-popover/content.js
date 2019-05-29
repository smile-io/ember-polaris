import Ember$ from 'jquery';
import Component from '@ember/component';
import { isNone } from '@ember/utils';
import { getRectForNode } from '@shopify/javascript-utilities/geometry';
import layout from '../../templates/components/polaris-popover/content';

export default Component.extend({
  tagName: '',

  layout,

  /**
   * Automatically add wrap content in a section
   *
   * @property sectioned
   * @type {Boolean}
   * @default false
   * @public
   */
  sectioned: false,

  /**
   * Allow popover to stretch to the full width of its activator
   *
   * @property fullWidth
   * @type {Boolean}
   * @default false
   * @public
   */
  fullWidth: false,

  /**
   * Allow popover to stretch to fit content vertically
   *
   * @property fullHeight
   * @type {Boolean}
   * @default false
   * @public
   */
  fullHeight: false,

  /**
   * Content wrapper component.
   *
   * @property contentComponent
   * @type {Component}
   * @default: null
   * @public
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
   * @type {String}
   * @default null
   * @public
   */
  text: null,

  /**
   * `ember-basic-dropdown`'s generated ID, used to look up
   *
   * @property uniqueId
   * @type {String}
   * @default: null
   * @public
   */
  uniqueId: null,

  didRender() {
    this._super(...arguments);

    // Position the tip div correctly.
    const uniqueId = this.get('uniqueId');
    if (isNone(uniqueId)) {
      return;
    }

    const trigger = document.querySelector(
      `div.ember-basic-dropdown-trigger[data-ebd-id="${uniqueId}-trigger"]`
    );
    const content = document.querySelector(
      `div#ember-basic-dropdown-content-${uniqueId}`
    );

    if (isNone(trigger) || isNone(content)) {
      return;
    }

    const triggerRect = getRectForNode(trigger);
    const left = `${triggerRect.width / 2 +
      (triggerRect.left - getRectForNode(content).left)}px`;
    const toolTip = document.querySelector('div.Polaris-Popover__Tip');

    if (toolTip) toolTip.style.left = left;
    if (content) content.style.left = left;

    // Set the height explicitly so the popover displays on Safari.
    const pane = document.querySelector('div.Polaris-Popover__Pane') || content;

    if (isNone(pane)) {
      return;
    }

    const paneContent = pane.firstElementChild;
    const paneContentRect = getRectForNode(paneContent);
    const popoverContent = document.querySelector(
      'div.Polaris-Popover__Content'
    );
    const height = `${paneContentRect.height}px`;

    if (popoverContent) popoverContent.style.height = height;
    if (content) content.style.height = height;
  },
});
