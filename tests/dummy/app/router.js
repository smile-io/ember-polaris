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

  this.route('dropzone');
  this.route('annotated-layout');
});

export default Router;
