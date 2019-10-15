import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('test', function() {
    this.route('child', function() {});
  });

  this.route('layout', function() {
    this.route('annotated-layout');
  });

  this.route('dropzone');
  this.route('sticky');
  this.route('select');

  this.route('resource-list', function() {});
  this.route('color-picker');
});

export default Router;
