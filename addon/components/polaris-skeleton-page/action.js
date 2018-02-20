import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import layout from '../../templates/components/polaris-skeleton-page/action';

export default Component.extend({
  classNames: ['Polaris-SkeletonPage__Action'],
  attributeBindings: ['style'],

  layout,

  width: computed(function() {
    return Math.round(Math.random() * 40 + 60);
  }).readOnly(),

  style: computed('width', function() {
    return htmlSafe(`width: ${ this.get('width') }px;`);
  }).readOnly(),
});
