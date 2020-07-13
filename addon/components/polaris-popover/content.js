import Component from '@ember/component';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-popover/content';

@tagName('')
@templateLayout(layout)
export default class PolarisPopoverContent extends Component {
  /**
   * Automatically add wrap content in a section
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  sectioned = false;

  /**
   * Allow popover to stretch to the full width of its activator
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  fullWidth = false;

  /**
   * Allow popover to stretch to fit content vertically
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  fullHeight = false;

  /**
   * Content wrapper component.
   *
   * @type {Component}
   * @default null
   * @public
   */
  contentComponent = null;

  /**
   * Simple text for quick popovers.
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @type {String}
   * @default null
   * @public
   */
  text = null;

  /**
   * `ember-basic-dropdown`'s generated ID, used to look up
   *
   * @type {String}
   * @default null
   * @public
   */
  uniqueId = null;
}
