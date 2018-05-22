import EmberObject, { get, computed } from '@ember/object';
import { capitalize } from '@ember/string';

const dropZone = {
  overlayTextFile: "Drop file to upload",
  overlayTextImage: "Drop image to upload",
  errorOverlayTextFile: "File type is not valid",
  errorOverlayTextImage: "Image type is not valid",
};

export default EmberObject.extend({
  /**
   * Whether is a file or an image
   *
   * @type {[type]}
   * @default 'file'
   * @public
   */
  type: 'file',

  size: 'large',

  dragging: false,

  error: false,

  overlayText: computed('type', function() {
    let type = this.get('type');
    return get(dropZone, `overlayText${capitalize(type)}`);
  }),

  errorOverlayText:  computed('type', function() {
    let type = this.get('type');
    return get(dropZone, `errorOverlayText${capitalize(type)}`);
  }),
});
