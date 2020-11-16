/**
 * Decorator to set a default value for named arguments
 *
 * @argWithDefault('default-value')
 * myAttribute;
 *
 */
export function argWithDefault(defaultValue) {
  return function (object, property) {
    return {
      get() {
        return this.args[property] ?? defaultValue;
      },
    };
  };
}
