import { attribute, classNames, layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember-decorators/object";
import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import ContextBoundTasksMixin from 'ember-lifeline/mixins/run';
import ContextBoundEventListenersMixin from 'ember-lifeline/mixins/dom';
import layout from '../../templates/components/polaris-text-field/resizer';

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

@classNames('Polaris-TextField__Resizer')
@templateLayout(layout)
export default class Resizer extends Component.extend(ContextBoundTasksMixin, ContextBoundEventListenersMixin) {
  /**
   * The value of the textarea
   *
   * @property contents
   * @public
   * @type {String}
   * @default null
   */
  contents = null;

  /**
   * The height (in px) of the textarea
   *
   * @property currentHeight
   * @public
   * @type {Number}
   * @default null
   */
  currentHeight = null;

  /**
   * The multiline value of the textarea if
   * a numeric value was passed-in to the polaris-text-field
   *
   * @property minimumLines
   * @public
   * @type {Number}
   * @default null
   */
  minimumLines = null;

  /**
   * Callback when the height of the resize container changes
   *
   * @property onHeightChange
   * @public
   * @type {Function}
   * @default noop
   */
  onHeightChange/* height */() {}

  @attribute("aria-hidden")
  ariaHidden = 'true';

  'data-test-text-field-resizer' = true;

  @(computed('contents').readOnly())
  get finalContents() {
    let contents = this.get('contents');

    contents = contents
      ? `${contents.replace(REPLACE_REGEX, replaceEntity)}<br>`
      : '<br>';

    return htmlSafe(contents);
  }

  @(computed('minimumLines').readOnly())
  get contentsForMinimumLines() {
    let minimumLines = this.get('minimumLines');
    let content = '';

    for (let line = 0; line < minimumLines; line++) {
      content = `${content}<br>`;
    }

    return htmlSafe(content);
  }

  handleHeightCheck() {
    let [contentNode, minimumLinesNode] = this.element.querySelectorAll(
      '.Polaris-TextField__DummyInput'
    );

    if (!contentNode || !minimumLinesNode) {
      return;
    }

    let contentHeight = contentNode.offsetHeight;
    let minimumHeight = minimumLinesNode.offsetHeight;
    let newHeight = Math.max(contentHeight, minimumHeight);
    let { currentHeight, onHeightChange } = this.getProperties(
      'currentHeight',
      'onHeightChange'
    );

    if (newHeight !== currentHeight) {
      this.scheduleTask('actions', () => {
        onHeightChange(newHeight);
      });
    }
  }

  addResizeHandler() {
    this.addEventListener('resize', this.handleHeightCheck);
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.handleHeightCheck();
    this.addResizeHandler();
  }

  didUpdateAttrs() {
    super.didUpdateAttrs(...arguments);
    this.handleHeightCheck();
  }
}
