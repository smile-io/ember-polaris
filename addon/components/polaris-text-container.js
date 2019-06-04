import { className, classNames, layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember/object";
import Component from '@ember/component';
import { classify } from '@ember/string';
import layout from '../templates/components/polaris-text-container';

const allowedSpacings = ['tight', 'loose'];

/**
 * Undocumented Polaris text container component.
 */
@classNames('Polaris-TextContainer')
@templateLayout(layout)
export default class PolarisTextContainer extends Component {
 /**
  * The text to display.
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

 /**
  * The amount of vertical spacing children will get between them.
  *
  * @property spacing
  * @type {string}
  * @default null
  * @public
  */
 spacing = null;

 /**
  * @private
  */
 @(computed('spacing').readOnly())
 @className
 get spacingClass() {
   let spacing = this.get('spacing');
   if (allowedSpacings.indexOf(spacing) > -1) {
     return `Polaris-TextContainer--spacing${classify(spacing)}`;
   }

   return null;
 }
}
