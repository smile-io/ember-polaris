import Component from '@ember/component';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';
import { classify } from '@ember/string';
import { throttle } from '@ember/runloop';
import { isNone, isPresent } from '@ember/utils';
import layout from '../templates/components/polaris-dropzone';
import State from '../-private/dropzone-state';
import { fileAccepted, getDataTransferFiles } from '../utils/dropzone';
import ContextBoundEventListenersMixin from 'ember-lifeline/mixins/dom';

const iconDragDrop = 'drag-drop';
const iconAlertCircle = 'alert-circle';

// Under this width limit, dropzone is considered 'small'
const smallSizeWidthLimit = 114;
// Under this width limit, dropzone is considered 'medium'
const mediumSizeWidthLimit = 300;

export default Component.extend(ContextBoundEventListenersMixin, {
  layout,
  classNames: ['Polaris-DropZone'],
  classNameBindings: [
    'outline:Polaris-DropZone--hasOutline',
    'isDragging:Polaris-DropZone--isDragging',
    'state.error:Polaris-DropZone--hasError',
    'sizeClass',
  ],
  attributeBindings: [
    'ariaDisabled:aria-disabled',
  ],

  /**
   * Allowed file types
   *
   * @type {String}
   * @public
   */
  accept: null,

  /**
   *  Sets an active state
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  active: false,

  /**
   * Allows multiple files to be uploaded
   *
   * @type {Boolean}
   * @default true
   * @public
   */
  allowMultiple: true,

  /**
   * Sets a disabled state
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  disabled: false,

  /**
   * Allows a file to be dropped anywhere on the page
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  dropOnPage: false,

  /**
   * Sets an error state
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  error: false,

  /**
   * Text that appears in the overlay when set in error state
   *
   * @type {String}
   * @default null
   * @public
   */
  errorOverlayText: null,

  /**
   * Sets the default file dialog state
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  openFileDialog: false,

  /**
   *  Displays an outline border
   *
   * @type {Boolean}
   * @default true
   * @public
   */
  outline: true,

  /**
   * Displays an overlay on hover
   *
   * @type {Boolean}
   * @default true
   * @public
   */
  overlay: true,

  /**
   * Text that appears in the overlay
   *
   * @type {String}
   * @default null
   * @public
   */
  overlayText: null,

  /**
   * Whether is a file or an image, `file` | `image`.
   *
   * @type {String}
   * @default 'file'
   * @public
   */
  type: 'file',

  /**
   * Adds custom validations
   * (file) => boolean
   *
   * @type {Function}
   * @default null
   * @public
   */
  customValidator: null,

  /**
   * Callback triggered on click
   * (event) => void
   *
   * @type {Function}
   * @default null
   * @public
   */
  onClick: null,

  /**
   * Callback triggered when one or more files entered the drag area
   * () => void
   *
   * @type {Function}
   * @default no-op
   * @public
   */
  onDragEnter() {},

  /**
   * Callback triggered when one or more files left the drag area
   * () => void
   *
   * @type {Function}
   * @default no-op
   * @public
   */
  onDragLeave() {},

  /**
   * Callback triggered when one or more files are dragging over the drag area
   * () => void
   *
   * @type {Function}
   * @default no-op
   * @public
   */
  onDragOver() {},

  /**
   * Callback triggered on any file drop
   * (files, acceptedFiles, rejectedFiles) => void
   *
   * @type {Function}
   * @default no-op
   * @public
   */
  onDrop() {},

  /**
   * Callback triggered when at least one of the files dropped was accepted
   * (acceptedFiles) => void
   *
   * @type {Function}
   * @default no-op
   * @public
   */
  onDropAccepted() {},

  /**
   * Callback triggered when at least one of the files dropped was rejected
   * (rejectedFiles) => void
   *
   * @type {Function}
   * @default no-op
   * @public
   */
  onDropRejected() {},

  /**
   * Callback triggered when the file dialog is canceled
   * () => void
   *
   * @type {Function}
   * @default no-op
   * @public
   */
  onFileDialogClose() {},

  iconDragDrop,
  iconAlertCircle,

  state: computed(() => State.create()).readOnly(),

  isDragging: or('active', 'state.dragging').readOnly(),

  fileInputNode: computed(function() {
    return this.element.querySelector(`input[id='${ this.get('elementId') }-input']`);
  }).readOnly(),

  ariaDisabled: computed('disabled', function() {
    return isPresent(this.get('disabled')) ? 'true' : null;
  }).readOnly(),

  sizeClass: computed('state.size', function() {
    let size = this.get('state.size');
    return `Polaris-DropZone--size${ classify(size) }`;
  }).readOnly(),

  showDragOverlay: computed('isDragging', 'state.error', 'overlay', function() {
    let error = this.get('state.error');
    let { isDragging, overlay } = this.getProperties('isDragging', 'overlay');

    return isDragging && !error && overlay;
  }).readOnly(),

  /**
   * Event handlers
   */
  handleClick(event) {
    let { onClick, disabled } = this.getProperties('onClick', 'disabled');
    if (disabled) {
      return;
    }

    return onClick ? onClick(event) : this.open();
  },

  handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    let { disabled, onDrop, onDropAccepted, onDropRejected } = this.getProperties(
      'disabled',
      'onDrop',
      'onDropAccepted',
      'onDropRejected',
    );
    if (disabled) {
      return;
    }
    let fileList = getDataTransferFiles(event);
    let { files, acceptedFiles, rejectedFiles } = this.getValidatedFiles(fileList);

    this.dragTargets = [];

    this.get('state').setProperties({
      dragging: false,
      error: rejectedFiles.length > 0,
    });

    onDrop(files, acceptedFiles, rejectedFiles);

    if (acceptedFiles.length) {
      onDropAccepted(acceptedFiles);
    }

    if (rejectedFiles.length) {
      onDropRejected(rejectedFiles);
    }
  },

  handleDragEnter(event) {
    event.preventDefault();
    event.stopPropagation();

    let { disabled, onDragEnter } = this.getProperties('disabled', 'onDragEnter');
    if (disabled) {
      return;
    }

    let fileList = getDataTransferFiles(event);
    if (event.target && this.dragTargets.indexOf(event.target) === -1) {
      this.dragTargets.push(event.target);
    }

    let state = this.get('state');
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

    let { disabled, onDragOver } = this.getProperties('disabled', 'onDragOver');
    if (disabled) {
      return;
    }

    onDragOver();

    // Browsers are somewhat inconsistent about needing these, but they don't hurt to add.
    return false;
  },

  handleDragLeave(event) {
    event.preventDefault();

    let { disabled, onDragLeave, dropNode } = this.getProperties(
      'disabled',
      'onDragLeave',
      'dropNode',
    );
    if (disabled) {
      return;
    }

    this.dragTargets = this.dragTargets.filter((el) => {
      return el !== event.target &&
        dropNode &&
        dropNode.contains(el);
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

  handleDragStart(event) {
    event.preventDefault();
    event.stopPropagation();
  },

  adjustSize() {
    throttle(this, function() {
      let node = this.get('node');
      let size = 'large';
      let width = node.getBoundingClientRect().width;

      if (width < smallSizeWidthLimit) {
        size = 'small';
      } else if (width < mediumSizeWidthLimit) {
        size = 'medium';
      }

      this.set('state.size', size);
    }, 50);
  },

  getValidatedFiles(files) {
    let { accept, allowMultiple, customValidator } = this.getProperties(
      'accept',
      'allowMultiple',
      'customValidator',
    );

    let acceptedFiles = [];
    let rejectedFiles = [];

    Array.from(files).forEach((file) => {
      if (!fileAccepted(file, accept) || (customValidator && !customValidator(file))) {
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

    this.addEventListener(this.element, 'click', this.handleClick);
    this.addEventListener(this.element, 'dragStart', this.handleDragStart);

    this.addEventListener(window, 'resize', this.adjustSize);
  },

  setNode() {
    let dropOnPage = this.get('dropOnPage');
    this.setProperties({
      node: this.element,
      dropNode: dropOnPage ? document : this.element,
    });

    this.adjustSize();
  },

  updateStateFromProps() {
    let { error, type, overlayText, errorOverlayText } = this.get('state').getProperties(
      'error',
      'type',
      'overlayText',
      'errorOverlayText',
    );

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
    if (isPresent(newErrorOverlayText) && newErrorOverlayText !== errorOverlayText) {
      this.set('state.errorOverlayText', newErrorOverlayText);
    }

    if (this.get('openFileDialog')) {
      this.open();
      // NOTE: this doesn't seems right, might be a bug
      this.get('onFileDialogClose')();
    }
  },

  open() {
    let fileInputNode = this.get('fileInputNode');
    if (isNone(fileInputNode)) {
      return;
    }

    fileInputNode.click();
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
    this.updateStateFromProps();
  },

  didInsertElement() {
    this._super(...arguments);

    this.setNode();
    this.set('state.error', this.get('error'));
    this.setupEvents();
  },
});
