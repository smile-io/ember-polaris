import Component from '@ember/component';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { classify } from '@ember/string';
import layout from '../../templates/components/polaris-drop-zone/file-upload';

const iconDragDrop = 'drag-drop';
const assetFileUpload = '/ember-polaris/images/file-upload.svg';
const assetImageUpload = '/ember-polaris/images/image-upload.svg';

const fileUpload = {
  actionTitleFile: 'Add file',
  actionTitleImage: 'Add image',
  actionHintFile: 'or drop files to upload',
  actionHintImage: 'or drop images to upload',
};

export default Component.extend({
  layout,
  classNames: ['Polaris-DropZone-FileUpload'],

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
   * @property actionTitle
   */
  actionTitle: computed('type', function() {
    let type = this.get('type');
    return fileUpload[`actionTitle${classify(type)}`];
  }),

  /**
   * String that appears in file upload
   *
   * @type {String}
   * @default `or drop files to upload`
   * @public
   * @property actionHint
   */
  actionHint: computed('type', function() {
    let type = this.get('type');
    return fileUpload[`actionHint${classify(type)}`];
  }),
});
