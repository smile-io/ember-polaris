import Component from '@ember/component';
import { tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-caption';
import TaglessCssDeprecation from '../mixins/tagless-css-deprecation';

@tagName('')
@layout(template)
export default class PolarisCaption extends Component.extend(
  TaglessCssDeprecation
) {
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
