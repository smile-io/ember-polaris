import Component from '@ember/component';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-layout/annotation-content';
import deprecateClassArgument from '../../utils/deprecate-class-argument';

@deprecateClassArgument
@tagName('')
@templateLayout(layout)
export default class PolarisLayoutAnnotationContent extends Component {
  /**
   * Inner content of the section
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
