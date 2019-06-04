import { classNames, layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember/object";
import { readOnly } from "@ember/object/computed";
import Component from '@ember/component';
import { classify } from '@ember/string';
import layout from '../../templates/components/polaris-drop-zone/file-upload';

const iconDragDrop = 'drag-drop';
const fileUpload = '/@smile-io/ember-polaris/images/file-upload.svg';
const imageUpload = '/@smile-io/ember-polaris/images/image-upload.svg';

const fileUploadStrings = {
  actionTitleFile: 'Add file',
  actionTitleImage: 'Add image',
  actionHintFile: 'or drop files to upload',
  actionHintImage: 'or drop images to upload',
};

@classNames('Polaris-DropZone-FileUpload')
@templateLayout(layout)
export default class FileUpload extends Component {
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

  iconDragDrop = iconDragDrop;
  fileUpload = fileUpload;
  imageUpload = imageUpload;

  @readOnly('context.type')
  type;

  @readOnly('context.size')
  size;

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
