import Component from '@ember/component';
import { computed } from '@ember/object';
import { warn } from '@ember/debug';
import ContextBoundEventListenersMixin from 'ember-lifeline/mixins/dom';
import ContextBoundTasksMixin from 'ember-lifeline/mixins/run';
import layout from '../../templates/components/polaris-resource-list/bulk-actions';

const MAX_PROMOTED_ACTIONS = 2;

export default Component.extend(
  ContextBoundEventListenersMixin,
  ContextBoundTasksMixin,
  {
    layout,

    /**
     * Visually hidden text for screen readers
     *
     * @type {String}
     * @default null
     * @property accessibilityLabel
     * @public
     */
    accessibilityLabel: null,

    /**
     * Label for the bulk actions
     *
     * @type {String}
     * @default ''
     * @property label
     * @public
     */
    label: '',

    /**
     * State of the bulk actions checkbox
     *
     * @type {Boolean|String}
     * @default null
     * @property selected
     * @public
     */
    selected: null,

    /**
     * List is in a selectable state
     *
     * @type {Boolean}
     * @default false
     * @property selectMode
     * @public
     */
    selectMode: false,

    /**
     * Actions that will be given more prominence
     *
     * @type {Object[]}
     * @default null
     * @property promotedActions
     * @public
     */
    promotedActions: null,

    /**
     * List of actions
     *
     * @type {Object[]}
     * @default null
     * @property actionsCollection
     * @public
     */
    actionsCollection: null,

    /**
     * Text to select all across pages
     *
     * @type {String}
     * @default null
     * @property paginatedSelectAllText
     * @public
     */
    paginatedSelectAllText: null,

    /**
     * Action for selecting all across pages
     *
     * @type {Function}
     * @default null
     * @property paginatedSelectAllAction
     * @public
     */
    paginatedSelectAllAction: null,

    /**
     * Disables bulk actions
     *
     * @type {Boolean}
     * @default null
     * @property disabled
     * @public
     */
    disabled: null,

    /**
     * Callback when selectable state of list is changed
     *
     * @type {Function}
     * @default noop
     * @property onSelectModeToggle
     * @public
     */
    onSelectModeToggle(/* selectMode **/) {},

    /**
     * Callback when the select all checkbox is clicked
     *
     * @type {Function}
     * @default noop
     * @property onToggleAll
     * @public
     */
    onToggleAll() {},

    'data-test-bulk-actions': true,

    containerWidth: 0,

    measuring: true,

    bulkActionsWidth: 0,

    addedMoreActionsWidthForMeasuring: 0,

    promotedActionsWidths: computed(function() {
      return [];
    }),

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
    ),

    hasActions: computed('promotedActions', 'actionsCollection', function() {
      let { promotedActions, actionsCollection } = this.getProperties(
        'promotedActions',
        'actionsCollection'
      );

      return Boolean(
        (promotedActions && promotedActions.length > 0) ||
          (actionsCollection && actionsCollection.length > 0)
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
          numberOfPromotedActionsToRender < promotedActions.length
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
          (promotedActions &&
            numberOfPromotedActionsToRender === 0 &&
            !measuring)
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
          actionSections || rolledInPromotedActions.length > 0 || measuring
        );
      }
    ),

    actionSections: computed('actionsCollection.[]', function() {
      let actionsCollection = this.get('actionsCollection');

      if (!actionsCollection || actionsCollection.length === 0) {
        return null;
      }

      if (this.instanceOfBulkActionListSectionArray(actionsCollection)) {
        return actionsCollection;
      }

      if (this.instanceOfBulkActionArray(actionsCollection)) {
        return [{ items: actionsCollection }];
      }
    }),

    combinedActions: computed(
      'actionSections.[]',
      'rolledInPromotedActions',
      function() {
        let combinedActions = [];
        let { actionSections, rolledInPromotedActions } = this.getProperties(
          'actionSections',
          'rolledInPromotedActions'
        );

        let rolledInPromotedActionsHasLength =
          rolledInPromotedActions.length > 0;

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

    get moreActionsNode() {
      return this.element.querySelector(
        '.Polaris-ResourceList-BulkActions__Popover'
      );
    },

    get largeScreenButtonsNode() {
      return this.element.querySelector(
        '.Polaris-ResourceList-BulkActions__Group--largeScreen'
      );
    },

    instanceOfBulkActionListSectionArray(actionsCollection) {
      let validList = actionsCollection.filter((action) => {
        return action.items;
      });

      return actionsCollection.length === validList.length;
    },

    instanceOfBulkActionArray(actionsCollection) {
      let validList = actionsCollection.filter((action) => {
        return !action.items;
      });

      return actionsCollection.length === validList.length;
    },

    setContainerWidth() {
      let containerWidth = this.element.getBoundingClientRect().width;

      if (containerWidth > 0) {
        this.set('containerWidth', containerWidth);
      }
    },

    handleResize() {
      this.throttleTask('setContainerWidth', 50);
    },

    addResizeEventListener() {
      let largeScreenGroupNode = this.get('largeScreenButtonsNode');

      if (largeScreenGroupNode) {
        this.addEventListener(
          largeScreenGroupNode,
          'resize',
          this.handleResize
        );
      }
    },

    didInsertElement() {
      this._super(...arguments);

      let promotedActions = this.get('promotedActions');

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
    },

    didRender() {
      this._super(...arguments);

      let {
        actionsCollection,
        promotedActions,
        moreActionsNode,
        addedMoreActionsWidthForMeasuring,
        largeScreenButtonsNode,
      } = this.getProperties(
        'actionsCollection',
        'promotedActions',
        'moreActionsNode',
        'addedMoreActionsWidthForMeasuring',
        'largeScreenButtonsNode'
      );

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
        containerWidth: this.element.getBoundingClientRect().width,
        measuring: false,
      });
    },

    actions: {
      setSelectMode(val) {
        this.get('onSelectModeToggle')(val);
      },

      handleMeasurement(width) {
        let measuring = this.get('measuring');

        if (measuring) {
          this.get('promotedActionsWidths').pushObject(width);
        }
      },
    },
  }
);
