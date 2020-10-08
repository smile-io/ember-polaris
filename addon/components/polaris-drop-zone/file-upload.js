import Component from '@ember/component';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { classify } from '@ember/string';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-drop-zone/file-upload';
import deprecateClassArgument from '../../utils/deprecate-class-argument';

const iconDragDrop = 'DragDropMajor';
const fileUpload = '/@smile-io/ember-polaris/images/file-upload.svg';
const imageUpload = '/@smile-io/ember-polaris/images/image-upload.svg';

const fileUploadStrings = {
  actionTitleFile: 'Add file',
  actionTitleImage: 'Add image',
  actionHintFile: 'or drop files to upload',
  actionHintImage: 'or drop images to upload',
};

@deprecateClassArgument
@tagName('')
@layout(template)
export default class PolarisDropZoneFileUpload extends Component {
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
   */
  @computed('type')
  get actionTitle() {
    let { type } = this;
    return fileUploadStrings[`actionTitle${classify(type)}`];
  }

  /**
   * String that appears in file upload
   *
   * @type {String}
   * @default `or drop files to upload`
   * @public
   */
  @computed('type')
  get actionHint() {
    let { type } = this;
    return fileUploadStrings[`actionHint${classify(type)}`];
  }

  @computed('size')
  get imageClasses() {
    let cssClasses = ['Polaris-DropZone-FileUpload__Image'];
    let { size } = this;
    if (['extraLarge', 'large'].includes(size)) {
      cssClasses.push(`Polaris-DropZone-FileUpload--size${classify(size)}`);
    }

    return cssClasses.join(' ');
  }
}
