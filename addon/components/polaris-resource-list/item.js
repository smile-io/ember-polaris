import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';
import layout from '../../templates/components/polaris-resource-list/item';
import mapEventToAction from '@smile-io/ember-polaris/utils/map-event-to-action';

export default Component.extend({
  layout,

  classNames: ['Polaris-ResourceList-Item'],
  classNameBindings: [
    'focused:Polaris-ResourceList-Item--focused',
    'selectable:Polaris-ResourceList-Item--selectable',
    'selected:Polaris-ResourceList-Item--selected',
    'selectMode:Polaris-ResourceList-Item--selectMode',
    'persistActions:Polaris-ResourceList-Item--persistActions',
    'focusedInner:Polaris-ResourceList-Item--focusedInner',
  ],

  context: service('polaris-resource-list/context'),

  'data-test-id': 'item-wrapper',

  /**
   * Visually hidden text for screen readers
   *
   * @property accessibilityLabel
   * @type {String}
   * @default null
   * @public
   */
  accessibilityLabel: null,

  /**
   * Id of the element the item onClick controls
   *
   * @property ariaControls
   * @type {String}
   * @default null
   * @public
   */
  ariaControls: null,

  /**
   * Tells screen reader the controlled element is expanded
   *
   * @property ariaExpanded
   * @type {Boolean}
   * @default false
   * @public
   */
  ariaExpanded: false,

  /**
   * Unique identifier for the item
   *
   * @property id
   * @type {String}
   * @default null
   * @public
   */
  id: null,

  /**
   * @property media
   * @type {String|Component|Object}
   * @default null
   * @public
   */
  media: null,

  /**
   * @property persistActions
   * @type {Boolean}
   * @default false
   * @public
   */
  persistActions: false,

  /**
   * @property shortcutActions
   * @type {Object[]}
   * @default null
   * @public
   */
  shortcutActions: null,

  /**
   * @property children
   * @type {String|Component|Object}
   * @default null
   * @public
   */
  children: null,

  /**
   * @property url
   * @type {String}
   * @default null
   * @public
   */
  url: null,

  /**
   * @property onClick
   * @type {Function}
   * @default no-op
   * @public
   */
  onClick() {},

  /**
   * @property actionsMenuVisible
   * @type {Boolean}
   * @default false
   * @private
   */
  actionsMenuVisible: false,

  /**
   * @property focused
   * @type {Boolean}
   * @default false
   * @private
   */
  focused: false,

  /**
   * @property focusedInner
   * @type {Boolean}
   * @default false
   * @private
   */
  focusedInner: false,

  click: mapEventToAction('handleClick'),
  focusIn: mapEventToAction('handleFocus'),
  focusOut: mapEventToAction('handleBlur'),
  mouseDown: mapEventToAction('handleMouseDown'),
  keyUp: mapEventToAction('handleKeypress'),

  selectable: readOnly('context.selectable'),
  selectMode: readOnly('context.selectMode'),
  loading: readOnly('context.loading'),

  stopPropagation,
});

function stopPropagation(event) {
  event.stopPropagation();
}
