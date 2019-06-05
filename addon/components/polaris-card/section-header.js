import {
  classNames,
  layout as templateLayout,
} from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../../templates/components/polaris-card/section-header';

@classNames('Polaris-Card__SectionHeader')
@templateLayout(layout)
export default class SectionHeader extends Component {
  /**
   * Title for the section
   *
   * @property title
   * @type {String|Component}
   * @default: null
   * @public
   */
  title = null;

  /**
   * Inner content of the section
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @type {String}
   * @default: null
   * @public
   */
  text = null;
}
