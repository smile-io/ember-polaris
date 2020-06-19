import Component from '@ember/component';
import { assert } from '@ember/debug';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-inline-error';

@tagName('')
@templateLayout(layout)
export default class PolarisInlineError extends Component {
  /**
   * Unique identifier of the invalid form field that the message describes
   *
   * @type {String}
   * @default null
   * @public
   * @required
   */
  fieldID = null;

  /**
   * Content briefly explaining how to resolve the invalid form field input.
   *
   * @type {String|Component}
   * @default null
   * @public
   */
  message = null;

  dataTestInlineError = true;
  dataTestInlineErrorIcon = true;

  init() {
    super.init(...arguments);
    assert(
      '[polaris-inline-error] Missing required `fieldID` param!',
      this.fieldID
    );
  }
}
