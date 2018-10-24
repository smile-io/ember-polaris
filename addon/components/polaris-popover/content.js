import Ember$ from 'jquery';
import Component from '@ember/component';
import { isNone } from '@ember/utils';
import layout from '../../templates/components/polaris-popover/content';
import { getRectForNode } from '@smile-io/ember-polaris/utils/geometry';

export default Component.extend({
  tagName: '',

  layout,

  /**
   * Automatically add wrap content in a section
   *
   * @property sectioned
   * @type {boolean}
   * @default false
   * @public
   */
  sectioned: false,

  /**
   * Content wrapper component.
   *
   * @property contentComponent
   * @type {component}
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
   * @type {string}
   * @default null
   * @public
   */
  text: null,

  /**
   * `ember-basic-dropdown`'s generated ID, used to look up
   *
   * @property uniqueId
   * @type {string}
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

    const trigger = Ember$(
      `div.ember-basic-dropdown-trigger[data-ebd-id="${uniqueId}-trigger"]`
    )[0];
    const content = Ember$(`div#ember-basic-dropdown-content-${uniqueId}`)[0];

    if (isNone(trigger) || isNone(content)) {
      return;
    }

    const triggerRect = getRectForNode(trigger);
    const left =
      triggerRect.width / 2 + (triggerRect.left - getRectForNode(content).left);
    Ember$('div.Polaris-Popover__Tip', content).css({ left });

    // Set the height explicitly so the popover displays on Safari.
    const pane = Ember$('div.Polaris-Popover__Pane', content)[0];
    if (isNone(pane)) {
      return;
    }
    const paneContent = pane.firstElementChild;
    const paneContentRect = getRectForNode(paneContent);
    Ember$('div.Polaris-Popover__Content', content).css({
      height: paneContentRect.height,
    });
  },
});
