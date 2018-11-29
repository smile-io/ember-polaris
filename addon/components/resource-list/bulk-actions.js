import Component from '@ember/component';
import { computed } from '@ember/object';
import { throttle } from '@ember/runloop';
import ContextBoundEventListenersMixin from 'ember-lifeline/mixins/dom';
import layout from '../../templates/components/resource-list/bulk-actions';

const MAX_PROMOTED_ACTIONS = 2;

export default Component.extend(ContextBoundEventListenersMixin, {
  layout,

  /**
   * Visually hidden text for screen readers
   *
   * @type {String}
   * @default null
   * @property accessibilityLabel
   */
  accessibilityLabel: null,

  /**
   * Label for the bulk actions
   *
   * @type {String}
   * @default ''
   * @property label
   */
  label: '',

  /**
   * State of the bulk actions checkbox
   *
   * @type {Boolean|String}
   * @default null
   * @property selected
   */
  selected: null,

  /**
   * List is in a selectable state
   *
   * @type {Boolean}
   * @default false
   * @property selectMode
   */
  selectMode: false,

  /**
   * Actions that will be given more prominence
   *
   * @type {Function[]}
   * @default null
   * @property promotedActions
   */
  promotedActions: null,

  /**
   * List of actions
   *
   * TODO: rename this to something else so it doesn't clash with ember actions attr
   *
   * @type {Function[]}
   * @default null
   * @property actions
   */
  actions: null,

  /**
   * Text to select all across pages
   *
   * @type {String}
   * @default null
   * @property paginatedSelectAllText
   */
  paginatedSelectAllText: null,

  /**
   * Action for selecting all across pages
   *
   * @type {Function}
   * @default null
   * @property paginatedSelectAllAction
   */
  paginatedSelectAllAction: null,

  /**
   * Disables bulk actions
   *
   * @type {Boolean}
   * @default null
   * @property disabled
   */
  disabled: null,

  /**
   * Callback when the select all checkbox is clicked
   *
   * @type {Function}
   * @default noop
   * @property onToggleAll
   */
  onToggleAll() {},

  /**
   * Callback when selectable state of list is changed
   *
   * @type {Function}
   * @default noop
   * @property onSelectModeToggle
   */
  onSelectModeToggle(/* selectMode **/) {},

  /**
   * @private
   */
  smallScreenPopoverVisible: false,

  /**
   * @private
   */
  largeScreenPopoverVisible: false,

  /**
   * @private
   */
  containerWidth: 0,

  /**
   * @private
   */
  measuring: true,

  /**
   * @private
   * {HTMLElement}
   */
  containerNode: null,

  /**
   * @private
   * {HTMLElement}
   */
  largeScreenButtonsNode: null,

  /**
   * @private
   * {HTMLElement}
   */
  moreActionsNode: null,

  /**
   * @private
   * {Number[]}
   */
  promotedActionsWidths: computed(function() {
    return [];
  }),

  /**
   * @private
   */
  bulkActionsWidth: 0,

  /**
   * @private
   */
  addedMoreActionsWidthForMeasuring: 0,

  promotedActionsToRender: computed(
    'promotedActions',
    'numberOfPromotedActionsToRender',
    function() {
      let {
        promotedActions,
        numberOfPromotedActionsToRender,
      } = this.getProperties(
        'promotedActions',
        'numberOfPromotedActionsToRender'
      );

      if (promotedActions && numberOfPromotedActionsToRender > 0) {
        return promotedActions.slice(0, numberOfPromotedActionsToRender);
      }

      return [];
    }
  ),

  numberOfPromotedActionsToRender: computed(
    'promotedActions.length',
    'containerWidth',
    'bulkActionsWidth',
    'measuring',
    'addedMoreActionsWidthForMeasuring',
    'promotedActionsWidths',
    function() {
      let {
        promotedActions,
        containerWidth,
        bulkActionsWidth,
        measuring,
        addedMoreActionsWidthForMeasuring,
        promotedActionsWidths,
      } = this.getProperties(
        'promotedActions',
        'containerWidth',
        'bulkActionsWidth',
        'measuring',
        'addedMoreActionsWidthForMeasuring',
        'promotedActionsWidths'
      );

      if (!promotedActions) {
        return 0;
      }

      let promotedActionsLength = promotedActions.get('length');

      if (containerWidth >= bulkActionsWidth || measuring) {
        return promotedActionsLength;
      }

      let sufficientSpace = false;
      let counter = promotedActionsLength - 1;
      let totalWidth = 0;

      while (!sufficientSpace && counter >= 0) {
        totalWidth += promotedActionsWidths[counter];
        const widthWithRemovedAction =
          bulkActionsWidth - totalWidth + addedMoreActionsWidthForMeasuring;
        if (containerWidth >= widthWithRemovedAction) {
          sufficientSpace = true;
        } else {
          counter--;
        }
      }

      return counter;
    }
  ),

  hasActions: computed('promotedActions', 'actions', function() {
    let { promotedActions, actions } = this.getProperties(
      'promotedActions',
      'actions'
    );

    return Boolean(
      (promotedActions && promotedActions.length > 0) ||
        (actions && actions.length > 0)
    );
  }),

  rolledInPromotedActions: computed(
    'promotedActions.length',
    'numberOfPromotedActionsToRender',
    function() {
      let {
        promotedActions,
        numberOfPromotedActionsToRender,
      } = this.getProperties(
        'promotedActions',
        'numberOfPromotedActionsToRender'
      );

      if (
        promotedActions &&
        numberOfPromotedActionsToRender < promotedActions.get('length')
      ) {
        return [...promotedActions].slice(numberOfPromotedActionsToRender);
      }

      return [];
    }
  ),

  activatorLabel: computed(
    'promotedActions',
    'numberOfPromotedActionsToRender',
    'measuring',
    function() {
      let {
        promotedActions,
        numberOfPromotedActionsToRender,
        measuring,
      } = this.getProperties(
        'promotedActions',
        'numberOfPromotedActionsToRender',
        'measuring'
      );

      if (
        !promotedActions ||
        (promotedActions && numberOfPromotedActionsToRender === 0 && !measuring)
      ) {
        return 'Actions';
      }

      return 'More actions';
    }
  ),

  shouldRenderActionsPopover: computed(
    'actionSections',
    'rolledInPromotedActions.length',
    'measuring',
    function() {
      let {
        actionSections,
        rolledInPromotedActions,
        measuring,
      } = this.getProperties(
        'actionSections',
        'rolledInPromotedActions',
        'measuring'
      );

      return Boolean(
        actionSections || rolledInPromotedActions.get('length') > 0 || measuring
      );
    }
  ),

  actionSections: computed('actions', function() {
    let actions = this.get('actions');

    if (!actions || actions.length === 0) {
      return null;
    }

    if (instanceOfBulkActionListSectionArray(actions)) {
      return actions;
    }

    if (instanceOfBulkActionArray(actions)) {
      return [
        {
          items: actions,
        },
      ];
    }
  }),

  combinedActions: computed(
    'actionSections',
    'rolledInPromotedActions',
    function() {
      let combinedActions = [];
      let { actionSections, rolledInPromotedActions } = this.getProperties(
        'actionSections',
        'rolledInPromotedActions'
      );

      let rolledInPromotedActionsHasLength =
        rolledInPromotedActions.get('length') > 0;

      if (actionSections && rolledInPromotedActionsHasLength) {
        combinedActions = [
          { items: rolledInPromotedActions },
          ...actionSections,
        ];
      } else if (actionSections) {
        combinedActions = actionSections;
      } else if (rolledInPromotedActionsHasLength) {
        combinedActions = [{ items: rolledInPromotedActions }];
      }

      return combinedActions;
    }
  ),

  instanceOfBulkActionListSectionArray(actions) {
    const validList = actions.filter((action) => {
      return action.items;
    });

    return actions.length === validList.length;
  },

  instanceOfBulkActionArray(actions) {
    const validList = actions.filter((action) => {
      return !action.items;
    });

    return actions.length === validList.length;
  },

  setContainerNode() {
    this.set('containerNode', this.element);
  },

  setMoreActionsNode(node) {
    this.set('moreActionsNode', node);
  },

  setLargeScreenButtonsNode(node) {
    this.set('largeScreenButtonsNode', node);
  },

  handleResize() {
    throttle(
      this,
      function() {
        let {
          smallScreenPopoverVisible,
          largeScreenPopoverVisible,
          containerNode,
        } = this.getProperties(
          'smallScreenPopoverVisible',
          'largeScreenPopoverVisible',
          'containerNode'
        );

        if (containerNode) {
          const containerWidth = containerNode.getBoundingClientRect().width;
          if (containerWidth > 0) {
            this.set('containerWidth', containerWidth);
          }
        }

        if (smallScreenPopoverVisible || largeScreenPopoverVisible) {
          this.setProperties({
            smallScreenPopoverVisible: false,
            largeScreenPopoverVisible: false,
          });
        }
      },
      50
    );
  },

  didReceiveAttrs() {
    this._super();

    let {
      actions,
      promotedActions,
      moreActionsNode,
      addedMoreActionsWidthForMeasuring,
      bulkActionsWidth,
      largeScreenButtonsNode,
      containerNode,
    } = this.getProperties(
      'actions',
      'promotedActions',
      'moreActionsNode',
      'addedMoreActionsWidthForMeasuring',
      'bulkActionsWidth',
      'largeScreenButtonsNode',
      'containerNode'
    );

    if (promotedActions && !actions && moreActionsNode) {
      addedMoreActionsWidthForMeasuring = moreActionsNode.getBoundingClientRect()
        .width;
    }

    bulkActionsWidth = largeScreenButtonsNode
      ? largeScreenButtonsNode.getBoundingClientRect().width -
        addedMoreActionsWidthForMeasuring
      : 0;

    if (containerNode) {
      this.setProperties({
        containerWidth: containerNode.getBoundingClientRect().width,
        measuring: false,
      });
    }
  },

  didInsertElement() {
    this._super(...arguments);

    let promotedActions = this.get('promotedActions');

    if (promotedActions && promotedActions.length > MAX_PROMOTED_ACTIONS) {
      console.warn(
        `To provide a better user experience. There should only be a maximum of ${MAX_PROMOTED_ACTIONS} promoted actions.`
      );
    }

    this.setContainerNode();

    let largeScreenGroupNode = this.element.querySelector(
      '.Polaris-ResourceList-BulkActions__Group--largeScreen'
    );

    if (largeScreenGroupNode) {
      this.addEventListener(largeScreenGroupNode, 'resize', this.handleResize);
    }
  },

  didRender() {
    this._super(...arguments);

    let moreActionsNode = this.element.querySelector(
      '.Polaris-ResourceList-BulkActions__Popover'
    );

    let largeScreenButtonsNode = this.element.querySelector(
      '.Polaris-ResourceList-BulkActions__Group--largeScreen'
    );

    if (moreActionsNode) {
      this.setMoreActionsNode(moreActionsNode);
    }

    if (largeScreenButtonsNode) {
      this.setLargeScreenButtonsNode(largeScreenButtonsNode);
    }
  },

  actions: {
    toggleSmallScreenPopover() {
      this.set(
        'smallScreenPopoverVisible',
        !this.get('smallScreenPopoverVisible')
      );
    },

    toggleLargeScreenPopover() {
      this.set(
        'largeScreenPopoverVisible',
        !this.get('largeScreenPopoverVisible')
      );
    },

    setSelectMode(val) {
      let onSelectModeToggle = this.get('onSelectModeToggle');

      if (onSelectModeToggle) {
        onSelectModeToggle(val);
      }
    },

    handleMeasurement(width) {
      let measuring = this.get('measuring');

      if (measuring) {
        this.get('promotedActionsWidths').pushObject(width);
      }
    },
  },
});
