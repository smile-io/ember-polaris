import Component from '@ember/component';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';
import { classify } from '@ember/string';
import { throttle, scheduleOnce } from '@ember/runloop';
import { isNone, isPresent } from '@ember/utils';
import ContextBoundEventListenersMixin from 'ember-lifeline/mixins/dom';
import { getRectForNode } from '@shopify/javascript-utilities/geometry';
import { guidFor } from '@ember/object/internals';
import layout from '../templates/components/polaris-drop-zone';
import State from '../-private/drop-zone-state';
import {
  fileAccepted,
  getDataTransferFiles,
  smallSizeWidthLimit,
  mediumSizeWidthLimit,
  largeSizeWidthLimit,
} from '../utils/drop-zone';

const iconDragDrop = 'drag-drop';
const iconAlertCircle = 'alert-circle';

export default Component.extend(ContextBoundEventListenersMixin, {
  layout,

  /**
   * ID for file input
   *
   * @type {String}
   * @default null
   * @public
   * @property id
   */
  id: null,

  /**
   * Label for the file input
   *
   * @type {String}
   * @default null
   * @public
   * @property label
   */
  label: null,

  /**
   * Adds an action to the label
   *
   * @type {Object}
   * @default null
   * @public
   * @property labelAction
   */
  labelAction: null,

  /**
   * Visually hide the label
   *
   * @type {Boolean}
   * @default false
   * @public
   * @property labelHidden
   */
  labelHidden: false,

  /**
   * Allowed file types
   *
   * @type {String}
   * @default null
   * @public
   * @property accept
   */
  accept: null,

  /**
   *  Sets an active state
   *
   * @type {Boolean}
   * @default false
   * @public
   * @property active
   */
  active: false,

  /**
   * Allows multiple files to be uploaded
   *
   * @type {Boolean}
   * @default true
   * @public
   * @property allowMultiple
   */
  allowMultiple: true,

  /**
   * Sets a disabled state
   *
   * @type {Boolean}
   * @default false
   * @public
   * @property disabled
   */
  disabled: false,

  /**
   * Allows a file to be dropped anywhere on the page
   *
   * @type {Boolean}
   * @default false
   * @public
   * @property dropOnPage
   */
  dropOnPage: false,

  /**
   * Sets an error state
   *
   * @type {Boolean}
   * @default false
   * @public
   * @property error
   */
  error: false,

  /**
   * Text that appears in the overlay when set in error state
   *
   * @type {String}
   * @default null
   * @public
   * @property errorOverlayText
   */
  errorOverlayText: null,

  /**
   * Sets the default file dialog state
   *
   * @type {Boolean}
   * @default false
   * @public
   * @property openFileDialog
   */
  openFileDialog: false,

  /**
   *  Displays an outline border
   *
   * @type {Boolean}
   * @default true
   * @public
   * @property outline
   */
  outline: true,

  /**
   * Displays an overlay on hover
   *
   * @type {Boolean}
   * @default true
   * @public
   * @property overlay
   */
  overlay: true,

  /**
   * Text that appears in the overlay
   *
   * @type {String}
   * @default null
   * @public
   * @property overlayText
   */
  overlayText: null,

  /**
   * Whether is a file or an image, `file` | `image`.
   *
   * @type {String}
   * @default 'file'
   * @public
   * @property type
   */
  type: 'file',

  /**
   * Adds custom validations
   * (file) => boolean
   *
   * @type {Function}
   * @default null
   * @public
   * @property customValidator
   */
  customValidator: null,

  /**
   * Callback triggered on click
   * (event) => void
   *
   * @type {Function}
   * @default null
   * @public
   * @property onClick
   */
  onClick: null,

  /**
   * Callback triggered when one or more files entered the drag area
   * () => void
   *
   * @type {Function}
   * @default no-op
   * @public
   * @property onDragEnter
   */
  onDragEnter() {},

  /**
   * Callback triggered when one or more files left the drag area
   * () => void
   *
   * @type {Function}
   * @default no-op
   * @public
   * @property onDragLeave
   */
  onDragLeave() {},

  /**
   * Callback triggered when one or more files are dragging over the drag area
   * () => void
   *
   * @type {Function}
   * @default no-op
   * @public
   * @property onDragOver
   */
  onDragOver() {},

  /**
   * Callback triggered on any file drop
   * (files, acceptedFiles, rejectedFiles) => void
   *
   * @type {Function}
   * @default no-op
   * @public
   * @property onDrop
   */
  onDrop() {},

  /**
   * Callback triggered when at least one of the files dropped was accepted
   * (acceptedFiles) => void
   *
   * @type {Function}
   * @default no-op
   * @public
   * @property onDropAccepted
   */
  onDropAccepted() {},

  /**
   * Callback triggered when at least one of the files dropped was rejected
   * (rejectedFiles) => void
   *
   * @type {Function}
   * @default no-op
   * @public
   * @property onDropRejected
   */
  onDropRejected() {},

  /**
   * Callback triggered when the file dialog is canceled
   * () => void
   *
   * @type {Function}
   * @default no-op
   * @public
   * @property onFileDialogClose
   */
  onFileDialogClose() {},

  iconDragDrop,

  iconAlertCircle,

  state: computed(() => State.create()).readOnly(),

  isDragging: or('active', 'state.dragging').readOnly(),

  dropZoneClasses: computed(
    'outline',
    'isDragging',
    'state.error',
    'sizeClass',
    function() {
      let { outline, isDragging, state, sizeClass } = this.getProperties(
        'outline',
        'isDragging',
        'state',
        'sizeClass'
      );

      let classNames = ['Polaris-DropZone', sizeClass];
      let error = state.get('error');

      if (outline) {
        classNames.push('Polaris-DropZone--hasOutline');
      }

      if (isDragging) {
        classNames.push('Polaris-DropZone--isDragging');
      }

      if (error) {
        classNames.push('Polaris-DropZone--hasError');
      }

      return classNames.join(' ');
    }
  ),

  fileInputNode: computed('state.id', function() {
    return this.element.querySelector(
      `input[id='${this.get('state.id')}-input']`
    );
  }).readOnly(),

  ariaDisabled: computed('disabled', function() {
    return isPresent(this.get('disabled')) ? 'true' : null;
  }).readOnly(),

  sizeClass: computed('state.size', function() {
    let size = this.get('state.size');
    return `Polaris-DropZone--size${classify(size)}`;
  }).readOnly(),

  showDragOverlay: computed('isDragging', 'state.error', 'overlay', function() {
    let error = this.get('state.error');
    let { isDragging, overlay } = this.getProperties('isDragging', 'overlay');

    return isDragging && !error && overlay;
  }).readOnly(),

  /**
   * Event handlers
   */
  handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    let {
      disabled,
      onDrop,
      onDropAccepted,
      onDropRejected,
      allowMultiple,
      state,
    } = this.getProperties(
      'disabled',
      'onDrop',
      'onDropAccepted',
      'onDropRejected',
      'allowMultiple',
      'state'
    );
    let numFiles = state.get('numFiles');

    if (disabled || (!allowMultiple && numFiles > 0)) {
      return;
    }
    let fileList = getDataTransferFiles(event);
    let { files, acceptedFiles, rejectedFiles } = this.getValidatedFiles(
      fileList
    );

    this.dragTargets = [];

    state.setProperties({
      dragging: false,
      error: rejectedFiles.length > 0,
      numFiles: state.get('numFiles') + acceptedFiles.length,
    });

    onDrop(files, acceptedFiles, rejectedFiles);

    if (acceptedFiles.length) {
      onDropAccepted(acceptedFiles);
    }

    if (rejectedFiles.length) {
      onDropRejected(rejectedFiles);
    }

    event.target.value = '';
  },

  handleDragEnter(event) {
    event.preventDefault();
    event.stopPropagation();

    let { disabled, onDragEnter, allowMultiple, state } = this.getProperties(
      'disabled',
      'onDragEnter',
      'allowMultiple',
      'state'
    );

    if (disabled || (!allowMultiple && state.get('numFiles') > 0)) {
      return;
    }

    let fileList = getDataTransferFiles(event);
    if (event.target && this.dragTargets.indexOf(event.target) === -1) {
      this.dragTargets.push(event.target);
    }

    if (state.get('dragging')) {
      return false;
    }

    let { rejectedFiles } = this.getValidatedFiles(fileList);

    state.setProperties({
      dragging: true,
      error: rejectedFiles.length > 0,
    });

    onDragEnter();
  },

  handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();

    let state = this.get('state');
    let { disabled, onDragOver, allowMultiple } = this.getProperties(
      'disabled',
      'onDragOver',
      'allowMultiple'
    );

    if (disabled || (!allowMultiple && state.get('numFiles') > 0)) {
      return;
    }

    onDragOver();

    return false;
  },

  handleDragLeave(event) {
    event.preventDefault();

    let state = this.get('state');
    let { disabled, onDragLeave, allowMultiple, dropNode } = this.getProperties(
      'disabled',
      'onDragLeave',
      'allowMultiple',
      'dropNode'
    );

    if (disabled || (!allowMultiple && state.get('numFiles') > 0)) {
      return;
    }

    this.dragTargets = this.dragTargets.filter((el) => {
      return el !== event.target && dropNode && dropNode.contains(el);
    });

    if (this.dragTargets.length > 0) {
      return;
    }

    this.get('state').setProperties({
      dragging: false,
      error: false,
    });

    onDragLeave();
  },

  adjustSize() {
    throttle(
      this,
      function() {
        let node = this.get('node');
        let size = this.get('state.size');
        let width = getRectForNode(node).width;

        if (width < smallSizeWidthLimit) {
          size = 'small';
        } else if (width < mediumSizeWidthLimit) {
          size = 'medium';
        } else if (width < largeSizeWidthLimit) {
          size = 'large';
        }

        this.set('state.size', size);
      },
      50
    );
  },

  getValidatedFiles(files) {
    let { accept, allowMultiple, customValidator } = this.getProperties(
      'accept',
      'allowMultiple',
      'customValidator'
    );

    let acceptedFiles = [];
    let rejectedFiles = [];

    Array.from(files).forEach((file) => {
      if (
        !fileAccepted(file, accept) ||
        (customValidator && !customValidator(file))
      ) {
        rejectedFiles.push(file);
      } else {
        acceptedFiles.push(file);
      }
    });

    if (!allowMultiple) {
      // Remove all accepted files after the first one
      acceptedFiles.splice(1, acceptedFiles.length);
      // TODO check if this is intended behaviour...smells like a bug
      rejectedFiles.push(...acceptedFiles.slice(1));
    }

    return {
      files,
      acceptedFiles,
      rejectedFiles,
    };
  },

  setupEvents() {
    let dropNode = this.get('dropNode');
    if (isNone(dropNode)) {
      return;
    }

    this.addEventListener(dropNode, 'drop', this.handleDrop);
    this.addEventListener(dropNode, 'dragover', this.handleDragOver);
    this.addEventListener(dropNode, 'dragenter', this.handleDragEnter);
    this.addEventListener(dropNode, 'dragleave', this.handleDragLeave);

    this.addEventListener(window, 'resize', this.adjustSize);
  },

  setNode() {
    let dropOnPage = this.get('dropOnPage');
    let dropzoneContainer = this.element.querySelector('.Polaris-DropZone');

    this.setProperties({
      node: dropzoneContainer,
      dropNode: dropOnPage ? document : dropzoneContainer,
    });

    this.adjustSize();
  },

  getDerivedStateFromProps() {
    let { id, error, type, overlayText, errorOverlayText } = this.get(
      'state'
    ).getProperties('id', 'error', 'type', 'overlayText', 'errorOverlayText');

    let newId = this.get('id') || guidFor(this);
    if (id !== null && id !== newId) {
      this.set('state.id', newId);
    }

    if (error !== this.get('error')) {
      this.set('state.error', this.get('error'));
    }

    let newType = this.get('type');
    if (isPresent(newType) && newType !== type) {
      this.set('state.type', newType);
    }

    let newOverlayText = this.get('overlayText');
    if (isPresent(newOverlayText) && newOverlayText !== overlayText) {
      this.set('state.overlayText', newOverlayText);
    }

    let newErrorOverlayText = this.get('errorOverlayText');
    if (
      isPresent(newErrorOverlayText) &&
      newErrorOverlayText !== errorOverlayText
    ) {
      this.set('state.errorOverlayText', newErrorOverlayText);
    }
  },

  open() {
    let fileInputNode = this.get('fileInputNode');

    if (isNone(fileInputNode)) {
      return;
    }

    fileInputNode.click();
  },

  triggerFileDialog() {
    this.open();

    let close = this.get('onFileDialogClose');

    if (close) {
      scheduleOnce('afterRender', close);
    }
  },

  /**
   * Component life-cycle hooks
   */
  init() {
    this._super(...arguments);
    this.dragTargets = [];
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.getDerivedStateFromProps();
  },

  didInsertElement() {
    this._super(...arguments);

    this.setNode();
    this.set('state.error', this.get('error'));
    this.setupEvents();

    if (this.get('openFileDialog')) {
      this.triggerFileDialog();
    }
  },

  didUpdateAttrs() {
    this._super(...arguments);

    if (this.get('openFileDialog')) {
      this.triggerFileDialog();
    }
  },

  actions: {
    handleClick(event) {
      let { onClick, disabled, allowMultiple } = this.getProperties(
        'onClick',
        'disabled'
      );
      let numFiles = this.get('state.numFiles');

      if (disabled || (!allowMultiple && numFiles > 0)) {
        return;
      }

      return onClick ? onClick(event) : this.open();
    },

    handleDragStart(event) {
      event.preventDefault();
      event.stopPropagation();
    },
  },
});
