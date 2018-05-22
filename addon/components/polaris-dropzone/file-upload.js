import Component from '@ember/component';
import layout from '../../templates/components/polaris-dropzone/file-upload';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { capitalize } from '@ember/string';

const iconDragDrop = 'drag-drop';
const assetFileUpload = '/ember-polaris/images/file-upload.svg';
const assetImageUpload = '/ember-polaris/images/image-upload.svg';

const fileUpload = {
  actionTitleFile: "Add file",
  actionTitleImage: "Add image",
  actionHintFile: "or drop files to upload",
  actionHintImage: "or drop images to upload"
}

export default Component.extend({
  layout,
  classNames: ['Polaris-FileUpload'],

  type: readOnly('context.type'),
  size: readOnly('context.size'),

  iconDragDrop,
  assetFileUpload,
  assetImageUpload,

  /**
   * String that appears in file upload
   *
   * @type {String}
   * @default `Add file`
   * @public
   */
  actionTitle: computed('type', function() {
    let type = this.get('type');
    return fileUpload[`actionTitle${ capitalize(type) }`];
  }),

  /**
   * String that appears in file upload
   *
   * @type {String}
   * @default `or drop files to upload`
   * @public
   */
  actionHint:  computed('type', function() {
    let type = this.get('type');
    return fileUpload[`actionHint${ capitalize(type) }`];
  }),
});
