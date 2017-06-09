import { invokeAction } from 'ember-invoke-action';

export default function mapEventToAction(actionName, options = { preventDefault: true }, ...args) {
  return function(event) {
    if (options.preventDefault) {
      event.preventDefault();
    }

    return invokeAction(this, actionName, ...args);
  };
}
