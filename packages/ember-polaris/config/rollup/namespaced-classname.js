const { basename } = require('path');

const { camelCase, pascalCase } = require('change-case');

const COMPONENT_REGEX = /^[A-Z]\w+$/;
const SUBCOMPONENT_VARIATION_SELECTOR = /^\w+-\w+$/;
const NESTED_COMPONENT_PATH_REGEX = /.*\/components\/(.*)\/(.*)\//;

module.exports.generateScopedName = function generateScopedName({
  includeHash = false,
} = {}) {
  return (name, filename) => {
    const componentName = pascalCase(basename(filename, '.scss'));
    const nestedComponentMatch = NESTED_COMPONENT_PATH_REGEX.exec(filename);

    const polarisComponentName =
      nestedComponentMatch && nestedComponentMatch.length > 1
        ? `${polarisClassName(
            pascalCase(nestedComponentMatch[1]),
          )}-${componentName}`
        : polarisClassName(componentName);

    let className;

    if (isComponent(name)) {
      className =
        componentName === name
          ? polarisComponentName
          : subcomponentClassName(polarisComponentName, name);
    } else if (SUBCOMPONENT_VARIATION_SELECTOR.test(name)) {
      const [subcomponent, variation] = name.split('-');
      const subcomponentName = subcomponentClassName(
        polarisComponentName,
        subcomponent,
      );
      className = variationClassName(subcomponentName, camelCase(variation));
    } else {
      className = variationClassName(polarisComponentName, camelCase(name));
    }

    const suffix = includeHash
      ? `_${stringHash(name).toString(36).substr(0, 5)}`
      : '';

    return className + suffix;
  };
};

function isComponent(className) {
  return COMPONENT_REGEX.test(className);
}

function polarisClassName(className) {
  // Temporarily removing Polaris while we migrate to this addon and sunset the old one.
  // return `Polaris-${className}`;
  return `${className}`;
}

function subcomponentClassName(component, subcomponent) {
  return `${component}__${subcomponent}`;
}

function variationClassName(component, variation) {
  return `${component}--${variation}`;
}

// Taken from the string-hash package
function stringHash(str) {
  let hash = 5381;
  let i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  return hash >>> 0;
}
