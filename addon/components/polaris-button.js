import Ember from 'ember';
import layout from '../templates/components/polaris-button';

const { Component } = Ember;

export default Component.extend({
  tagName: 'button',
  attributeBindings: [ 'type' ],
  classNames: [ 'Polaris-Button' ],

  layout,

  type: 'button'
});
