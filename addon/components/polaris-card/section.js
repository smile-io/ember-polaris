import Component from '@ember/component';
import { tagName, layout } from '@ember-decorators/component';
import template from '../../templates/components/polaris-card/section';

@tagName('')
@layout(template)
export default class CardSectionComponent extends Component {
  /**
   * Title for the section
   *
   * @type {String}
   * @default null
   * @public
   */
  title = null;

  /**
   * A less prominent section
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  subdued = false;

  /**
   * A full-width section without any padding
   *
   * @type {Boolean}
   * @default: false
   * @public
   */
  fullWidth = false;

  /**
   * Inner content of the section
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @type {String}
   * @default null
   * @public
   */
  text = null;
}
