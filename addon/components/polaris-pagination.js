import { attribute, className, classNames, tagName, layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember/object";
import { not, and } from "@ember/object/computed";
import Component from '@ember/component';
import { isArray } from '@ember/array';
import { assert } from '@ember/debug';
import { isEmpty } from '@ember/utils';
import layout from '../templates/components/polaris-pagination';
import { handleMouseUpByBlurring } from '../utils/focus';

@tagName('nav')
@classNames('Polaris-Pagination')
@templateLayout(layout)
export default class PolarisPagination extends Component {
 /**
  * A more subdued control for use in headers
  *
  * @property plain
  * @type {Boolean}
  * @default false
  * @public
  */
 @className("Polaris-Pagination--plain")
 plain = false;

 /**
  * The URL of the next page
  *
  * TODO not implemented
  * @property nextUrl
  * @type {String}
  * @default null
  * @public
  */
 nextUrl = null;

 /**
  * The URL of the previous page
  *
  * TODO not implemented
  * @property previousUrl
  * @type {String}
  * @default null
  * @public
  */
 previousUrl = null;

 /**
  * Whether there is a next page to show
  *
  * @property hasNext
  * @type {Boolean}
  * @default false
  * @public
  */
 hasNext = false;

 /**
  * Whether there is a previous page to show
  *
  * @property hasPrevious
  * @type {Boolean}
  * @default false
  * @public
  */
 hasPrevious = false;

 /**
  * Visually hidden text for screen readers
  *
  * @property accessibilityLabel
  * @type {string}
  * @default 'Pagination'
  * @public
  */
 @attribute("aria-label")
 accessibilityLabel = 'Pagination';

 /**
  * Keyboard shortcuts for the previous button
  *
  * @property previousKeys
  * @type {KeyEvent.code[]}
  * @default null
  * @public
  */
 previousKeys = null;

 /**
  * Keyboard shortcuts for the next button
  *
  * @property nextKeys
  * @type {KeyEvent.code[]}
  * @default null
  * @public
  */
 nextKeys = null;

 /**
  * Callback when next button is clicked
  *
  * @property onNext
  * @type {function}
  * @default no-op
  * @public
  */
 onNext() {}

 /**
  * Callback when previous button is clicked
  *
  * @property onPrevious
  * @type {function}
  * @default no-op
  * @public
  */
 onPrevious() {}

 /** @private */
 handleMouseUpByBlurring = handleMouseUpByBlurring;

 /** @private */
 @(not('hasPrevious').readOnly())
 isPreviousDisabled;

 /** @private */
 @(not('hasNext').readOnly())
 isNextDisabled;

 /** @private */
 @(computed('nextKeys.[]').readOnly())
 get hasNextKeysConfigured() {
   if (isEmpty(this.nextKeys)) {
     return false;
   }

   assert(
     isArray(this.nextKeys),
     'ember-polaris:polaris-pagination `nextKeys` should be an array'
   );

   return true;
 }

 /** @private */
 @(computed('previousKeys.[]').readOnly())
 get hasPreviousKeysConfigured() {
   if (isEmpty(this.previousKeys)) {
     return false;
   }

   assert(
     isArray(this.previousKeys),
     'ember-polaris:polaris-pagination `previousKeys` should be an array'
   );

   return true;
 }

 /** @private */
 @(and('hasNext', 'hasNextKeysConfigured', 'onNext').readOnly())
 isNextKeyListenerEnabled;

 /** @private */
 @(and('hasPrevious', 'hasPreviousKeysConfigured', 'onPrevious').readOnly())
 isPreviousKeyListenerEnabled;
}
