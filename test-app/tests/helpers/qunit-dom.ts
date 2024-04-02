// @ts-nocheck
/**
 * This is a temporary helper to work around the issue with `qunit-dom`'s `hasStyle` & `doesNotHaveStyle` assertions not supporting CSS variables.
 *
 * It is pretty much a rip of `qunit-dom`'s `hasStyle` & `doesNotHaveStyle` assertions with the added support for CSS variables.
 * Usage is the same as `qunit-dom`'s `hasStyle` & `doesNotHaveStyle` assertions, just uses `assert.customDom` instead.
 *
 *  ```
 *  assert.customDom('[data-test-box]').hasStyle({
 *    '--pc-box-padding-inline-start-xs': 'var(--p-space-200)',
 *  });
 * ```
 *
 * Referrences:
 * - https://github.com/mainmatter/qunit-dom/issues/1972
 * - https://github.com/mainmatter/qunit-dom/issues/1272
 * - https://github.com/mainmatter/qunit-dom/pull/1976
 */

export function setupCustomQunitDom(assert: Assert, options: SetupOptions = {}) {
  install(assert);

  const getRootElement =
    typeof options.getRootElement === 'function'
      ? options.getRootElement
      : () => document.querySelector('#ember-testing');

  overrideRootElement(getRootElement);
}

function install(assert: Assert) {
  assert.customDom = function (
    target?: string | Element | null,
    rootElement?: Element
  ): DOMAssertions {
    if (!isValidRootElement(rootElement)) {
      throw new Error(`${rootElement} is not a valid root element`);
    }

    rootElement = rootElement || this.dom.rootElement || getRootElement();

    if (arguments.length === 0) {
      target = rootElement instanceof Element ? rootElement : null;
    }

    return new CustomDOMAssertions(target, rootElement, this);
  };

  function isValidRootElement(element): element is Element {
    return (
      !element ||
      (typeof element === 'object' &&
        typeof element.querySelector === 'function' &&
        typeof element.querySelectorAll === 'function')
    );
  }
}

let _getRootElement: () => Element | null = () => null;

export function overrideRootElement(fn: () => Element) {
  _getRootElement = fn;
}

export function getRootElement() {
  return _getRootElement();
}

class CustomDOMAssertions {
  constructor(
    private target: string | Element | null,
    private rootElement: Element | Document,
    private testContext: Assert
  ) {}

  /**
   * Assert that the [HTMLElement][] has the `expected` style declarations using
   * [`window.getComputedStyle`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).
   *
   * @param {object} expected
   * @param {string?} message
   *
   * @example
   * assert.dom('.progress-bar').hasStyle({
   *   opacity: 1,
   *   display: 'block'
   * });
   *
   * @see {@link #hasClass}
   */
  hasStyle(expected: object, message?: string): DOMAssertions {
    return this.hasPseudoElementStyle(null, expected, message);
  }

  hasPseudoElementStyle(selector: string, expected: object, message?: string): DOMAssertions;

  /**
   * Assert that the pseudo element for `selector` of the [HTMLElement][] has the `expected` style declarations using
   * [`window.getComputedStyle`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).
   *
   * @param {string} selector
   * @param {object} expected
   * @param {string?} message
   *
   * @example
   * assert.dom('.progress-bar').hasPseudoElementStyle(':after', {
   *   content: '";"',
   * });
   *
   * @see {@link #hasClass}
   */
  hasPseudoElementStyle(
    selector: string | null,
    expected: Record<string, string>,
    message?: string
  ): DOMAssertions {
    const element = this.findTargetElement();
    if (!element) return this;

    const computedStyle = window.getComputedStyle(element, selector);

    let expectedVariableProperties: Record<string, string> = {};
    let expectedProperties: Record<string, string> = {};
    Object.entries(expected).forEach(([property, value]) => {
      if (property.startsWith('--')) {
        expectedVariableProperties[property] = value;
      } else {
        expectedProperties[property] = value;
      }
    });

    expectedProperties = Object.keys(expectedProperties) as CSSStyleDeclarationProperty[];
    expectedVariableProperties = Object.keys(
      expectedVariableProperties
    ) as CSSStyleDeclarationProperty[];
    if (expectedProperties.length <= 0 && expectedVariableProperties.length <= 0) {
      throw new TypeError(
        `Missing style expectations. There must be at least one style property in the passed in expectation object.`
      );
    }

    const resultForProperties = expectedProperties.every(
      (property) => computedStyle[property] === expected[property]
    );
    const resultForVariableProperties = expectedVariableProperties.every((property) => {
      return element.style.getPropertyValue(property) === expected[property];
    });

    const actual: ActualCSSStyleDeclaration = {};

    expectedProperties.forEach((property) => (actual[property] = computedStyle[property]));
    expectedVariableProperties.forEach(
      (property) => (actual[property] = element.style.getPropertyValue(property))
    );

    if (!message) {
      const normalizedSelector = selector ? selector.replace(/^:{0,2}/, '::') : '';
      message = `Element ${this.targetDescription}${normalizedSelector} has style "${JSON.stringify(
        expected
      )}"`;
    }

    this.pushResult({
      result: resultForProperties && resultForVariableProperties,
      actual,
      expected,
      message,
    });
    return this;
  }

