import Ember from 'ember';
import layout from '../../templates/components/polaris-layout/annotated-section';

const {
  Component,
} = Ember;

export default Component.extend({
  classNames: ['Polaris-Layout__AnnotatedSection'],

  layout,

  title: null,
  description: null,
  text: null,
});
