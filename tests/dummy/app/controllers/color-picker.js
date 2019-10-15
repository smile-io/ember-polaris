import Controller from '@ember/controller';
import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';
import { hsbaToHex } from '@smile-io/ember-polaris/utils/color';

export default class ColorPickerController extends Controller {
  color = {
    alpha: 1,
    brightness: 0.8,
    hue: 255,
    saturation: 0.5,
  };

  updateColor(color) {
    this.set('color', color);
  }

  @computed('color')
  get previewBoxStyle() {
    return htmlSafe(
      [
        `background-color: #${hsbaToHex(this.color)}`,
        'height: 100px',
        'width: 100px',
        'margin: 1rem',
        'display: flex',
        'justify-content: center',
        'align-items: center',
        'font-size: 5rem',
        'border-radius: 50%',
        'box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
      ].join(';')
    );
  }
}
