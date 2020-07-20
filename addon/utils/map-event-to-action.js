import { invokeAction } from 'ember-invoke-action';
import { assign } from '@ember/polyfills';

const defaultOptions = {
  preventDefault: true,
  stopPropagation: false,
};

export default function mapEventToAction(actionName, options, ...args) {
  options = assign({}, defaultOptions, options);
  return function (event) {
    if (options.preventDefault) {
      event.preventDefault();
    }

    if (options.stopPropagation) {
      event.stopPropagation();
    }

    return invokeAction(this, actionName, ...args);
  };
}
