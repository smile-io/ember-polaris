import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PolarisAppProviderService extends Service {
  @tracked _features = { newDesignLanguage: false };

  get features() {
    console.log(this._features, 'get features');
    return this._features;
  }
  set features(features = {}) {
    console.log('setting features');
    this._features = { ...this._features, ...features };
  }
}
