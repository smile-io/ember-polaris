import Component from '@ember/component';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { classify } from '@ember/string';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-drop-zone/file-upload';

const iconDragDrop = 'drag-drop';
const fileUpload = '/@smile-io/ember-polaris/images/file-upload.svg';
const imageUpload = '/@smile-io/ember-polaris/images/image-upload.svg';

const fileUploadStrings = {
  actionTitleFile: 'Add file',
  actionTitleImage: 'Add image',
  actionHintFile: 'or drop files to upload',
  actionHintImage: 'or drop images to upload',
};

@tagName('')
@layout(template)
export default class FileUploadComponent extends Component {
  iconDragDrop = iconDragDrop;
  fileUpload = fileUpload;
  imageUpload = imageUpload;

  @readOnly('context.type')
  type;

  @readOnly('context.size')
  size;

  /**
   * String that appears in file upload
   *
   * @type {String}
   * @default `Add file`
   * @public
   * @property actionTitle
   */
  @computed('type')
  get actionTitle() {
    let type = this.get('type');
    return fileUploadStrings[`actionTitle${classify(type)}`];
  }

  /**
   * String that appears in file upload
   *
   * @type {String}
   * @default `or drop files to upload`
   * @public
   * @property actionHint
   */
  @computed('type')
  get actionHint() {
    let type = this.get('type');
    return fileUploadStrings[`actionHint${classify(type)}`];
  }

  @(computed('size').readOnly())
  get imageClasses() {
    let classes = ['Polaris-DropZone-FileUpload__Image'];
    let size = this.get('size');
    if (['extraLarge', 'large'].includes(size)) {
      classes.push(`Polaris-DropZone-FileUpload--size${classify(size)}`);
    }

    return classes.join(' ');
  }
}
