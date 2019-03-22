import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../templates/components/polaris-button/content';

/**
 * Internal component to keep rendering button content DRY.
 */
export default Component.extend({
  tagName: 'span',
  classNames: ['Polaris-Button__Content'],

  layout,

  // Properties passed down from parent polaris-button component.
  text: null,
  primary: false,
  destructive: false,
  loading: false,
  disclosure: false,
  icon: null,

  spinnerColor: computed('primary', 'destructive', function() {
    let { primary, destructive } = this.getProperties('primary', 'destructive');
    return primary || destructive ? 'white' : 'inkLightest';
  }).readOnly(),
});
