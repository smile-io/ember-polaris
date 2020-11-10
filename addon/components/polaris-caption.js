import Component from '@ember/component';
import { tagName } from '@ember-decorators/component';
import deprecateClassArgument from '../utils/deprecate-class-argument';

@deprecateClassArgument
@tagName('')
export default class PolarisCaption extends Component {
  /**
   * The content to use as a graph label or timestamp.
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
