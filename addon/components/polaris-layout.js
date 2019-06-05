import {
  classNames,
  layout as templateLayout,
} from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../templates/components/polaris-layout';

@classNames('Polaris-Layout')
@templateLayout(layout)
export default class PolarisLayout extends Component {
  /**
   * Automatically adds sections to layout
   *
   * @property sectioned
   * @type {boolean}
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
   * @property text
   * @type {string}
   * @default null
   * @public
   */
  text = null;
}
