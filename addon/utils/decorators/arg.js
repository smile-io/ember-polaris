/**
 * Decorator to set a default value for named arguments
 *
 * @arg myAttribute = 'default-value';
 *
 */
export function arg(target, key, descriptor) {
  return {
    get() {
      const argValue = this.args[key];
      return argValue !== undefined
        ? argValue
        : descriptor.initializer
        ? descriptor.initializer.call(this)
        : undefined;
    },
  };
}
