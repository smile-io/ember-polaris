import EmberObject, { get, computed } from '@ember/object';
import { capitalize } from '@ember/string';

const dropZone = {
  overlayTextFile: 'Drop file to upload',
  overlayTextImage: 'Drop image to upload',
  errorOverlayTextFile: 'File type is not valid',
  errorOverlayTextImage: 'Image type is not valid',
};

export default EmberObject.extend({
  /**
   * Whether is a file or an image
   *
   * @type {String}
   * @default 'file'
   * @property type
   */
  type: 'file',

  /**
   * The size of the dropzone
   * @type {String}
   * @default 'large'
   * @property size
   */
  size: 'large',

  /**
   * True, when dragging in progress
   * @type {Boolean}
   * @default false
   * @property dragging
   */
  dragging: false,

  /**
   * True, when dropzone has errors
   * @type {Boolean}
   * @default false
   * @property error
   */
  error: false,

  overlayText: computed('type', function() {
    let type = this.get('type');
    return get(dropZone, `overlayText${capitalize(type)}`);
  }),

  errorOverlayText: computed('type', function() {
    let type = this.get('type');
    return get(dropZone, `errorOverlayText${capitalize(type)}`);
  }),
});
