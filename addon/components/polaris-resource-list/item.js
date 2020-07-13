import Component from '@ember/component';
import { readOnly } from '@ember/object/computed';
import { action, get, computed } from '@ember/object';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-resource-list/item';
import { context } from '@smile-io/ember-polaris/components/polaris-resource-list';
import { computedIdVariation } from '@smile-io/ember-polaris/utils/id';
import { SELECT_ALL_ITEMS } from '../polaris-resource-list';
import deprecateClassArgument from '../../utils/deprecate-class-argument';

@deprecateClassArgument
@tagName('')
@templateLayout(layout)
export default class PolarisResourceListItem extends Component.extend(
  context.ConsumerMixin
) {
  /**
   * Unique identifier for the item
   *
   * @type {String}
   * @default null
   * @public
   */
  itemId = null;

  /**
   * Visually hidden text for screen readers
   *
   * @type {String}
   * @default null
   * @public
   */
  accessibilityLabel = null;

  /**
   * Id of the element the item onClick controls
   *
   * @type {String}
   * @default null
   * @public
   */
  ariaControls = null;

  /**
   * Tells screen reader the controlled element is expanded
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  ariaExpanded = false;

  /**
   * @type {String|Component|Object}
   * @default null
   * @public
   */
  media = null;

  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  persistActions = false;

  /**
   * @type {Object[]}
   * @default null
   * @public
   */
  shortcutActions = null;

  /**
   * @type {String|Component|Object}
   * @default null
   * @public
   */
  children = null;

  /**
   * @type {String}
   * @default null
   * @public
   */
  url = null;

  /**
   * @type {Function}
   * @default null
   * @public
   */
  onClick = null;

  /**
   * @type {Boolean}
   * @default false
   */
  focused = false;

  /**
   * @type {Boolean}
   * @default false
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

  @computed(
    'focused',
    'selectable',
    'selected',
    'selectMode',
    'persistActions',
    'focusedInner',
    'class'
  )
  get cssClasses() {
    let cssClasses = ['Polaris-ResourceList-Item'];
    if (this.focused) {
      cssClasses.push('Polaris-ResourceList-Item--focused');
    }
    if (this.selectable) {
      cssClasses.push('Polaris-ResourceList-Item--selectable');
    }
    if (this.selected) {
      cssClasses.push('Polaris-ResourceList-Item--selected');
    }
    if (this.selectMode) {
      cssClasses.push('Polaris-ResourceList-Item--selectMode');
    }
    if (this.persistActions) {
      cssClasses.push('Polaris-ResourceList-Item--persistActions');
    }
    if (this.focusedInner) {
      cssClasses.push('Polaris-ResourceList-Item--focusedInner');
    }
    if (this.class) {
      cssClasses.push(this.class);
    }

    return cssClasses.join(' ');
  }

  @action
  handleAnchorFocus() {
    this.setProperties({
      focused: true,
      focusedInner: false,
    });
  }

  @action
  handleFocusedBlur() {
    this.setProperties({
      focused: true,
      focusedInner: true,
    });
  }

  @action
  handleFocus() {
    this.set('focused', true);
  }

  @action
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

  @action
  handleMouseDown() {
    this.set('focusedInner', true);
  }

  @action
  handleLargerSelectionArea(event) {
    stopPropagation(event);
    this.handleSelection(!this.isSelected);
  }

  @action
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

  @action
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
