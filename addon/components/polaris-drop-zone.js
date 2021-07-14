import Component from '@ember/component';
import { action, computed, setProperties } from '@ember/object';
import { or } from '@ember/object/computed';
import { classify } from '@ember/string';
import { throttle, scheduleOnce } from '@ember/runloop';
import { isNone, isPresent } from '@ember/utils';
import { guidFor } from '@ember/object/internals';
import { layout, tagName } from '@ember-decorators/component';
import ContextBoundEventListenersMixin from 'ember-lifeline/mixins/dom';
import { getRectForNode } from '@smile-io/ember-polaris/utils/geometry';
import template from '../templates/components/polaris-drop-zone';
import DropZoneState from '../-private/drop-zone-state';
import {
  fileAccepted,
  getDataTransferFiles,
  smallSizeWidthLimit,
  mediumSizeWidthLimit,
  largeSizeWidthLimit,
} from '../utils/drop-zone';
import deprecateClassArgument from '../utils/deprecate-class-argument';

const iconDragDrop = 'DragDropMajor';
const iconAlertCircle = 'CircleAlertMajor';

@deprecateClassArgument
@tagName('')
@layout(template)
export default class PolarisDropZone extends Component.extend(
  ContextBoundEventListenersMixin
) {
  /**
   * ID for file input
   *
   * @type {String}
   * @default null
   * @public
   */
  id = null;

  /**
   * Label for the file input
   *
   * @type {String}
   * @default null
   * @public
   */
  label = null;

  /**
   * Adds an action to the label
   *
   * @type {Object}
   * @default null
   * @public
   */
  labelAction = null;

  /**
   * Visually hide the label
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  labelHidden = false;

  /**
   * Allowed file types
   *
   * @type {String}
   * @default null
   * @public
   */
  accept = null;

  /**
   *  Sets an active state
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  active = false;

  /**
   * Allows multiple files to be uploaded
   *
   * @type {Boolean}
   * @default true
   * @public
   */
  allowMultiple = true;

  /**
   * Sets a disabled state
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  disabled = false;

  /**
   * Allows a file to be dropped anywhere on the page
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  dropOnPage = false;

  /**
   * Sets an error state
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  error = false;

  /**
   * Text that appears in the overlay when set in error state
   *
   * @type {String}
   * @default null
   * @public
   */
  errorOverlayText = null;

  /**
   * Sets the default file dialog state
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  openFileDialog = false;

  /**
   *  Displays an outline border
   *
   * @type {Boolean}
   * @default true
   * @public
   */
  outline = true;

  /**
   * Displays an overlay on hover
   *
   * @type {Boolean}
   * @default true
   * @public
   */
  overlay = true;

  /**
   * Text that appears in the overlay
   *
   * @type {String}
   * @default null
   * @public
   */
  overlayText = null;

  /**
   * Whether is a file or an image, `file` | `image`.
   *
   * @type {String}
   * @default 'file'
   * @public
   */
  type = 'file';

  /**
   * Adds custom validations
   * (file) => boolean
   *
   * @type {Function}
   * @default null
   * @public
   */
  customValidator = null;

  /**
   * Callback triggered on click
   * (event) => void
   *
   * @type {Function}
   * @default null
   * @public
   */
  onClick = null;

  /**
   * Callback triggered when one or more files entered the drag area
   * () => void
   *
   * @type {Function}
   * @default no-op
   * @public
   */
  onDragEnter() {}

  /**
   * Callback triggered when one or more files left the drag area
   * () => void
   *
   * @type {Function}
   * @default no-op
   * @public
   */
  onDragLeave() {}

  /**
   * Callback triggered when one or more files are dragging over the drag area
   * () => void
   *
   * @type {Function}
   * @default no-op
   * @public
   */
  onDragOver() {}

  /**
   * Callback triggered on any file drop
   * (files, acceptedFiles, rejectedFiles) => void
   *
   * @type {Function}
   * @default no-op
   * @public
   */
  onDrop() {}

  /**
   * Callback triggered when at least one of the files dropped was accepted
   * (acceptedFiles) => void
   *
   * @type {Function}
   * @default no-op
   * @public
   */
  onDropAccepted() {}

  /**
   * Callback triggered when at least one of the files dropped was rejected
   * (rejectedFiles) => void
   *
   * @type {Function}
   * @default no-op
   * @public
   */
  onDropRejected() {}

  /**
   * Callback triggered when the file dialog is canceled
   * () => void
   *
   * @type {Function}
   * @default no-op
   * @public
   */
  onFileDialogClose() {}

  iconDragDrop = iconDragDrop;
  iconAlertCircle = iconAlertCircle;
  dragTargets = [];

  @computed()
  get state() {
    return new DropZoneState();
  }

  @or('active', 'state.dragging')
  isDragging;

  @computed('outline', 'isDragging', 'state.error', 'sizeClass', 'class')
  get dropZoneClasses() {
    let {
      outline,
      isDragging,
      state: { error },
      sizeClass,
    } = this;

    let cssClasses = ['Polaris-DropZone', sizeClass];

    if (outline) {
      cssClasses.push('Polaris-DropZone--hasOutline');
    }

    if (isDragging) {
      cssClasses.push('Polaris-DropZone--isDragging');
    }

    if (error) {
      cssClasses.push('Polaris-DropZone--hasError');
    }

    if (this.class) {
      cssClasses.push(this.class);
    }

    return cssClasses.join(' ');
  }

  @computed('state.size')
  get sizeClass() {
    let { size } = this.state;
    return `Polaris-DropZone--size${classify(size)}`;
  }

  @computed('isDragging', 'state.error', 'overlay')
  get showDragOverlay() {
    let {
      isDragging,
      overlay,
      state: { error },
    } = this;

    return isDragging && !error && overlay;
  }

  /**
   * Event handlers
   */
  @action
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
    } = this;
    let { numFiles } = state;

    if (disabled || (!allowMultiple && numFiles > 0)) {
      return;
    }
    let fileList = getDataTransferFiles(event);
    let { files, acceptedFiles, rejectedFiles } =
      this.getValidatedFiles(fileList);

    this.set('dragTargets', []);

    setProperties(state, {
      dragging: false,
      error: rejectedFiles.length > 0,
      numFiles: state.numFiles + acceptedFiles.length,
    });

    onDrop(files, acceptedFiles, rejectedFiles);

    if (acceptedFiles.length) {
      onDropAccepted(acceptedFiles);
    }

    if (rejectedFiles.length) {
      onDropRejected(rejectedFiles);
    }

    event.target.value = '';
  }

  handleDragEnter(event) {
    event.preventDefault();
    event.stopPropagation();

    let { disabled, onDragEnter, allowMultiple, state } = this;

    if (disabled || (!allowMultiple && state.numFiles > 0)) {
      return;
    }

    let fileList = getDataTransferFiles(event);
    if (event.target && this.dragTargets.indexOf(event.target) === -1) {
      this.dragTargets.push(event.target);
    }

    if (state.dragging) {
      return false;
    }

    let { rejectedFiles } = this.getValidatedFiles(fileList);
    setProperties(state, {
      dragging: true,
      error: rejectedFiles.length > 0,
    });

    onDragEnter();
  }

  handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();

    let { disabled, onDragOver, allowMultiple, state } = this;

    if (disabled || (!allowMultiple && state.numFiles > 0)) {
      return;
    }

    onDragOver();

    return false;
  }

  handleDragLeave(event) {
    event.preventDefault();

    let { disabled, onDragLeave, allowMultiple, dropNode, state } = this;

    if (disabled || (!allowMultiple && state.numFiles > 0)) {
      return;
    }

    this.set(
      'dragTargets',
      this.dragTargets.filter(
        (el) => el !== event.target && dropNode && dropNode.contains(el)
      )
    );

    if (this.dragTargets.length > 0) {
      return;
    }

    setProperties(state, {
      dragging: false,
      error: false,
    });

    onDragLeave();
  }

  adjustSize() {
    throttle(
      this,
      function () {
        let {
          node,
          state: { size },
        } = this;
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
  }

  getValidatedFiles(files) {
    let { accept, allowMultiple, customValidator } = this;
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
  }

  getDerivedStateFromProps() {
    let { id, error, type, overlayText, errorOverlayText } = this.state;

    let newId = this.id || guidFor(this);
    if (id !== null && id !== newId) {
      this.set('state.id', newId);
    }

    if (error !== this.error) {
      this.set('state.error', this.error);
    }

    let newType = this.type;
    if (isPresent(newType) && newType !== type) {
      this.set('state.type', newType);
    }

    let newOverlayText = this.overlayText;
    if (isPresent(newOverlayText) && newOverlayText !== overlayText) {
      this.set('state.overlayText', newOverlayText);
    }

    let newErrorOverlayText = this.errorOverlayText;
    if (
      isPresent(newErrorOverlayText) &&
      newErrorOverlayText !== errorOverlayText
    ) {
      this.set('state.errorOverlayText', newErrorOverlayText);
    }
  }

  open() {
    let { fileInputNode } = this;
    if (isNone(fileInputNode)) {
      return;
    }

    fileInputNode.click();
  }

  /**
   * Component life-cycle hooks
   */
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    this.getDerivedStateFromProps();
  }

  /**
   * NOTE: if the component is rendered with `openFileDialog = true`, this will
   * not work as expected: the file chooser is not opened because of how the HTML
   * input element works. This should be a user activation.
   *
   * Following warning will be logged
   * `File chooser dialog can only be shown with a user activation.`
   */
  @action
  triggerFileDialog() {
    if (!this.openFileDialog) {
      return;
    }

    this.open();

    let close = this.onFileDialogClose;
    if (close) {
      scheduleOnce('afterRender', close);
    }
  }

  @action
  setNode(dropzoneContainer) {
    let { dropOnPage } = this;

    this.setProperties({
      node: dropzoneContainer,
      dropNode: dropOnPage ? document : dropzoneContainer,
    });

    this.adjustSize();
  }

  @action
  setupEvents() {
    let { dropNode } = this;
    if (isNone(dropNode)) {
      return;
    }

    this.addEventListener(dropNode, 'drop', this.handleDrop);
    this.addEventListener(dropNode, 'dragover', this.handleDragOver);
    this.addEventListener(dropNode, 'dragenter', this.handleDragEnter);
    this.addEventListener(dropNode, 'dragleave', this.handleDragLeave);

    this.addEventListener(window, 'resize', this.adjustSize);
  }

  @action
  handleClick(event) {
    let {
      onClick,
      disabled,
      allowMultiple,
      state: { numFiles },
    } = this;

    if (disabled || (!allowMultiple && numFiles > 0)) {
      return;
    }

    return onClick ? onClick(event) : this.open();
  }

  @action
  handleDragStart(event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
