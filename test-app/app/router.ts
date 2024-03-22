import EmberRouter from '@ember/routing/router';
import config from 'test-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('box');
  this.route('grid');
  this.route('shadow-bevel');
  this.route('text');
});