  /**
   * Assert that the [HTMLElement][] does not have the `expected` style declarations using
   * [`window.getComputedStyle`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).
   *
   * @param {object} expected
   * @param {string?} message
   *
   * @example
   * assert.dom('.progress-bar').doesNotHaveStyle({
   *   opacity: 1,
   *   display: 'block'
   * });
   *
   * @see {@link #hasClass}
   */
  doesNotHaveStyle(expected: object, message?: string): DOMAssertions {
    return this.doesNotHavePseudoElementStyle(null, expected, message);
  }

  doesNotHavePseudoElementStyle(selector: string, expected: object, message: string): DOMAssertions;

  /**
   * Assert that the pseudo element for `selector` of the [HTMLElement][] does not have the `expected` style declarations using
   * [`window.getComputedStyle`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).
   *
   * @param {string} selector
   * @param {object} expected
   * @param {string?} message
   *
   * @example
   * assert.dom('.progress-bar').doesNotHavePseudoElementStyle(':after', {
   *   content: '";"',
   * });
   *
   * @see {@link #hasClass}
   */
  doesNotHavePseudoElementStyle(
    selector: string | null,
    expected: Record<string, unknown>,
    message: string
  ): DOMAssertions {
    const element = this.findTargetElement();
    if (!element) return this;

    const computedStyle = window.getComputedStyle(element, selector);

    let expectedVariableProperties: Record<string, string> = {};
    let expectedProperties: Record<string, string> = {};
    Object.entries(expected).forEach(([property, value]) => {
      if (property.startsWith('--')) {
        expectedVariableProperties[property] = value;
      } else {
        expectedProperties[property] = value;
      }
    });

    expectedProperties = Object.keys(expectedProperties) as CSSStyleDeclarationProperty[];
    expectedVariableProperties = Object.keys(
      expectedVariableProperties
    ) as CSSStyleDeclarationProperty[];
    if (expectedProperties.length <= 0 && expectedVariableProperties.length <= 0) {
      throw new TypeError(
        `Missing style expectations. There must be at least one style property in the passed in expectation object.`
      );
    }

    const resultForProperties = expectedProperties.some(
      (property) => computedStyle[property] !== expected[property]
    );
    const resultForVariableProperties = expectedVariableProperties.some((property) => {
      return element.style.getPropertyValue(property) !== expected[property];
    });

    const actual: ActualCSSStyleDeclaration = {};

    expectedProperties.forEach((property) => (actual[property] = computedStyle[property]));
    expectedVariableProperties.forEach(
      (property) => (actual[property] = element.style.getPropertyValue(property))
    );

    if (!message) {
      const normalizedSelector = selector ? selector.replace(/^:{0,2}/, '::') : '';
      message = `Element ${
        this.targetDescription
      }${normalizedSelector} does not have style "${JSON.stringify(expected)}"`;
    }

    this.pushResult({
      result: resultForProperties && resultForVariableProperties,
      actual,
      expected,
      message,
    });
    return this;
  }

  /**
   * @private
   */
  private pushResult(result: AssertionResult): void {
    this.testContext.pushResult(result);
  }

  /**
   * Finds a valid HTMLElement from target, or pushes a failing assertion if a valid
   * element is not found.
   * @private
   * @returns (HTMLElement|null) a valid HTMLElement, or null
   */
  private findTargetElement(): Element | null {
    const el = this.findElement();

    if (el === null) {
      const message = `Element ${this.target || '<unknown>'} should exist`;
      this.pushResult({ message, result: false, actual: undefined, expected: undefined });
      return null;
    }

    return el;
  }

  /**
   * Finds a valid HTMLElement from target
   * @private
   * @returns (HTMLElement|null) a valid HTMLElement, or null
   * @throws TypeError will be thrown if target is an unrecognized type
   */
  private findElement(): Element | null {
    if (this.target === null) {
      return null;
    } else if (typeof this.target === 'string') {
      return this.rootElement.querySelector(this.target);
    } else if (this.target instanceof Element) {
      return this.target;
    } else {
      throw new TypeError(`Unexpected Parameter: ${this.target}`);
    }
  }
}
