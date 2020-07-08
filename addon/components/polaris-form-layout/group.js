import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-form-layout/group';
import { idVariation, helpTextId } from '../../utils/id';
import AutoWrapper from '../../-private/auto-wrapper';
import deprecateClassArgument from '../../utils/deprecate-class-argument';

@deprecateClassArgument
@tagName('')
@templateLayout(layout)
export default class PolarisFormLayoutGroup extends Component {
  /**
   * Elements to display inside group item
   *
   * @type {string}
   * @default null
   * @public
   */
  text = null;

  /**
   * Condensed field group
   *
   * @type {boolean}
   * @default false
   * @public
   */
  condensed = false;

  /**
   * Form layout group title
   *
   * @type {String}
   * @default null
   * @public
   */
  title = null;

  /**
   * Form layout help text
   *
   * @type {String|Component}
   * @default null
   * @public
   */
  helpText = null;

  @computed('elementId', 'title')
  get titleID() {
    if (isBlank(this.title)) {
      return null;
    }

    return idVariation(this.elementId, 'Title');
  }

  @computed('elementId', 'helpText')
  get helpTextID() {
    if (isBlank(this.helpText)) {
      return null;
    }

    return helpTextId(this.elementId);
  }

  @action
  setupAutoWrapper(formLayouItemsElement) {
    this.autoWrapper = new AutoWrapper(
      formLayouItemsElement,
      'Polaris-FormLayout__Item',
      {
        'data-test-form-layout-item': '',
      }
    );
  }

  @action
  teardownAutoWrapper() {
    this.autoWrapper.teardown();
  }
}
