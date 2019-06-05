import {
  classNames,
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../templates/components/polaris-caption';

@tagName('p')
@classNames('Polaris-Caption')
@templateLayout(layout)
export default class PolarisCaption extends Component {
  /**
   * The content to use as a graph label or timestamp.
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @public
   * @property text
   * @type {String}
   * @default: null
   */
  text = null;

  'data-test-caption' = true;
}
