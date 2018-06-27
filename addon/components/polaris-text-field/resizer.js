import Component from '@ember/component';
import layout from '../../templates/components/polaris-text-field/resizer';
import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';

const REPLACE_REGEX = /[\n&<>]/g;

const ENTITIES_TO_REPLACE = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '\n': '<br>',
};

const replaceEntity = (entity) => {
  return ENTITIES_TO_REPLACE[entity] || entity;
};

export default Component.extend({
  classNames: ['Polaris-TextField__Resizer'],

  'aria-hidden': true,

  layout,

  /**
   * The value of the textarea
   *
   * @property contents
   * @public
   * @type {String}
   * @default null
   */
  contents: null,

  /**
   * The height (in px) of the textarea
   *
   * @property currentHeight
   * @public
   * @type {Number}
   * @default null
   */
  currentHeight: null,

  /**
   * The multiline value of the textarea if
   * a numeric value was passed-in to the polaris-text-field
   *
   * @property minimumLines
   * @public
   * @type {Number}
   * @default null
   */
  minimumLines: null,

  /**
   * Callback when the height of the resize container changes
   *
   * @property onHeightChange
   * @public
   * @type {Function}
   * @default noop
   */
  onHeightChange(/* height */) {},

  finalContents: computed('contents', function() {
    let contents = this.get('contents');

    contents = contents
      ? `${ contents.replace(REPLACE_REGEX, replaceEntity) }<br>`
      : '<br>';

    return htmlSafe(contents);
  }),

  contentsForMinimumLines: computed('minimumLines', function() {
    let minimumLines = this.get('minimumLines');
    let content = '';

    for (let line = 0; line < minimumLines; line++) {
      content += '<br>';
    }

    return htmlSafe(content);
  }),

  handleHeightCheck() {
    let [ contentNode, minimumLinesNode ] = this.element.querySelectorAll('.Polaris-TextField__DummyInput');

    if (!contentNode || !minimumLinesNode) {
      return;
    }

    let contentHeight = contentNode.offsetHeight;
    let minimumHeight = minimumLinesNode.offsetHeight;
    let newHeight = Math.max(contentHeight, minimumHeight);
    let { currentHeight, onHeightChange } = this.getProperties('currentHeight', 'onHeightChange');

    if (newHeight !== currentHeight) {
      onHeightChange(newHeight);
    }
  },

  addResizeHandler() {
    this.element.addEventListener('resize', this.handleHeightCheck.bind(this));
  },

  removeResizeHandler() {
    this.element.removeEventListener('resize', this.handleHeightCheck.bind(this));
  },

  /*
   * Lifecycle hooks.
   */
  didInsertElement() {
    this._super(...arguments);
    this.handleHeightCheck();
    this.addResizeHandler();
  },

  didUpdateAttrs() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, this.handleHeightCheck);
  },

  willDestroyElement() {
    this._super(...arguments);
    this.removeResizeHandler();
  }
});
