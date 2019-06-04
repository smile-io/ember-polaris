import { attribute, className, classNames, tagName, layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember/object";
import { equal } from "@ember/object/computed";
import Component from '@ember/component';
import { isEmpty } from '@ember/utils';
import { classify } from '@ember/string';
import layout from '../templates/components/polaris-icon';
import SvgHandling from '../mixins/components/svg-handling';

// TODO: look into importing icons properly.
@tagName('span')
@classNames('Polaris-Icon')
@templateLayout(layout)
export default class PolarisIcon extends Component.extend(SvgHandling) {
 /**
  * The SVG contents to display in the icon
  * If the source doesn't have a slash in the name, it will look for Polaris
  * icons in the namespace specified by `sourcePath` property.
  *
  * @property source
  * @public
  * @type {string}
  * @default null
  */
 source = null;

 /**
  * Sets the color for the SVG fill
  *
  * @property color
  * @public
  * @type {string}
  * @default null
  */
 color = null;

 /**
  * Show a backdrop behind the icon
  *
  * @property backdrop
  * @public
  * @type {boolean}
  * @default false
  */
 @className("Polaris-Icon--hasBackdrop")
 backdrop = false;

 /**
  * Descriptive text to be read to screenreaders
  *
  * @property accessibilityLabel
  * @public
  * @type {string}
  * @default null
  */
 @attribute("aria-label")
 accessibilityLabel = null;

 /**
  * Path under which `ember-svg-jar` serves the Polaris SVG icons
  *
  * @property sourcePath
  * @public
  * @type {string}
  * @default 'polaris'
  */
 sourcePath = 'polaris';

 'data-test-icon' = true;

 /**
  * Whether the component should leave space for an icon
  *
  * @property showPlaceholder
  * @private
  * @type {boolean}
  */
 @(equal('source', 'placeholder').readOnly())
 showPlaceholder;

 /**
  * Class to apply to color the icon
  *
  * @property colorClass
  * @private
  * @type {string}
  */
 @(computed('color').readOnly())
 @className
 get colorClass() {
   let color = this.get('color');

   if (isEmpty(color)) {
     return null;
   }

   return `Polaris-Icon--color${classify(color)}`;
 }

 /**
  * Whether a color has been specified for the icon
  *
  * @property isColored
  * @private
  * @type {boolean}
  */
 @(computed('color').readOnly())
 @className("Polaris-Icon--isColored")
 get isColored() {
   let color = this.get('color');

   if (isEmpty(color)) {
     return false;
   }

   return color !== 'white';
 }

 /**
  * Final source for the icon SVG
  *
  * @property iconSource
  * @private
  * @type {string}
  */
 @(computed('sourcePath', 'source').readOnly())
 get iconSource() {
   let source = this.get('source');
   source =
     source.indexOf('/') === -1
       ? `${this.get('sourcePath')}/${source}`
       : source;

   return source;
 }
}
