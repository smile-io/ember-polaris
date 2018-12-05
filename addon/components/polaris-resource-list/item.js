import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';
import layout from '../../templates/components/polaris-resource-list/item';
import mapEventToAction from '@smile-io/ember-polaris/utils/map-event-to-action';
import { computedIdVariation } from '@smile-io/ember-polaris/utils/id';

const SELECT_ALL_ITEMS = 'All';

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
   * @default null
   * @public
   */
  onClick: null,

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

  checkboxId: computedIdVariation('id', 'ResourceListItemCheckbox').readOnly(),

  stopPropagation,

  handleAnchorFocus() {
    this.setProperties({
      focused: true,
      focusedInner: false,
    });
  },

  handleFocusedBlur() {
    this.setProperties({
      focused: true,
      focusedInner: true,
    });
  },

  handleFocus() {
    this.set('focused', true);
  },

  handleBlur(event) {
    let isInside = this.compareEventNode(event);
    // TODO: check this works because React implementation
    // casts event.relatedTarget as HTMLElement.
    if (this.element == null || !this.element.contains(event.relatedTarget)) {
      this.set('focused', false);
    } else if (isInside) {
      this.set('focusedInner', true);
    }
  },

  handleMouseDown() {
    this.set('focusedInner', true);
  },

  handleLargerSelectionArea(event) {
    stopPropagation(event);
    this.handleSelection(!this.isSelected());
  },

  handleSelection(value) {
    let { id, context } = this.getProperties('id', 'context');
    let onSelectionChange = context.get('onSelectionChange');
    if (id == null || onSelectionChange == null) {
      return;
    }
    this.setProperties({
      focused: true,
      focusedInner: true,
    });
    onSelectionChange(value, id);
  },

  handleClick(event) {
    let { id, onClick, url, selectMode, element } = this.getProperties(
      'id',
      'onClick',
      'url',
      'selectMode',
      'element'
    );
    let anchor = element && element.querySelector('a');

    if (selectMode) {
      this.handleLargerSelectionArea(event);
      return;
    }

    if (anchor === event.target) {
      return;
    }

    if (onClick) {
      onClick(id);
    }

    if (url && anchor) {
      anchor.click();
    }
  },

  handleKeypress(event) {
    let { onClick, selectMode } = this.getProperties('onClick', 'selectMode');
    let { key } = event;

    if (onClick && key === 'Enter' && !selectMode) {
      onClick();
    }
  },

  isSelected() {
    let { id, context } = this.getProperties('id', 'context');
    let selectedItems = context.get('selectedItems');
    return (
      selectedItems &&
      ((Array.isArray(selectedItems) && selectedItems.includes(id)) ||
        selectedItems === SELECT_ALL_ITEMS)
    );
  },

  compareEventNode(event) {
    return this.get('onClick')
      ? event.target === this.element
      : event.target.tagName.toLowerCase() === 'a';
  },
});

function stopPropagation(event) {
  event.stopPropagation();
}
