import Ember from 'ember';

const {
  Service,
} = Ember;

const StubbedRoutingService = Service.extend({
  _availableRoutes: null,

  availableRoutes() {
    return this.get('_availableRoutes');
  },

  hasRoute(name) {
    return this.availableRoutes().contains(name);
  },

  isActiveForRoute() {
    // TODO
    return true;
  },

  generateURL(routeName /*, models, queryParams */) {
    return routeName.replace('.', '/');
  },
});

export default function(registry, availableRoutes) {
  StubbedRoutingService.reopenClass({
    _availableRoutes: availableRoutes
  });

  registry.register('service:-routing', StubbedRoutingService);
}
