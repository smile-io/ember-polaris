import Component from '@ember/component';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-layout';
import deprecateClassArgument from '../utils/deprecate-class-argument';

@deprecateClassArgument
@tagName('')
@templateLayout(layout)
export default class PolarisLayout extends Component {
  /**
   * Automatically adds sections to layout
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  sectioned = false;

  /**
   * The content to display inside the layout
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @type {String}
   * @public
   */
  text;
}
