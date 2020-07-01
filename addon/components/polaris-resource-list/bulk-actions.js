import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { warn } from '@ember/debug';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import ContextBoundEventListenersMixin from 'ember-lifeline/mixins/dom';
import ContextBoundTasksMixin from 'ember-lifeline/mixins/run';
import layout from '../../templates/components/polaris-resource-list/bulk-actions';
import TaglessCssDeprecation from '../../mixins/tagless-css-deprecation';

const MAX_PROMOTED_ACTIONS = 2;

@tagName('')
@templateLayout(layout)
export default class BulkActions extends Component.extend(
  ContextBoundEventListenersMixin,
  ContextBoundTasksMixin,
  TaglessCssDeprecation
) {
  /**
   * Visually hidden text for screen readers
   *
   * @type {String}
   * @default null
   * @public
   */
  accessibilityLabel = null;

  /**
   * Label for the bulk actions
   *
   * @type {String}
   * @default ''
   * @public
   */
  label = '';

  /**
   * State of the bulk actions checkbox
   *
   * @type {Boolean|String}
   * @default null
   * @public
   */
  selected = null;

  /**
   * List is in a selectable state
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  selectMode = false;

  /**
   * Actions that will be given more prominence
   *
   * @type {Object[]}
   * @default null
   * @public
   */
  promotedActions = null;

  /**
   * List of actions
   *
   * @type {Object[]}
   * @default null
   * @public
   */
  actionsCollection = null;

  /**
   * Text to select all across pages
   *
   * @type {String}
   * @default null
   * @public
   */
  paginatedSelectAllText = null;

  /**
   * Action for selecting all across pages
   *
   * @type {Function}
   * @default null
   * @public
   */
  paginatedSelectAllAction = null;

  /**
   * Disables bulk actions
   *
   * @type {Boolean}
   * @default null
   * @public
   */
  disabled = null;

  /**
   * Callback when selectable state of list is changed
   *
   * @type {Function}
   * @default noop
   * @public
   */
  onSelectModeToggle(/* selectMode **/) {}

  /**
   * Callback when the select all checkbox is clicked
   *
   * @type {Function}
   * @default noop
   * @public
   */
  onToggleAll() {}

  containerWidth = 0;
  measuring = true;
  bulkActionsWidth = 0;
  addedMoreActionsWidthForMeasuring = 0;
  promotedActionsWidths = [];

  @computed('promotedActions', 'numberOfPromotedActionsToRender')
  get promotedActionsToRender() {
    let { promotedActions, numberOfPromotedActionsToRender } = this;

    if (promotedActions && numberOfPromotedActionsToRender > 0) {
      return promotedActions.slice(0, numberOfPromotedActionsToRender);
    }

    return [];
  }

  @computed(
    'promotedActions.length',
    'containerWidth',
    'bulkActionsWidth',
    'measuring',
    'addedMoreActionsWidthForMeasuring',
    'promotedActionsWidths'
  )
  get numberOfPromotedActionsToRender() {
    let {
      promotedActions,
      containerWidth,
      bulkActionsWidth,
      measuring,
      addedMoreActionsWidthForMeasuring,
      promotedActionsWidths,
    } = this;

    if (!promotedActions) {
      return 0;
    }

    let promotedActionsLength = promotedActions.length;

    if (containerWidth >= bulkActionsWidth || measuring) {
      return promotedActionsLength;
    }

    let sufficientSpace = false;
    let counter = promotedActionsLength - 1;
    let totalWidth = 0;

    while (!sufficientSpace && counter >= 0) {
      totalWidth += promotedActionsWidths[counter];
      let widthWithRemovedAction =
        bulkActionsWidth - totalWidth + addedMoreActionsWidthForMeasuring;
      if (containerWidth >= widthWithRemovedAction) {
        sufficientSpace = true;
      } else {
        counter--;
      }
    }

    return counter;
  }

  @computed('promotedActions', 'actionsCollection')
  get hasActions() {
    let { promotedActions, actionsCollection } = this;

    return Boolean(
      (promotedActions && promotedActions.length > 0) ||
        (actionsCollection && actionsCollection.length > 0)
    );
  }

  @computed('promotedActions.length', 'numberOfPromotedActionsToRender')
  get rolledInPromotedActions() {
    let { promotedActions, numberOfPromotedActionsToRender } = this;

    if (
      promotedActions &&
      numberOfPromotedActionsToRender < promotedActions.length
    ) {
      return [...promotedActions].slice(numberOfPromotedActionsToRender);
    }

    return [];
  }

  @computed('promotedActions', 'numberOfPromotedActionsToRender', 'measuring')
  get activatorLabel() {
    let { promotedActions, numberOfPromotedActionsToRender, measuring } = this;

    if (
      !promotedActions ||
      (promotedActions && numberOfPromotedActionsToRender === 0 && !measuring)
    ) {
      return 'Actions';
    }

    return 'More actions';
  }

  @computed('actionSections', 'rolledInPromotedActions.length', 'measuring')
  get shouldRenderActionsPopover() {
    let { actionSections, rolledInPromotedActions, measuring } = this;

    return Boolean(
      actionSections || rolledInPromotedActions.length > 0 || measuring
    );
  }

  @computed('actionsCollection.[]')
  get actionSections() {
    let { actionsCollection } = this;

    if (!actionsCollection || actionsCollection.length === 0) {
      return null;
    }

    if (this.instanceOfBulkActionListSectionArray(actionsCollection)) {
      return actionsCollection;
    }

    if (this.instanceOfBulkActionArray(actionsCollection)) {
      return [{ items: actionsCollection }];
    }

    return null;
  }

  @computed('actionSections.[]', 'rolledInPromotedActions')
  get combinedActions() {
    let combinedActions = [];
    let { actionSections, rolledInPromotedActions } = this;

    let rolledInPromotedActionsHasLength = rolledInPromotedActions.length > 0;

    if (actionSections && rolledInPromotedActionsHasLength) {
      combinedActions = [{ items: rolledInPromotedActions }, ...actionSections];
    } else if (actionSections) {
      combinedActions = actionSections;
    } else if (rolledInPromotedActionsHasLength) {
      combinedActions = [{ items: rolledInPromotedActions }];
    }

    return combinedActions;
  }

  @computed('selectMode', 'class')
  get cssClasses() {
    let cssClasses = [
      'Polaris-ResourceList-BulkActions__Group',
      'Polaris-ResourceList-BulkActions__Group--smallScreen',
    ];
    if (this.selectMode) {
      cssClasses.push('Polaris-ResourceList-BulkActions__Group--entered');
    } else {
      cssClasses.push('Polaris-ResourceList-BulkActions__Group--exited');
    }
    if (this.class) {
      cssClasses.push(this.class);
    }

    return cssClasses.join(' ');
  }

  get moreActionsNode() {
    return this.bulkActionsElement.querySelector(
      '.Polaris-ResourceList-BulkActions__Popover'
    );
  }

  get largeScreenButtonsNode() {
    return this.bulkActionsElement.querySelector(
      '.Polaris-ResourceList-BulkActions__Group--largeScreen'
    );
  }

  instanceOfBulkActionListSectionArray(actionsCollection) {
    let validList = actionsCollection.filter((action) => {
      return action.items;
    });

    return actionsCollection.length === validList.length;
  }

  instanceOfBulkActionArray(actionsCollection) {
    let validList = actionsCollection.filter((action) => {
      return !action.items;
    });

    return actionsCollection.length === validList.length;
  }

  setContainerWidth() {
    let containerWidth = this.bulkActionsElement.getBoundingClientRect().width;

    if (containerWidth > 0) {
      this.set('containerWidth', containerWidth);
    }
  }

  handleResize() {
    this.throttleTask('setContainerWidth', 50);
  }

  addResizeEventListener() {
    let { largeScreenGroupNode } = this;

    if (largeScreenGroupNode) {
      this.addEventListener(largeScreenGroupNode, 'resize', this.handleResize);
    }
  }

  @action
  insertBulkActions(element) {
    this.set('bulkActionsElement', element);

    let {
      actionsCollection,
      promotedActions,
      moreActionsNode,
      addedMoreActionsWidthForMeasuring,
      largeScreenButtonsNode,
    } = this;

    if (promotedActions && promotedActions.length > MAX_PROMOTED_ACTIONS) {
      warn(
        `To provide a better user experience. There should only be a maximum of ${MAX_PROMOTED_ACTIONS} promoted actions.`,
        {
          id:
            'ember-polaris.polaris-resource-list.bulk-actions.max-promoted-actions',
        }
      );
    }

    this.addResizeEventListener();

    if (promotedActions && !actionsCollection && moreActionsNode) {
      addedMoreActionsWidthForMeasuring = moreActionsNode.getBoundingClientRect()
        .width;
    }

    let bulkActionsWidth = largeScreenButtonsNode
      ? largeScreenButtonsNode.getBoundingClientRect().width -
        addedMoreActionsWidthForMeasuring
      : 0;

    this.set('bulkActionsWidth', bulkActionsWidth);

    this.setProperties({
      containerWidth: element.getBoundingClientRect().width,
      measuring: false,
    });
  }

  @action
  setSelectMode(val) {
    this.onSelectModeToggle(val);
  }

  @action
  handleMeasurement(width) {
    if (this.measuring) {
      this.promotedActionsWidths.pushObject(width);
    }
  }
}
