import { classNames, layout as templateLayout } from "@ember-decorators/component";
import Component from '@ember/component';
import layout from '../../templates/components/polaris-layout/annotation-content';

@classNames('Polaris-Layout__AnnotationContent')
@templateLayout(layout)
export default class AnnotationContent extends Component {
 /**
  * Inner content of the section
  *
  * This component can be used in block form,
  * in which case the block content will be used
  * instead of `text`
  *
  * @property text
  * @type {string}
  * @default: null
  * @public
  */
 text = null;
}
