import { attribute, className, classNames, layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember/object";
import { readOnly } from "@ember/object/computed";
import Component from '@ember/component';
import { get } from '@ember/object';
import layout from '../../templates/components/polaris-resource-list/item';
import { context } from '@smile-io/ember-polaris/components/polaris-resource-list';
import { computedIdVariation } from '@smile-io/ember-polaris/utils/id';
import { SELECT_ALL_ITEMS } from '../polaris-resource-list';

@classNames('Polaris-ResourceList-Item')
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
  @className("Polaris-ResourceList-Item--persistActions")
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
  @attribute("data-href")
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
  @className("Polaris-ResourceList-Item--focused")
  focused = false;

  /**
   * @property focusedInner
   * @type {Boolean}
   * @default false
   * @private
   */
  @className("Polaris-ResourceList-Item--focusedInner")
  focusedInner = false;

  'data-test-id' = 'item-wrapper';
  stopPropagation = stopPropagation;

  @readOnly('context.selectable')
  @className("Polaris-ResourceList-Item--selectable")
  selectable;

  @readOnly('context.selectMode')
  @className("Polaris-ResourceList-Item--selectMode")
  selectMode;

  @readOnly('context.loading')
  loading;

  @computedIdVariation('itemId', 'ResourceListItemCheckbox').readOnly()
  checkboxId;

  @(computed('itemId', 'context.selectedItems').readOnly())
  get isSelected() {
    let { itemId, context } = this.getProperties('itemId', 'context');
    let selectedItems = get(context, 'selectedItems');
    return (
      selectedItems &&
      ((Array.isArray(selectedItems) && selectedItems.includes(itemId)) ||
        selectedItems === SELECT_ALL_ITEMS)
    );
  }

  click() {
    this.handleClick(...arguments);
  }

  focusIn() {
    this.handleFocus(...arguments);
  }

  focusOut() {
    this.handleBlur(...arguments);
  }

  mouseDown() {
    this.handleMouseDown(...arguments);
  }

  keyUp() {
    this.handleKeypress(...arguments);
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
    if (this.element == null || !this.element.contains(event.relatedTarget)) {
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
    this.handleSelection(!this.get('isSelected'));
  }

  handleSelection(value) {
    let { itemId, context } = this.getProperties('itemId', 'context');
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
    let { itemId, onClick, url, selectMode, element } = this.getProperties(
      'itemId',
      'onClick',
      'url',
      'selectMode',
      'element'
    );
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
    let { onClick, selectMode } = this.getProperties('onClick', 'selectMode');
    let { key } = event;

    if (onClick && key === 'Enter' && !selectMode) {
      onClick();
    }
  }

  compareEventNode(event) {
    return this.get('onClick')
      ? event.target === this.element
      : event.target.tagName.toLowerCase() === 'a';
  }
}

function stopPropagation(event) {
  event.stopPropagation();
}
