import { get } from '@ember/object';
import Service from '@ember/service';

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

  generateURL(routeName, models = [] /*, queryParams */) {
    let url = [
      routeName.replace(/\./g, '/'),
      ...models.map((model) => {
        return get(model, 'id') || model;
      }),
    ].join('/');

    return url;
  },
});

export default function (registry, availableRoutes) {
  StubbedRoutingService.reopenClass({
    _availableRoutes: availableRoutes,
  });

  registry.register('service:-routing', StubbedRoutingService);
}
