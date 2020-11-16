import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PolarisAppProviderService extends Service {
  @tracked _features = { newDesignLanguage: false };

  get features() {
    return this._features;
  }
  set features(features = {}) {
    this._features = { ...this._features, ...features };
  }
}
