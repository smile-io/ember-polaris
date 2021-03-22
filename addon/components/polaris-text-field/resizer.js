import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-text-field/resizer';
import deprecateClassArgument from '../../utils/deprecate-class-argument';

const REPLACE_REGEX = /[\n&<>]/g;

const ENTITIES_TO_REPLACE = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '\n': '<br>',
};

function replaceEntity(entity) {
  return ENTITIES_TO_REPLACE[entity] || entity;
}

@deprecateClassArgument
@tagName('')
@templateLayout(layout)
export default class PolarisTextFieldResizer extends Component {
  /**
   * The value of the textarea
   *
   * @type {String}
   * @default null
   * @public
   */
  contents = null;

  /**
   * The height (in px) of the textarea
   *
   * @type {Number}
   * @default null
   * @public
   */
  currentHeight = null;

  /**
   * The multiline value of the textarea if
   * a numeric value was passed-in to the polaris-text-field
   *
   * @type {Number}
   * @default null
   * @public
   */
  minimumLines = null;

  /**
   * Callback when the height of the resize container changes
   *
   * @type {Function}
   * @default noop
   * @public
   */
  onHeightChange /* height */() {}

  @computed('contents')
  get finalContents() {
    let { contents } = this;
    contents = contents
      ? `${contents.replace(REPLACE_REGEX, replaceEntity)}<br>`
      : '<br>';

    return htmlSafe(contents);
  }

  @computed('minimumLines')
  get contentsForMinimumLines() {
    let content = '';

    for (let line = 0; line < this.minimumLines; line++) {
      content = `${content}<br>`;
    }

    return htmlSafe(content);
  }

  @action
  handleHeightCheck() {
    let { contentNode, minimumLinesNode } = this;
    if (!contentNode || !minimumLinesNode) {
      return;
    }

    let contentHeight = contentNode.offsetHeight;
    let minimumHeight = minimumLinesNode.offsetHeight;
    let newHeight = Math.max(contentHeight, minimumHeight);
    let { currentHeight, onHeightChange } = this;

    if (newHeight !== currentHeight) {
      onHeightChange(newHeight);
    }
  }

  @action
  setContentNode(element) {
    this.set('contentNode', element);
  }

  @action
  setMinimumLinesNode(element) {
    this.set('minimumLinesNode', element);
  }
}
