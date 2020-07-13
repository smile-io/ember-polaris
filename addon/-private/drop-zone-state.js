import { capitalize } from '@ember/string';

const dropZone = {
  overlayTextFile: 'Drop file to upload',
  overlayTextImage: 'Drop image to upload',
  errorOverlayTextFile: 'File type is not valid',
  errorOverlayTextImage: 'Image type is not valid',
};

export default class DropZoneState {
  /**
   * Whether is a file or an image
   *
   * @type {String}
   * @default 'file'
   */
  type = 'file';

  /**
   * The size of the dropzone
   * @type {String}
   * @default 'extraLarge'
   */
  size = 'extraLarge';

  /**
   * True, when dragging in progress
   * @type {Boolean}
   * @default false
   */
  dragging = false;

  /**
   * True, when dropzone has errors
   * @type {Boolean}
   * @default false
   */
  error = false;

  /**
   * Number of files
   * @type {Number}
   * @default 0
   */
  numFiles = 0;

  constructor() {
    const suffix = capitalize(this.type);
    this.overlayText = dropZone[`overlayText${suffix}`];
    this.errorOverlayText = dropZone[`errorOverlayText${suffix}`];
  }
}
