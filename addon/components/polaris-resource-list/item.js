import Component from '@ember/component';
import { readOnly } from '@ember/object/computed';
import { action, get, computed } from '@ember/object';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-resource-list/item';
import { context } from '@smile-io/ember-polaris/components/polaris-resource-list';
import { computedIdVariation } from '@smile-io/ember-polaris/utils/id';
import { SELECT_ALL_ITEMS } from '../polaris-resource-list';

@tagName('')
@templateLayout(layout)
export default class Item extends Component.extend(context.ConsumerMixin) {
  /**
   * Unique identifier for the item
   *
   * @property itemId
   * @type {String}
   * @default null
   * @public
   */
  itemId = null;

  /**
   * Visually hidden text for screen readers
   *
   * @property accessibilityLabel
   * @type {String}
   * @default null
   * @public
   */
  accessibilityLabel = null;

  /**
   * Id of the element the item onClick controls
   *
   * @property ariaControls
   * @type {String}
   * @default null
   * @public
   */
  ariaControls = null;

  /**
   * Tells screen reader the controlled element is expanded
   *
   * @property ariaExpanded
   * @type {Boolean}
   * @default false
   * @public
   */
  ariaExpanded = false;

  /**
   * @property media
   * @type {String|Component|Object}
   * @default null
   * @public
   */
  media = null;

  /**
   * @property persistActions
   * @type {Boolean}
   * @default false
   * @public
   */
  persistActions = false;

  /**
   * @property shortcutActions
   * @type {Object[]}
   * @default null
   * @public
   */
  shortcutActions = null;

  /**
   * @property children
   * @type {String|Component|Object}
   * @default null
   * @public
   */
  children = null;

  /**
   * @property url
   * @type {String}
   * @default null
   * @public
   */
  url = null;

  /**
   * @property onClick
   * @type {Function}
   * @default null
   * @public
   */
  onClick = null;

  /**
   * @property focused
   * @type {Boolean}
   * @default false
   * @private
   */
  focused = false;

  /**
   * @property focusedInner
   * @type {Boolean}
   * @default false
   * @private
   */
  focusedInner = false;

  stopPropagation = stopPropagation;

  @readOnly('context.selectable')
  selectable;

  @readOnly('context.selectMode')
  selectMode;

  @readOnly('context.loading')
  loading;

  @(computedIdVariation('itemId', 'ResourceListItemCheckbox').readOnly())
  checkboxId;

  @(computed('itemId', 'context.selectedItems').readOnly())
  get isSelected() {
    let { itemId, context } = this;
    let selectedItems = get(context, 'selectedItems');
    return (
      selectedItems &&
      ((Array.isArray(selectedItems) && selectedItems.includes(itemId)) ||
        selectedItems === SELECT_ALL_ITEMS)
    );
  }

  handleAnchorFocus() {
    this.setProperties({
      focused: true,
      focusedInner: false,
    });
  }

  handleFocusedBlur() {
    this.setProperties({
      focused: true,
      focusedInner: true,
    });
  }

  handleFocus() {
    this.set('focused', true);
  }

  handleBlur(event) {
    let isInside = this.compareEventNode(event);
    // TODO: check this works because React implementation
    // casts event.relatedTarget as HTMLElement.
    if (
      this.resourceListElement == null ||
      !this.resourceListElement.contains(event.relatedTarget)
    ) {
      this.set('focused', false);
    } else if (isInside) {
      this.set('focusedInner', true);
    }
  }

  handleMouseDown() {
    this.set('focusedInner', true);
  }

  handleLargerSelectionArea(event) {
    stopPropagation(event);
    this.handleSelection(!this.isSelected);
  }

  handleSelection(value) {
    let { itemId, context } = this;
    let onSelectionChange = get(context, 'onSelectionChange');
    if (itemId == null || onSelectionChange == null) {
      return;
    }
    this.setProperties({
      focused: true,
      focusedInner: true,
    });
    onSelectionChange(value, itemId);
  }

  handleClick(event) {
    let { itemId, onClick, url, selectMode, element } = this;
    let { ctrlKey, metaKey } = event;
    let anchor = element && element.querySelector('a');

    if (selectMode) {
      this.handleLargerSelectionArea(event);
      return;
    }

    if (anchor === event.target) {
      return;
    }

    if (onClick) {
      onClick(itemId);
    }

    if (url && (ctrlKey || metaKey)) {
      window.open(url, '_blank');
      return;
    }

    if (url && anchor) {
      anchor.click();
    }
  }

  handleKeypress(event) {
    let { onClick, selectMode } = this;
    let { key } = event;

    if (onClick && key === 'Enter' && !selectMode) {
      onClick();
    }
  }

  compareEventNode(event) {
    return this.onClick
      ? event.target === this.resourceListElement
      : event.target.tagName.toLowerCase() === 'a';
  }

  @action
  insertResourceListItem(element) {
    this.set('resourceListElement', element);
  }
}

function stopPropagation(event) {
  event.stopPropagation();
}
