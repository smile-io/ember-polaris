

(function() {
/*!
 * @overview  Ember - JavaScript Application Framework
 * @copyright Copyright 2011 Tilde Inc. and contributors
 *            Portions Copyright 2006-2011 Strobe Inc.
 *            Portions Copyright 2008-2011 Apple Inc. All rights reserved.
 * @license   Licensed under MIT license
 *            See https://raw.github.com/emberjs/ember.js/master/LICENSE
 * @version   5.2.0
 */
/* eslint-disable no-var */
/* globals global globalThis self */
/* eslint-disable-next-line no-unused-vars */
var define, require;
(function () {
  var globalObj = typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : null;
  if (globalObj === null) {
    throw new Error('unable to locate global object');
  }
  if (typeof globalObj.define === 'function' && typeof globalObj.require === 'function') {
    define = globalObj.define;
    require = globalObj.require;
    return;
  }
  var registry = Object.create(null);
  var seen = Object.create(null);
  function missingModule(name, referrerName) {
    if (referrerName) {
      throw new Error('Could not find module ' + name + ' required by: ' + referrerName);
    } else {
      throw new Error('Could not find module ' + name);
    }
  }
  function internalRequire(_name, referrerName) {
    var name = _name;
    var mod = registry[name];
    if (!mod) {
      name = name + '/index';
      mod = registry[name];
    }
    var exports = seen[name];
    if (exports !== undefined) {
      return exports;
    }
    exports = seen[name] = {};
    if (!mod) {
      missingModule(_name, referrerName);
    }
    var deps = mod.deps;
    var callback = mod.callback;
    var reified = new Array(deps.length);
    for (var i = 0; i < deps.length; i++) {
      if (deps[i] === 'exports') {
        reified[i] = exports;
      } else if (deps[i] === 'require') {
        reified[i] = require;
      } else {
        reified[i] = require(deps[i], name);
      }
    }
    callback.apply(this, reified);
    return exports;
  }
  require = function (name) {
    return internalRequire(name, null);
  };
  define = function (name, deps, callback) {
    registry[name] = {
      deps: deps,
      callback: callback
    };
  };

  // setup `require` module
  require['default'] = require;
  require.has = function registryHas(moduleName) {
    return Boolean(registry[moduleName]) || Boolean(registry[moduleName + '/index']);
  };
  require._eak_seen = require.entries = registry;
})();
define("@ember/debug/index", ["exports", "@ember/-internals/browser-environment", "@ember/debug/lib/deprecate", "@ember/debug/lib/testing", "@ember/debug/lib/warn", "@ember/debug/lib/inspect", "@ember/debug/lib/capture-render-tree"], function (_exports, _browserEnvironment, _deprecate2, _testing, _warn2, _inspect, _captureRenderTree) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.assert = _exports._warnIfUsingStrippedFeatureFlags = void 0;
  Object.defineProperty(_exports, "captureRenderTree", {
    enumerable: true,
    get: function () {
      return _captureRenderTree.default;
    }
  });
  _exports.info = _exports.getDebugFunction = _exports.deprecateFunc = _exports.deprecate = _exports.debugSeal = _exports.debugFreeze = _exports.debug = void 0;
  Object.defineProperty(_exports, "inspect", {
    enumerable: true,
    get: function () {
      return _inspect.default;
    }
  });
  Object.defineProperty(_exports, "isTesting", {
    enumerable: true,
    get: function () {
      return _testing.isTesting;
    }
  });
  Object.defineProperty(_exports, "registerDeprecationHandler", {
    enumerable: true,
    get: function () {
      return _deprecate2.registerHandler;
    }
  });
  Object.defineProperty(_exports, "registerWarnHandler", {
    enumerable: true,
    get: function () {
      return _warn2.registerHandler;
    }
  });
  _exports.setDebugFunction = _exports.runInDebug = void 0;
  Object.defineProperty(_exports, "setTesting", {
    enumerable: true,
    get: function () {
      return _testing.setTesting;
    }
  });
  _exports.warn = void 0;
  // These are the default production build versions:
  var noop = () => {};
  // SAFETY: these casts are just straight-up lies, but the point is that they do
  // not do anything in production builds.
  var assert = noop;
  _exports.assert = assert;
  var info = noop;
  _exports.info = info;
  var warn = noop;
  _exports.warn = warn;
  var debug = noop;
  _exports.debug = debug;
  var deprecate = noop;
  _exports.deprecate = deprecate;
  var debugSeal = noop;
  _exports.debugSeal = debugSeal;
  var debugFreeze = noop;
  _exports.debugFreeze = debugFreeze;
  var runInDebug = noop;
  _exports.runInDebug = runInDebug;
  var setDebugFunction = noop;
  _exports.setDebugFunction = setDebugFunction;
  var getDebugFunction = noop;
  _exports.getDebugFunction = getDebugFunction;
  var deprecateFunc = function () {
    return arguments[arguments.length - 1];
  };
  _exports.deprecateFunc = deprecateFunc;
  if (true /* DEBUG */) {
    _exports.setDebugFunction = setDebugFunction = function (type, callback) {
      switch (type) {
        case 'assert':
          return _exports.assert = assert = callback;
        case 'info':
          return _exports.info = info = callback;
        case 'warn':
          return _exports.warn = warn = callback;
        case 'debug':
          return _exports.debug = debug = callback;
        case 'deprecate':
          return _exports.deprecate = deprecate = callback;
        case 'debugSeal':
          return _exports.debugSeal = debugSeal = callback;
        case 'debugFreeze':
          return _exports.debugFreeze = debugFreeze = callback;
        case 'runInDebug':
          return _exports.runInDebug = runInDebug = callback;
        case 'deprecateFunc':
          return _exports.deprecateFunc = deprecateFunc = callback;
      }
    };
    _exports.getDebugFunction = getDebugFunction = function (type) {
      switch (type) {
        case 'assert':
          return assert;
        case 'info':
          return info;
        case 'warn':
          return warn;
        case 'debug':
          return debug;
        case 'deprecate':
          return deprecate;
        case 'debugSeal':
          return debugSeal;
        case 'debugFreeze':
          return debugFreeze;
        case 'runInDebug':
          return runInDebug;
        case 'deprecateFunc':
          return deprecateFunc;
      }
    };
  }
  /**
  @module @ember/debug
  */
  if (true /* DEBUG */) {
    // eslint-disable-next-line no-inner-declarations
    function _assert(desc, test) {
      if (!test) {
        throw new Error(`Assertion Failed: ${desc}`);
      }
    }
    setDebugFunction('assert', _assert);
    /**
      Display a debug notice.
         Calls to this function are not invoked in production builds.
         ```javascript
      import { debug } from '@ember/debug';
         debug('I\'m a debug notice!');
      ```
         @method debug
      @for @ember/debug
      @static
      @param {String} message A debug message to display.
      @public
    */
    setDebugFunction('debug', function debug(message) {
      console.debug(`DEBUG: ${message}`); /* eslint-disable-line no-console */
    });
    /**
      Display an info notice.
         Calls to this function are removed from production builds, so they can be
      freely added for documentation and debugging purposes without worries of
      incuring any performance penalty.
         @method info
      @private
    */
    setDebugFunction('info', function info() {
      console.info(...arguments); /* eslint-disable-line no-console */
    });
    /**
     @module @ember/debug
     @public
    */
    /**
      Alias an old, deprecated method with its new counterpart.
         Display a deprecation warning with the provided message and a stack trace
      (Chrome and Firefox only) when the assigned method is called.
         Calls to this function are removed from production builds, so they can be
      freely added for documentation and debugging purposes without worries of
      incuring any performance penalty.
         ```javascript
      import { deprecateFunc } from '@ember/debug';
         Ember.oldMethod = deprecateFunc('Please use the new, updated method', options, Ember.newMethod);
      ```
         @method deprecateFunc
      @static
      @for @ember/debug
      @param {String} message A description of the deprecation.
      @param {Object} [options] The options object for `deprecate`.
      @param {Function} func The new function called to replace its deprecated counterpart.
      @return {Function} A new function that wraps the original function with a deprecation warning
      @private
    */
    setDebugFunction('deprecateFunc', function deprecateFunc() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (args.length === 3) {
        var [message, options, func] = args;
        return function () {
          deprecate(message, false, options);
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          return func.apply(this, args);
        };
      } else {
        var [_message, _func] = args;
        return function () {
          deprecate(_message);
          return _func.apply(this, arguments);
        };
      }
    });
    /**
     @module @ember/debug
     @public
    */
    /**
      Run a function meant for debugging.
         Calls to this function are removed from production builds, so they can be
      freely added for documentation and debugging purposes without worries of
      incuring any performance penalty.
         ```javascript
      import Component from '@ember/component';
      import { runInDebug } from '@ember/debug';
         runInDebug(() => {
        Component.reopen({
          didInsertElement() {
            console.log("I'm happy");
          }
        });
      });
      ```
         @method runInDebug
      @for @ember/debug
      @static
      @param {Function} func The function to be executed.
      @since 1.5.0
      @public
    */
    setDebugFunction('runInDebug', function runInDebug(func) {
      func();
    });
    setDebugFunction('debugSeal', function debugSeal(obj) {
      Object.seal(obj);
    });
    setDebugFunction('debugFreeze', function debugFreeze(obj) {
      // re-freezing an already frozen object introduces a significant
      // performance penalty on Chrome (tested through 59).
      //
      // See: https://bugs.chromium.org/p/v8/issues/detail?id=6450
      if (!Object.isFrozen(obj)) {
        Object.freeze(obj);
      }
    });
    setDebugFunction('deprecate', _deprecate2.default);
    setDebugFunction('warn', _warn2.default);
  }
  var _warnIfUsingStrippedFeatureFlags;
  _exports._warnIfUsingStrippedFeatureFlags = _warnIfUsingStrippedFeatureFlags;
  if (true /* DEBUG */ && !(0, _testing.isTesting)()) {
    if (typeof window !== 'undefined' && (_browserEnvironment.isFirefox || _browserEnvironment.isChrome) && window.addEventListener) {
      window.addEventListener('load', () => {
        if (document.documentElement && document.documentElement.dataset && !document.documentElement.dataset['emberExtension']) {
          var downloadURL;
          if (_browserEnvironment.isChrome) {
            downloadURL = 'https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi';
          } else if (_browserEnvironment.isFirefox) {
            downloadURL = 'https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/';
          }
          debug(`For more advanced debugging, install the Ember Inspector from ${downloadURL}`);
        }
      }, false);
    }
  }
});
define("@ember/debug/lib/capture-render-tree", ["exports", "@glimmer/util"], function (_exports, _util) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = captureRenderTree;
  /**
    @module @ember/debug
  */
  /**
    Ember Inspector calls this function to capture the current render tree.
  
    In production mode, this requires turning on `ENV._DEBUG_RENDER_TREE`
    before loading Ember.
  
    @private
    @static
    @method captureRenderTree
    @for @ember/debug
    @param app {ApplicationInstance} An `ApplicationInstance`.
    @since 3.14.0
  */
  function captureRenderTree(app) {
    // SAFETY: Ideally we'd assert here but that causes awkward circular requires since this is also in @ember/debug.
    // This is only for debug stuff so not very risky.
    var renderer = (0, _util.expect)(app.lookup('renderer:-dom'), `BUG: owner is missing renderer`);
    return renderer.debugRenderTree.capture();
  }
});
define("@ember/debug/lib/deprecate", ["exports", "@ember/-internals/environment", "@ember/debug/index", "@ember/debug/lib/handlers"], function (_exports, _environment, _index, _handlers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.registerHandler = _exports.missingOptionsIdDeprecation = _exports.missingOptionsDeprecation = _exports.missingOptionDeprecation = _exports.default = void 0;
  /**
   @module @ember/debug
   @public
  */
  /**
    Allows for runtime registration of handler functions that override the default deprecation behavior.
    Deprecations are invoked by calls to [@ember/debug/deprecate](/ember/release/classes/@ember%2Fdebug/methods/deprecate?anchor=deprecate).
    The following example demonstrates its usage by registering a handler that throws an error if the
    message contains the word "should", otherwise defers to the default handler.
  
    ```javascript
    import { registerDeprecationHandler } from '@ember/debug';
  
    registerDeprecationHandler((message, options, next) => {
      if (message.indexOf('should') !== -1) {
        throw new Error(`Deprecation message with should: ${message}`);
      } else {
        // defer to whatever handler was registered before this one
        next(message, options);
      }
    });
    ```
  
    The handler function takes the following arguments:
  
    <ul>
      <li> <code>message</code> - The message received from the deprecation call.</li>
      <li> <code>options</code> - An object passed in with the deprecation call containing additional information including:</li>
        <ul>
          <li> <code>id</code> - An id of the deprecation in the form of <code>package-name.specific-deprecation</code>.</li>
          <li> <code>until</code> - The Ember version number the feature and deprecation will be removed in.</li>
        </ul>
      <li> <code>next</code> - A function that calls into the previously registered handler.</li>
    </ul>
  
    @public
    @static
    @method registerDeprecationHandler
    @for @ember/debug
    @param handler {Function} A function to handle deprecation calls.
    @since 2.1.0
  */
  var registerHandler = () => {};
  _exports.registerHandler = registerHandler;
  var missingOptionsDeprecation;
  _exports.missingOptionsDeprecation = missingOptionsDeprecation;
  var missingOptionsIdDeprecation;
  _exports.missingOptionsIdDeprecation = missingOptionsIdDeprecation;
  var missingOptionDeprecation = () => '';
  _exports.missingOptionDeprecation = missingOptionDeprecation;
  var deprecate = () => {};
  if (true /* DEBUG */) {
    _exports.registerHandler = registerHandler = function registerHandler(handler) {
      (0, _handlers.registerHandler)('deprecate', handler);
    };
    var formatMessage = function formatMessage(_message, options) {
      var message = _message;
      if (options?.id) {
        message = message + ` [deprecation id: ${options.id}]`;
      }
      if (options?.until) {
        message = message + ` This will be removed in ${options.for} ${options.until}.`;
      }
      if (options?.url) {
        message += ` See ${options.url} for more details.`;
      }
      return message;
    };
    registerHandler(function logDeprecationToConsole(message, options) {
      var updatedMessage = formatMessage(message, options);
      console.warn(`DEPRECATION: ${updatedMessage}`); // eslint-disable-line no-console
    });

    var captureErrorForStack;
    if (new Error().stack) {
      captureErrorForStack = () => new Error();
    } else {
      captureErrorForStack = () => {
        try {
          __fail__.fail();
          return;
        } catch (e) {
          return e;
        }
      };
    }
    registerHandler(function logDeprecationStackTrace(message, options, next) {
      if (_environment.ENV.LOG_STACKTRACE_ON_DEPRECATION) {
        var stackStr = '';
        var error = captureErrorForStack();
        var stack;
        if (error instanceof Error) {
          if (error.stack) {
            if (error['arguments']) {
              // Chrome
              stack = error.stack.replace(/^\s+at\s+/gm, '').replace(/^([^(]+?)([\n$])/gm, '{anonymous}($1)$2').replace(/^Object.<anonymous>\s*\(([^)]+)\)/gm, '{anonymous}($1)').split('\n');
              stack.shift();
            } else {
              // Firefox
              stack = error.stack.replace(/(?:\n@:0)?\s+$/m, '').replace(/^\(/gm, '{anonymous}(').split('\n');
            }
            stackStr = `\n    ${stack.slice(2).join('\n    ')}`;
          }
        }
        var updatedMessage = formatMessage(message, options);
        console.warn(`DEPRECATION: ${updatedMessage}${stackStr}`); // eslint-disable-line no-console
      } else {
        next(message, options);
      }
    });
    registerHandler(function raiseOnDeprecation(message, options, next) {
      if (_environment.ENV.RAISE_ON_DEPRECATION) {
        var updatedMessage = formatMessage(message);
        throw new Error(updatedMessage);
      } else {
        next(message, options);
      }
    });
    _exports.missingOptionsDeprecation = missingOptionsDeprecation = 'When calling `deprecate` you ' + 'must provide an `options` hash as the third parameter.  ' + '`options` should include `id` and `until` properties.';
    _exports.missingOptionsIdDeprecation = missingOptionsIdDeprecation = 'When calling `deprecate` you must provide `id` in options.';
    _exports.missingOptionDeprecation = missingOptionDeprecation = (id, missingOption) => {
      return `When calling \`deprecate\` you must provide \`${missingOption}\` in options. Missing options.${missingOption} in "${id}" deprecation`;
    };
    /**
     @module @ember/debug
     @public
     */
    /**
      Display a deprecation warning with the provided message and a stack trace
      (Chrome and Firefox only).
         Ember itself leverages [Semantic Versioning](https://semver.org) to aid
      projects in keeping up with changes to the framework. Before any
      functionality or API is removed, it first flows linearly through a
      deprecation staging process. The staging process currently contains two
      stages: available and enabled.
         Deprecations are initially released into the 'available' stage.
      Deprecations will stay in this stage until the replacement API has been
      marked as a recommended practice via the RFC process and the addon
      ecosystem has generally adopted the change.
         Once a deprecation meets the above criteria, it will move into the
      'enabled' stage where it will remain until the functionality or API is
      eventually removed.
         For application and addon developers, "available" deprecations are not
      urgent and "enabled" deprecations require action.
         * In a production build, this method is defined as an empty function (NOP).
      Uses of this method in Ember itself are stripped from the ember.prod.js build.
         ```javascript
      import { deprecate } from '@ember/debug';
         deprecate(
        'Use of `assign` has been deprecated. Please use `Object.assign` or the spread operator instead.',
        false,
        {
          id: 'ember-polyfills.deprecate-assign',
          until: '5.0.0',
          url: 'https://deprecations.emberjs.com/v4.x/#toc_ember-polyfills-deprecate-assign',
          for: 'ember-source',
          since: {
            available: '4.0.0',
            enabled: '4.0.0',
          },
        }
      );
      ```
         @method deprecate
      @for @ember/debug
      @param {String} message A description of the deprecation.
      @param {Boolean} test A boolean. If falsy, the deprecation will be displayed.
      @param {Object} options
      @param {String} options.id A unique id for this deprecation. The id can be
        used by Ember debugging tools to change the behavior (raise, log or silence)
        for that specific deprecation. The id should be namespaced by dots, e.g.
        "view.helper.select".
      @param {string} options.until The version of Ember when this deprecation
        warning will be removed.
      @param {String} options.for A namespace for the deprecation, usually the package name
      @param {Object} options.since Describes when the deprecation became available and enabled.
      @param {String} [options.url] An optional url to the transition guide on the
            emberjs.com website.
      @static
      @public
      @since 1.0.0
    */
    deprecate = function deprecate(message, test, options) {
      (0, _index.assert)(missingOptionsDeprecation, Boolean(options && (options.id || options.until)));
      (0, _index.assert)(missingOptionsIdDeprecation, Boolean(options.id));
      (0, _index.assert)(missingOptionDeprecation(options.id, 'until'), Boolean(options.until));
      (0, _index.assert)(missingOptionDeprecation(options.id, 'for'), Boolean(options.for));
      (0, _index.assert)(missingOptionDeprecation(options.id, 'since'), Boolean(options.since));
      (0, _handlers.invoke)('deprecate', message, test, options);
    };
  }
  var _default = deprecate;
  _exports.default = _default;
});
define("@ember/debug/lib/handlers", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.registerHandler = _exports.invoke = _exports.HANDLERS = void 0;
  var HANDLERS = {};
  _exports.HANDLERS = HANDLERS;
  var registerHandler = function registerHandler(_type, _callback) {};
  _exports.registerHandler = registerHandler;
  var invoke = () => {};
  _exports.invoke = invoke;
  if (true /* DEBUG */) {
    _exports.registerHandler = registerHandler = function registerHandler(type, callback) {
      var nextHandler = HANDLERS[type] || (() => {});
      HANDLERS[type] = (message, options) => {
        callback(message, options, nextHandler);
      };
    };
    _exports.invoke = invoke = function invoke(type, message, test, options) {
      if (test) {
        return;
      }
      var handlerForType = HANDLERS[type];
      if (handlerForType) {
        handlerForType(message, options);
      }
    };
  }
});
define("@ember/debug/lib/inspect", ["exports", "@glimmer/util", "@ember/debug"], function (_exports, _util, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = inspect;
  var {
    toString: objectToString
  } = Object.prototype;
  var {
    toString: functionToString
  } = Function.prototype;
  var {
    isArray
  } = Array;
  var {
    keys: objectKeys
  } = Object;
  var {
    stringify
  } = JSON;
  var LIST_LIMIT = 100;
  var DEPTH_LIMIT = 4;
  var SAFE_KEY = /^[\w$]+$/;
  /**
   @module @ember/debug
  */
  /**
    Convenience method to inspect an object. This method will attempt to
    convert the object into a useful string description.
  
    It is a pretty simple implementation. If you want something more robust,
    use something like JSDump: https://github.com/NV/jsDump
  
    @method inspect
    @static
    @param {Object} obj The object you want to inspect.
    @return {String} A description of the object
    @since 1.4.0
    @private
  */
  function inspect(obj) {
    // detect Node util.inspect call inspect(depth: number, opts: object)
    if (typeof obj === 'number' && arguments.length === 2) {
      return this;
    }
    return inspectValue(obj, 0);
  }
  function inspectValue(value, depth, seen) {
    var valueIsArray = false;
    switch (typeof value) {
      case 'undefined':
        return 'undefined';
      case 'object':
        if (value === null) return 'null';
        if (isArray(value)) {
          valueIsArray = true;
          break;
        }
        // is toString Object.prototype.toString or undefined then traverse
        if (value.toString === objectToString || value.toString === undefined) {
          break;
        }
        // custom toString
        return value.toString();
      case 'function':
        return value.toString === functionToString ? value.name ? `[Function:${value.name}]` : `[Function]` : value.toString();
      case 'string':
        return stringify(value);
      case 'symbol':
      case 'boolean':
      case 'number':
      default:
        return value.toString();
    }
    if (seen === undefined) {
      seen = new _util._WeakSet();
    } else {
      if (seen.has(value)) return `[Circular]`;
    }
    seen.add(value);
    return valueIsArray ? inspectArray(value, depth + 1, seen) : inspectObject(value, depth + 1, seen);
  }
  function inspectKey(key) {
    return SAFE_KEY.test(key) ? key : stringify(key);
  }
  function inspectObject(obj, depth, seen) {
    if (depth > DEPTH_LIMIT) {
      return '[Object]';
    }
    var s = '{';
    var keys = objectKeys(obj);
    for (var i = 0; i < keys.length; i++) {
      s += i === 0 ? ' ' : ', ';
      if (i >= LIST_LIMIT) {
        s += `... ${keys.length - LIST_LIMIT} more keys`;
        break;
      }
      var key = keys[i];
      (true && !(key) && (0, _debug.assert)('has key', key)); // Looping over array
      s += `${inspectKey(String(key))}: ${inspectValue(obj[key], depth, seen)}`;
    }
    s += ' }';
    return s;
  }
  function inspectArray(arr, depth, seen) {
    if (depth > DEPTH_LIMIT) {
      return '[Array]';
    }
    var s = '[';
    for (var i = 0; i < arr.length; i++) {
      s += i === 0 ? ' ' : ', ';
      if (i >= LIST_LIMIT) {
        s += `... ${arr.length - LIST_LIMIT} more items`;
        break;
      }
      s += inspectValue(arr[i], depth, seen);
    }
    s += ' ]';
    return s;
  }
});
define("@ember/debug/lib/testing", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.isTesting = isTesting;
  _exports.setTesting = setTesting;
  var testing = false;
  function isTesting() {
    return testing;
  }
  function setTesting(value) {
    testing = Boolean(value);
  }
});
define("@ember/debug/lib/warn", ["exports", "@ember/debug/index", "@ember/debug/lib/handlers"], function (_exports, _index, _handlers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.registerHandler = _exports.missingOptionsIdDeprecation = _exports.missingOptionsDeprecation = _exports.default = void 0;
  var registerHandler = () => {};
  _exports.registerHandler = registerHandler;
  var warn = () => {};
  var missingOptionsDeprecation;
  _exports.missingOptionsDeprecation = missingOptionsDeprecation;
  var missingOptionsIdDeprecation;
  /**
  @module @ember/debug
  */
  _exports.missingOptionsIdDeprecation = missingOptionsIdDeprecation;
  if (true /* DEBUG */) {
    /**
      Allows for runtime registration of handler functions that override the default warning behavior.
      Warnings are invoked by calls made to [@ember/debug/warn](/ember/release/classes/@ember%2Fdebug/methods/warn?anchor=warn).
      The following example demonstrates its usage by registering a handler that does nothing overriding Ember's
      default warning behavior.
         ```javascript
      import { registerWarnHandler } from '@ember/debug';
         // next is not called, so no warnings get the default behavior
      registerWarnHandler(() => {});
      ```
         The handler function takes the following arguments:
         <ul>
        <li> <code>message</code> - The message received from the warn call. </li>
        <li> <code>options</code> - An object passed in with the warn call containing additional information including:</li>
          <ul>
            <li> <code>id</code> - An id of the warning in the form of <code>package-name.specific-warning</code>.</li>
          </ul>
        <li> <code>next</code> - A function that calls into the previously registered handler.</li>
      </ul>
         @public
      @static
      @method registerWarnHandler
      @for @ember/debug
      @param handler {Function} A function to handle warnings.
      @since 2.1.0
    */
    _exports.registerHandler = registerHandler = function registerHandler(handler) {
      (0, _handlers.registerHandler)('warn', handler);
    };
    registerHandler(function logWarning(message) {
      /* eslint-disable no-console */
      console.warn(`WARNING: ${message}`);
      /* eslint-enable no-console */
    });

    _exports.missingOptionsDeprecation = missingOptionsDeprecation = 'When calling `warn` you ' + 'must provide an `options` hash as the third parameter.  ' + '`options` should include an `id` property.';
    _exports.missingOptionsIdDeprecation = missingOptionsIdDeprecation = 'When calling `warn` you must provide `id` in options.';
    /**
      Display a warning with the provided message.
         * In a production build, this method is defined as an empty function (NOP).
      Uses of this method in Ember itself are stripped from the ember.prod.js build.
         ```javascript
      import { warn } from '@ember/debug';
      import tomsterCount from './tomster-counter'; // a module in my project
         // Log a warning if we have more than 3 tomsters
      warn('Too many tomsters!', tomsterCount <= 3, {
        id: 'ember-debug.too-many-tomsters'
      });
      ```
         @method warn
      @for @ember/debug
      @static
      @param {String} message A warning to display.
      @param {Boolean} test An optional boolean. If falsy, the warning
        will be displayed.
      @param {Object} options An object that can be used to pass a unique
        `id` for this warning.  The `id` can be used by Ember debugging tools
        to change the behavior (raise, log, or silence) for that specific warning.
        The `id` should be namespaced by dots, e.g. "ember-debug.feature-flag-with-features-stripped"
      @public
      @since 1.0.0
    */
    warn = function warn(message, test, options) {
      if (arguments.length === 2 && typeof test === 'object') {
        options = test;
        test = false;
      }
      (0, _index.assert)(missingOptionsDeprecation, Boolean(options));
      (0, _index.assert)(missingOptionsIdDeprecation, Boolean(options && options.id));
      // SAFETY: we checked this by way of the `arguments` check above.
      (0, _handlers.invoke)('warn', message, test, options);
    };
  }
  var _default = warn;
  _exports.default = _default;
});
define("ember-testing/index", ["exports", "ember-testing/lib/test", "ember-testing/lib/adapters/adapter", "ember-testing/lib/setup_for_testing", "ember-testing/lib/adapters/qunit", "ember-testing/lib/ext/application", "ember-testing/lib/ext/rsvp", "ember-testing/lib/helpers", "ember-testing/lib/initializers"], function (_exports, _test, _adapter, _setup_for_testing, _qunit, _application, _rsvp, _helpers, _initializers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "Adapter", {
    enumerable: true,
    get: function () {
      return _adapter.default;
    }
  });
  Object.defineProperty(_exports, "QUnitAdapter", {
    enumerable: true,
    get: function () {
      return _qunit.default;
    }
  });
  Object.defineProperty(_exports, "Test", {
    enumerable: true,
    get: function () {
      return _test.default;
    }
  });
  Object.defineProperty(_exports, "setupForTesting", {
    enumerable: true,
    get: function () {
      return _setup_for_testing.default;
    }
  });
});
define("ember-testing/lib/adapters/adapter", ["exports", "@ember/object"], function (_exports, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var Adapter = _object.default.extend({
    /**
      This callback will be called whenever an async operation is about to start.
         Override this to call your framework's methods that handle async
      operations.
         @public
      @method asyncStart
    */
    asyncStart() {},
    /**
      This callback will be called whenever an async operation has completed.
         @public
      @method asyncEnd
    */
    asyncEnd() {},
    /**
      Override this method with your testing framework's false assertion.
      This function is called whenever an exception occurs causing the testing
      promise to fail.
         QUnit example:
         ```javascript
        exception: function(error) {
          ok(false, error);
        };
      ```
         @public
      @method exception
      @param {String} error The exception to be raised.
    */
    exception(error) {
      throw error;
    }
  });
  var _default = Adapter;
  _exports.default = _default;
});
define("ember-testing/lib/adapters/qunit", ["exports", "@ember/debug", "ember-testing/lib/adapters/adapter"], function (_exports, _debug, _adapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  /* globals QUnit */

  function isVeryOldQunit(obj) {
    return obj != null && typeof obj.stop === 'function';
  }
  var QUnitAdapter = _adapter.default.extend({
    init() {
      this.doneCallbacks = [];
    },
    asyncStart() {
      if (isVeryOldQunit(QUnit)) {
        // very old QUnit version
        // eslint-disable-next-line qunit/no-qunit-stop
        QUnit.stop();
      } else {
        this.doneCallbacks.push(QUnit.config.current ? QUnit.config.current.assert.async() : null);
      }
    },
    asyncEnd() {
      // checking for QUnit.stop here (even though we _need_ QUnit.start) because
      // QUnit.start() still exists in QUnit 2.x (it just throws an error when calling
      // inside a test context)
      if (isVeryOldQunit(QUnit)) {
        QUnit.start();
      } else {
        var done = this.doneCallbacks.pop();
        // This can be null if asyncStart() was called outside of a test
        if (done) {
          done();
        }
      }
    },
    exception(error) {
      QUnit.config.current.assert.ok(false, (0, _debug.inspect)(error));
    }
  });
  var _default = QUnitAdapter;
  _exports.default = _default;
});
define("ember-testing/lib/ext/application", ["@ember/application", "ember-testing/lib/setup_for_testing", "ember-testing/lib/test/helpers", "ember-testing/lib/test/promise", "ember-testing/lib/test/run", "ember-testing/lib/test/on_inject_helpers", "ember-testing/lib/test/adapter", "@ember/debug"], function (_application, _setup_for_testing, _helpers, _promise, _run, _on_inject_helpers, _adapter, _debug) {
  "use strict";

  _application.default.reopen({
    /**
     This property contains the testing helpers for the current application. These
     are created once you call `injectTestHelpers` on your `Application`
     instance. The included helpers are also available on the `window` object by
     default, but can be used from this object on the individual application also.
         @property testHelpers
      @type {Object}
      @default {}
      @public
    */
    testHelpers: {},
    /**
     This property will contain the original methods that were registered
     on the `helperContainer` before `injectTestHelpers` is called.
        When `removeTestHelpers` is called, these methods are restored to the
     `helperContainer`.
         @property originalMethods
      @type {Object}
      @default {}
      @private
      @since 1.3.0
    */
    originalMethods: {},
    /**
    This property indicates whether or not this application is currently in
    testing mode. This is set when `setupForTesting` is called on the current
    application.
       @property testing
    @type {Boolean}
    @default false
    @since 1.3.0
    @public
    */
    testing: false,
    /**
      This hook defers the readiness of the application, so that you can start
      the app when your tests are ready to run. It also sets the router's
      location to 'none', so that the window's location will not be modified
      (preventing both accidental leaking of state between tests and interference
      with your testing framework). `setupForTesting` should only be called after
      setting a custom `router` class (for example `App.Router = Router.extend(`).
         Example:
         ```
      App.setupForTesting();
      ```
         @method setupForTesting
      @public
    */
    setupForTesting() {
      (0, _setup_for_testing.default)();
      this.testing = true;
      this.resolveRegistration('router:main').reopen({
        location: 'none'
      });
    },
    /**
      This will be used as the container to inject the test helpers into. By
      default the helpers are injected into `window`.
         @property helperContainer
      @type {Object} The object to be used for test helpers.
      @default window
      @since 1.2.0
      @private
    */
    helperContainer: null,
    /**
      This injects the test helpers into the `helperContainer` object. If an object is provided
      it will be used as the helperContainer. If `helperContainer` is not set it will default
      to `window`. If a function of the same name has already been defined it will be cached
      (so that it can be reset if the helper is removed with `unregisterHelper` or
      `removeTestHelpers`).
         Any callbacks registered with `onInjectHelpers` will be called once the
      helpers have been injected.
         Example:
      ```
      App.injectTestHelpers();
      ```
         @method injectTestHelpers
      @public
    */
    injectTestHelpers(helperContainer) {
      if (helperContainer) {
        this.helperContainer = helperContainer;
      } else {
        this.helperContainer = window;
      }
      this.reopen({
        willDestroy() {
          this._super(...arguments);
          this.removeTestHelpers();
        }
      });
      this.testHelpers = {};
      for (var name in _helpers.helpers) {
        // SAFETY: It is safe to access a property on an object
        this.originalMethods[name] = this.helperContainer[name];
        // SAFETY: It is not quite as safe to do this, but it _seems_ to be ok.
        this.testHelpers[name] = this.helperContainer[name] = helper(this, name);
        // SAFETY: We checked that it exists
        protoWrap(_promise.default.prototype, name, helper(this, name), _helpers.helpers[name].meta.wait);
      }
      (0, _on_inject_helpers.invokeInjectHelpersCallbacks)(this);
    },
    /**
      This removes all helpers that have been registered, and resets and functions
      that were overridden by the helpers.
         Example:
         ```javascript
      App.removeTestHelpers();
      ```
         @public
      @method removeTestHelpers
    */
    removeTestHelpers() {
      if (!this.helperContainer) {
        return;
      }
      for (var name in _helpers.helpers) {
        this.helperContainer[name] = this.originalMethods[name];
        // SAFETY: This is a weird thing, but it's not technically unsafe here.
        delete _promise.default.prototype[name];
        delete this.testHelpers[name];
        delete this.originalMethods[name];
      }
    }
  });
  // This method is no longer needed
  // But still here for backwards compatibility
  // of helper chaining
  function protoWrap(proto, name, callback, isAsync) {
    // SAFETY: This isn't entirely safe, but it _seems_ to be ok.
    proto[name] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (isAsync) {
        return callback.apply(this, args);
      } else {
        // SAFETY: This is not actually safe.
        return this.then(function () {
          return callback.apply(this, args);
        });
      }
    };
  }
  function helper(app, name) {
    var helper = _helpers.helpers[name];
    (true && !(helper) && (0, _debug.assert)(`[BUG] Missing helper: ${name}`, helper));
    var fn = helper.method;
    var meta = helper.meta;
    if (!meta.wait) {
      return function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        return fn.apply(app, [app, ...args]);
      };
    }
    return function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      var lastPromise = (0, _run.default)(() => (0, _promise.resolve)((0, _promise.getLastPromise)()));
      // wait for last helper's promise to resolve and then
      // execute. To be safe, we need to tell the adapter we're going
      // asynchronous here, because fn may not be invoked before we
      // return.
      (0, _adapter.asyncStart)();
      return lastPromise.then(() => fn.apply(app, [app, ...args])).finally(_adapter.asyncEnd);
    };
  }
});
define("ember-testing/lib/ext/rsvp", ["exports", "@ember/-internals/runtime", "@ember/runloop", "@ember/debug", "ember-testing/lib/test/adapter"], function (_exports, _runtime, _runloop, _debug, _adapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _runtime.RSVP.configure('async', function (callback, promise) {
    // if schedule will cause autorun, we need to inform adapter
    if ((0, _debug.isTesting)() && !_runloop._backburner.currentInstance) {
      (0, _adapter.asyncStart)();
      _runloop._backburner.schedule('actions', () => {
        (0, _adapter.asyncEnd)();
        callback(promise);
      });
    } else {
      _runloop._backburner.schedule('actions', () => callback(promise));
    }
  });
  var _default = _runtime.RSVP;
  _exports.default = _default;
});
define("ember-testing/lib/helpers", ["ember-testing/lib/test/helpers", "ember-testing/lib/helpers/and_then", "ember-testing/lib/helpers/current_path", "ember-testing/lib/helpers/current_route_name", "ember-testing/lib/helpers/current_url", "ember-testing/lib/helpers/pause_test", "ember-testing/lib/helpers/visit", "ember-testing/lib/helpers/wait"], function (_helpers, _and_then, _current_path, _current_route_name, _current_url, _pause_test, _visit, _wait) {
  "use strict";

  (0, _helpers.registerAsyncHelper)('visit', _visit.default);
  (0, _helpers.registerAsyncHelper)('wait', _wait.default);
  (0, _helpers.registerAsyncHelper)('andThen', _and_then.default);
  (0, _helpers.registerAsyncHelper)('pauseTest', _pause_test.pauseTest);
  (0, _helpers.registerHelper)('currentRouteName', _current_route_name.default);
  (0, _helpers.registerHelper)('currentPath', _current_path.default);
  (0, _helpers.registerHelper)('currentURL', _current_url.default);
  (0, _helpers.registerHelper)('resumeTest', _pause_test.resumeTest);
});
define("ember-testing/lib/helpers/and_then", ["exports", "@ember/debug"], function (_exports, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = andThen;
  function andThen(app, callback) {
    var wait = app.testHelpers['wait'];
    (true && !(wait) && (0, _debug.assert)('[BUG] Missing wait helper', wait));
    return wait(callback(app));
  }
});
define("ember-testing/lib/helpers/current_path", ["exports", "@ember/object", "@ember/routing/-internals", "@ember/debug"], function (_exports, _object, _internals, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = currentPath;
  /**
  @module ember
  */

  /**
    Returns the current path.
  
  Example:
  
  ```javascript
  function validateURL() {
    equal(currentPath(), 'some.path.index', "correct path was transitioned into.");
  }
  
  click('#some-link-id').then(validateURL);
  ```
  
  @method currentPath
  @return {Object} The currently active path.
  @since 1.5.0
  @public
  */
  function currentPath(app) {
    (true && !(app.__container__) && (0, _debug.assert)('[BUG] app.__container__ is not set', app.__container__));
    var routingService = app.__container__.lookup('service:-routing');
    (true && !(routingService instanceof _internals.RoutingService) && (0, _debug.assert)('[BUG] service:-routing is not a RoutingService', routingService instanceof _internals.RoutingService));
    return (0, _object.get)(routingService, 'currentPath');
  }
});
define("ember-testing/lib/helpers/current_route_name", ["exports", "@ember/object", "@ember/routing/-internals", "@ember/debug"], function (_exports, _object, _internals, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = currentRouteName;
  /**
  @module ember
  */

  /**
    Returns the currently active route name.
  
  Example:
  
  ```javascript
  function validateRouteName() {
    equal(currentRouteName(), 'some.path', "correct route was transitioned into.");
  }
  visit('/some/path').then(validateRouteName)
  ```
  
  @method currentRouteName
  @return {Object} The name of the currently active route.
  @since 1.5.0
  @public
  */
  function currentRouteName(app) {
    (true && !(app.__container__) && (0, _debug.assert)('[BUG] app.__container__ is not set', app.__container__));
    var routingService = app.__container__.lookup('service:-routing');
    (true && !(routingService instanceof _internals.RoutingService) && (0, _debug.assert)('[BUG] service:-routing is not a RoutingService', routingService instanceof _internals.RoutingService));
    return (0, _object.get)(routingService, 'currentRouteName');
  }
});
define("ember-testing/lib/helpers/current_url", ["exports", "@ember/object", "@ember/debug", "@ember/routing/router"], function (_exports, _object, _debug, _router) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = currentURL;
  /**
  @module ember
  */

  /**
    Returns the current URL.
  
  Example:
  
  ```javascript
  function validateURL() {
    equal(currentURL(), '/some/path', "correct URL was transitioned into.");
  }
  
  click('#some-link-id').then(validateURL);
  ```
  
  @method currentURL
  @return {Object} The currently active URL.
  @since 1.5.0
  @public
  */
  function currentURL(app) {
    (true && !(app.__container__) && (0, _debug.assert)('[BUG] app.__container__ is not set', app.__container__));
    var router = app.__container__.lookup('router:main');
    (true && !(router instanceof _router.default) && (0, _debug.assert)('[BUG] router:main is not a Router', router instanceof _router.default));
    var location = (0, _object.get)(router, 'location');
    (true && !(typeof location !== 'string') && (0, _debug.assert)('[BUG] location is still a string', typeof location !== 'string'));
    return location.getURL();
  }
});
define("ember-testing/lib/helpers/pause_test", ["exports", "@ember/-internals/runtime", "@ember/debug"], function (_exports, _runtime, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.pauseTest = pauseTest;
  _exports.resumeTest = resumeTest;
  /**
  @module ember
  */

  var resume;
  /**
   Resumes a test paused by `pauseTest`.
  
   @method resumeTest
   @return {void}
   @public
  */
  function resumeTest() {
    (true && !(resume) && (0, _debug.assert)('Testing has not been paused. There is nothing to resume.', resume));
    resume();
    resume = undefined;
  }
  /**
   Pauses the current test - this is useful for debugging while testing or for test-driving.
   It allows you to inspect the state of your application at any point.
   Example (The test will pause before clicking the button):
  
   ```javascript
   visit('/')
   return pauseTest();
   click('.btn');
   ```
  
   You may want to turn off the timeout before pausing.
  
   qunit (timeout available to use as of 2.4.0):
  
   ```
   visit('/');
   assert.timeout(0);
   return pauseTest();
   click('.btn');
   ```
  
   mocha (timeout happens automatically as of ember-mocha v0.14.0):
  
   ```
   visit('/');
   this.timeout(0);
   return pauseTest();
   click('.btn');
   ```
  
  
   @since 1.9.0
   @method pauseTest
   @return {Object} A promise that will never resolve
   @public
  */
  function pauseTest() {
    (0, _debug.info)('Testing paused. Use `resumeTest()` to continue.');
    return new _runtime.RSVP.Promise(resolve => {
      resume = resolve;
    }, 'TestAdapter paused promise');
  }
});
define("ember-testing/lib/helpers/visit", ["exports", "@ember/debug", "@ember/routing/router", "@ember/runloop"], function (_exports, _debug, _router, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = visit;
  /**
    Loads a route, sets up any controllers, and renders any templates associated
    with the route as though a real user had triggered the route change while
    using your app.
  
    Example:
  
    ```javascript
    visit('posts/index').then(function() {
      // assert something
    });
    ```
  
    @method visit
    @param {String} url the name of the route
    @return {RSVP.Promise<undefined>}
    @public
  */
  function visit(app, url) {
    (true && !(app.__container__) && (0, _debug.assert)('[BUG] Missing container', app.__container__));
    var router = app.__container__.lookup('router:main');
    (true && !(router instanceof _router.default) && (0, _debug.assert)('[BUG] router:main is not a Router', router instanceof _router.default));
    var shouldHandleURL = false;
    app.boot().then(() => {
      (true && !(typeof router.location !== 'string') && (0, _debug.assert)('[BUG] router.location is still a string', typeof router.location !== 'string'));
      router.location.setURL(url);
      if (shouldHandleURL) {
        (true && !(app.__deprecatedInstance__) && (0, _debug.assert)("[BUG] __deprecatedInstance__ isn't set", app.__deprecatedInstance__));
        (0, _runloop.run)(app.__deprecatedInstance__, 'handleURL', url);
      }
    });
    if (app._readinessDeferrals > 0) {
      // SAFETY: This should be safe, though it is odd.
      router.initialURL = url;
      (0, _runloop.run)(app, 'advanceReadiness');
      delete router.initialURL;
    } else {
      shouldHandleURL = true;
    }
    var wait = app.testHelpers['wait'];
    (true && !(wait) && (0, _debug.assert)('[BUG] missing wait helper', wait));
    return wait();
  }
});
define("ember-testing/lib/helpers/wait", ["exports", "ember-testing/lib/test/waiters", "@ember/-internals/runtime", "@ember/runloop", "ember-testing/lib/test/pending_requests", "@ember/debug", "@ember/routing/router"], function (_exports, _waiters, _runtime, _runloop, _pending_requests, _debug, _router) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = wait;
  /**
  @module ember
  */

  /**
    Causes the run loop to process any pending events. This is used to ensure that
    any async operations from other helpers (or your assertions) have been processed.
  
    This is most often used as the return value for the helper functions (see 'click',
    'fillIn','visit',etc). However, there is a method to register a test helper which
    utilizes this method without the need to actually call `wait()` in your helpers.
  
    The `wait` helper is built into `registerAsyncHelper` by default. You will not need
    to `return app.testHelpers.wait();` - the wait behavior is provided for you.
  
    Example:
  
    ```javascript
    import { registerAsyncHelper } from '@ember/test';
  
    registerAsyncHelper('loginUser', function(app, username, password) {
      visit('secured/path/here')
        .fillIn('#username', username)
        .fillIn('#password', password)
        .click('.submit');
    });
    ```
  
    @method wait
    @param {Object} value The value to be returned.
    @return {RSVP.Promise<any>} Promise that resolves to the passed value.
    @public
    @since 1.0.0
  */
  function wait(app, value) {
    return new _runtime.RSVP.Promise(function (resolve) {
      (true && !(app.__container__) && (0, _debug.assert)('[BUG] Missing container', app.__container__));
      var router = app.__container__.lookup('router:main');
      (true && !(router instanceof _router.default) && (0, _debug.assert)('[BUG] Expected router:main to be a subclass of Ember Router', router instanceof _router.default)); // Every 10ms, poll for the async thing to have finished
      var watcher = setInterval(() => {
        // 1. If the router is loading, keep polling
        var routerIsLoading = router._routerMicrolib && Boolean(router._routerMicrolib.activeTransition);
        if (routerIsLoading) {
          return;
        }
        // 2. If there are pending Ajax requests, keep polling
        if ((0, _pending_requests.pendingRequests)()) {
          return;
        }
        // 3. If there are scheduled timers or we are inside of a run loop, keep polling
        if ((0, _runloop._hasScheduledTimers)() || (0, _runloop._getCurrentRunLoop)()) {
          return;
        }
        if ((0, _waiters.checkWaiters)()) {
          return;
        }
        // Stop polling
        clearInterval(watcher);
        // Synchronously resolve the promise
        (0, _runloop.run)(null, resolve, value);
      }, 10);
    });
  }
});
define("ember-testing/lib/initializers", ["@ember/application"], function (_application) {
  "use strict";

  var name = 'deferReadiness in `testing` mode';
  (0, _application.onLoad)('Ember.Application', function (ApplicationClass) {
    if (!ApplicationClass.initializers[name]) {
      ApplicationClass.initializer({
        name: name,
        initialize(application) {
          if (application.testing) {
            application.deferReadiness();
          }
        }
      });
    }
  });
});
define("ember-testing/lib/setup_for_testing", ["exports", "@ember/debug", "ember-testing/lib/test/adapter", "ember-testing/lib/adapters/adapter", "ember-testing/lib/adapters/qunit"], function (_exports, _debug, _adapter, _adapter2, _qunit) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = setupForTesting;
  /* global self */

  /**
    Sets Ember up for testing. This is useful to perform
    basic setup steps in order to unit test.
  
    Use `App.setupForTesting` to perform integration tests (full
    application testing).
  
    @method setupForTesting
    @namespace Ember
    @since 1.5.0
    @private
  */
  function setupForTesting() {
    (0, _debug.setTesting)(true);
    var adapter = (0, _adapter.getAdapter)();
    // if adapter is not manually set default to QUnit
    if (!adapter) {
      (0, _adapter.setAdapter)(typeof self.QUnit === 'undefined' ? _adapter2.default.create() : _qunit.default.create());
    }
  }
});
define("ember-testing/lib/test", ["exports", "ember-testing/lib/test/helpers", "ember-testing/lib/test/on_inject_helpers", "ember-testing/lib/test/promise", "ember-testing/lib/test/waiters", "ember-testing/lib/test/adapter"], function (_exports, _helpers, _on_inject_helpers, _promise, _waiters, _adapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  /**
    @module ember
  */

  /**
    This is a container for an assortment of testing related functionality:
  
    * Choose your default test adapter (for your framework of choice).
    * Register/Unregister additional test helpers.
    * Setup callbacks to be fired when the test helpers are injected into
      your application.
  
    @class Test
    @namespace Ember
    @public
  */
  var Test = {
    /**
      Hash containing all known test helpers.
         @property _helpers
      @private
      @since 1.7.0
    */
    _helpers: _helpers.helpers,
    registerHelper: _helpers.registerHelper,
    registerAsyncHelper: _helpers.registerAsyncHelper,
    unregisterHelper: _helpers.unregisterHelper,
    onInjectHelpers: _on_inject_helpers.onInjectHelpers,
    Promise: _promise.default,
    promise: _promise.promise,
    resolve: _promise.resolve,
    registerWaiter: _waiters.registerWaiter,
    unregisterWaiter: _waiters.unregisterWaiter,
    checkWaiters: _waiters.checkWaiters
  };
  /**
   Used to allow ember-testing to communicate with a specific testing
   framework.
  
   You can manually set it before calling `App.setupForTesting()`.
  
   Example:
  
   ```javascript
   Ember.Test.adapter = MyCustomAdapter.create()
   ```
  
   If you do not set it, ember-testing will default to `Ember.Test.QUnitAdapter`.
  
   @public
   @for Ember.Test
   @property adapter
   @type {Class} The adapter to be used.
   @default Ember.Test.QUnitAdapter
  */
  Object.defineProperty(Test, 'adapter', {
    get: _adapter.getAdapter,
    set: _adapter.setAdapter
  });
  var _default = Test;
  _exports.default = _default;
});
define("ember-testing/lib/test/adapter", ["exports", "@ember/-internals/error-handling"], function (_exports, _errorHandling) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.asyncEnd = asyncEnd;
  _exports.asyncStart = asyncStart;
  _exports.getAdapter = getAdapter;
  _exports.setAdapter = setAdapter;
  var adapter;
  function getAdapter() {
    return adapter;
  }
  function setAdapter(value) {
    adapter = value;
    if (value && typeof value.exception === 'function') {
      (0, _errorHandling.setDispatchOverride)(adapterDispatch);
    } else {
      (0, _errorHandling.setDispatchOverride)(null);
    }
  }
  function asyncStart() {
    if (adapter) {
      adapter.asyncStart();
    }
  }
  function asyncEnd() {
    if (adapter) {
      adapter.asyncEnd();
    }
  }
  function adapterDispatch(error) {
    adapter.exception(error);
    // @ts-expect-error Normally unreachable
    console.error(error.stack); // eslint-disable-line no-console
  }
});
define("ember-testing/lib/test/helpers", ["exports", "ember-testing/lib/test/promise"], function (_exports, _promise) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.helpers = void 0;
  _exports.registerAsyncHelper = registerAsyncHelper;
  _exports.registerHelper = registerHelper;
  _exports.unregisterHelper = unregisterHelper;
  var helpers = {};
  /**
   @module @ember/test
  */
  /**
    `registerHelper` is used to register a test helper that will be injected
    when `App.injectTestHelpers` is called.
  
    The helper method will always be called with the current Application as
    the first parameter.
  
    For example:
  
    ```javascript
    import { registerHelper } from '@ember/test';
    import { run } from '@ember/runloop';
  
    registerHelper('boot', function(app) {
      run(app, app.advanceReadiness);
    });
    ```
  
    This helper can later be called without arguments because it will be
    called with `app` as the first parameter.
  
    ```javascript
    import Application from '@ember/application';
  
    App = Application.create();
    App.injectTestHelpers();
    boot();
    ```
  
    @public
    @for @ember/test
    @static
    @method registerHelper
    @param {String} name The name of the helper method to add.
    @param {Function} helperMethod
    @param options {Object}
  */
  _exports.helpers = helpers;
  function registerHelper(name, helperMethod) {
    helpers[name] = {
      method: helperMethod,
      meta: {
        wait: false
      }
    };
  }
  /**
    `registerAsyncHelper` is used to register an async test helper that will be injected
    when `App.injectTestHelpers` is called.
  
    The helper method will always be called with the current Application as
    the first parameter.
  
    For example:
  
    ```javascript
    import { registerAsyncHelper } from '@ember/test';
    import { run } from '@ember/runloop';
  
    registerAsyncHelper('boot', function(app) {
      run(app, app.advanceReadiness);
    });
    ```
  
    The advantage of an async helper is that it will not run
    until the last async helper has completed.  All async helpers
    after it will wait for it complete before running.
  
  
    For example:
  
    ```javascript
    import { registerAsyncHelper } from '@ember/test';
  
    registerAsyncHelper('deletePost', function(app, postId) {
      click('.delete-' + postId);
    });
  
    // ... in your test
    visit('/post/2');
    deletePost(2);
    visit('/post/3');
    deletePost(3);
    ```
  
    @public
    @for @ember/test
    @method registerAsyncHelper
    @param {String} name The name of the helper method to add.
    @param {Function} helperMethod
    @since 1.2.0
  */
  function registerAsyncHelper(name, helperMethod) {
    helpers[name] = {
      method: helperMethod,
      meta: {
        wait: true
      }
    };
  }
  /**
    Remove a previously added helper method.
  
    Example:
  
    ```javascript
    import { unregisterHelper } from '@ember/test';
  
    unregisterHelper('wait');
    ```
  
    @public
    @method unregisterHelper
    @static
    @for @ember/test
    @param {String} name The helper to remove.
  */
  function unregisterHelper(name) {
    delete helpers[name];
    // SAFETY: This isn't necessarily a safe thing to do, but in terms of the immediate types here
    // it won't error.
    delete _promise.default.prototype[name];
  }
});
define("ember-testing/lib/test/on_inject_helpers", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.callbacks = void 0;
  _exports.invokeInjectHelpersCallbacks = invokeInjectHelpersCallbacks;
  _exports.onInjectHelpers = onInjectHelpers;
  var callbacks = [];
  /**
    Used to register callbacks to be fired whenever `App.injectTestHelpers`
    is called.
  
    The callback will receive the current application as an argument.
  
    Example:
  
    ```javascript
    import $ from 'jquery';
  
    Ember.Test.onInjectHelpers(function() {
      $(document).ajaxSend(function() {
        Test.pendingRequests++;
      });
  
      $(document).ajaxComplete(function() {
        Test.pendingRequests--;
      });
    });
    ```
  
    @public
    @for Ember.Test
    @method onInjectHelpers
    @param {Function} callback The function to be called.
  */
  _exports.callbacks = callbacks;
  function onInjectHelpers(callback) {
    callbacks.push(callback);
  }
  function invokeInjectHelpersCallbacks(app) {
    for (var callback of callbacks) {
      callback(app);
    }
  }
});
define("ember-testing/lib/test/pending_requests", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.clearPendingRequests = clearPendingRequests;
  _exports.decrementPendingRequests = decrementPendingRequests;
  _exports.incrementPendingRequests = incrementPendingRequests;
  _exports.pendingRequests = pendingRequests;
  var requests = [];
  function pendingRequests() {
    return requests.length;
  }
  function clearPendingRequests() {
    requests.length = 0;
  }
  function incrementPendingRequests(_, xhr) {
    requests.push(xhr);
  }
  function decrementPendingRequests(_, xhr) {
    setTimeout(function () {
      for (var i = 0; i < requests.length; i++) {
        if (xhr === requests[i]) {
          requests.splice(i, 1);
          break;
        }
      }
    }, 0);
  }
});
define("ember-testing/lib/test/promise", ["exports", "@ember/-internals/runtime", "ember-testing/lib/test/run"], function (_exports, _runtime, _run) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.getLastPromise = getLastPromise;
  _exports.promise = promise;
  _exports.resolve = resolve;
  var lastPromise = null;
  class TestPromise extends _runtime.RSVP.Promise {
    constructor(executor, label) {
      super(executor, label);
      lastPromise = this;
    }
    then(onFulfilled, onRejected, label) {
      var normalizedOnFulfilled = typeof onFulfilled === 'function' ? result => isolate(onFulfilled, result) : undefined;
      return super.then(normalizedOnFulfilled, onRejected, label);
    }
  }
  /**
    This returns a thenable tailored for testing.  It catches failed
    `onSuccess` callbacks and invokes the `Ember.Test.adapter.exception`
    callback in the last chained then.
  
    This method should be returned by async helpers such as `wait`.
  
    @public
    @for Ember.Test
    @method promise
    @param {Function} resolver The function used to resolve the promise.
    @param {String} label An optional string for identifying the promise.
  */
  _exports.default = TestPromise;
  function promise(resolver, label) {
    var fullLabel = `Ember.Test.promise: ${label || '<Unknown Promise>'}`;
    return new TestPromise(resolver, fullLabel);
  }
  /**
    Replacement for `Ember.RSVP.resolve`
    The only difference is this uses
    an instance of `Ember.Test.Promise`
  
    @public
    @for Ember.Test
    @method resolve
    @param {Mixed} The value to resolve
    @since 1.2.0
  */
  function resolve(result, label) {
    return TestPromise.resolve(result, label);
  }
  function getLastPromise() {
    return lastPromise;
  }
  // This method isolates nested async methods
  // so that they don't conflict with other last promises.
  //
  // 1. Set `Ember.Test.lastPromise` to null
  // 2. Invoke method
  // 3. Return the last promise created during method
  function isolate(onFulfilled, result) {
    // Reset lastPromise for nested helpers
    lastPromise = null;
    var value = onFulfilled(result);
    var promise = lastPromise;
    lastPromise = null;
    // If the method returned a promise
    // return that promise. If not,
    // return the last async helper's promise
    if (value && value instanceof TestPromise || !promise) {
      return value;
    } else {
      return (0, _run.default)(() => resolve(promise).then(() => value));
    }
  }
});
define("ember-testing/lib/test/run", ["exports", "@ember/runloop"], function (_exports, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = run;
  function run(fn) {
    if (!(0, _runloop._getCurrentRunLoop)()) {
      return (0, _runloop.run)(fn);
    } else {
      return fn();
    }
  }
});
define("ember-testing/lib/test/waiters", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.checkWaiters = checkWaiters;
  _exports.registerWaiter = registerWaiter;
  _exports.unregisterWaiter = unregisterWaiter;
  /**
   @module @ember/test
  */
  var contexts = [];
  var callbacks = [];
  function registerWaiter() {
    var checkedCallback;
    var checkedContext;
    if (arguments.length === 1) {
      checkedContext = null;
      checkedCallback = arguments.length <= 0 ? undefined : arguments[0];
    } else {
      checkedContext = arguments.length <= 0 ? undefined : arguments[0];
      checkedCallback = arguments.length <= 1 ? undefined : arguments[1];
    }
    if (indexOf(checkedContext, checkedCallback) > -1) {
      return;
    }
    contexts.push(checkedContext);
    callbacks.push(checkedCallback);
  }
  /**
     `unregisterWaiter` is used to unregister a callback that was
     registered with `registerWaiter`.
  
     @public
     @for @ember/test
     @static
     @method unregisterWaiter
     @param {Object} context (optional)
     @param {Function} callback
     @since 1.2.0
  */
  function unregisterWaiter(context, callback) {
    if (!callbacks.length) {
      return;
    }
    if (arguments.length === 1) {
      callback = context;
      context = null;
    }
    var i = indexOf(context, callback);
    if (i === -1) {
      return;
    }
    contexts.splice(i, 1);
    callbacks.splice(i, 1);
  }
  /**
    Iterates through each registered test waiter, and invokes
    its callback. If any waiter returns false, this method will return
    true indicating that the waiters have not settled yet.
  
    This is generally used internally from the acceptance/integration test
    infrastructure.
  
    @public
    @for @ember/test
    @static
    @method checkWaiters
  */
  function checkWaiters() {
    if (!callbacks.length) {
      return false;
    }
    for (var i = 0; i < callbacks.length; i++) {
      var context = contexts[i];
      var callback = callbacks[i];
      // SAFETY: The loop ensures that this exists
      if (!callback.call(context)) {
        return true;
      }
    }
    return false;
  }
  function indexOf(context, callback) {
    for (var i = 0; i < callbacks.length; i++) {
      if (callbacks[i] === callback && contexts[i] === context) {
        return i;
      }
    }
    return -1;
  }
});
require('ember-testing');
}());

(function() {
  var key = '_embroider_macros_runtime_config';
  if (!window[key]) {
    window[key] = [];
  }
  window[key].push(function(m) {
    m.setGlobalConfig(
      '@embroider/macros',
      Object.assign({}, m.getGlobalConfig()['@embroider/macros'], { isTesting: true })
    );
  });
})();

define("@ember/test-helpers/-internal/-owner-mixin-imports", ["exports", "ember"], function (_exports, _ember) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.RegistryProxyMixin = _exports.ContainerProxyMixin = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember"eaimeta@70e063a35619d71f
  // These utter shenanigans allow this to work regardless of what types you are
  // importing from. The idea is: you supply multiple imports, each of which is
  // mutually exclusive with the others in terms of valid imports, then ignore the
  // imports so they type check, then "resolve" between them based on which one is
  // actually defined. 😭
  //
  // TODO: at the next major version (4.0), when we drop support for Ember < 5.1
  // or some later version and can therefore either depend *somewhat* more on
  // these import locations *or* can drop them entirely (depending on the path
  // taken in terms of the `Owner` stack), switch to the normal imports:
  // ```
  // import {
  //   ContainerProxyMixin,
  //   RegistryProxyMixin,
  // } from '@ember/-internals/runtime';
  // ```
  //
  // For now, we are stuck with this utterly horrifying hack to get the types for
  // these reliably.
  // This pair of types lets us check whether the imported type is set. We can
  // then use that to pick between the imported types. The first type produces
  // `any` when the type is otherwise not defined at all, which means we cannot
  // use it directly because `any` will fall through, well, basically *any* check
  // we might come up with... other than checking whether `any extends` it. The
  // second uses that to get back a `never` so we can then "pick" between the
  // imported types.
  // This mapped type does the "picking". You can pass it any number of types,
  // where only one should be available, and it will "resolve" that type.
  // Constraint: the `Array` type must include mutually exclusive types, such that
  // it should be impossible to ever get back more than one; otherwise, you will
  // end up with a union type of the two. That is very unlikely to be what you
  // want!
  // We also resolve the *values* from a "stable" location. However, the *types*
  // for the Ember namespace do not consistently include this definition (they do
  // on the stable types, but not in the preview or DT types), so cast as `any` so
  // that it resolves regardless.
  const ContainerProxyMixin = _ember.default._ContainerProxyMixin;
  _exports.ContainerProxyMixin = ContainerProxyMixin;
  const RegistryProxyMixin = _ember.default._RegistryProxyMixin;
  _exports.RegistryProxyMixin = RegistryProxyMixin;
});
define("@ember/test-helpers/-internal/build-registry", ["exports", "@ember/application/instance", "@ember/application", "@ember/object", "require", "ember", "@ember/test-helpers/-internal/-owner-mixin-imports"], function (_exports, _instance, _application, _object, _require, _ember, _ownerMixinImports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = buildRegistry;
  0; //eaimeta@70e063a35619d71f0,"@ember/application/instance",0,"@ember/application",0,"@ember/object",0,"require",0,"ember",0,"@ember/test-helpers/-internal/-owner-mixin-imports"eaimeta@70e063a35619d71f
  // These shenanigans work around the fact that the import locations are not
  // public API and are not stable, so we jump through hoops to get the right
  // types and values to use.
  /**
   * Adds methods that are normally only on registry to the container. This is largely to support the legacy APIs
   * that are not using `owner` (but are still using `this.container`).
   *
   * @private
   * @param {Object} container  the container to modify
   */
  function exposeRegistryMethodsWithoutDeprecations(container) {
    let methods = ['register', 'unregister', 'resolve', 'normalize', 'typeInjection', 'injection', 'factoryInjection', 'factoryTypeInjection', 'has', 'options', 'optionsForType'];
    for (let i = 0, l = methods.length; i < l; i++) {
      let methodName = methods[i];
      if (methodName && methodName in container) {
        const knownMethod = methodName;
        container[knownMethod] = function (...args) {
          return container._registry[knownMethod](...args);
        };
      }
    }
  }

  // NOTE: this is the same as what `EngineInstance`/`ApplicationInstance`
  // implement, and is thus a superset of the `InternalOwner` contract from Ember
  // itself.

  const Owner = _object.default.extend(_ownerMixinImports.RegistryProxyMixin, _ownerMixinImports.ContainerProxyMixin, {
    _emberTestHelpersMockOwner: true,
    /* eslint-disable valid-jsdoc */
    /**
     * Unregister a factory and its instance.
     *
     * Overrides `RegistryProxy#unregister` in order to clear any cached instances
     * of the unregistered factory.
     *
     * @param {string} fullName Name of the factory to unregister.
     *
     * @see {@link https://github.com/emberjs/ember.js/pull/12680}
     * @see {@link https://github.com/emberjs/ember.js/blob/v4.5.0-alpha.5/packages/%40ember/engine/instance.ts#L152-L167}
     */
    /* eslint-enable valid-jsdoc */
    unregister(fullName) {
      // SAFETY: this is always present, but only the stable type definitions from
      // Ember actually preserve it, since it is private API.
      this['__container__'].reset(fullName);

      // We overwrote this method from RegistryProxyMixin.
      // SAFETY: this is always present, but only the stable type definitions from
      // Ember actually preserve it, since it is private API.
      this['__registry__'].unregister(fullName);
    }
  });

  /**
   * @private
   * @param {Object} resolver the resolver to use with the registry
   * @returns {Object} owner, container, registry
   */
  function buildRegistry(resolver) {
    let namespace = new _application.default();
    // @ts-ignore: this is actually the correcct type, but there was a typo in
    // Ember's docs for many years which meant that there was a matching problem
    // in the types for Ember's definition of `Engine`. Once we require at least
    // Ember 5.1 (in some future breaking change), this ts-ignore can be removed.
    namespace.Resolver = {
      create() {
        return resolver;
      }
    };

    // @ts-ignore: this is private API.
    let fallbackRegistry = _application.default.buildRegistry(namespace);
    // TODO: only do this on Ember < 3.13
    // @ts-ignore: this is private API.
    fallbackRegistry.register('component-lookup:main', _ember.default.ComponentLookup);

    // @ts-ignore: this is private API.
    let registry = new _ember.default.Registry({
      fallback: fallbackRegistry
    });

    // @ts-ignore: this is private API.
    _instance.default.setupRegistry(registry);

    // these properties are set on the fallback registry by `buildRegistry`
    // and on the primary registry within the ApplicationInstance constructor
    // but we need to manually recreate them since ApplicationInstance's are not
    // exposed externally
    // @ts-ignore: this is private API.
    registry.normalizeFullName = fallbackRegistry.normalizeFullName;
    // @ts-ignore: this is private API.
    registry.makeToString = fallbackRegistry.makeToString;
    // @ts-ignore: this is private API.
    registry.describe = fallbackRegistry.describe;
    let owner = Owner.create({
      // @ts-ignore -- we do not have type safety for `Object.extend` so the type
      // of `Owner` here is just `EmberObject`, but we *do* constrain it to allow
      // only types from the actual class, so these fields are not accepted.
      // However, we can see that they are valid, based on the definition of
      // `Owner` above given that it fulfills the `InternalOwner` contract and
      // also extends it just as `EngineInstance` does internally.
      //
      // NOTE: we use an `ignore` directive rather than `expect-error` because in
      // *some* versions of the types, we *do* have (at least some of) this
      // safety, and maximal backwards compatibility means we have to account for
      // that.
      __registry__: registry,
      __container__: null
    });

    // @ts-ignore: this is private API.
    let container = registry.container({
      owner: owner
    });
    // @ts-ignore: this is private API.
    owner.__container__ = container;
    exposeRegistryMethodsWithoutDeprecations(container);
    if ((0, _require.has)('ember-data/setup-container')) {
      // ember-data is a proper ember-cli addon since 2.3; if no 'import
      // 'ember-data'' is present somewhere in the tests, there is also no `DS`
      // available on the globalContext and hence ember-data wouldn't be setup
      // correctly for the tests; that's why we import and call setupContainer
      // here; also see https://github.com/emberjs/data/issues/4071 for context
      let setupContainer = (0, _require.default)("ember-data/setup-container")['default'];
      setupContainer(owner);
    }
    return {
      registry,
      container,
      owner
    };
  }
});
define("@ember/test-helpers/-internal/debug-info-helpers", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.debugInfoHelpers = void 0;
  _exports.default = registerDebugInfoHelper;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  const debugInfoHelpers = new Set();

  /**
   * Registers a custom debug info helper to augment the output for test isolation validation.
   *
   * @public
   * @param {DebugInfoHelper} debugHelper a custom debug info helper
   * @example
   *
   * import { registerDebugInfoHelper } from '@ember/test-helpers';
   *
   * registerDebugInfoHelper({
   *   name: 'Date override detection',
   *   log() {
   *     if (dateIsOverridden()) {
   *       console.log(this.name);
   *       console.log('The date object has been overridden');
   *     }
   *   }
   * })
   */
  _exports.debugInfoHelpers = debugInfoHelpers;
  function registerDebugInfoHelper(debugHelper) {
    debugInfoHelpers.add(debugHelper);
  }
});
define("@ember/test-helpers/-internal/debug-info", ["exports", "@ember/runloop", "@ember/test-helpers/-internal/debug-info-helpers", "@ember/test-waiters"], function (_exports, _runloop, _debugInfoHelpers, _testWaiters) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.TestDebugInfo = void 0;
  _exports.backburnerDebugInfoAvailable = backburnerDebugInfoAvailable;
  _exports.getDebugInfo = getDebugInfo;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop",0,"@ember/test-helpers/-internal/debug-info-helpers",0,"@ember/test-waiters"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // @ts-ignore: this is private API. This import will work Ember 5.1+ since it
  // "provides" this public API, but does not for earlier versions. As a result,
  // this type will be `any`.
  const PENDING_AJAX_REQUESTS = 'Pending AJAX requests';
  const PENDING_TEST_WAITERS = 'Pending test waiters';
  const SCHEDULED_ASYNC = 'Scheduled async';
  const SCHEDULED_AUTORUN = 'Scheduled autorun';
  /**
   * Determines if the `getDebugInfo` method is available in the
   * running verison of backburner.
   *
   * @returns {boolean} True if `getDebugInfo` is present in backburner, otherwise false.
   */
  function backburnerDebugInfoAvailable() {
    return typeof _runloop._backburner.getDebugInfo === 'function';
  }

  /**
   * Retrieves debug information from backburner's current deferred actions queue (runloop instance).
   * If the `getDebugInfo` method isn't available, it returns `null`.
   *
   * @public
   * @returns {MaybeDebugInfo | null} Backburner debugInfo or, if the getDebugInfo method is not present, null
   */
  function getDebugInfo() {
    return _runloop._backburner.DEBUG === true && backburnerDebugInfoAvailable() ? _runloop._backburner.getDebugInfo() : null;
  }

  /**
   * Encapsulates debug information for an individual test. Aggregates information
   * from:
   * - info provided by getSettledState
   *    - hasPendingTimers
   *    - hasRunLoop
   *    - hasPendingWaiters
   *    - hasPendingRequests
   * - info provided by backburner's getDebugInfo method (timers, schedules, and stack trace info)
   *
   */
  class TestDebugInfo {
    constructor(settledState, debugInfo = getDebugInfo()) {
      _defineProperty(this, "_summaryInfo", undefined);
      this._settledState = settledState;
      this._debugInfo = debugInfo;
    }
    get summary() {
      if (!this._summaryInfo) {
        this._summaryInfo = {
          ...this._settledState
        };
        if (this._debugInfo) {
          this._summaryInfo.autorunStackTrace = this._debugInfo.autorun && this._debugInfo.autorun.stack;
          this._summaryInfo.pendingTimersCount = this._debugInfo.timers.length;
          this._summaryInfo.hasPendingTimers = this._settledState.hasPendingTimers && this._summaryInfo.pendingTimersCount > 0;
          this._summaryInfo.pendingTimersStackTraces = this._debugInfo.timers.map(timer => timer.stack);
          this._summaryInfo.pendingScheduledQueueItemCount = this._debugInfo.instanceStack.filter(isNotNullable).reduce((total, item) => {
            Object.values(item).forEach(queueItems => {
              // SAFETY: this cast is required for versions of Ember which do
              // not supply a correct definition of these types. It should
              // also be compatible with the version where Ember *does* supply
              // the types correctly.
              total += queueItems?.length ?? 0;
            });
            return total;
          }, 0);
          this._summaryInfo.pendingScheduledQueueItemStackTraces = this._debugInfo.instanceStack.filter(isNotNullable).reduce((stacks, deferredActionQueues) => {
            Object.values(deferredActionQueues).forEach(queueItems => {
              // SAFETY: this cast is required for versions of Ember which do
              // not supply a correct definition of these types. It should
              // also be compatible with the version where Ember *does* supply
              // the types correctly.
              queueItems?.forEach(queueItem => queueItem.stack && stacks.push(queueItem.stack));
            });
            return stacks;
          }, []);
        }
        if (this._summaryInfo.hasPendingTestWaiters) {
          this._summaryInfo.pendingTestWaiterInfo = (0, _testWaiters.getPendingWaiterState)();
        }
      }
      return this._summaryInfo;
    }
    toConsole(_console = console) {
      let summary = this.summary;
      if (summary.hasPendingRequests) {
        _console.log(PENDING_AJAX_REQUESTS);
      }
      if (summary.hasPendingLegacyWaiters) {
        _console.log(PENDING_TEST_WAITERS);
      }
      if (summary.hasPendingTestWaiters) {
        if (!summary.hasPendingLegacyWaiters) {
          _console.log(PENDING_TEST_WAITERS);
        }
        Object.keys(summary.pendingTestWaiterInfo.waiters).forEach(waiterName => {
          let waiterDebugInfo = summary.pendingTestWaiterInfo.waiters[waiterName];
          if (Array.isArray(waiterDebugInfo)) {
            _console.group(waiterName);
            waiterDebugInfo.forEach(debugInfo => {
              _console.log(`${debugInfo.label ? debugInfo.label : 'stack'}: ${debugInfo.stack}`);
            });
            _console.groupEnd();
          } else {
            _console.log(waiterName);
          }
        });
      }
      if (summary.hasPendingTimers || summary.pendingScheduledQueueItemCount > 0) {
        _console.group(SCHEDULED_ASYNC);
        summary.pendingTimersStackTraces.forEach(timerStack => {
          _console.log(timerStack);
        });
        summary.pendingScheduledQueueItemStackTraces.forEach(scheduleQueueItemStack => {
          _console.log(scheduleQueueItemStack);
        });
        _console.groupEnd();
      }
      if (summary.hasRunLoop && summary.pendingTimersCount === 0 && summary.pendingScheduledQueueItemCount === 0) {
        _console.log(SCHEDULED_AUTORUN);
        if (summary.autorunStackTrace) {
          _console.log(summary.autorunStackTrace);
        }
      }
      _debugInfoHelpers.debugInfoHelpers.forEach(helper => {
        helper.log();
      });
    }
    _formatCount(title, count) {
      return `${title}: ${count}`;
    }
  }

  // eslint-disable-next-line require-jsdoc
  _exports.TestDebugInfo = TestDebugInfo;
  function isNotNullable(value) {
    return value != null;
  }
});
define("@ember/test-helpers/-internal/deprecations", ["exports", "@ember/debug", "@ember/test-helpers/-internal/is-promise"], function (_exports, _debug, _isPromise) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getDeprecationsDuringCallbackForContext = getDeprecationsDuringCallbackForContext;
  _exports.getDeprecationsForContext = getDeprecationsForContext;
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember/test-helpers/-internal/is-promise"eaimeta@70e063a35619d71f
  const DEPRECATIONS = new WeakMap();

  /**
   *
   * Provides the list of deprecation failures associated with a given base context;
   *
   * @private
   * @param {BaseContext} [context] the test context
   * @return {Array<DeprecationFailure>} the Deprecation Failures associated with the corresponding BaseContext;
   */
  function getDeprecationsForContext(context) {
    if (!context) {
      throw new TypeError(`[@ember/test-helpers] could not get deprecations for an invalid test context: '${context}'`);
    }
    let deprecations = DEPRECATIONS.get(context);
    if (!Array.isArray(deprecations)) {
      deprecations = [];
      DEPRECATIONS.set(context, deprecations);
    }
    return deprecations;
  }

  /**
   *
   * Provides the list of deprecation failures associated with a given base
   * context which occur while a callback is executed. This callback can be
   * synchronous, or it can be an async function.
   *
   * @private
   * @param {BaseContext} [context] the test context
   * @param {Function} [callback] The callback that when executed will have its DeprecationFailure recorded
   * @return {Array<DeprecationFailure>} The Deprecation Failures associated with the corresponding baseContext which occurred while the CallbackFunction was executed
   */
  function getDeprecationsDuringCallbackForContext(context, callback) {
    if (!context) {
      throw new TypeError(`[@ember/test-helpers] could not get deprecations for an invalid test context: '${context}'`);
    }
    const deprecations = getDeprecationsForContext(context);
    const previousLength = deprecations.length;
    const result = callback();
    if ((0, _isPromise.default)(result)) {
      return Promise.resolve(result).then(() => {
        return deprecations.slice(previousLength); // only return deprecations created as a result of the callback
      });
    } else {
      return deprecations.slice(previousLength); // only return deprecations created as a result of the callback
    }
  }

  // This provides (when the environment supports) queryParam support for deprecations:
  // * squelch deprecations by name via: `/tests/index.html?disabledDeprecations=this-property-fallback,some-other-thing`
  // * enable a debuggger when a deprecation by a specific name is encountered via: `/tests/index.html?debugDeprecations=some-other-thing` when the
  if (typeof URLSearchParams !== 'undefined') {
    let queryParams = new URLSearchParams(document.location.search.substring(1));
    const disabledDeprecations = queryParams.get('disabledDeprecations');
    const debugDeprecations = queryParams.get('debugDeprecations');

    // When using `/tests/index.html?disabledDeprecations=this-property-fallback,some-other-thing`
    // those deprecations will be squelched
    if (disabledDeprecations) {
      (0, _debug.registerDeprecationHandler)((message, options, next) => {
        if (!options || !disabledDeprecations.includes(options.id)) {
          next.apply(null, [message, options]);
        }
      });
    }

    // When using `/tests/index.html?debugDeprecations=some-other-thing` when the
    // `some-other-thing` deprecation is triggered, this `debugger` will be hit`
    if (debugDeprecations) {
      (0, _debug.registerDeprecationHandler)((message, options, next) => {
        if (options && debugDeprecations.includes(options.id)) {
          debugger; // eslint-disable-line no-debugger
        }

        next.apply(null, [message, options]);
      });
    }
  }
});
define("@ember/test-helpers/-internal/is-component", ["exports", "@glimmer/manager"], function (_exports, _manager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/manager"eaimeta@70e063a35619d71f
  // @ts-ignore: types for this API is not consistently available (via transitive
  // deps) and we do not currently want to make it an explicit dependency. It
  // does, however, consistently work at runtime. :sigh:
  /**
   * We should ultimately get a new API from @glimmer/runtime that provides this functionality
   * (see https://github.com/emberjs/rfcs/pull/785 for more info).
   * @private
   * @param {Object} maybeComponent The thing you think might be a component
   * @returns {boolean} True if it's a component, false if not
   */
  function isComponent(maybeComponent) {
    return !!(0, _manager.getInternalComponentManager)(maybeComponent, true);
  }
  var _default = isComponent;
  _exports.default = _default;
});
define("@ember/test-helpers/-internal/is-promise", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  /**
   *
   * detect if a value appears to be a promise
   *
   * @private
   * @param {any} [maybePromise] the value being considered to be a promise
   * @return {boolean} true if the value appears to be a promise, or false otherwise
   */
  function _default(maybePromise) {
    return maybePromise !== null && (typeof maybePromise === 'object' || typeof maybePromise === 'function') && typeof maybePromise.then === 'function';
  }
});
define("@ember/test-helpers/-internal/render-settled", ["exports", "@embroider/macros/es-compat2"], function (_exports, _esCompat) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@embroider/macros",0,"@ember/renderer"eaimeta@70e063a35619d71f
  let renderSettled;
  {
    //@ts-ignore
    renderSettled = (0, _esCompat.default)(require("@ember/renderer")).renderSettled;
  }
  var _default = renderSettled;
  _exports.default = _default;
});
define("@ember/test-helpers/-internal/warnings", ["exports", "@ember/debug", "@ember/test-helpers/-internal/is-promise"], function (_exports, _debug, _isPromise) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getWarningsDuringCallbackForContext = getWarningsDuringCallbackForContext;
  _exports.getWarningsForContext = getWarningsForContext;
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember/test-helpers/-internal/is-promise"eaimeta@70e063a35619d71f
  // the WARNINGS data structure which is used to weakly associated warnings with
  // the test context their occurred within
  const WARNINGS = new WeakMap();

  /**
   *
   * Provides the list of warnings associated with a given base context;
   *
   * @private
   * @param {BaseContext} [context] the test context
   * @return {Array<Warning>} the warnings associated with the corresponding BaseContext;
   */
  function getWarningsForContext(context) {
    if (!context) {
      throw new TypeError(`[@ember/test-helpers] could not get warnings for an invalid test context: '${context}'`);
    }
    let warnings = WARNINGS.get(context);
    if (!Array.isArray(warnings)) {
      warnings = [];
      WARNINGS.set(context, warnings);
    }
    return warnings;
  }

  /**
   *
   * Provides the list of warnings associated with a given test context which
   * occurred only while a the provided callback is executed. This callback can be
   * synchronous, or it can be an async function.
   *
   * @private
   * @param {BaseContext} [context] the test context
   * @param {Function} [callback] The callback that when executed will have its warnings recorded
   * @return {Array<Warning>} The warnings associated with the corresponding baseContext which occurred while the CallbackFunction was executed
   */
  function getWarningsDuringCallbackForContext(context, callback) {
    if (!context) {
      throw new TypeError(`[@ember/test-helpers] could not get warnings for an invalid test context: '${context}'`);
    }
    const warnings = getWarningsForContext(context);
    const previousLength = warnings.length;
    const result = callback();
    if ((0, _isPromise.default)(result)) {
      return Promise.resolve(result).then(() => {
        return warnings.slice(previousLength); // only return warnings created as a result of the callback
      });
    } else {
      return warnings.slice(previousLength); // only return warnings created as a result of the callback
    }
  }

  // This provides (when the environment supports) queryParam support for warnings:
  // * squelch warnings by name via: `/tests/index.html?disabledWarnings=this-property-fallback,some-other-thing`
  // * enable a debuggger when a warning by a specific name is encountered via: `/tests/index.html?debugWarnings=some-other-thing` when the
  if (typeof URLSearchParams !== 'undefined') {
    const queryParams = new URLSearchParams(document.location.search.substring(1));
    const disabledWarnings = queryParams.get('disabledWarnings');
    const debugWarnings = queryParams.get('debugWarnings');

    // When using `/tests/index.html?disabledWarnings=this-property-fallback,some-other-thing`
    // those warnings will be squelched
    if (disabledWarnings) {
      (0, _debug.registerWarnHandler)((message, options, next) => {
        if (!options || !disabledWarnings.includes(options.id)) {
          next.apply(null, [message, options]);
        }
      });
    }

    // When using `/tests/index.html?debugWarnings=some-other-thing` when the
    // `some-other-thing` warning is triggered, this `debugger` will be hit`
    if (debugWarnings) {
      (0, _debug.registerWarnHandler)((message, options, next) => {
        if (options && debugWarnings.includes(options.id)) {
          debugger; // eslint-disable-line no-debugger
        }

        next.apply(null, [message, options]);
      });
    }
  }
});
define("@ember/test-helpers/-tuple", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = tuple;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  // eslint-disable-next-line require-jsdoc
  function tuple(...args) {
    return args;
  }
});
define("@ember/test-helpers/-utils", ["exports", "@ember/test-helpers/dom/-is-form-control"], function (_exports, _isFormControl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.futureTick = void 0;
  _exports.isDisabled = isDisabled;
  _exports.isNumeric = isNumeric;
  _exports.isVisible = isVisible;
  _exports.nextTick = void 0;
  _exports.runDestroyablesFor = runDestroyablesFor;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/dom/-is-form-control"eaimeta@70e063a35619d71f
  /* globals Promise */
  const nextTick = cb => Promise.resolve().then(cb);
  _exports.nextTick = nextTick;
  const futureTick = setTimeout;

  /**
   Retrieves an array of destroyables from the specified property on the object
   provided, iterates that array invoking each function, then deleting the
   property (clearing the array).
  
   @private
   @param {Object} object an object to search for the destroyable array within
   @param {string} property the property on the object that contains the destroyable array
  */
  _exports.futureTick = futureTick;
  function runDestroyablesFor(object, property) {
    let destroyables = object[property];
    if (!destroyables) {
      return;
    }
    for (let i = 0; i < destroyables.length; i++) {
      destroyables[i]();
    }
    delete object[property];
  }

  /**
   Returns whether the passed in string consists only of numeric characters.
  
   @private
   @param {string} n input string
   @returns {boolean} whether the input string consists only of numeric characters
   */
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(Number(n));
  }

  /**
    Checks if an element is considered visible by the focus area spec.
  
    @private
    @param {Element} element the element to check
    @returns {boolean} `true` when the element is visible, `false` otherwise
  */
  function isVisible(element) {
    let styles = window.getComputedStyle(element);
    return styles.display !== 'none' && styles.visibility !== 'hidden';
  }

  /**
    Checks if an element is disabled.
  
    @private
    @param {Element} element the element to check
    @returns {boolean} `true` when the element is disabled, `false` otherwise
  */
  function isDisabled(element) {
    if ((0, _isFormControl.default)(element)) {
      return element.disabled;
    }
    return false;
  }
});
define("@ember/test-helpers/application", ["exports", "@ember/test-helpers/resolver"], function (_exports, _resolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getApplication = getApplication;
  _exports.setApplication = setApplication;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/resolver"eaimeta@70e063a35619d71f
  let __application__;

  /**
    Stores the provided application instance so that tests being ran will be aware of the application under test.
  
    - Required by `setupApplicationContext` method.
    - Used by `setupContext` and `setupRenderingContext` when present.
  
    @public
    @param {Ember.Application} application the application that will be tested
  */
  function setApplication(application) {
    __application__ = application;
    if (!(0, _resolver.getResolver)()) {
      let Resolver = application.Resolver;
      let resolver = Resolver.create({
        namespace: application
      });
      (0, _resolver.setResolver)(resolver);
    }
  }

  /**
    Retrieve the application instance stored by `setApplication`.
  
    @public
    @returns {Ember.Application} the previously stored application instance under test
  */
  function getApplication() {
    return __application__;
  }
});
define("@ember/test-helpers/build-owner", ["exports", "@ember/test-helpers/-internal/build-registry"], function (_exports, _buildRegistry) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = buildOwner;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/-internal/build-registry"eaimeta@70e063a35619d71f
  /**
    Creates an "owner" (an object that either _is_ or duck-types like an
    `Ember.ApplicationInstance`) from the provided options.
  
    If `options.application` is present (e.g. setup by an earlier call to
    `setApplication`) an `Ember.ApplicationInstance` is built via
    `application.buildInstance()`.
  
    If `options.application` is not present, we fall back to using
    `options.resolver` instead (setup via `setResolver`). This creates a mock
    "owner" by using a custom created combination of `Ember.Registry`,
    `Ember.Container`, `Ember._ContainerProxyMixin`, and
    `Ember._RegistryProxyMixin`.
  
    @private
    @param {Ember.Application} [application] the Ember.Application to build an instance from
    @param {Ember.Resolver} [resolver] the resolver to use to back a "mock owner"
    @returns {Promise<Ember.ApplicationInstance>} a promise resolving to the generated "owner"
  */
  function buildOwner(application, resolver) {
    if (application) {
      // @ts-ignore: this type is correct and will check against Ember 4.12 or 5.1
      // or later. However, the first round of preview types in Ember 4.8 does not
      // include the `visit` API (it was missing for many years!) and therefore
      // there is no way to make this assignable accross all supported versions.
      return application.boot().then(app => app.buildInstance().boot());
    }
    if (!resolver) {
      throw new Error('You must set up the ember-test-helpers environment with either `setResolver` or `setApplication` before running any tests.');
    }
    let {
      owner
    } = (0, _buildRegistry.default)(resolver);
    return Promise.resolve(owner);
  }
});
define("@ember/test-helpers/dom/-get-element", ["exports", "@ember/test-helpers/dom/get-root-element", "@ember/test-helpers/dom/-target"], function (_exports, _getRootElement, _target) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/dom/get-root-element",0,"@ember/test-helpers/dom/-target"eaimeta@70e063a35619d71f
  /**
    Used internally by the DOM interaction helpers to find one element.
  
    @private
    @param {string|Element} target the element or selector to retrieve
    @returns {Element} the target or selector
  */
  function getElement(target) {
    if (typeof target === 'string') {
      let rootElement = (0, _getRootElement.default)();
      return rootElement.querySelector(target);
    } else if ((0, _target.isElement)(target) || (0, _target.isDocument)(target)) {
      return target;
    } else if (target instanceof Window) {
      return target.document;
    } else {
      throw new Error('Must use an element or a selector string');
    }
  }
  var _default = getElement;
  _exports.default = _default;
});
define("@ember/test-helpers/dom/-get-elements", ["exports", "@ember/test-helpers/dom/get-root-element"], function (_exports, _getRootElement) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = getElements;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/dom/get-root-element"eaimeta@70e063a35619d71f
  /**
    Used internally by the DOM interaction helpers to find multiple elements.
  
    @private
    @param {string} target the selector to retrieve
    @returns {NodeList} the matched elements
  */
  function getElements(target) {
    if (typeof target === 'string') {
      let rootElement = (0, _getRootElement.default)();
      return rootElement.querySelectorAll(target);
    } else {
      throw new Error('Must use a selector string');
    }
  }
});
define("@ember/test-helpers/dom/-get-window-or-element", ["exports", "@ember/test-helpers/dom/-get-element", "@ember/test-helpers/dom/-target"], function (_exports, _getElement, _target) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getWindowOrElement = getWindowOrElement;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/dom/-get-element",0,"@ember/test-helpers/dom/-target"eaimeta@70e063a35619d71f
  /**
    Used internally by the DOM interaction helpers to find either window or an element.
  
    @private
    @param {string|Element} target the window, an element or selector to retrieve
    @returns {Element|Window} the target or selector
  */
  function getWindowOrElement(target) {
    if ((0, _target.isWindow)(target)) {
      return target;
    }
    return (0, _getElement.default)(target);
  }
});
define("@ember/test-helpers/dom/-guard-for-maxlength", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = guardForMaxlength;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  // ref: https://html.spec.whatwg.org/multipage/input.html#concept-input-apply
  const constrainedInputTypes = ['text', 'search', 'url', 'tel', 'email', 'password'];

  /**
    @private
    @param {Element} element - the element to check
    @returns {boolean} `true` when the element should constrain input by the maxlength attribute, `false` otherwise
  */
  function isMaxLengthConstrained(element) {
    return !!Number(element.getAttribute('maxLength')) && (element instanceof HTMLTextAreaElement || element instanceof HTMLInputElement && constrainedInputTypes.indexOf(element.type) > -1);
  }

  /**
   * @private
   * @param {Element} element - the element to check
   * @param {string} text - the text being added to element
   * @param {string} testHelper - the test helper context the guard is called from (for Error message)
   * @throws if `element` has `maxlength` & `value` exceeds `maxlength`
   */
  function guardForMaxlength(element, text, testHelper) {
    const maxlength = element.getAttribute('maxlength');
    if (isMaxLengthConstrained(element) && maxlength && text && text.length > Number(maxlength)) {
      throw new Error(`Can not \`${testHelper}\` with text: '${text}' that exceeds maxlength: '${maxlength}'.`);
    }
  }
});
define("@ember/test-helpers/dom/-is-focusable", ["exports", "@ember/test-helpers/dom/-is-form-control", "@ember/test-helpers/dom/-target"], function (_exports, _isFormControl, _target) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = isFocusable;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/dom/-is-form-control",0,"@ember/test-helpers/dom/-target"eaimeta@70e063a35619d71f
  // For reference:
  // https://html.spec.whatwg.org/multipage/interaction.html#the-tabindex-attribute
  const FOCUSABLE_TAGS = ['A', 'SUMMARY'];
  // eslint-disable-next-line require-jsdoc
  function isFocusableElement(element) {
    return FOCUSABLE_TAGS.indexOf(element.tagName) > -1;
  }

  /**
    @private
    @param {Element} element the element to check
    @returns {boolean} `true` when the element is focusable, `false` otherwise
  */
  function isFocusable(element) {
    if ((0, _target.isWindow)(element)) {
      return false;
    }
    if ((0, _target.isDocument)(element)) {
      return false;
    }
    if ((0, _isFormControl.default)(element)) {
      return !element.disabled;
    }
    if ((0, _target.isContentEditable)(element) || isFocusableElement(element)) {
      return true;
    }
    return element.hasAttribute('tabindex');
  }
});
define("@ember/test-helpers/dom/-is-form-control", ["exports", "@ember/test-helpers/dom/-target"], function (_exports, _target) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = isFormControl;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/dom/-target"eaimeta@70e063a35619d71f
  const FORM_CONTROL_TAGS = ['INPUT', 'BUTTON', 'SELECT', 'TEXTAREA'];
  /**
    @private
    @param {Element} element the element to check
    @returns {boolean} `true` when the element is a form control, `false` otherwise
  */
  function isFormControl(element) {
    return !(0, _target.isWindow)(element) && !(0, _target.isDocument)(element) && FORM_CONTROL_TAGS.indexOf(element.tagName) > -1 && element.type !== 'hidden';
  }
});
define("@ember/test-helpers/dom/-is-select-element", ["exports", "@ember/test-helpers/dom/-target"], function (_exports, _target) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = isSelectElement;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/dom/-target"eaimeta@70e063a35619d71f
  /**
    @private
    @param {Element} element the element to check
    @returns {boolean} `true` when the element is a select element, `false` otherwise
  */
  function isSelectElement(element) {
    return !(0, _target.isDocument)(element) && element.tagName === 'SELECT';
  }
});
define("@ember/test-helpers/dom/-logging", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.elementToString = elementToString;
  _exports.log = log;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  /**
   * Logs a debug message to the console if the `testHelperLogging` query
   * parameter is set.
   *
   * @private
   * @param {string} helperName Name of the helper
   * @param {string|Element} target The target element or selector
   */
  function log(helperName, target, ...args) {
    if (loggingEnabled()) {
      // eslint-disable-next-line no-console
      console.log(`${helperName}(${[elementToString(target), ...args.filter(Boolean)].join(', ')})`);
    }
  }

  /**
   * Returns whether the test helper logging is enabled or not via the
   * `testHelperLogging` query parameter.
   *
   * @private
   * @returns {boolean} true if enabled
   */
  function loggingEnabled() {
    return typeof location !== 'undefined' && location.search.indexOf('testHelperLogging') !== -1;
  }

  /**
   * This generates a human-readable description to a DOM element.
   *
   * @private
   * @param {*} el The element that should be described
   * @returns {string} A human-readable description
   */
  function elementToString(el) {
    let desc;
    if (el instanceof NodeList) {
      if (el.length === 0) {
        return 'empty NodeList';
      }
      desc = Array.prototype.slice.call(el, 0, 5).map(elementToString).join(', ');
      return el.length > 5 ? `${desc}... (+${el.length - 5} more)` : desc;
    }
    if (!(el instanceof HTMLElement || el instanceof SVGElement)) {
      return String(el);
    }
    desc = el.tagName.toLowerCase();
    if (el.id) {
      desc += `#${el.id}`;
    }
    if (el.className && !(el.className instanceof SVGAnimatedString)) {
      desc += `.${String(el.className).replace(/\s+/g, '.')}`;
    }
    Array.prototype.forEach.call(el.attributes, function (attr) {
      if (attr.name !== 'class' && attr.name !== 'id') {
        desc += `[${attr.name}${attr.value ? `="${attr.value}"]` : ']'}`;
      }
    });
    return desc;
  }
});
define("@ember/test-helpers/dom/-target", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.isContentEditable = isContentEditable;
  _exports.isDocument = isDocument;
  _exports.isElement = isElement;
  _exports.isWindow = isWindow;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  // eslint-disable-next-line require-jsdoc
  function isElement(target) {
    return target !== null && typeof target === 'object' && Reflect.get(target, 'nodeType') === Node.ELEMENT_NODE;
  }

  // eslint-disable-next-line require-jsdoc
  function isWindow(target) {
    return target instanceof Window;
  }

  // eslint-disable-next-line require-jsdoc
  function isDocument(target) {
    return target !== null && typeof target === 'object' && Reflect.get(target, 'nodeType') === Node.DOCUMENT_NODE;
  }

  // eslint-disable-next-line require-jsdoc
  function isContentEditable(element) {
    return 'isContentEditable' in element && element.isContentEditable;
  }
});
define("@ember/test-helpers/dom/-to-array", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = toArray;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  /**
    @private
    @param {NodeList} nodelist the nodelist to convert to an array
    @returns {Array} an array
  */
  function toArray(nodelist) {
    let array = new Array(nodelist.length);
    for (let i = 0; i < nodelist.length; i++) {
      array[i] = nodelist[i];
    }
    return array;
  }
});
define("@ember/test-helpers/dom/blur", ["exports", "@ember/test-helpers/dom/-get-element", "@ember/test-helpers/dom/fire-event", "@ember/test-helpers/settled", "@ember/test-helpers/dom/-logging", "@ember/test-helpers/dom/-is-focusable", "@ember/test-helpers/helper-hooks"], function (_exports, _getElement, _fireEvent, _settled, _logging, _isFocusable, _helperHooks) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.__blur__ = __blur__;
  _exports.default = blur;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/dom/-get-element",0,"@ember/test-helpers/dom/fire-event",0,"@ember/test-helpers/settled",0,"@ember/test-helpers/dom/-logging",0,"@ember/test-helpers/dom/-is-focusable",0,"@ember/test-helpers/helper-hooks"eaimeta@70e063a35619d71f
  (0, _helperHooks.registerHook)('blur', 'start', target => {
    (0, _logging.log)('blur', target);
  });

  /**
    @private
    @param {Element} element the element to trigger events on
    @param {Element} relatedTarget the element that is focused after blur
    @return {Promise<Event | void>} resolves when settled
  */
  function __blur__(element, relatedTarget = null) {
    if (!(0, _isFocusable.default)(element)) {
      throw new Error(`${element} is not focusable`);
    }
    let browserIsNotFocused = document.hasFocus && !document.hasFocus();
    let needsCustomEventOptions = relatedTarget !== null;
    if (!needsCustomEventOptions) {
      // makes `document.activeElement` be `body`.
      // If the browser is focused, it also fires a blur event
      element.blur();
    }

    // Chrome/Firefox does not trigger the `blur` event if the window
    // does not have focus. If the document does not have focus then
    // fire `blur` event via native event.
    let options = {
      relatedTarget
    };
    return browserIsNotFocused || needsCustomEventOptions ? Promise.resolve().then(() => (0, _fireEvent.default)(element, 'blur', {
      bubbles: false,
      ...options
    })).then(() => (0, _fireEvent.default)(element, 'focusout', options)) : Promise.resolve();
  }

  /**
    Unfocus the specified target.
  
    Sends a number of events intending to simulate a "real" user unfocusing an
    element.
  
    The following events are triggered (in order):
  
    - `blur`
    - `focusout`
  
    The exact listing of events that are triggered may change over time as needed
    to continue to emulate how actual browsers handle unfocusing a given element.
  
    @public
    @param {string|Element} [target=document.activeElement] the element or selector to unfocus
    @return {Promise<void>} resolves when settled
  
    @example
    <caption>
      Emulating blurring an input using `blur`
    </caption>
  
    blur('input');
  */
  function blur(target = document.activeElement) {
    return Promise.resolve().then(() => (0, _helperHooks.runHooks)('blur', 'start', target)).then(() => {
      let element = (0, _getElement.default)(target);
      if (!element) {
        throw new Error(`Element not found when calling \`blur('${target}')\`.`);
      }
      return __blur__(element).then(() => (0, _settled.default)());
    }).then(() => (0, _helperHooks.runHooks)('blur', 'end', target));
  }
});
define("@ember/test-helpers/dom/click", ["exports", "@ember/test-helpers/dom/-get-window-or-element", "@ember/test-helpers/dom/fire-event", "@ember/test-helpers/dom/focus", "@ember/test-helpers/settled", "@ember/test-helpers/dom/-is-form-control", "@ember/test-helpers/dom/-target", "@ember/test-helpers/dom/-logging", "@ember/test-helpers/helper-hooks"], function (_exports, _getWindowOrElement, _fireEvent, _focus, _settled, _isFormControl, _target, _logging, _helperHooks) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.DEFAULT_CLICK_OPTIONS = void 0;
  _exports.__click__ = __click__;
  _exports.default = click;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/dom/-get-window-or-element",0,"@ember/test-helpers/dom/fire-event",0,"@ember/test-helpers/dom/focus",0,"@ember/test-helpers/settled",0,"@ember/test-helpers/dom/-is-form-control",0,"@ember/test-helpers/dom/-target",0,"@ember/test-helpers/dom/-logging",0,"@ember/test-helpers/helper-hooks"eaimeta@70e063a35619d71f
  const PRIMARY_BUTTON = 1;
  const MAIN_BUTTON_PRESSED = 0;
  (0, _helperHooks.registerHook)('click', 'start', target => {
    (0, _logging.log)('click', target);
  });

  /**
   * Represent a particular mouse button being clicked.
   * See https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons for available options.
   */
  const DEFAULT_CLICK_OPTIONS = {
    buttons: PRIMARY_BUTTON,
    button: MAIN_BUTTON_PRESSED
  };

  /**
    @private
    @param {Element} element the element to click on
    @param {MouseEventInit} options the options to be merged into the mouse events
    @return {Promise<Event | void>} resolves when settled
  */
  _exports.DEFAULT_CLICK_OPTIONS = DEFAULT_CLICK_OPTIONS;
  function __click__(element, options) {
    return Promise.resolve().then(() => (0, _fireEvent.default)(element, 'mousedown', options)).then(mouseDownEvent => !(0, _target.isWindow)(element) && !mouseDownEvent?.defaultPrevented ? (0, _focus.__focus__)(element) : Promise.resolve()).then(() => (0, _fireEvent.default)(element, 'mouseup', options)).then(() => (0, _fireEvent.default)(element, 'click', options));
  }

  /**
    Clicks on the specified target.
  
    Sends a number of events intending to simulate a "real" user clicking on an
    element.
  
    For non-focusable elements the following events are triggered (in order):
  
    - `mousedown`
    - `mouseup`
    - `click`
  
    For focusable (e.g. form control) elements the following events are triggered
    (in order):
  
    - `mousedown`
    - `focus`
    - `focusin`
    - `mouseup`
    - `click`
  
    The exact listing of events that are triggered may change over time as needed
    to continue to emulate how actual browsers handle clicking a given element.
  
    Use the `options` hash to change the parameters of the [MouseEvents](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent).
    You can use this to specify modifier keys as well.
  
    @public
    @param {string|Element} target the element or selector to click on
    @param {MouseEventInit} _options the options to be merged into the mouse events.
    @return {Promise<void>} resolves when settled
  
    @example
    <caption>
      Emulating clicking a button using `click`
    </caption>
    click('button');
  
    @example
    <caption>
      Emulating clicking a button and pressing the `shift` key simultaneously using `click` with `options`.
    </caption>
  
    click('button', { shiftKey: true });
  */
  function click(target, _options = {}) {
    let options = {
      ...DEFAULT_CLICK_OPTIONS,
      ..._options
    };
    return Promise.resolve().then(() => (0, _helperHooks.runHooks)('click', 'start', target, _options)).then(() => {
      if (!target) {
        throw new Error('Must pass an element or selector to `click`.');
      }
      let element = (0, _getWindowOrElement.getWindowOrElement)(target);
      if (!element) {
        throw new Error(`Element not found when calling \`click('${target}')\`.`);
      }
      if ((0, _isFormControl.default)(element) && element.disabled) {
        throw new Error(`Can not \`click\` disabled ${element}`);
      }
      return __click__(element, options).then(_settled.default);
    }).then(() => (0, _helperHooks.runHooks)('click', 'end', target, _options));
  }
});
define("@ember/test-helpers/dom/double-click", ["exports", "@ember/test-helpers/dom/-get-window-or-element", "@ember/test-helpers/dom/fire-event", "@ember/test-helpers/dom/focus", "@ember/test-helpers/settled", "@ember/test-helpers/dom/click", "@ember/test-helpers/dom/-target", "@ember/test-helpers/dom/-logging", "@ember/test-helpers/dom/-is-form-control", "@ember/test-helpers/helper-hooks"], function (_exports, _getWindowOrElement, _fireEvent, _focus, _settled, _click, _target, _logging, _isFormControl, _helperHooks) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.__doubleClick__ = __doubleClick__;
  _exports.default = doubleClick;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/dom/-get-window-or-element",0,"@ember/test-helpers/dom/fire-event",0,"@ember/test-helpers/dom/focus",0,"@ember/test-helpers/settled",0,"@ember/test-helpers/dom/click",0,"@ember/test-helpers/dom/-target",0,"@ember/test-helpers/dom/-logging",0,"@ember/test-helpers/dom/-is-form-control",0,"@ember/test-helpers/helper-hooks"eaimeta@70e063a35619d71f
  (0, _helperHooks.registerHook)('doubleClick', 'start', target => {
    (0, _logging.log)('doubleClick', target);
  });

  /**
    @private
    @param {Element} element the element to double-click on
    @param {MouseEventInit} options the options to be merged into the mouse events
    @returns {Promise<Event | void>} resolves when settled
  */
  function __doubleClick__(element, options) {
    return Promise.resolve().then(() => (0, _fireEvent.default)(element, 'mousedown', options)).then(mouseDownEvent => {
      return !(0, _target.isWindow)(element) && !mouseDownEvent?.defaultPrevented ? (0, _focus.__focus__)(element) : Promise.resolve();
    }).then(() => (0, _fireEvent.default)(element, 'mouseup', options)).then(() => (0, _fireEvent.default)(element, 'click', options)).then(() => (0, _fireEvent.default)(element, 'mousedown', options)).then(() => (0, _fireEvent.default)(element, 'mouseup', options)).then(() => (0, _fireEvent.default)(element, 'click', options)).then(() => (0, _fireEvent.default)(element, 'dblclick', options));
  }

  /**
    Double-clicks on the specified target.
  
    Sends a number of events intending to simulate a "real" user clicking on an
    element.
  
    For non-focusable elements the following events are triggered (in order):
  
    - `mousedown`
    - `mouseup`
    - `click`
    - `mousedown`
    - `mouseup`
    - `click`
    - `dblclick`
  
    For focusable (e.g. form control) elements the following events are triggered
    (in order):
  
    - `mousedown`
    - `focus`
    - `focusin`
    - `mouseup`
    - `click`
    - `mousedown`
    - `mouseup`
    - `click`
    - `dblclick`
  
    The exact listing of events that are triggered may change over time as needed
    to continue to emulate how actual browsers handle clicking a given element.
  
    Use the `options` hash to change the parameters of the [MouseEvents](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent).
  
    @public
    @param {string|Element} target the element or selector to double-click on
    @param {MouseEventInit} _options the options to be merged into the mouse events
    @return {Promise<void>} resolves when settled
  
    @example
    <caption>
      Emulating double clicking a button using `doubleClick`
    </caption>
  
    doubleClick('button');
  
    @example
    <caption>
      Emulating double clicking a button and pressing the `shift` key simultaneously using `click` with `options`.
    </caption>
  
    doubleClick('button', { shiftKey: true });
  */
  function doubleClick(target, _options = {}) {
    let options = {
      ..._click.DEFAULT_CLICK_OPTIONS,
      ..._options
    };
    return Promise.resolve().then(() => (0, _helperHooks.runHooks)('doubleClick', 'start', target, _options)).then(() => {
      if (!target) {
        throw new Error('Must pass an element or selector to `doubleClick`.');
      }
      let element = (0, _getWindowOrElement.getWindowOrElement)(target);
      if (!element) {
        throw new Error(`Element not found when calling \`doubleClick('${target}')\`.`);
      }
      if ((0, _isFormControl.default)(element) && element.disabled) {
        throw new Error(`Can not \`doubleClick\` disabled ${element}`);
      }
      return __doubleClick__(element, options).then(_settled.default);
    }).then(() => (0, _helperHooks.runHooks)('doubleClick', 'end', target, _options));
  }
});
define("@ember/test-helpers/dom/fill-in", ["exports", "@ember/test-helpers/dom/-get-element", "@ember/test-helpers/dom/-is-form-control", "@ember/test-helpers/dom/-guard-for-maxlength", "@ember/test-helpers/dom/focus", "@ember/test-helpers/settled", "@ember/test-helpers/dom/fire-event", "@ember/test-helpers/dom/-target", "@ember/test-helpers/dom/-logging", "@ember/test-helpers/helper-hooks"], function (_exports, _getElement, _isFormControl, _guardForMaxlength, _focus, _settled, _fireEvent, _target, _logging, _helperHooks) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = fillIn;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/dom/-get-element",0,"@ember/test-helpers/dom/-is-form-control",0,"@ember/test-helpers/dom/-guard-for-maxlength",0,"@ember/test-helpers/dom/focus",0,"@ember/test-helpers/settled",0,"@ember/test-helpers/dom/fire-event",0,"@ember/test-helpers/dom/-target",0,"@ember/test-helpers/dom/-logging",0,"@ember/test-helpers/helper-hooks"eaimeta@70e063a35619d71f
  (0, _helperHooks.registerHook)('fillIn', 'start', (target, text) => {
    (0, _logging.log)('fillIn', target, text);
  });

  /**
    Fill the provided text into the `value` property (or set `.innerHTML` when
    the target is a content editable element) then trigger `change` and `input`
    events on the specified target.
  
    @public
    @param {string|Element} target the element or selector to enter text into
    @param {string} text the text to fill into the target element
    @return {Promise<void>} resolves when the application is settled
  
    @example
    <caption>
      Emulating filling an input with text using `fillIn`
    </caption>
  
    fillIn('input', 'hello world');
  */
  function fillIn(target, text) {
    return Promise.resolve().then(() => (0, _helperHooks.runHooks)('fillIn', 'start', target, text)).then(() => {
      if (!target) {
        throw new Error('Must pass an element or selector to `fillIn`.');
      }
      let element = (0, _getElement.default)(target);
      if (!element) {
        throw new Error(`Element not found when calling \`fillIn('${target}')\`.`);
      }
      if (typeof text === 'undefined' || text === null) {
        throw new Error('Must provide `text` when calling `fillIn`.');
      }
      if ((0, _isFormControl.default)(element)) {
        if (element.disabled) {
          throw new Error(`Can not \`fillIn\` disabled '${target}'.`);
        }
        if ('readOnly' in element && element.readOnly) {
          throw new Error(`Can not \`fillIn\` readonly '${target}'.`);
        }
        (0, _guardForMaxlength.default)(element, text, 'fillIn');
        return (0, _focus.__focus__)(element).then(() => {
          element.value = text;
          return element;
        });
      } else if ((0, _target.isContentEditable)(element)) {
        return (0, _focus.__focus__)(element).then(() => {
          element.innerHTML = text;
          return element;
        });
      } else {
        throw new Error('`fillIn` is only usable on form controls or contenteditable elements.');
      }
    }).then(element => (0, _fireEvent.default)(element, 'input').then(() => (0, _fireEvent.default)(element, 'change')).then(_settled.default)).then(() => (0, _helperHooks.runHooks)('fillIn', 'end', target, text));
  }
});
define("@ember/test-helpers/dom/find-all", ["exports", "@ember/test-helpers/dom/-get-elements"], function (_exports, _getElements) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = findAll;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/dom/-get-elements"eaimeta@70e063a35619d71f
  // Derived, with modification, from the types for `querySelectorAll`. These
  // would simply be defined as a tweaked re-export as `querySelector` is, but it
  // is non-trivial (to say the least!) to preserve overloads like this while also
  // changing the return type (from `NodeListOf` to `Array`).
  /**
    Find all elements matched by the given selector. Similar to calling
    `querySelectorAll()` on the test root element, but returns an array instead
    of a `NodeList`.
  
    @public
    @param {string} selector the selector to search for
    @return {Array} array of matched elements
  
    @example
    <caption>
      Find all of the elements matching '.my-selector'.
    </caption>
    findAll('.my-selector');
  */
  function findAll(selector) {
    if (!selector) {
      throw new Error('Must pass a selector to `findAll`.');
    }
    if (arguments.length > 1) {
      throw new Error('The `findAll` test helper only takes a single argument.');
    }
    return Array.from((0, _getElements.default)(selector));
  }
});
define("@ember/test-helpers/dom/find", ["exports", "@ember/test-helpers/dom/-get-element"], function (_exports, _getElement) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = find;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/dom/-get-element"eaimeta@70e063a35619d71f
  // Derived from `querySelector` types.
  /**
    Find the first element matched by the given selector. Equivalent to calling
    `querySelector()` on the test root element.
  
    @public
    @param {string} selector the selector to search for
    @return {Element | null} matched element or null
  
    @example
    <caption>
      Finding the first element with id 'foo'
    </caption>
    find('#foo');
  */
  function find(selector) {
    if (!selector) {
      throw new Error('Must pass a selector to `find`.');
    }
    if (arguments.length > 1) {
      throw new Error('The `find` test helper only takes a single argument.');
    }
    return (0, _getElement.default)(selector);
  }
});
define("@ember/test-helpers/dom/fire-event", ["exports", "@ember/test-helpers/dom/-target", "@ember/test-helpers/-tuple", "@ember/test-helpers/dom/-logging", "@ember/test-helpers/helper-hooks"], function (_exports, _target, _tuple, _logging, _helperHooks) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.KEYBOARD_EVENT_TYPES = void 0;
  _exports._buildKeyboardEvent = _buildKeyboardEvent;
  _exports.default = void 0;
  _exports.isFileSelectionEventType = isFileSelectionEventType;
  _exports.isFileSelectionInput = isFileSelectionInput;
  _exports.isKeyboardEventType = isKeyboardEventType;
  _exports.isMouseEventType = isMouseEventType;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/dom/-target",0,"@ember/test-helpers/-tuple",0,"@ember/test-helpers/dom/-logging",0,"@ember/test-helpers/helper-hooks"eaimeta@70e063a35619d71f
  (0, _helperHooks.registerHook)('fireEvent', 'start', target => {
    (0, _logging.log)('fireEvent', target);
  });

  // eslint-disable-next-line require-jsdoc
  const MOUSE_EVENT_CONSTRUCTOR = (() => {
    try {
      new MouseEvent('test');
      return true;
    } catch (e) {
      return false;
    }
  })();
  const DEFAULT_EVENT_OPTIONS = {
    bubbles: true,
    cancelable: true
  };
  const KEYBOARD_EVENT_TYPES = (0, _tuple.default)('keydown', 'keypress', 'keyup');
  // eslint-disable-next-line require-jsdoc
  _exports.KEYBOARD_EVENT_TYPES = KEYBOARD_EVENT_TYPES;
  function isKeyboardEventType(eventType) {
    return KEYBOARD_EVENT_TYPES.indexOf(eventType) > -1;
  }
  const MOUSE_EVENT_TYPES = (0, _tuple.default)('click', 'mousedown', 'mouseup', 'dblclick', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover');
  // eslint-disable-next-line require-jsdoc
  function isMouseEventType(eventType) {
    return MOUSE_EVENT_TYPES.indexOf(eventType) > -1;
  }
  const FILE_SELECTION_EVENT_TYPES = (0, _tuple.default)('change');
  // eslint-disable-next-line require-jsdoc
  function isFileSelectionEventType(eventType) {
    return FILE_SELECTION_EVENT_TYPES.indexOf(eventType) > -1;
  }

  // eslint-disable-next-line require-jsdoc
  function isFileSelectionInput(element) {
    return element.files;
  }
  /**
    Internal helper used to build and dispatch events throughout the other DOM helpers.
  
    @private
    @param {Element} element the element to dispatch the event to
    @param {string} eventType the type of event
    @param {Object} [options] additional properties to be set on the event
    @returns {Event} the event that was dispatched
  */
  function fireEvent(element, eventType, options = {}) {
    return Promise.resolve().then(() => (0, _helperHooks.runHooks)('fireEvent', 'start', element)).then(() => (0, _helperHooks.runHooks)(`fireEvent:${eventType}`, 'start', element)).then(() => {
      if (!element) {
        throw new Error('Must pass an element to `fireEvent`');
      }
      let event;
      if (isKeyboardEventType(eventType)) {
        event = _buildKeyboardEvent(eventType, options);
      } else if (isMouseEventType(eventType)) {
        let rect;
        if (element instanceof Window && element.document.documentElement) {
          rect = element.document.documentElement.getBoundingClientRect();
        } else if ((0, _target.isDocument)(element)) {
          rect = element.documentElement.getBoundingClientRect();
        } else if ((0, _target.isElement)(element)) {
          rect = element.getBoundingClientRect();
        } else {
          return;
        }
        let x = rect.left + 1;
        let y = rect.top + 1;
        let simulatedCoordinates = {
          screenX: x + 5,
          // Those numbers don't really mean anything.
          screenY: y + 95,
          // They're just to make the screenX/Y be different of clientX/Y..
          clientX: x,
          clientY: y,
          ...options
        };
        event = buildMouseEvent(eventType, simulatedCoordinates);
      } else if (isFileSelectionEventType(eventType) && isFileSelectionInput(element)) {
        event = buildFileEvent(eventType, element, options);
      } else {
        event = buildBasicEvent(eventType, options);
      }
      element.dispatchEvent(event);
      return event;
    }).then(event => (0, _helperHooks.runHooks)(`fireEvent:${eventType}`, 'end', element).then(() => event)).then(event => (0, _helperHooks.runHooks)('fireEvent', 'end', element).then(() => event));
  }
  var _default = fireEvent; // eslint-disable-next-line require-jsdoc
  _exports.default = _default;
  function buildBasicEvent(type, options = {}) {
    let event = document.createEvent('Events');
    let bubbles = options.bubbles !== undefined ? options.bubbles : true;
    let cancelable = options.cancelable !== undefined ? options.cancelable : true;
    delete options.bubbles;
    delete options.cancelable;

    // bubbles and cancelable are readonly, so they can be
    // set when initializing event
    event.initEvent(type, bubbles, cancelable);
    for (let prop in options) {
      event[prop] = options[prop];
    }
    return event;
  }

  // eslint-disable-next-line require-jsdoc
  function buildMouseEvent(type, options = {}) {
    let event;
    let eventOpts = {
      view: window,
      ...DEFAULT_EVENT_OPTIONS,
      ...options
    };
    if (MOUSE_EVENT_CONSTRUCTOR) {
      event = new MouseEvent(type, eventOpts);
    } else {
      try {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent(type, eventOpts.bubbles, eventOpts.cancelable, window, eventOpts.detail, eventOpts.screenX, eventOpts.screenY, eventOpts.clientX, eventOpts.clientY, eventOpts.ctrlKey, eventOpts.altKey, eventOpts.shiftKey, eventOpts.metaKey, eventOpts.button, eventOpts.relatedTarget);
      } catch (e) {
        event = buildBasicEvent(type, options);
      }
    }
    return event;
  }

  // @private
  // eslint-disable-next-line require-jsdoc
  function _buildKeyboardEvent(type, options = {}) {
    let eventOpts = {
      ...DEFAULT_EVENT_OPTIONS,
      ...options
    };
    let event;
    let eventMethodName;
    try {
      event = new KeyboardEvent(type, eventOpts);

      // Property definitions are required for B/C for keyboard event usage
      // If this properties are not defined, when listening for key events
      // keyCode/which will be 0. Also, keyCode and which now are string
      // and if app compare it with === with integer key definitions,
      // there will be a fail.
      //
      // https://w3c.github.io/uievents/#interface-keyboardevent
      // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
      Object.defineProperty(event, 'keyCode', {
        get() {
          return parseInt(eventOpts.keyCode);
        }
      });
      Object.defineProperty(event, 'which', {
        get() {
          return parseInt(eventOpts.which);
        }
      });
      return event;
    } catch (e) {
      // left intentionally blank
    }
    try {
      event = document.createEvent('KeyboardEvents');
      eventMethodName = 'initKeyboardEvent';
    } catch (e) {
      // left intentionally blank
    }
    if (!event) {
      try {
        event = document.createEvent('KeyEvents');
        eventMethodName = 'initKeyEvent';
      } catch (e) {
        // left intentionally blank
      }
    }
    if (event && eventMethodName) {
      event[eventMethodName](type, eventOpts.bubbles, eventOpts.cancelable, window, eventOpts.ctrlKey, eventOpts.altKey, eventOpts.shiftKey, eventOpts.metaKey, eventOpts.keyCode, eventOpts.charCode);
    } else {
      event = buildBasicEvent(type, options);
    }
    return event;
  }

  // eslint-disable-next-line require-jsdoc
  function buildFileEvent(type, element, options = {}) {
    let event = buildBasicEvent(type);
    let files = options.files;
    if (Array.isArray(options)) {
      throw new Error('Please pass an object with a files array to `triggerEvent` instead of passing the `options` param as an array to.');
    }
    if (Array.isArray(files)) {
      Object.defineProperty(files, 'item', {
        value(index) {
          return typeof index === 'number' ? this[index] : null;
        },
        configurable: true
      });
      Object.defineProperty(element, 'files', {
        value: files,
        configurable: true
      });
      let elementProto = Object.getPrototypeOf(element);
      let valueProp = Object.getOwnPropertyDescriptor(elementProto, 'value');
      Object.defineProperty(element, 'value', {
        configurable: true,
        get() {
          return valueProp.get.call(element);
        },
        set(value) {
          valueProp.set.call(element, value);

          // We are sure that the value is empty here.
          // For a non-empty value the original setter must raise an exception.
          Object.defineProperty(element, 'files', {
            configurable: true,
            value: []
          });
        }
      });
    }
    Object.defineProperty(event, 'target', {
      value: element
    });
    return event;
  }
});
define("@ember/test-helpers/dom/focus", ["exports", "@ember/test-helpers/dom/-get-element", "@ember/test-helpers/dom/fire-event", "@ember/test-helpers/settled", "@ember/test-helpers/dom/-is-focusable", "@ember/test-helpers/dom/-target", "@ember/test-helpers/dom/-logging", "@ember/test-helpers/helper-hooks", "@ember/test-helpers/dom/blur"], function (_exports, _getElement, _fireEvent, _settled, _isFocusable, _target, _logging, _helperHooks, _blur) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.__focus__ = __focus__;
  _exports.default = focus;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/dom/-get-element",0,"@ember/test-helpers/dom/fire-event",0,"@ember/test-helpers/settled",0,"@ember/test-helpers/dom/-is-focusable",0,"@ember/test-helpers/dom/-target",0,"@ember/test-helpers/dom/-logging",0,"@ember/test-helpers/helper-hooks",0,"@ember/test-helpers/dom/blur"eaimeta@70e063a35619d71f
  (0, _helperHooks.registerHook)('focus', 'start', target => {
    (0, _logging.log)('focus', target);
  });
  /**
     Get the closest focusable ancestor of a given element (or the element itself
     if it's focusable)
  
     @private
     @param {Element} element the element to trigger events on
     @returns {HTMLElement|SVGElement|null} the focusable element/ancestor or null
     if there is none
   */
  function getClosestFocusable(element) {
    if ((0, _target.isDocument)(element)) {
      return null;
    }
    let maybeFocusable = element;
    while (maybeFocusable && !(0, _isFocusable.default)(maybeFocusable)) {
      maybeFocusable = maybeFocusable.parentElement;
    }
    return maybeFocusable;
  }

  /**
    @private
    @param {Element} element the element to trigger events on
    @return {Promise<FocusRecord | Event | void>} resolves when settled
  */
  function __focus__(element) {
    return Promise.resolve().then(() => {
      let focusTarget = getClosestFocusable(element);
      const previousFocusedElement = document.activeElement && document.activeElement !== focusTarget && (0, _isFocusable.default)(document.activeElement) ? document.activeElement : null;

      // fire __blur__ manually with the null relatedTarget when the target is not focusable
      // and there was a previously focused element
      return !focusTarget && previousFocusedElement ? (0, _blur.__blur__)(previousFocusedElement, null).then(() => Promise.resolve({
        focusTarget,
        previousFocusedElement
      })) : Promise.resolve({
        focusTarget,
        previousFocusedElement
      });
    }).then(({
      focusTarget,
      previousFocusedElement
    }) => {
      if (!focusTarget) {
        throw new Error('There was a previously focused element');
      }
      let browserIsNotFocused = !document?.hasFocus();

      // fire __blur__ manually with the correct relatedTarget when the browser is not
      // already in focus and there was a previously focused element
      return previousFocusedElement && browserIsNotFocused ? (0, _blur.__blur__)(previousFocusedElement, focusTarget).then(() => Promise.resolve({
        focusTarget
      })) : Promise.resolve({
        focusTarget
      });
    }).then(({
      focusTarget
    }) => {
      // makes `document.activeElement` be `element`. If the browser is focused, it also fires a focus event
      focusTarget.focus();

      // Firefox does not trigger the `focusin` event if the window
      // does not have focus. If the document does not have focus then
      // fire `focusin` event as well.
      let browserIsFocused = document?.hasFocus();
      return browserIsFocused ? Promise.resolve() :
      // if the browser is not focused the previous `el.focus()` didn't fire an event, so we simulate it
      Promise.resolve().then(() => (0, _fireEvent.default)(focusTarget, 'focus', {
        bubbles: false
      })).then(() => (0, _fireEvent.default)(focusTarget, 'focusin')).then(() => (0, _settled.default)());
    }).catch(() => {});
  }

  /**
    Focus the specified target.
  
    Sends a number of events intending to simulate a "real" user focusing an
    element.
  
    The following events are triggered (in order):
  
    - `focus`
    - `focusin`
  
    The exact listing of events that are triggered may change over time as needed
    to continue to emulate how actual browsers handle focusing a given element.
  
    @public
    @param {string|Element} target the element or selector to focus
    @return {Promise<void>} resolves when the application is settled
  
    @example
    <caption>
      Emulating focusing an input using `focus`
    </caption>
  
    focus('input');
  */
  function focus(target) {
    return Promise.resolve().then(() => (0, _helperHooks.runHooks)('focus', 'start', target)).then(() => {
      if (!target) {
        throw new Error('Must pass an element or selector to `focus`.');
      }
      let element = (0, _getElement.default)(target);
      if (!element) {
        throw new Error(`Element not found when calling \`focus('${target}')\`.`);
      }
      if (!(0, _isFocusable.default)(element)) {
        throw new Error(`${element} is not focusable`);
      }
      return __focus__(element).then(_settled.default);
    }).then(() => (0, _helperHooks.runHooks)('focus', 'end', target));
  }
});
define("@ember/test-helpers/dom/get-root-element", ["exports", "@ember/test-helpers/setup-context", "@ember/test-helpers/dom/-target"], function (_exports, _setupContext, _target) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = getRootElement;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/setup-context",0,"@ember/test-helpers/dom/-target"eaimeta@70e063a35619d71f
  /**
    Get the root element of the application under test (usually `#ember-testing`)
  
    @public
    @returns {Element} the root element
  
    @example
    <caption>
      Getting the root element of the application and checking that it is equal
      to the element with id 'ember-testing'.
    </caption>
    assert.equal(getRootElement(), document.querySelector('#ember-testing'));
  */
  function getRootElement() {
    let context = (0, _setupContext.getContext)();
    if (!context || !(0, _setupContext.isTestContext)(context) || !context.owner) {
      throw new Error('Must setup rendering context before attempting to interact with elements.');
    }
    let owner = context.owner;
    let rootElement;
    // When the host app uses `setApplication` (instead of `setResolver`) the owner has
    // a `rootElement` set on it with the element or id to be used
    if (owner && owner._emberTestHelpersMockOwner === undefined) {
      rootElement = owner.rootElement;
    } else {
      rootElement = '#ember-testing';
    }
    if (rootElement instanceof Window) {
      rootElement = rootElement.document;
    }
    if ((0, _target.isElement)(rootElement) || (0, _target.isDocument)(rootElement)) {
      return rootElement;
    } else if (typeof rootElement === 'string') {
      let _rootElement = document.querySelector(rootElement);
      if (_rootElement) {
        return _rootElement;
      }
      throw new Error(`Application.rootElement (${rootElement}) not found`);
    } else {
      throw new Error('Application.rootElement must be an element or a selector string');
    }
  }
});
define("@ember/test-helpers/dom/scroll-to", ["exports", "@ember/test-helpers/dom/-get-element", "@ember/test-helpers/dom/fire-event", "@ember/test-helpers/settled", "@ember/test-helpers/dom/-target", "@ember/test-helpers/helper-hooks"], function (_exports, _getElement, _fireEvent, _settled, _target, _helperHooks) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = scrollTo;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/dom/-get-element",0,"@ember/test-helpers/dom/fire-event",0,"@ember/test-helpers/settled",0,"@ember/test-helpers/dom/-target",0,"@ember/test-helpers/helper-hooks"eaimeta@70e063a35619d71f
  /**
    Scrolls DOM element or selector to the given coordinates.
    @public
    @param {string|HTMLElement} target the element or selector to trigger scroll on
    @param {Number} x x-coordinate
    @param {Number} y y-coordinate
    @return {Promise<void>} resolves when settled
  
    @example
    <caption>
      Scroll DOM element to specific coordinates
    </caption>
  
    scrollTo('#my-long-div', 0, 0); // scroll to top
    scrollTo('#my-long-div', 0, 100); // scroll down
  */
  function scrollTo(target, x, y) {
    return Promise.resolve().then(() => (0, _helperHooks.runHooks)('scrollTo', 'start', target)).then(() => {
      if (!target) {
        throw new Error('Must pass an element or selector to `scrollTo`.');
      }
      if (x === undefined || y === undefined) {
        throw new Error('Must pass both x and y coordinates to `scrollTo`.');
      }
      let element = (0, _getElement.default)(target);
      if (!element) {
        throw new Error(`Element not found when calling \`scrollTo('${target}')\`.`);
      }
      if (!(0, _target.isElement)(element)) {
        throw new Error(`"target" must be an element, but was a ${element.nodeType} when calling \`scrollTo('${target}')\`.`);
      }
      element.scrollTop = y;
      element.scrollLeft = x;
      return (0, _fireEvent.default)(element, 'scroll').then(_settled.default);
    }).then(() => (0, _helperHooks.runHooks)('scrollTo', 'end', target));
  }
});
define("@ember/test-helpers/dom/select", ["exports", "@ember/test-helpers/dom/-get-element", "@ember/test-helpers/dom/-is-select-element", "@ember/test-helpers/dom/focus", "@ember/test-helpers/settled", "@ember/test-helpers/dom/fire-event", "@ember/test-helpers/helper-hooks"], function (_exports, _getElement, _isSelectElement, _focus, _settled, _fireEvent, _helperHooks) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = select;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/dom/-get-element",0,"@ember/test-helpers/dom/-is-select-element",0,"@ember/test-helpers/dom/focus",0,"@ember/test-helpers/settled",0,"@ember/test-helpers/dom/fire-event",0,"@ember/test-helpers/helper-hooks"eaimeta@70e063a35619d71f
  /**
    Set the `selected` property true for the provided option the target is a
    select element (or set the select property true for multiple options if the
    multiple attribute is set true on the HTMLSelectElement) then trigger
    `change` and `input` events on the specified target.
  
    @public
    @param {string|Element} target the element or selector for the select element
    @param {string|string[]} options the value/values of the items to select
    @param {boolean} keepPreviouslySelected a flag keep any existing selections
    @return {Promise<void>} resolves when the application is settled
  
    @example
    <caption>
      Emulating selecting an option or multiple options using `select`
    </caption>
  
    select('select', 'apple');
  
    select('select', ['apple', 'orange']);
  
    select('select', ['apple', 'orange'], true);
  */
  function select(target, options, keepPreviouslySelected = false) {
    return Promise.resolve().then(() => (0, _helperHooks.runHooks)('select', 'start', target, options, keepPreviouslySelected)).then(() => {
      if (!target) {
        throw new Error('Must pass an element or selector to `select`.');
      }
      if (typeof options === 'undefined' || options === null) {
        throw new Error('Must provide an `option` or `options` to select when calling `select`.');
      }
      const element = (0, _getElement.default)(target);
      if (!element) {
        throw new Error(`Element not found when calling \`select('${target}')\`.`);
      }
      if (!(0, _isSelectElement.default)(element)) {
        throw new Error(`Element is not a HTMLSelectElement when calling \`select('${target}')\`.`);
      }
      if (element.disabled) {
        throw new Error(`Element is disabled when calling \`select('${target}')\`.`);
      }
      options = Array.isArray(options) ? options : [options];
      if (!element.multiple && options.length > 1) {
        throw new Error(`HTMLSelectElement \`multiple\` attribute is set to \`false\` but multiple options were passed when calling \`select('${target}')\`.`);
      }
      return (0, _focus.__focus__)(element).then(() => element);
    }).then(element => {
      for (let i = 0; i < element.options.length; i++) {
        let elementOption = element.options.item(i);
        if (elementOption) {
          if (options.indexOf(elementOption.value) > -1) {
            elementOption.selected = true;
          } else if (!keepPreviouslySelected) {
            elementOption.selected = false;
          }
        }
      }
      return (0, _fireEvent.default)(element, 'input').then(() => (0, _fireEvent.default)(element, 'change')).then(_settled.default);
    }).then(() => (0, _helperHooks.runHooks)('select', 'end', target, options, keepPreviouslySelected));
  }
});
define("@ember/test-helpers/dom/tab", ["exports", "@ember/test-helpers/dom/get-root-element", "@ember/test-helpers/settled", "@ember/test-helpers/dom/fire-event", "@ember/test-helpers/dom/-target", "@ember/test-helpers/dom/blur", "@ember/test-helpers/dom/focus", "@ember/test-helpers/-utils", "@ember/test-helpers/helper-hooks", "@ember/test-helpers/dom/-logging"], function (_exports, _getRootElement, _settled, _fireEvent, _target, _blur, _focus, _utils, _helperHooks, _logging) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = triggerTab;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/dom/get-root-element",0,"@ember/test-helpers/settled",0,"@ember/test-helpers/dom/fire-event",0,"@ember/test-helpers/dom/-target",0,"@ember/test-helpers/dom/blur",0,"@ember/test-helpers/dom/focus",0,"@ember/test-helpers/-utils",0,"@ember/test-helpers/helper-hooks",0,"@ember/test-helpers/dom/-logging"eaimeta@70e063a35619d71f
  const SUPPORTS_INERT = ('inert' in Element.prototype);
  const FALLBACK_ELEMENTS = ['CANVAS', 'VIDEO', 'PICTURE'];
  (0, _helperHooks.registerHook)('tab', 'start', target => {
    (0, _logging.log)('tab', target);
  });

  /**
    Gets the active element of a document. IE11 may return null instead of the body as
    other user-agents does when there isn’t an active element.
    @private
    @param {Document} ownerDocument the element to check
    @returns {HTMLElement} the active element of the document
  */
  function getActiveElement(ownerDocument) {
    return ownerDocument.activeElement || ownerDocument.body;
  }
  /**
    Compiles a list of nodes that can be focused. Walks the tree, discards hidden elements and a few edge cases. To calculate the right.
    @private
    @param {Element} root the root element to start traversing on
    @returns {Array} list of focusable nodes
  */
  function compileFocusAreas(root = document.body) {
    let {
      ownerDocument
    } = root;
    if (!ownerDocument) {
      throw new Error('Element must be in the DOM');
    }
    let activeElement = getActiveElement(ownerDocument);
    let treeWalker = ownerDocument.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
      acceptNode: node => {
        // Only visible nodes can be focused, with, at least, one exception; the "area" element.
        // reference: https://html.spec.whatwg.org/multipage/interaction.html#data-model
        if (node.tagName !== 'AREA' && (0, _utils.isVisible)(node) === false) {
          return NodeFilter.FILTER_REJECT;
        }

        // Reject any fallback elements. Fallback elements’s children are only rendered if the UA
        // doesn’t support the element. We make an assumption that they are always supported, we
        // could consider feature detecting every node type, or making it configurable.
        let parentNode = node.parentNode;
        if (parentNode && FALLBACK_ELEMENTS.indexOf(parentNode.tagName) !== -1) {
          return NodeFilter.FILTER_REJECT;
        }

        // Rejects inert containers, if the user agent supports the feature (or if a polyfill is installed.)
        if (SUPPORTS_INERT && node.inert) {
          return NodeFilter.FILTER_REJECT;
        }
        if ((0, _utils.isDisabled)(node)) {
          return NodeFilter.FILTER_REJECT;
        }

        // Always accept the 'activeElement' of the document, as it might fail the next check, elements with tabindex="-1"
        // can be focused programmatically, we'll therefor ensure the current active element is in the list.
        if (node === activeElement) {
          return NodeFilter.FILTER_ACCEPT;
        }

        // UA parses the tabindex attribute and applies its default values, If the tabIndex is non negative, the UA can
        // focus it.
        return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    let node;
    let elements = [];
    while (node = treeWalker.nextNode()) {
      elements.push(node);
    }
    return elements;
  }

  /**
    Sort elements by their tab indices.
    As older browsers doesn't necessarily implement stabile sort, we'll have to
    manually compare with the index in the original array.
    @private
    @param {Array<HTMLElement>} elements to sort
    @returns {Array<HTMLElement>} list of sorted focusable nodes by their tab index
  */
  function sortElementsByTabIndices(elements) {
    return elements.map((element, index) => {
      return {
        index,
        element
      };
    }).sort((a, b) => {
      if (a.element.tabIndex === b.element.tabIndex) {
        return a.index - b.index;
      } else if (a.element.tabIndex === 0 || b.element.tabIndex === 0) {
        return b.element.tabIndex - a.element.tabIndex;
      }
      return a.element.tabIndex - b.element.tabIndex;
    }).map(entity => entity.element);
  }

  /**
    @private
    @param {Element} root The root element or node to start traversing on.
    @param {HTMLElement} activeElement The element to find the next and previous focus areas of
    @returns {object} The next and previous focus areas of the active element
   */
  function findNextResponders(root, activeElement) {
    let focusAreas = compileFocusAreas(root);
    let sortedFocusAreas = sortElementsByTabIndices(focusAreas);
    let elements = activeElement.tabIndex === -1 ? focusAreas : sortedFocusAreas;
    let index = elements.indexOf(activeElement);
    if (index === -1) {
      return {
        next: sortedFocusAreas[0],
        previous: sortedFocusAreas[sortedFocusAreas.length - 1]
      };
    }
    return {
      next: elements[index + 1],
      previous: elements[index - 1]
    };
  }

  /**
    Emulates the user pressing the tab button.
  
    Sends a number of events intending to simulate a "real" user pressing tab on their
    keyboard.
  
    @public
    @param {Object} [options] optional tab behaviors
    @param {boolean} [options.backwards=false] indicates if the the user navigates backwards
    @param {boolean} [options.unRestrainTabIndex=false] indicates if tabbing should throw an error when tabindex is greater than 0
    @return {Promise<void>} resolves when settled
  
    @example
    <caption>
      Emulating pressing the `TAB` key
    </caption>
    tab();
  
    @example
    <caption>
      Emulating pressing the `SHIFT`+`TAB` key combination
    </caption>
    tab({ backwards: true });
  */
  function triggerTab({
    backwards = false,
    unRestrainTabIndex = false
  } = {}) {
    return Promise.resolve().then(() => {
      return triggerResponderChange(backwards, unRestrainTabIndex);
    }).then(() => {
      return (0, _settled.default)();
    });
  }

  /**
    @private
    @param {boolean} backwards when `true` it selects the previous focus area
    @param {boolean} unRestrainTabIndex when `true`, will not throw an error if tabindex > 0 is encountered
    @returns {Promise<void>} resolves when all events are fired
   */
  function triggerResponderChange(backwards, unRestrainTabIndex) {
    let root = (0, _getRootElement.default)();
    let ownerDocument;
    let rootElement;
    if ((0, _target.isDocument)(root)) {
      rootElement = root.body;
      ownerDocument = root;
    } else {
      rootElement = root;
      ownerDocument = root.ownerDocument;
    }
    let keyboardEventOptions = {
      keyCode: 9,
      which: 9,
      key: 'Tab',
      code: 'Tab',
      shiftKey: backwards
    };
    let debugData = {
      keyboardEventOptions,
      ownerDocument,
      rootElement
    };
    return Promise.resolve().then(() => (0, _helperHooks.runHooks)('tab', 'start', debugData)).then(() => getActiveElement(ownerDocument)).then(activeElement => (0, _helperHooks.runHooks)('tab', 'targetFound', activeElement).then(() => activeElement)).then(activeElement => {
      let event = (0, _fireEvent._buildKeyboardEvent)('keydown', keyboardEventOptions);
      let defaultNotPrevented = activeElement.dispatchEvent(event);
      if (defaultNotPrevented) {
        // Query the active element again, as it might change during event phase
        activeElement = getActiveElement(ownerDocument);
        let target = findNextResponders(rootElement, activeElement);
        if (target) {
          if (backwards && target.previous) {
            return (0, _focus.__focus__)(target.previous);
          } else if (!backwards && target.next) {
            return (0, _focus.__focus__)(target.next);
          } else {
            return (0, _blur.__blur__)(activeElement);
          }
        }
      }
      return Promise.resolve();
    }).then(() => {
      let activeElement = getActiveElement(ownerDocument);
      return (0, _fireEvent.default)(activeElement, 'keyup', keyboardEventOptions).then(() => activeElement);
    }).then(activeElement => {
      if (!unRestrainTabIndex && activeElement.tabIndex > 0) {
        throw new Error(`tabindex of greater than 0 is not allowed. Found tabindex=${activeElement.tabIndex}`);
      }
    }).then(() => (0, _helperHooks.runHooks)('tab', 'end', debugData));
  }
});
define("@ember/test-helpers/dom/tap", ["exports", "@ember/test-helpers/dom/-get-element", "@ember/test-helpers/dom/fire-event", "@ember/test-helpers/dom/click", "@ember/test-helpers/settled", "@ember/test-helpers/dom/-logging", "@ember/test-helpers/dom/-is-form-control", "@ember/test-helpers/helper-hooks"], function (_exports, _getElement, _fireEvent, _click, _settled, _logging, _isFormControl, _helperHooks) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = tap;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/dom/-get-element",0,"@ember/test-helpers/dom/fire-event",0,"@ember/test-helpers/dom/click",0,"@ember/test-helpers/settled",0,"@ember/test-helpers/dom/-logging",0,"@ember/test-helpers/dom/-is-form-control",0,"@ember/test-helpers/helper-hooks"eaimeta@70e063a35619d71f
  (0, _helperHooks.registerHook)('tap', 'start', target => {
    (0, _logging.log)('tap', target);
  });

  /**
    Taps on the specified target.
  
    Sends a number of events intending to simulate a "real" user tapping on an
    element.
  
    For non-focusable elements the following events are triggered (in order):
  
    - `touchstart`
    - `touchend`
    - `mousedown`
    - `mouseup`
    - `click`
  
    For focusable (e.g. form control) elements the following events are triggered
    (in order):
  
    - `touchstart`
    - `touchend`
    - `mousedown`
    - `focus`
    - `focusin`
    - `mouseup`
    - `click`
  
    The exact listing of events that are triggered may change over time as needed
    to continue to emulate how actual browsers handle tapping on a given element.
  
    Use the `options` hash to change the parameters of the tap events.
  
    @public
    @param {string|Element} target the element or selector to tap on
    @param {Object} options the options to be merged into the touch events
    @return {Promise<void>} resolves when settled
  
    @example
    <caption>
      Emulating tapping a button using `tap`
    </caption>
  
    tap('button');
  */
  function tap(target, options = {}) {
    return Promise.resolve().then(() => {
      return (0, _helperHooks.runHooks)('tap', 'start', target, options);
    }).then(() => {
      if (!target) {
        throw new Error('Must pass an element or selector to `tap`.');
      }
      let element = (0, _getElement.default)(target);
      if (!element) {
        throw new Error(`Element not found when calling \`tap('${target}')\`.`);
      }
      if ((0, _isFormControl.default)(element) && element.disabled) {
        throw new Error(`Can not \`tap\` disabled ${element}`);
      }
      return (0, _fireEvent.default)(element, 'touchstart', options).then(touchstartEv => (0, _fireEvent.default)(element, 'touchend', options).then(touchendEv => [touchstartEv, touchendEv])).then(([touchstartEv, touchendEv]) => !touchstartEv.defaultPrevented && !touchendEv.defaultPrevented ? (0, _click.__click__)(element, options) : Promise.resolve()).then(_settled.default);
    }).then(() => {
      return (0, _helperHooks.runHooks)('tap', 'end', target, options);
    });
  }
});
define("@ember/test-helpers/dom/trigger-event", ["exports", "@ember/test-helpers/dom/-get-window-or-element", "@ember/test-helpers/dom/fire-event", "@ember/test-helpers/settled", "@ember/test-helpers/dom/-logging", "@ember/test-helpers/dom/-is-form-control", "@ember/test-helpers/helper-hooks"], function (_exports, _getWindowOrElement, _fireEvent, _settled, _logging, _isFormControl, _helperHooks) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = triggerEvent;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/dom/-get-window-or-element",0,"@ember/test-helpers/dom/fire-event",0,"@ember/test-helpers/settled",0,"@ember/test-helpers/dom/-logging",0,"@ember/test-helpers/dom/-is-form-control",0,"@ember/test-helpers/helper-hooks"eaimeta@70e063a35619d71f
  (0, _helperHooks.registerHook)('triggerEvent', 'start', (target, eventType) => {
    (0, _logging.log)('triggerEvent', target, eventType);
  });

  /**
   * Triggers an event on the specified target.
   *
   * @public
   * @param {string|Element} target the element or selector to trigger the event on
   * @param {string} eventType the type of event to trigger
   * @param {Object} options additional properties to be set on the event
   * @return {Promise<void>} resolves when the application is settled
   *
   * @example
   * <caption>
   * Using `triggerEvent` to upload a file
   *
   * When using `triggerEvent` to upload a file the `eventType` must be `change` and you must pass the
   * `options` param as an object with a key `files` containing an array of
   * [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
   * </caption>
   *
   * triggerEvent(
   *   'input.fileUpload',
   *   'change',
   *   { files: [new Blob(['Ember Rules!'])] }
   * );
   *
   *
   * @example
   * <caption>
   * Using `triggerEvent` to upload a dropped file
   *
   * When using `triggerEvent` to handle a dropped (via drag-and-drop) file, the `eventType` must be `drop`. Assuming your `drop` event handler uses the [DataTransfer API](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer),
   * you must pass the `options` param as an object with a key of `dataTransfer`. The `options.dataTransfer`     object should have a `files` key, containing an array of [File](https://developer.mozilla.org/en-US/docs/Web/API/File).
   * </caption>
   *
   * triggerEvent(
   *   '[data-test-drop-zone]',
   *   'drop',
   *   {
   *     dataTransfer: {
   *       files: [new File(['Ember Rules!'], 'ember-rules.txt')]
   *     }
   *   }
   * )
   */
  function triggerEvent(target, eventType, options) {
    return Promise.resolve().then(() => {
      return (0, _helperHooks.runHooks)('triggerEvent', 'start', target, eventType, options);
    }).then(() => {
      if (!target) {
        throw new Error('Must pass an element or selector to `triggerEvent`.');
      }
      if (!eventType) {
        throw new Error(`Must provide an \`eventType\` to \`triggerEvent\``);
      }
      let element = (0, _getWindowOrElement.getWindowOrElement)(target);
      if (!element) {
        throw new Error(`Element not found when calling \`triggerEvent('${target}', ...)\`.`);
      }
      if ((0, _isFormControl.default)(element) && element.disabled) {
        throw new Error(`Can not \`triggerEvent\` on disabled ${element}`);
      }
      return (0, _fireEvent.default)(element, eventType, options).then(_settled.default);
    }).then(() => {
      return (0, _helperHooks.runHooks)('triggerEvent', 'end', target, eventType, options);
    });
  }
});
define("@ember/test-helpers/dom/trigger-key-event", ["exports", "@ember/test-helpers/dom/-get-element", "@ember/test-helpers/dom/fire-event", "@ember/test-helpers/settled", "@ember/test-helpers/-utils", "@ember/test-helpers/dom/-logging", "@ember/test-helpers/dom/-is-form-control", "@ember/test-helpers/helper-hooks"], function (_exports, _getElement, _fireEvent, _settled, _utils, _logging, _isFormControl, _helperHooks) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.__triggerKeyEvent__ = __triggerKeyEvent__;
  _exports.default = triggerKeyEvent;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/dom/-get-element",0,"@ember/test-helpers/dom/fire-event",0,"@ember/test-helpers/settled",0,"@ember/test-helpers/dom/fire-event",0,"@ember/test-helpers/-utils",0,"@ember/test-helpers/dom/-logging",0,"@ember/test-helpers/dom/-is-form-control",0,"@ember/test-helpers/helper-hooks"eaimeta@70e063a35619d71f
  (0, _helperHooks.registerHook)('triggerKeyEvent', 'start', (target, eventType, key) => {
    (0, _logging.log)('triggerKeyEvent', target, eventType, key);
  });
  const DEFAULT_MODIFIERS = Object.freeze({
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false
  });

  // This is not a comprehensive list, but it is better than nothing.
  const keyFromKeyCode = {
    8: 'Backspace',
    9: 'Tab',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    65: 'a',
    66: 'b',
    67: 'c',
    68: 'd',
    69: 'e',
    70: 'f',
    71: 'g',
    72: 'h',
    73: 'i',
    74: 'j',
    75: 'k',
    76: 'l',
    77: 'm',
    78: 'n',
    79: 'o',
    80: 'p',
    81: 'q',
    82: 'r',
    83: 's',
    84: 't',
    85: 'u',
    86: 'v',
    87: 'w',
    88: 'x',
    89: 'y',
    90: 'z',
    91: 'Meta',
    93: 'Meta',
    // There is two keys that map to meta,
    186: ';',
    187: '=',
    188: ',',
    189: '-',
    190: '.',
    191: '/',
    219: '[',
    220: '\\',
    221: ']',
    222: "'"
  };
  const keyFromKeyCodeWithShift = {
    48: ')',
    49: '!',
    50: '@',
    51: '#',
    52: '$',
    53: '%',
    54: '^',
    55: '&',
    56: '*',
    57: '(',
    186: ':',
    187: '+',
    188: '<',
    189: '_',
    190: '>',
    191: '?',
    219: '{',
    220: '|',
    221: '}',
    222: '"'
  };

  /**
    Calculates the value of KeyboardEvent#key given a keycode and the modifiers.
    Note that this works if the key is pressed in combination with the shift key, but it cannot
    detect if caps lock is enabled.
    @param {number} keycode The keycode of the event.
    @param {object} modifiers The modifiers of the event.
    @returns {string} The key string for the event.
   */
  function keyFromKeyCodeAndModifiers(keycode, modifiers) {
    if (keycode > 64 && keycode < 91) {
      if (modifiers.shiftKey) {
        return String.fromCharCode(keycode);
      } else {
        return String.fromCharCode(keycode).toLocaleLowerCase();
      }
    }
    return modifiers.shiftKey && keyFromKeyCodeWithShift[keycode] || keyFromKeyCode[keycode];
  }

  /**
   * Infers the keycode from the given key
   * @param {string} key The KeyboardEvent#key string
   * @returns {number} The keycode for the given key
   */
  function keyCodeFromKey(key) {
    let keys = Object.keys(keyFromKeyCode);
    let keyCode = keys.find(keyCode => keyFromKeyCode[Number(keyCode)] === key) || keys.find(keyCode => keyFromKeyCode[Number(keyCode)] === key.toLowerCase());
    return keyCode !== undefined ? parseInt(keyCode) : undefined;
  }

  /**
    @private
    @param {Element | Document} element the element to trigger the key event on
    @param {'keydown' | 'keyup' | 'keypress'} eventType the type of event to trigger
    @param {number|string} key the `keyCode`(number) or `key`(string) of the event being triggered
    @param {Object} [modifiers] the state of various modifier keys
    @return {Promise<Event>} resolves when settled
   */
  function __triggerKeyEvent__(element, eventType, key, modifiers = DEFAULT_MODIFIERS) {
    return Promise.resolve().then(() => {
      let props;
      if (typeof key === 'number') {
        props = {
          keyCode: key,
          which: key,
          key: keyFromKeyCodeAndModifiers(key, modifiers),
          ...modifiers
        };
      } else if (typeof key === 'string' && key.length !== 0) {
        let firstCharacter = key[0];
        if (!firstCharacter || firstCharacter !== firstCharacter.toUpperCase()) {
          throw new Error(`Must provide a \`key\` to \`triggerKeyEvent\` that starts with an uppercase character but you passed \`${key}\`.`);
        }
        if ((0, _utils.isNumeric)(key) && key.length > 1) {
          throw new Error(`Must provide a numeric \`keyCode\` to \`triggerKeyEvent\` but you passed \`${key}\` as a string.`);
        }
        let keyCode = keyCodeFromKey(key);
        props = {
          keyCode,
          which: keyCode,
          key,
          ...modifiers
        };
      } else {
        throw new Error(`Must provide a \`key\` or \`keyCode\` to \`triggerKeyEvent\``);
      }
      return (0, _fireEvent.default)(element, eventType, props);
    });
  }

  /**
    Triggers a keyboard event of given type in the target element.
    It also requires the developer to provide either a string with the [`key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
    or the numeric [`keyCode`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode) of the pressed key.
    Optionally the user can also provide a POJO with extra modifiers for the event.
  
    @public
    @param {string|Element} target the element or selector to trigger the event on
    @param {'keydown' | 'keyup' | 'keypress'} eventType the type of event to trigger
    @param {number|string} key the `keyCode`(number) or `key`(string) of the event being triggered
    @param {Object} [modifiers] the state of various modifier keys
    @param {boolean} [modifiers.ctrlKey=false] if true the generated event will indicate the control key was pressed during the key event
    @param {boolean} [modifiers.altKey=false] if true the generated event will indicate the alt key was pressed during the key event
    @param {boolean} [modifiers.shiftKey=false] if true the generated event will indicate the shift key was pressed during the key event
    @param {boolean} [modifiers.metaKey=false] if true the generated event will indicate the meta key was pressed during the key event
    @return {Promise<void>} resolves when the application is settled unless awaitSettled is false
  
    @example
    <caption>
      Emulating pressing the `ENTER` key on a button using `triggerKeyEvent`
    </caption>
    triggerKeyEvent('button', 'keydown', 'Enter');
  */
  function triggerKeyEvent(target, eventType, key, modifiers = DEFAULT_MODIFIERS) {
    return Promise.resolve().then(() => {
      return (0, _helperHooks.runHooks)('triggerKeyEvent', 'start', target, eventType, key);
    }).then(() => {
      if (!target) {
        throw new Error('Must pass an element or selector to `triggerKeyEvent`.');
      }
      let element = (0, _getElement.default)(target);
      if (!element) {
        throw new Error(`Element not found when calling \`triggerKeyEvent('${target}', ...)\`.`);
      }
      if (!eventType) {
        throw new Error(`Must provide an \`eventType\` to \`triggerKeyEvent\``);
      }
      if (!(0, _fireEvent.isKeyboardEventType)(eventType)) {
        let validEventTypes = _fireEvent.KEYBOARD_EVENT_TYPES.join(', ');
        throw new Error(`Must provide an \`eventType\` of ${validEventTypes} to \`triggerKeyEvent\` but you passed \`${eventType}\`.`);
      }
      if ((0, _isFormControl.default)(element) && element.disabled) {
        throw new Error(`Can not \`triggerKeyEvent\` on disabled ${element}`);
      }
      return __triggerKeyEvent__(element, eventType, key, modifiers).then(_settled.default);
    }).then(() => (0, _helperHooks.runHooks)('triggerKeyEvent', 'end', target, eventType, key));
  }
});
define("@ember/test-helpers/dom/type-in", ["exports", "@ember/test-helpers/settled", "@ember/test-helpers/dom/-get-element", "@ember/test-helpers/dom/-is-form-control", "@ember/test-helpers/dom/focus", "@ember/test-helpers/dom/fire-event", "@ember/test-helpers/dom/-guard-for-maxlength", "@ember/test-helpers/dom/-target", "@ember/test-helpers/dom/trigger-key-event", "@ember/test-helpers/dom/-logging", "@ember/test-helpers/helper-hooks"], function (_exports, _settled, _getElement, _isFormControl, _focus, _fireEvent, _guardForMaxlength, _target, _triggerKeyEvent, _logging, _helperHooks) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = typeIn;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/settled",0,"@ember/test-helpers/dom/-get-element",0,"@ember/test-helpers/dom/-is-form-control",0,"@ember/test-helpers/dom/focus",0,"@ember/test-helpers/dom/fire-event",0,"@ember/test-helpers/dom/-guard-for-maxlength",0,"@ember/test-helpers/dom/-target",0,"@ember/test-helpers/dom/trigger-key-event",0,"@ember/test-helpers/dom/-logging",0,"@ember/test-helpers/helper-hooks"eaimeta@70e063a35619d71f
  (0, _helperHooks.registerHook)('typeIn', 'start', (target, text) => {
    (0, _logging.log)('typeIn', target, text);
  });

  /**
   * Mimics character by character entry into the target `input` or `textarea` element.
   *
   * Allows for simulation of slow entry by passing an optional millisecond delay
   * between key events.
  
   * The major difference between `typeIn` and `fillIn` is that `typeIn` triggers
   * keyboard events as well as `input` and `change`.
   * Typically this looks like `focus` -> `focusin` -> `keydown` -> `keypress` -> `keyup` -> `input` -> `change`
   * per character of the passed text (this may vary on some browsers).
   *
   * @public
   * @param {string|Element} target the element or selector to enter text into
   * @param {string} text the test to fill the element with
   * @param {Object} options {delay: x} (default 50) number of milliseconds to wait per keypress
   * @return {Promise<void>} resolves when the application is settled
   *
   * @example
   * <caption>
   *   Emulating typing in an input using `typeIn`
   * </caption>
   *
   * typeIn('input', 'hello world');
   */
  function typeIn(target, text, options = {}) {
    return Promise.resolve().then(() => {
      return (0, _helperHooks.runHooks)('typeIn', 'start', target, text, options);
    }).then(() => {
      if (!target) {
        throw new Error('Must pass an element or selector to `typeIn`.');
      }
      const element = (0, _getElement.default)(target);
      if (!element) {
        throw new Error(`Element not found when calling \`typeIn('${target}')\``);
      }
      if ((0, _target.isDocument)(element) || !(0, _isFormControl.default)(element) && !(0, _target.isContentEditable)(element)) {
        throw new Error('`typeIn` is only usable on form controls or contenteditable elements.');
      }
      if (typeof text === 'undefined' || text === null) {
        throw new Error('Must provide `text` when calling `typeIn`.');
      }
      if ((0, _isFormControl.default)(element)) {
        if (element.disabled) {
          throw new Error(`Can not \`typeIn\` disabled '${target}'.`);
        }
        if ('readOnly' in element && element.readOnly) {
          throw new Error(`Can not \`typeIn\` readonly '${target}'.`);
        }
      }
      let {
        delay = 50
      } = options;
      return (0, _focus.__focus__)(element).then(() => fillOut(element, text, delay)).then(() => (0, _fireEvent.default)(element, 'change')).then(_settled.default).then(() => (0, _helperHooks.runHooks)('typeIn', 'end', target, text, options));
    });
  }

  // eslint-disable-next-line require-jsdoc
  function fillOut(element, text, delay) {
    const inputFunctions = text.split('').map(character => keyEntry(element, character));
    return inputFunctions.reduce((currentPromise, func) => {
      return currentPromise.then(() => delayedExecute(delay)).then(func);
    }, Promise.resolve());
  }

  // eslint-disable-next-line require-jsdoc
  function keyEntry(element, character) {
    let shiftKey = character === character.toUpperCase() && character !== character.toLowerCase();
    let options = {
      shiftKey
    };
    let characterKey = character.toUpperCase();
    return function () {
      return Promise.resolve().then(() => (0, _triggerKeyEvent.__triggerKeyEvent__)(element, 'keydown', characterKey, options)).then(() => (0, _triggerKeyEvent.__triggerKeyEvent__)(element, 'keypress', characterKey, options)).then(() => {
        if ((0, _isFormControl.default)(element)) {
          const newValue = element.value + character;
          (0, _guardForMaxlength.default)(element, newValue, 'typeIn');
          element.value = newValue;
        } else {
          const newValue = element.innerHTML + character;
          element.innerHTML = newValue;
        }
        return (0, _fireEvent.default)(element, 'input');
      }).then(() => (0, _triggerKeyEvent.__triggerKeyEvent__)(element, 'keyup', characterKey, options));
    };
  }

  // eslint-disable-next-line require-jsdoc
  function delayedExecute(delay) {
    return new Promise(resolve => {
      setTimeout(resolve, delay);
    });
  }
});
define("@ember/test-helpers/dom/wait-for", ["exports", "@ember/test-helpers/wait-until", "@ember/test-helpers/dom/-get-element", "@ember/test-helpers/dom/-get-elements"], function (_exports, _waitUntil, _getElement, _getElements) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = waitFor;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/wait-until",0,"@ember/test-helpers/dom/-get-element",0,"@ember/test-helpers/dom/-get-elements"eaimeta@70e063a35619d71f
  /**
    Used to wait for a particular selector to appear in the DOM. Due to the fact
    that it does not wait for general settledness, this is quite useful for testing
    interim DOM states (e.g. loading states, pending promises, etc).
  
    @param {string} selector the selector to wait for
    @param {Object} [options] the options to be used
    @param {number} [options.timeout=1000] the time to wait (in ms) for a match
    @param {number} [options.count=null] the number of elements that should match the provided selector (null means one or more)
    @return {Promise<Element|Element[]>} resolves when the element(s) appear on the page
  
    @example
    <caption>
      Waiting until a selector is rendered:
    </caption>
    await waitFor('.my-selector', { timeout: 2000 })
  */
  function waitFor(selector, options = {}) {
    return Promise.resolve().then(() => {
      if (!selector) {
        throw new Error('Must pass a selector to `waitFor`.');
      }
      let {
        timeout = 1000,
        count = null,
        timeoutMessage
      } = options;
      if (!timeoutMessage) {
        timeoutMessage = `waitFor timed out waiting for selector "${selector}"`;
      }
      let callback;
      if (count !== null) {
        callback = () => {
          let elements = (0, _getElements.default)(selector);
          if (elements.length === count) {
            return Array.from(elements);
          }
          return;
        };
      } else {
        callback = () => (0, _getElement.default)(selector);
      }
      return (0, _waitUntil.default)(callback, {
        timeout,
        timeoutMessage
      });
    });
  }
});
define("@ember/test-helpers/global", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  /* globals global */
  var _default = (() => {
    if (typeof self !== 'undefined') {
      return self;
    } else if (typeof window !== 'undefined') {
      return window;
    } else if (typeof global !== 'undefined') {
      return global;
    } else {
      return Function('return this')();
    }
  })();
  _exports.default = _default;
});
define("@ember/test-helpers/has-ember-version", ["exports", "ember"], function (_exports, _ember) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = hasEmberVersion;
  0; //eaimeta@70e063a35619d71f0,"ember"eaimeta@70e063a35619d71f
  /**
    Checks if the currently running Ember version is greater than or equal to the
    specified major and minor version numbers.
  
    @private
    @param {number} major the major version number to compare
    @param {number} minor the minor version number to compare
    @returns {boolean} true if the Ember version is >= MAJOR.MINOR specified, false otherwise
  */
  function hasEmberVersion(major, minor) {
    let numbers = _ember.default.VERSION.split('-')[0]?.split('.');
    if (!numbers || !numbers[0] || !numbers[1]) {
      throw new Error('`Ember.VERSION` is not set.');
    }
    let actualMajor = parseInt(numbers[0], 10);
    let actualMinor = parseInt(numbers[1], 10);
    return actualMajor > major || actualMajor === major && actualMinor >= minor;
  }
});
define("@ember/test-helpers/helper-hooks", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.registerHook = registerHook;
  _exports.runHooks = runHooks;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  const registeredHooks = new Map();

  /**
   * @private
   * @param {string} helperName The name of the test helper in which to run the hook.
   * @param {string} label A label to help identify the hook.
   * @returns {string} The compound key for the helper.
   */
  function getHelperKey(helperName, label) {
    return `${helperName}:${label}`;
  }

  /**
   * Registers a function to be run during the invocation of a test helper.
   *
   * @param {string} helperName The name of the test helper in which to run the hook.
   *                            Test helper names include `blur`, `click`, `doubleClick`, `fillIn`,
   *                            `fireEvent`, `focus`, `render`, `scrollTo`, `select`, `tab`, `tap`, `triggerEvent`,
   *                            `triggerKeyEvent`, `typeIn`, and `visit`.
   * @param {string} label A label to help identify the hook. Built-in labels include `start`, `end`,
   *                       and `targetFound`, the former designating either the start or end of
   *                       the helper invocation.
   * @param {Function} hook The hook function to run when the test helper is invoked.
   * @returns {HookUnregister} An object containing an `unregister` function that unregisters
   *                           the specific hook initially registered to the helper.
   * @example
   * <caption>
   *   Registering a hook for the `end` point of the `click` test helper invocation
   * </caption>
   *
   * const hook = registerHook('click', 'end', () => {
   *   console.log('Running `click:end` test helper hook');
   * });
   *
   * // Unregister the hook at some later point in time
   * hook.unregister();
   */
  function registerHook(helperName, label, hook) {
    let helperKey = getHelperKey(helperName, label);
    let hooksForHelper = registeredHooks.get(helperKey);
    if (hooksForHelper === undefined) {
      hooksForHelper = new Set();
      registeredHooks.set(helperKey, hooksForHelper);
    }
    hooksForHelper.add(hook);
    return {
      unregister() {
        hooksForHelper.delete(hook);
      }
    };
  }

  /**
   * Runs all hooks registered for a specific test helper.
   *
   * @param {string} helperName The name of the test helper in which to run the hook.
   *                            Test helper names include `blur`, `click`, `doubleClick`, `fillIn`,
   *                            `fireEvent`, `focus`, `render`, `scrollTo`, `select`, `tab`, `tap`, `triggerEvent`,
   *                            `triggerKeyEvent`, `typeIn`, and `visit`.
   * @param {string} label A label to help identify the hook. Built-in labels include `start`, `end`,
   *                       and `targetFound`, the former designating either the start or end of
   *                       the helper invocation.
   * @param {unknown[]} args Any arguments originally passed to the test helper.
   * @returns {Promise<void>} A promise representing the serial invocation of the hooks.
   */
  function runHooks(helperName, label, ...args) {
    let hooks = registeredHooks.get(getHelperKey(helperName, label)) || new Set();
    let promises = [];
    hooks.forEach(hook => {
      let hookResult = hook(...args);
      promises.push(hookResult);
    });
    return Promise.all(promises).then(() => {});
  }
});
define("@ember/test-helpers/index", ["exports", "@ember/test-helpers/resolver", "@ember/test-helpers/application", "@ember/test-helpers/has-ember-version", "@ember/test-helpers/setup-context", "@ember/test-helpers/teardown-context", "@ember/test-helpers/setup-rendering-context", "@ember/test-helpers/rerender", "@ember/test-helpers/setup-application-context", "@ember/test-helpers/settled", "@ember/test-helpers/wait-until", "@ember/test-helpers/validate-error-handler", "@ember/test-helpers/setup-onerror", "@ember/test-helpers/-internal/debug-info", "@ember/test-helpers/-internal/debug-info-helpers", "@ember/test-helpers/test-metadata", "@ember/test-helpers/helper-hooks", "@ember/test-helpers/dom/click", "@ember/test-helpers/dom/double-click", "@ember/test-helpers/dom/tab", "@ember/test-helpers/dom/tap", "@ember/test-helpers/dom/focus", "@ember/test-helpers/dom/blur", "@ember/test-helpers/dom/trigger-event", "@ember/test-helpers/dom/trigger-key-event", "@ember/test-helpers/dom/fill-in", "@ember/test-helpers/dom/select", "@ember/test-helpers/dom/wait-for", "@ember/test-helpers/dom/get-root-element", "@ember/test-helpers/dom/find", "@ember/test-helpers/dom/find-all", "@ember/test-helpers/dom/type-in", "@ember/test-helpers/dom/scroll-to"], function (_exports, _resolver, _application, _hasEmberVersion, _setupContext, _teardownContext, _setupRenderingContext, _rerender, _setupApplicationContext, _settled, _waitUntil, _validateErrorHandler, _setupOnerror, _debugInfo, _debugInfoHelpers, _testMetadata, _helperHooks, _click, _doubleClick, _tab, _tap, _focus, _blur, _triggerEvent, _triggerKeyEvent, _fillIn, _select, _waitFor, _getRootElement, _find, _findAll, _typeIn, _scrollTo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "blur", {
    enumerable: true,
    get: function () {
      return _blur.default;
    }
  });
  Object.defineProperty(_exports, "clearRender", {
    enumerable: true,
    get: function () {
      return _setupRenderingContext.clearRender;
    }
  });
  Object.defineProperty(_exports, "click", {
    enumerable: true,
    get: function () {
      return _click.default;
    }
  });
  Object.defineProperty(_exports, "currentRouteName", {
    enumerable: true,
    get: function () {
      return _setupApplicationContext.currentRouteName;
    }
  });
  Object.defineProperty(_exports, "currentURL", {
    enumerable: true,
    get: function () {
      return _setupApplicationContext.currentURL;
    }
  });
  Object.defineProperty(_exports, "doubleClick", {
    enumerable: true,
    get: function () {
      return _doubleClick.default;
    }
  });
  Object.defineProperty(_exports, "fillIn", {
    enumerable: true,
    get: function () {
      return _fillIn.default;
    }
  });
  Object.defineProperty(_exports, "find", {
    enumerable: true,
    get: function () {
      return _find.default;
    }
  });
  Object.defineProperty(_exports, "findAll", {
    enumerable: true,
    get: function () {
      return _findAll.default;
    }
  });
  Object.defineProperty(_exports, "focus", {
    enumerable: true,
    get: function () {
      return _focus.default;
    }
  });
  Object.defineProperty(_exports, "getApplication", {
    enumerable: true,
    get: function () {
      return _application.getApplication;
    }
  });
  Object.defineProperty(_exports, "getContext", {
    enumerable: true,
    get: function () {
      return _setupContext.getContext;
    }
  });
  Object.defineProperty(_exports, "getDebugInfo", {
    enumerable: true,
    get: function () {
      return _debugInfo.getDebugInfo;
    }
  });
  Object.defineProperty(_exports, "getDeprecations", {
    enumerable: true,
    get: function () {
      return _setupContext.getDeprecations;
    }
  });
  Object.defineProperty(_exports, "getDeprecationsDuringCallback", {
    enumerable: true,
    get: function () {
      return _setupContext.getDeprecationsDuringCallback;
    }
  });
  Object.defineProperty(_exports, "getResolver", {
    enumerable: true,
    get: function () {
      return _resolver.getResolver;
    }
  });
  Object.defineProperty(_exports, "getRootElement", {
    enumerable: true,
    get: function () {
      return _getRootElement.default;
    }
  });
  Object.defineProperty(_exports, "getSettledState", {
    enumerable: true,
    get: function () {
      return _settled.getSettledState;
    }
  });
  Object.defineProperty(_exports, "getTestMetadata", {
    enumerable: true,
    get: function () {
      return _testMetadata.default;
    }
  });
  Object.defineProperty(_exports, "getWarnings", {
    enumerable: true,
    get: function () {
      return _setupContext.getWarnings;
    }
  });
  Object.defineProperty(_exports, "getWarningsDuringCallback", {
    enumerable: true,
    get: function () {
      return _setupContext.getWarningsDuringCallback;
    }
  });
  Object.defineProperty(_exports, "hasEmberVersion", {
    enumerable: true,
    get: function () {
      return _hasEmberVersion.default;
    }
  });
  Object.defineProperty(_exports, "isSettled", {
    enumerable: true,
    get: function () {
      return _settled.isSettled;
    }
  });
  Object.defineProperty(_exports, "pauseTest", {
    enumerable: true,
    get: function () {
      return _setupContext.pauseTest;
    }
  });
  Object.defineProperty(_exports, "registerDebugInfoHelper", {
    enumerable: true,
    get: function () {
      return _debugInfoHelpers.default;
    }
  });
  Object.defineProperty(_exports, "registerHook", {
    enumerable: true,
    get: function () {
      return _helperHooks.registerHook;
    }
  });
  Object.defineProperty(_exports, "render", {
    enumerable: true,
    get: function () {
      return _setupRenderingContext.render;
    }
  });
  Object.defineProperty(_exports, "rerender", {
    enumerable: true,
    get: function () {
      return _rerender.default;
    }
  });
  Object.defineProperty(_exports, "resetOnerror", {
    enumerable: true,
    get: function () {
      return _setupOnerror.resetOnerror;
    }
  });
  Object.defineProperty(_exports, "resumeTest", {
    enumerable: true,
    get: function () {
      return _setupContext.resumeTest;
    }
  });
  Object.defineProperty(_exports, "runHooks", {
    enumerable: true,
    get: function () {
      return _helperHooks.runHooks;
    }
  });
  Object.defineProperty(_exports, "scrollTo", {
    enumerable: true,
    get: function () {
      return _scrollTo.default;
    }
  });
  Object.defineProperty(_exports, "select", {
    enumerable: true,
    get: function () {
      return _select.default;
    }
  });
  Object.defineProperty(_exports, "setApplication", {
    enumerable: true,
    get: function () {
      return _application.setApplication;
    }
  });
  Object.defineProperty(_exports, "setContext", {
    enumerable: true,
    get: function () {
      return _setupContext.setContext;
    }
  });
  Object.defineProperty(_exports, "setResolver", {
    enumerable: true,
    get: function () {
      return _resolver.setResolver;
    }
  });
  Object.defineProperty(_exports, "settled", {
    enumerable: true,
    get: function () {
      return _settled.default;
    }
  });
  Object.defineProperty(_exports, "setupApplicationContext", {
    enumerable: true,
    get: function () {
      return _setupApplicationContext.default;
    }
  });
  Object.defineProperty(_exports, "setupContext", {
    enumerable: true,
    get: function () {
      return _setupContext.default;
    }
  });
  Object.defineProperty(_exports, "setupOnerror", {
    enumerable: true,
    get: function () {
      return _setupOnerror.default;
    }
  });
  Object.defineProperty(_exports, "setupRenderingContext", {
    enumerable: true,
    get: function () {
      return _setupRenderingContext.default;
    }
  });
  Object.defineProperty(_exports, "tab", {
    enumerable: true,
    get: function () {
      return _tab.default;
    }
  });
  Object.defineProperty(_exports, "tap", {
    enumerable: true,
    get: function () {
      return _tap.default;
    }
  });
  Object.defineProperty(_exports, "teardownContext", {
    enumerable: true,
    get: function () {
      return _teardownContext.default;
    }
  });
  Object.defineProperty(_exports, "triggerEvent", {
    enumerable: true,
    get: function () {
      return _triggerEvent.default;
    }
  });
  Object.defineProperty(_exports, "triggerKeyEvent", {
    enumerable: true,
    get: function () {
      return _triggerKeyEvent.default;
    }
  });
  Object.defineProperty(_exports, "typeIn", {
    enumerable: true,
    get: function () {
      return _typeIn.default;
    }
  });
  Object.defineProperty(_exports, "unsetContext", {
    enumerable: true,
    get: function () {
      return _setupContext.unsetContext;
    }
  });
  Object.defineProperty(_exports, "validateErrorHandler", {
    enumerable: true,
    get: function () {
      return _validateErrorHandler.default;
    }
  });
  Object.defineProperty(_exports, "visit", {
    enumerable: true,
    get: function () {
      return _setupApplicationContext.visit;
    }
  });
  Object.defineProperty(_exports, "waitFor", {
    enumerable: true,
    get: function () {
      return _waitFor.default;
    }
  });
  Object.defineProperty(_exports, "waitUntil", {
    enumerable: true,
    get: function () {
      return _waitUntil.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/resolver",0,"@ember/test-helpers/application",0,"@ember/test-helpers/has-ember-version",0,"@ember/test-helpers/setup-context",0,"@ember/test-helpers/teardown-context",0,"@ember/test-helpers/setup-rendering-context",0,"@ember/test-helpers/rerender",0,"@ember/test-helpers/setup-application-context",0,"@ember/test-helpers/settled",0,"@ember/test-helpers/wait-until",0,"@ember/test-helpers/validate-error-handler",0,"@ember/test-helpers/setup-onerror",0,"@ember/test-helpers/-internal/debug-info",0,"@ember/test-helpers/-internal/debug-info-helpers",0,"@ember/test-helpers/test-metadata",0,"@ember/test-helpers/helper-hooks",0,"@ember/test-helpers/dom/click",0,"@ember/test-helpers/dom/double-click",0,"@ember/test-helpers/dom/tab",0,"@ember/test-helpers/dom/tap",0,"@ember/test-helpers/dom/focus",0,"@ember/test-helpers/dom/blur",0,"@ember/test-helpers/dom/trigger-event",0,"@ember/test-helpers/dom/trigger-key-event",0,"@ember/test-helpers/dom/fill-in",0,"@ember/test-helpers/dom/select",0,"@ember/test-helpers/dom/wait-for",0,"@ember/test-helpers/dom/get-root-element",0,"@ember/test-helpers/dom/find",0,"@ember/test-helpers/dom/find-all",0,"@ember/test-helpers/dom/type-in",0,"@ember/test-helpers/dom/scroll-to"eaimeta@70e063a35619d71f
  // DOM Helpers
});
define("@ember/test-helpers/rerender", ["exports", "@ember/test-helpers/-internal/render-settled"], function (_exports, _renderSettled) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = rerender;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/-internal/render-settled"eaimeta@70e063a35619d71f
  /**
    Returns a promise which will resolve when rendering has completed. In
    this context, rendering is completed when all auto-tracked state that is
    consumed in the template (including any tracked state in models, services,
    etc.  that are then used in a template) has been updated in the DOM.
    
    For example, in a test you might want to update some tracked state and
    then run some assertions after rendering has completed. You _could_ use
    `await settled()` in that location, but in some contexts you don't want to
    wait for full settledness (which includes test waiters, pending AJAX/fetch,
    run loops, etc) but instead only want to know when that updated value has
    been rendered in the DOM. **THAT** is what `await rerender()` is _perfect_
    for.
    @public
    @returns {Promise<void>} a promise which fulfills when rendering has completed
  */
  function rerender() {
    return (0, _renderSettled.default)();
  }
});
define("@ember/test-helpers/resolver", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getResolver = getResolver;
  _exports.setResolver = setResolver;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  let __resolver__;

  /**
    Stores the provided resolver instance so that tests being ran can resolve
    objects in the same way as a normal application.
  
    Used by `setupContext` and `setupRenderingContext` as a fallback when `setApplication` was _not_ used.
  
    @public
    @param {Ember.Resolver} resolver the resolver to be used for testing
  */
  function setResolver(resolver) {
    __resolver__ = resolver;
  }

  /**
    Retrieve the resolver instance stored by `setResolver`.
  
    @public
    @returns {Ember.Resolver} the previously stored resolver
  */
  function getResolver() {
    return __resolver__;
  }
});
define("@ember/test-helpers/settled", ["exports", "@ember/runloop", "ember", "@ember/application/instance", "@ember/test-helpers/-utils", "@ember/test-helpers/wait-until", "@ember/test-helpers/setup-application-context", "@ember/test-waiters", "@ember/test-helpers/-internal/debug-info"], function (_exports, _runloop, _ember, _instance, _utils, _waitUntil, _setupApplicationContext, _testWaiters, _debugInfo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports._setupAJAXHooks = _setupAJAXHooks;
  _exports._teardownAJAXHooks = _teardownAJAXHooks;
  _exports.default = settled;
  _exports.getSettledState = getSettledState;
  _exports.isSettled = isSettled;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop",0,"ember",0,"@ember/application/instance",0,"@ember/test-helpers/-utils",0,"@ember/test-helpers/wait-until",0,"@ember/test-helpers/setup-application-context",0,"@ember/test-waiters",0,"@ember/test-helpers/-internal/debug-info"eaimeta@70e063a35619d71f
  /* globals jQuery */
  // @ts-ignore: this is private API. This import will work Ember 5.1+ since it
  // "provides" this public API, but does not for earlier versions. As a result,
  // this type will be `any`.
  // Ember internally tracks AJAX requests in the same way that we do here for
  // legacy style "acceptance" tests using the `ember-testing.js` asset provided
  // by emberjs/ember.js itself. When `@ember/test-helpers`'s `settled` utility
  // is used in a legacy acceptance test context any pending AJAX requests are
  // not properly considered during the `isSettled` check below.
  //
  // This utilizes a local utility method present in Ember since around 2.8.0 to
  // properly consider pending AJAX requests done within legacy acceptance tests.
  const _internalPendingRequestsModule = (() => {
    let loader = _ember.default.__loader;
    if (loader.registry['ember-testing/test/pending_requests']) {
      // Ember <= 3.1
      return loader.require('ember-testing/test/pending_requests');
    } else if (loader.registry['ember-testing/lib/test/pending_requests']) {
      // Ember >= 3.2
      return loader.require('ember-testing/lib/test/pending_requests');
    }
    return null;
  })();
  const _internalGetPendingRequestsCount = () => {
    if (_internalPendingRequestsModule) {
      return _internalPendingRequestsModule.pendingRequests();
    }
    return 0;
  };
  if (typeof jQuery !== 'undefined' && _internalPendingRequestsModule) {
    // This exists to ensure that the AJAX listeners setup by Ember itself
    // (which as of 2.17 are not properly torn down) get cleared and released
    // when the application is destroyed. Without this, any AJAX requests
    // that happen _between_ acceptance tests will always share
    // `pendingRequests`.
    //
    // This can be removed once Ember 4.0.0 is released
    _instance.default.reopen({
      willDestroy(...args) {
        jQuery(document).off('ajaxSend', _internalPendingRequestsModule.incrementPendingRequests);
        jQuery(document).off('ajaxComplete', _internalPendingRequestsModule.decrementPendingRequests);
        _internalPendingRequestsModule.clearPendingRequests();
        this._super(...args);
      }
    });
  }
  let requests;

  /**
    @private
    @returns {number} the count of pending requests
  */
  function pendingRequests() {
    let localRequestsPending = requests !== undefined ? requests.length : 0;
    let internalRequestsPending = _internalGetPendingRequestsCount();
    return localRequestsPending + internalRequestsPending;
  }

  /**
    @private
    @param {Event} event (unused)
    @param {XMLHTTPRequest} xhr the XHR that has initiated a request
  */
  function incrementAjaxPendingRequests(event, xhr) {
    requests.push(xhr);
  }

  /**
    @private
    @param {Event} event (unused)
    @param {XMLHTTPRequest} xhr the XHR that has initiated a request
  */
  function decrementAjaxPendingRequests(event, xhr) {
    // In most Ember versions to date (current version is 2.16) RSVP promises are
    // configured to flush in the actions queue of the Ember run loop, however it
    // is possible that in the future this changes to use "true" micro-task
    // queues.
    //
    // The entire point here, is that _whenever_ promises are resolved will be
    // before the next run of the JS event loop. Then in the next event loop this
    // counter will decrement. In the specific case of AJAX, this means that any
    // promises chained off of `$.ajax` will properly have their `.then` called
    // _before_ this is decremented (and testing continues)
    (0, _utils.nextTick)(() => {
      for (let i = 0; i < requests.length; i++) {
        if (xhr === requests[i]) {
          requests.splice(i, 1);
        }
      }
    });
  }

  /**
    Clears listeners that were previously setup for `ajaxSend` and `ajaxComplete`.
  
    @private
  */
  function _teardownAJAXHooks() {
    // jQuery will not invoke `ajaxComplete` if
    //    1. `transport.send` throws synchronously and
    //    2. it has an `error` option which also throws synchronously

    // We can no longer handle any remaining requests
    requests = [];
    if (typeof jQuery === 'undefined') {
      return;
    }
    jQuery(document).off('ajaxSend', incrementAjaxPendingRequests);
    jQuery(document).off('ajaxComplete', decrementAjaxPendingRequests);
  }

  /**
    Sets up listeners for `ajaxSend` and `ajaxComplete`.
  
    @private
  */
  function _setupAJAXHooks() {
    requests = [];
    if (typeof jQuery === 'undefined') {
      return;
    }
    jQuery(document).on('ajaxSend', incrementAjaxPendingRequests);
    jQuery(document).on('ajaxComplete', decrementAjaxPendingRequests);
  }
  let _internalCheckWaiters;
  let loader = _ember.default.__loader;
  if (loader.registry['ember-testing/test/waiters']) {
    // Ember <= 3.1
    _internalCheckWaiters = loader.require('ember-testing/test/waiters').checkWaiters;
  } else if (loader.registry['ember-testing/lib/test/waiters']) {
    // Ember >= 3.2
    _internalCheckWaiters = loader.require('ember-testing/lib/test/waiters').checkWaiters;
  }

  /**
    @private
    @returns {boolean} true if waiters are still pending
  */
  function checkWaiters() {
    let EmberTest = _ember.default.Test;
    if (_internalCheckWaiters) {
      return _internalCheckWaiters();
    } else if (EmberTest.waiters) {
      if (EmberTest.waiters.some(([context, callback]) => !callback.call(context))) {
        return true;
      }
    }
    return false;
  }
  /**
    Check various settledness metrics, and return an object with the following properties:
  
    - `hasRunLoop` - Checks if a run-loop has been started. If it has, this will
      be `true` otherwise it will be `false`.
    - `hasPendingTimers` - Checks if there are scheduled timers in the run-loop.
      These pending timers are primarily registered by `Ember.run.schedule`. If
      there are pending timers, this will be `true`, otherwise `false`.
    - `hasPendingWaiters` - Checks if any registered test waiters are still
      pending (e.g. the waiter returns `true`). If there are pending waiters,
      this will be `true`, otherwise `false`.
    - `hasPendingRequests` - Checks if there are pending AJAX requests (based on
      `ajaxSend` / `ajaxComplete` events triggered by `jQuery.ajax`). If there
      are pending requests, this will be `true`, otherwise `false`.
    - `hasPendingTransitions` - Checks if there are pending route transitions. If the
      router has not been instantiated / setup for the test yet this will return `null`,
      if there are pending transitions, this will be `true`, otherwise `false`.
    - `pendingRequestCount` - The count of pending AJAX requests.
    - `debugInfo` - Debug information that's combined with info return from backburner's
      getDebugInfo method.
    - `isRenderPending` - Checks if there are any pending render operations. This will be true as long
      as there are tracked values in the template that have not been rerendered yet.
  
    @public
    @returns {Object} object with properties for each of the metrics used to determine settledness
  */
  function getSettledState() {
    let hasPendingTimers = _runloop._backburner.hasTimers();
    let hasRunLoop = Boolean(_runloop._backburner.currentInstance);
    let hasPendingLegacyWaiters = checkWaiters();
    let hasPendingTestWaiters = (0, _testWaiters.hasPendingWaiters)();
    let pendingRequestCount = pendingRequests();
    let hasPendingRequests = pendingRequestCount > 0;
    // TODO: Ideally we'd have a function in Ember itself that can synchronously identify whether
    // or not there are any pending render operations, but this will have to suffice for now
    let isRenderPending = !!hasRunLoop;
    return {
      hasPendingTimers,
      hasRunLoop,
      hasPendingWaiters: hasPendingLegacyWaiters || hasPendingTestWaiters,
      hasPendingRequests,
      hasPendingTransitions: (0, _setupApplicationContext.hasPendingTransitions)(),
      isRenderPending,
      pendingRequestCount,
      debugInfo: new _debugInfo.TestDebugInfo({
        hasPendingTimers,
        hasRunLoop,
        hasPendingLegacyWaiters,
        hasPendingTestWaiters,
        hasPendingRequests,
        isRenderPending
      })
    };
  }

  /**
    Checks various settledness metrics (via `getSettledState()`) to determine if things are settled or not.
  
    Settled generally means that there are no pending timers, no pending waiters,
    no pending AJAX requests, and no current run loop. However, new settledness
    metrics may be added and used as they become available.
  
    @public
    @returns {boolean} `true` if settled, `false` otherwise
  */
  function isSettled() {
    let {
      hasPendingTimers,
      hasRunLoop,
      hasPendingRequests,
      hasPendingWaiters,
      hasPendingTransitions,
      isRenderPending
    } = getSettledState();
    if (hasPendingTimers || hasRunLoop || hasPendingRequests || hasPendingWaiters || hasPendingTransitions || isRenderPending) {
      return false;
    }
    return true;
  }

  /**
    Returns a promise that resolves when in a settled state (see `isSettled` for
    a definition of "settled state").
  
    @public
    @returns {Promise<void>} resolves when settled
  */
  function settled() {
    return (0, _waitUntil.default)(isSettled, {
      timeout: Infinity
    }).then(() => {});
  }
});
define("@ember/test-helpers/setup-application-context", ["exports", "@ember/object", "@ember/test-helpers/setup-context", "@ember/test-helpers/global", "@ember/test-helpers/has-ember-version", "@ember/test-helpers/settled", "@ember/test-helpers/test-metadata", "@ember/test-helpers/helper-hooks", "@ember/debug"], function (_exports, _object, _setupContext, _global, _hasEmberVersion, _settled, _testMetadata, _helperHooks, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.currentRouteName = currentRouteName;
  _exports.currentURL = currentURL;
  _exports.default = setupApplicationContext;
  _exports.hasPendingTransitions = hasPendingTransitions;
  _exports.isApplicationTestContext = isApplicationTestContext;
  _exports.setupRouterSettlednessTracking = setupRouterSettlednessTracking;
  _exports.visit = visit;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"@ember/test-helpers/setup-context",0,"@ember/test-helpers/global",0,"@ember/test-helpers/has-ember-version",0,"@ember/test-helpers/settled",0,"@ember/test-helpers/test-metadata",0,"@ember/test-helpers/helper-hooks",0,"@ember/debug"eaimeta@70e063a35619d71f
  const CAN_USE_ROUTER_EVENTS = (0, _hasEmberVersion.default)(3, 6);
  let routerTransitionsPending = null;
  const ROUTER = new WeakMap();
  const HAS_SETUP_ROUTER = new WeakMap();

  // eslint-disable-next-line require-jsdoc
  function isApplicationTestContext(context) {
    return (0, _setupContext.isTestContext)(context);
  }

  /**
    Determines if we have any pending router transitions (used to determine `settled` state)
  
    @public
    @returns {(boolean|null)} if there are pending transitions
  */
  function hasPendingTransitions() {
    if (CAN_USE_ROUTER_EVENTS) {
      return routerTransitionsPending;
    }
    let context = (0, _setupContext.getContext)();

    // there is no current context, we cannot check
    if (context === undefined) {
      return null;
    }
    let router = ROUTER.get(context);
    if (router === undefined) {
      // if there is no router (e.g. no `visit` calls made yet), we cannot
      // check for pending transitions but this is explicitly not an error
      // condition
      return null;
    }
    let routerMicrolib = router._routerMicrolib || router.router;
    if (routerMicrolib === undefined) {
      return null;
    }
    return !!routerMicrolib.activeTransition;
  }

  /**
    Setup the current router instance with settledness tracking. Generally speaking this
    is done automatically (during a `visit('/some-url')` invocation), but under some
    circumstances (e.g. a non-application test where you manually call `this.owner.setupRouter()`)
    you may want to call it yourself.
  
    @public
   */
  function setupRouterSettlednessTracking() {
    const context = (0, _setupContext.getContext)();
    if (context === undefined || !(0, _setupContext.isTestContext)(context)) {
      throw new Error('Cannot setupRouterSettlednessTracking outside of a test context');
    }

    // avoid setting up many times for the same context
    if (HAS_SETUP_ROUTER.get(context)) {
      return;
    }
    HAS_SETUP_ROUTER.set(context, true);
    let {
      owner
    } = context;
    let router;
    if (CAN_USE_ROUTER_EVENTS) {
      // SAFETY: unfortunately we cannot `assert` here at present because the
      // class is not exported, only the type, since it is not designed to be
      // sub-classed. The most we can do at present is assert that it at least
      // *exists* and assume that if it does exist, it is bound correctly.
      let routerService = owner.lookup('service:router');
      (true && !(!!routerService) && (0, _debug.assert)('router service is not set up correctly', !!routerService));
      router = routerService;

      // track pending transitions via the public routeWillChange / routeDidChange APIs
      // routeWillChange can fire many times and is only useful to know when we have _started_
      // transitioning, we can then use routeDidChange to signal that the transition has settled
      router.on('routeWillChange', () => routerTransitionsPending = true);
      router.on('routeDidChange', () => routerTransitionsPending = false);
    } else {
      // SAFETY: similarly, this cast cannot be made safer because on the versions
      // where we fall into this path, this is *also* not an exported class.
      let mainRouter = owner.lookup('router:main');
      (true && !(!!mainRouter) && (0, _debug.assert)('router:main is not available', !!mainRouter));
      router = mainRouter;
      ROUTER.set(context, router);
    }

    // hook into teardown to reset local settledness state
    let ORIGINAL_WILL_DESTROY = router.willDestroy;
    router.willDestroy = function () {
      routerTransitionsPending = null;
      return ORIGINAL_WILL_DESTROY.call(this);
    };
  }

  /**
    Navigate the application to the provided URL.
  
    @public
    @param {string} url The URL to visit (e.g. `/posts`)
    @param {object} options app boot options
    @returns {Promise<void>} resolves when settled
  
    @example
    <caption>
      Visiting the route for post 1.
    </caption>
    await visit('/posts/1');
  
    @example
    <caption>
      Visiting the route for post 1 while also providing the `rootElement` app boot option.
    </caption>
    await visit('/', { rootElement: '#container' });
  */
  function visit(url, options) {
    const context = (0, _setupContext.getContext)();
    if (!context || !isApplicationTestContext(context)) {
      throw new Error('Cannot call `visit` without having first called `setupApplicationContext`.');
    }
    let {
      owner
    } = context;
    let testMetadata = (0, _testMetadata.default)(context);
    testMetadata.usedHelpers.push('visit');
    return Promise.resolve().then(() => {
      return (0, _helperHooks.runHooks)('visit', 'start', url, options);
    }).then(() => {
      let visitResult = owner.visit(url, options);
      setupRouterSettlednessTracking();
      return visitResult;
    }).then(() => {
      if (_global.default.EmberENV._APPLICATION_TEMPLATE_WRAPPER !== false) {
        context.element = document.querySelector('#ember-testing > .ember-view');
      } else {
        context.element = document.querySelector('#ember-testing');
      }
    }).then(_settled.default).then(() => {
      return (0, _helperHooks.runHooks)('visit', 'end', url, options);
    });
  }

  /**
    @public
    @returns {string} the currently active route name
  */
  function currentRouteName() {
    const context = (0, _setupContext.getContext)();
    if (!context || !isApplicationTestContext(context)) {
      throw new Error('Cannot call `currentRouteName` without having first called `setupApplicationContext`.');
    }
    let router = context.owner.lookup('router:main');
    let currentRouteName = (0, _object.get)(router, 'currentRouteName');
    (true && !(typeof currentRouteName === 'string') && (0, _debug.assert)('currentRouteName should be a string', typeof currentRouteName === 'string'));
    return currentRouteName;
  }
  const HAS_CURRENT_URL_ON_ROUTER = (0, _hasEmberVersion.default)(2, 13);

  /**
    @public
    @returns {string} the applications current url
  */
  function currentURL() {
    const context = (0, _setupContext.getContext)();
    if (!context || !isApplicationTestContext(context)) {
      throw new Error('Cannot call `currentURL` without having first called `setupApplicationContext`.');
    }
    let router = context.owner.lookup('router:main');
    if (HAS_CURRENT_URL_ON_ROUTER) {
      let routerCurrentURL = (0, _object.get)(router, 'currentURL');

      // SAFETY: this path is a lie for the sake of the public-facing types. The
      // framework itself sees this path, but users never do. A user who calls the
      // API without calling `visit()` will see an `UnrecognizedURLError`, rather
      // than getting back `null`.
      if (routerCurrentURL === null) {
        return routerCurrentURL;
      }
      (true && !(typeof routerCurrentURL === 'string') && (0, _debug.assert)(`currentUrl should be a string, but was ${typeof routerCurrentURL}`, typeof routerCurrentURL === 'string'));
      return routerCurrentURL;
    } else {
      // SAFETY: this is *positively ancient* and should probably be removed at
      // some point; old routers which don't have `currentURL` *should* have a
      // `location` with `getURL()` per the docs for 2.12.
      return (0, _object.get)(router, 'location').getURL();
    }
  }

  /**
    Used by test framework addons to setup the provided context for working with
    an application (e.g. routing).
  
    `setupContext` must have been run on the provided context prior to calling
    `setupApplicationContext`.
  
    Sets up the basic framework used by application tests.
  
    @public
    @param {Object} context the context to setup
    @returns {Promise<void>} resolves when the context is set up
  */
  function setupApplicationContext(context) {
    let testMetadata = (0, _testMetadata.default)(context);
    testMetadata.setupTypes.push('setupApplicationContext');
    return Promise.resolve();
  }
});
define("@ember/test-helpers/setup-context", ["exports", "@ember/runloop", "@ember/object", "@ember/application", "@ember/test-helpers/build-owner", "@ember/test-helpers/settled", "@ember/test-helpers/setup-onerror", "ember", "@ember/debug", "@ember/test-helpers/global", "@ember/test-helpers/resolver", "@ember/test-helpers/application", "@ember/test-helpers/test-metadata", "@ember/destroyable", "@ember/test-helpers/-internal/deprecations", "@ember/test-helpers/-internal/warnings"], function (_exports, _runloop, _object, _application, _buildOwner, _settled, _setupOnerror, _ember, _debug, _global, _resolver, _application2, _testMetadata, _destroyable, _deprecations, _warnings) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.SetUsage = _exports.ComponentRenderMap = void 0;
  _exports.default = setupContext;
  _exports.getContext = getContext;
  _exports.getDeprecations = getDeprecations;
  _exports.getDeprecationsDuringCallback = getDeprecationsDuringCallback;
  _exports.getWarnings = getWarnings;
  _exports.getWarningsDuringCallback = getWarningsDuringCallback;
  _exports.isTestContext = isTestContext;
  _exports.pauseTest = pauseTest;
  _exports.resumeTest = resumeTest;
  _exports.setContext = setContext;
  _exports.unsetContext = unsetContext;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop",0,"@ember/object",0,"@ember/application",0,"@ember/test-helpers/build-owner",0,"@ember/test-helpers/settled",0,"@ember/test-helpers/setup-onerror",0,"ember",0,"@ember/debug",0,"@ember/test-helpers/global",0,"@ember/test-helpers/resolver",0,"@ember/test-helpers/application",0,"@ember/test-helpers/test-metadata",0,"@ember/destroyable",0,"@ember/test-helpers/-internal/deprecations",0,"@ember/test-helpers/-internal/warnings"eaimeta@70e063a35619d71f
  // @ts-ignore: this is private API. This import will work Ember 5.1+ since it
  // "provides" this public API, but does not for earlier versions. As a result,
  // this type will be `any`.
  // This handler exists to provide the underlying data to enable the following methods:
  // * getDeprecations()
  // * getDeprecationsDuringCallback()
  // * getDeprecationsDuringCallbackForContext()
  (0, _debug.registerDeprecationHandler)((message, options, next) => {
    const context = getContext();
    if (context === undefined) {
      next.apply(null, [message, options]);
      return;
    }
    (0, _deprecations.getDeprecationsForContext)(context).push({
      message,
      options
    });
    next.apply(null, [message, options]);
  });

  // This handler exists to provide the underlying data to enable the following methods:
  // * getWarnings()
  // * getWarningsDuringCallback()
  // * getWarningsDuringCallbackForContext()
  (0, _debug.registerWarnHandler)((message, options, next) => {
    const context = getContext();
    if (context === undefined) {
      next.apply(null, [message, options]);
      return;
    }
    (0, _warnings.getWarningsForContext)(context).push({
      message,
      options
    });
    next.apply(null, [message, options]);
  });
  // eslint-disable-next-line require-jsdoc
  function isTestContext(context) {
    let maybeContext = context;
    return typeof maybeContext['pauseTest'] === 'function' && typeof maybeContext['resumeTest'] === 'function';
  }
  let __test_context__;

  /**
    Stores the provided context as the "global testing context".
  
    Generally setup automatically by `setupContext`.
  
    @public
    @param {Object} context the context to use
  */
  function setContext(context) {
    __test_context__ = context;
  }

  /**
    Retrieve the "global testing context" as stored by `setContext`.
  
    @public
    @returns {Object} the previously stored testing context
  */
  function getContext() {
    return __test_context__;
  }

  /**
    Clear the "global testing context".
  
    Generally invoked from `teardownContext`.
  
    @public
  */
  function unsetContext() {
    __test_context__ = undefined;
  }

  /**
   * Returns a promise to be used to pauses the current test (due to being
   * returned from the test itself).  This is useful for debugging while testing
   * or for test-driving.  It allows you to inspect the state of your application
   * at any point.
   *
   * The test framework wrapper (e.g. `ember-qunit` or `ember-mocha`) should
   * ensure that when `pauseTest()` is used, any framework specific test timeouts
   * are disabled.
   *
   * @public
   * @returns {Promise<void>} resolves _only_ when `resumeTest()` is invoked
   * @example <caption>Usage via ember-qunit</caption>
   *
   * import { setupRenderingTest } from 'ember-qunit';
   * import { render, click, pauseTest } from '@ember/test-helpers';
   *
   *
   * module('awesome-sauce', function(hooks) {
   *   setupRenderingTest(hooks);
   *
   *   test('does something awesome', async function(assert) {
   *     await render(hbs`{{awesome-sauce}}`);
   *
   *     // added here to visualize / interact with the DOM prior
   *     // to the interaction below
   *     await pauseTest();
   *
   *     click('.some-selector');
   *
   *     assert.equal(this.element.textContent, 'this sauce is awesome!');
   *   });
   * });
   */
  function pauseTest() {
    let context = getContext();
    if (!context || !isTestContext(context)) {
      throw new Error('Cannot call `pauseTest` without having first called `setupTest` or `setupRenderingTest`.');
    }
    return context.pauseTest();
  }

  /**
    Resumes a test previously paused by `await pauseTest()`.
  
    @public
  */
  function resumeTest() {
    let context = getContext();
    if (!context || !isTestContext(context)) {
      throw new Error('Cannot call `resumeTest` without having first called `setupTest` or `setupRenderingTest`.');
    }
    context.resumeTest();
  }

  /**
    @private
    @param {Object} context the test context being cleaned up
  */
  function cleanup(context) {
    (0, _settled._teardownAJAXHooks)();

    // SAFETY: this is intimate API *designed* for us to override.
    _ember.default.testing = false;
    unsetContext();
  }

  /**
   * Returns deprecations which have occurred so far for a the current test context
   *
   * @public
   * @returns {Array<DeprecationFailure>} An array of deprecation messages
   * @example <caption>Usage via ember-qunit</caption>
   *
   * import { getDeprecations } from '@ember/test-helpers';
   *
   * module('awesome-sauce', function(hooks) {
   *   setupRenderingTest(hooks);
   *
   *   test('does something awesome', function(assert) {
         const deprecations = getDeprecations() // => returns deprecations which have occurred so far in this test
   *   });
   * });
   */
  function getDeprecations() {
    const context = getContext();
    if (!context) {
      throw new Error('[@ember/test-helpers] could not get deprecations if no test context is currently active');
    }
    return (0, _deprecations.getDeprecationsForContext)(context);
  }
  /**
   * Returns deprecations which have occurred so far for a the current test context
   *
   * @public
   * @param {Function} [callback] The callback that when executed will have its DeprecationFailure recorded
   * @returns {Array<DeprecationFailure> | Promise<Array<DeprecationFailure>>} An array of deprecation messages
   * @example <caption>Usage via ember-qunit</caption>
   *
   * import { getDeprecationsDuringCallback } from '@ember/test-helpers';
   *
   * module('awesome-sauce', function(hooks) {
   *   setupRenderingTest(hooks);
   *
   *   test('does something awesome', function(assert) {
   *     const deprecations = getDeprecationsDuringCallback(() => {
   *       // code that might emit some deprecations
   *
   *     }); // => returns deprecations which occurred while the callback was invoked
   *   });
   *
   *
   *   test('does something awesome', async function(assert) {
   *     const deprecations = await getDeprecationsDuringCallback(async () => {
   *       // awaited code that might emit some deprecations
   *     }); // => returns deprecations which occurred while the callback was invoked
   *   });
   * });
   */
  function getDeprecationsDuringCallback(callback) {
    const context = getContext();
    if (!context) {
      throw new Error('[@ember/test-helpers] could not get deprecations if no test context is currently active');
    }
    return (0, _deprecations.getDeprecationsDuringCallbackForContext)(context, callback);
  }

  /**
   * Returns warnings which have occurred so far for a the current test context
   *
   * @public
   * @returns {Array<Warning>} An array of warnings
   * @example <caption>Usage via ember-qunit</caption>
   *
   * import { getWarnings } from '@ember/test-helpers';
   *
   * module('awesome-sauce', function(hooks) {
   *   setupRenderingTest(hooks);
   *
   *   test('does something awesome', function(assert) {
         const warnings = getWarnings() // => returns warnings which have occurred so far in this test
   *   });
   * });
   */
  function getWarnings() {
    const context = getContext();
    if (!context) {
      throw new Error('[@ember/test-helpers] could not get warnings if no test context is currently active');
    }
    return (0, _warnings.getWarningsForContext)(context);
  }
  /**
   * Returns warnings which have occurred so far for a the current test context
   *
   * @public
   * @param {Function} [callback] The callback that when executed will have its warnings recorded
   * @returns {Array<Warning> | Promise<Array<Warning>>} An array of warnings information
   * @example <caption>Usage via ember-qunit</caption>
   *
   * import { getWarningsDuringCallback } from '@ember/test-helpers';
   * import { warn } from '@ember/debug';
   *
   * module('awesome-sauce', function(hooks) {
   *   setupRenderingTest(hooks);
   *
   *   test('does something awesome', function(assert) {
   *     const warnings = getWarningsDuringCallback(() => {
   *     warn('some warning');
   *
   *     }); // => returns warnings which occurred while the callback was invoked
   *   });
   *
   *   test('does something awesome', async function(assert) {
   *     warn('some warning');
   *
   *     const warnings = await getWarningsDuringCallback(async () => {
   *       warn('some other warning');
   *     }); // => returns warnings which occurred while the callback was invoked
   *   });
   * });
   */
  function getWarningsDuringCallback(callback) {
    const context = getContext();
    if (!context) {
      throw new Error('[@ember/test-helpers] could not get warnings if no test context is currently active');
    }
    return (0, _warnings.getWarningsDuringCallbackForContext)(context, callback);
  }

  // This WeakMap is used to track whenever a component is rendered in a test so that we can throw
  // assertions when someone uses `this.{set,setProperties}` while rendering a component.
  const ComponentRenderMap = new WeakMap();
  _exports.ComponentRenderMap = ComponentRenderMap;
  const SetUsage = new WeakMap();

  /**
    Used by test framework addons to setup the provided context for testing.
  
    Responsible for:
  
    - sets the "global testing context" to the provided context (`setContext`)
    - create an owner object and set it on the provided context (e.g. `this.owner`)
    - setup `this.set`, `this.setProperties`, `this.get`, and `this.getProperties` to the provided context
    - setting up AJAX listeners
    - setting up `pauseTest` (also available as `this.pauseTest()`) and `resumeTest` helpers
  
    @public
    @param {Object} base the context to setup
    @param {Object} [options] options used to override defaults
    @param {Resolver} [options.resolver] a resolver to use for customizing normal resolution
    @returns {Promise<Object>} resolves with the context that was setup
  */
  _exports.SetUsage = SetUsage;
  function setupContext(base, options = {}) {
    let context = base;

    // SAFETY: this is intimate API *designed* for us to override.
    _ember.default.testing = true;
    setContext(context);
    let testMetadata = (0, _testMetadata.default)(context);
    testMetadata.setupTypes.push('setupContext');
    _runloop._backburner.DEBUG = true;
    (0, _destroyable.registerDestructor)(context, cleanup);
    (0, _setupOnerror._prepareOnerror)(context);
    return Promise.resolve().then(() => {
      let application = (0, _application2.getApplication)();
      if (application) {
        return application.boot().then(() => {});
      }
      return;
    }).then(() => {
      let {
        resolver
      } = options;

      // This handles precedence, specifying a specific option of
      // resolver always trumps whatever is auto-detected, then we fallback to
      // the suite-wide registrations
      //
      // At some later time this can be extended to support specifying a custom
      // engine or application...
      if (resolver) {
        return (0, _buildOwner.default)(null, resolver);
      }
      return (0, _buildOwner.default)((0, _application2.getApplication)(), (0, _resolver.getResolver)());
    }).then(owner => {
      (0, _destroyable.associateDestroyableChild)(context, owner);
      Object.defineProperty(context, 'owner', {
        configurable: true,
        enumerable: true,
        value: owner,
        writable: false
      });
      (0, _application.setOwner)(context, owner);
      Object.defineProperty(context, 'set', {
        configurable: true,
        enumerable: true,
        // SAFETY: in all of these `defineProperty` calls, we can't actually guarantee any safety w.r.t. the corresponding field's type in `TestContext`
        value(key, value) {
          let ret = (0, _runloop.run)(function () {
            if (ComponentRenderMap.has(context)) {
              (true && !(false) && (0, _debug.assert)('You cannot call `this.set` when passing a component to `render()` (the rendered component does not have access to the test context).'));
            } else {
              let setCalls = SetUsage.get(context);
              if (setCalls === undefined) {
                setCalls = [];
                SetUsage.set(context, setCalls);
              }
              setCalls?.push(key);
            }
            return (0, _object.set)(context, key, value);
          });
          return ret;
        },
        writable: false
      });
      Object.defineProperty(context, 'setProperties', {
        configurable: true,
        enumerable: true,
        // SAFETY: in all of these `defineProperty` calls, we can't actually guarantee any safety w.r.t. the corresponding field's type in `TestContext`
        value(hash) {
          let ret = (0, _runloop.run)(function () {
            if (ComponentRenderMap.has(context)) {
              (true && !(false) && (0, _debug.assert)('You cannot call `this.setProperties` when passing a component to `render()` (the rendered component does not have access to the test context)'));
            } else {
              // While neither the types nor the API documentation indicate that passing `null` or
              // `undefined` to `setProperties` is allowed, it works and *has worked* for a long
              // time, so there is considerable real-world code which relies on the fact that it
              // does in fact work. Checking and no-op-ing here handles that.
              if (hash != null) {
                let setCalls = SetUsage.get(context);
                if (SetUsage.get(context) === undefined) {
                  setCalls = [];
                  SetUsage.set(context, setCalls);
                }
                setCalls?.push(...Object.keys(hash));
              }
            }
            return (0, _object.setProperties)(context, hash);
          });
          return ret;
        },
        writable: false
      });
      Object.defineProperty(context, 'get', {
        configurable: true,
        enumerable: true,
        value(key) {
          return (0, _object.get)(context, key);
        },
        writable: false
      });
      Object.defineProperty(context, 'getProperties', {
        configurable: true,
        enumerable: true,
        // SAFETY: in all of these `defineProperty` calls, we can't actually guarantee any safety w.r.t. the corresponding field's type in `TestContext`
        value(...args) {
          return (0, _object.getProperties)(context, args);
        },
        writable: false
      });
      let resume;
      context['resumeTest'] = function resumeTest() {
        (true && !(!!resume) && (0, _debug.assert)('Testing has not been paused. There is nothing to resume.', !!resume));
        resume();
        _global.default.resumeTest = resume = undefined;
      };
      context['pauseTest'] = function pauseTest() {
        console.info('Testing paused. Use `resumeTest()` to continue.'); // eslint-disable-line no-console

        return new Promise(resolve => {
          resume = resolve;
          _global.default.resumeTest = resumeTest;
        });
      };
      (0, _settled._setupAJAXHooks)();
      return context;
    });
  }
});
define("@ember/test-helpers/setup-onerror", ["exports", "ember", "@ember/test-helpers/setup-context"], function (_exports, _ember, _setupContext) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports._cleanupOnerror = _cleanupOnerror;
  _exports._prepareOnerror = _prepareOnerror;
  _exports.default = setupOnerror;
  _exports.resetOnerror = resetOnerror;
  0; //eaimeta@70e063a35619d71f0,"ember",0,"@ember/test-helpers/setup-context"eaimeta@70e063a35619d71f
  let cachedOnerror = new Map();

  /**
   * Sets the `Ember.onerror` function for tests. This value is intended to be reset after
   * each test to ensure correct test isolation. To reset, you should simply call `setupOnerror`
   * without an `onError` argument.
   *
   * @public
   * @param {Function} onError the onError function to be set on Ember.onerror
   *
   * @example <caption>Example implementation for `ember-qunit` or `ember-mocha`</caption>
   *
   * import { setupOnerror } from '@ember/test-helpers';
   *
   * test('Ember.onerror is stubbed properly', function(assert) {
   *   setupOnerror(function(err) {
   *     assert.ok(err);
   *   });
   * });
   */
  function setupOnerror(onError) {
    let context = (0, _setupContext.getContext)();
    if (!context) {
      throw new Error('Must setup test context before calling setupOnerror');
    }
    if (!cachedOnerror.has(context)) {
      throw new Error('_cacheOriginalOnerror must be called before setupOnerror. Normally, this will happen as part of your test harness.');
    }
    if (typeof onError !== 'function') {
      onError = cachedOnerror.get(context);
    }
    _ember.default.onerror = onError;
  }

  /**
   * Resets `Ember.onerror` to the value it originally was at the start of the test run.
   * If there is no context or cached value this is a no-op.
   *
   * @public
   *
   * @example
   *
   * import { resetOnerror } from '@ember/test-helpers';
   *
   * QUnit.testDone(function() {
   *   resetOnerror();
   * })
   */
  function resetOnerror() {
    let context = (0, _setupContext.getContext)();
    if (context && cachedOnerror.has(context)) {
      _ember.default.onerror = cachedOnerror.get(context);
    }
  }

  /**
   * Caches the current value of Ember.onerror. When `setupOnerror` is called without a value
   * or when `resetOnerror` is called the value will be set to what was cached here.
   *
   * @private
   * @param {BaseContext} context the text context
   */
  function _prepareOnerror(context) {
    if (cachedOnerror.has(context)) {
      throw new Error('_prepareOnerror should only be called once per-context');
    }
    cachedOnerror.set(context, _ember.default.onerror);
  }

  /**
   * Removes the cached value of Ember.onerror.
   *
   * @private
   * @param {BaseContext} context the text context
   */
  function _cleanupOnerror(context) {
    resetOnerror();
    cachedOnerror.delete(context);
  }
});
define("@ember/test-helpers/setup-rendering-context", ["exports", "@ember/runloop", "ember", "@ember/test-helpers/global", "@ember/test-helpers/setup-context", "@ember/test-helpers/settled", "@ember/test-helpers/dom/get-root-element", "@ember/test-helpers/test-metadata", "@ember/debug", "@ember/test-helpers/helper-hooks", "@ember/test-helpers/has-ember-version", "@ember/test-helpers/-internal/is-component", "@ember/template-factory"], function (_exports, _runloop, _ember, _global, _setupContext, _settled, _getRootElement, _testMetadata, _debug, _helperHooks, _hasEmberVersion, _isComponent, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.clearRender = clearRender;
  _exports.default = setupRenderingContext;
  _exports.isRenderingTestContext = isRenderingTestContext;
  _exports.render = render;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop",0,"ember",0,"@ember/test-helpers/global",0,"@ember/test-helpers/setup-context",0,"@ember/test-helpers/settled",0,"ember-cli-htmlbars",0,"@ember/test-helpers/dom/get-root-element",0,"@ember/test-helpers/test-metadata",0,"@ember/debug",0,"@ember/test-helpers/helper-hooks",0,"@ember/test-helpers/has-ember-version",0,"@ember/test-helpers/-internal/is-component",0,"@ember/test-helpers/setup-context"eaimeta@70e063a35619d71f
  /* globals EmberENV */
  const OUTLET_TEMPLATE = (0, _templateFactory.createTemplateFactory)(
  /*
    {{outlet}}
  */
  {
    "id": "tbGwuSyY",
    "block": "[[[46,[28,[37,1],null,null],null,null,null]],[],false,[\"component\",\"-outlet\"]]",
    "moduleName": "/Users/vladucu/code/github.com/smile-io/ember-polaris/packages/explorer/@ember/test-helpers/setup-rendering-context.js",
    "isStrictMode": false
  });
  const EMPTY_TEMPLATE = (0, _templateFactory.createTemplateFactory)(
  /*
    
  */
  {
    "id": "9L1TZuL5",
    "block": "[[],[],false,[]]",
    "moduleName": "/Users/vladucu/code/github.com/smile-io/ember-polaris/packages/explorer/@ember/test-helpers/setup-rendering-context.js",
    "isStrictMode": false
  });
  const INVOKE_PROVIDED_COMPONENT = (0, _templateFactory.createTemplateFactory)(
  /*
    <this.ProvidedComponent />
  */
  {
    "id": "0fPPTgWi",
    "block": "[[[8,[30,0,[\"ProvidedComponent\"]],null,null,null]],[],false,[]]",
    "moduleName": "/Users/vladucu/code/github.com/smile-io/ember-polaris/packages/explorer/@ember/test-helpers/setup-rendering-context.js",
    "isStrictMode": false
  });
  const hasCalledSetupRenderingContext = Symbol();
  //  Isolates the notion of transforming a TextContext into a RenderingTestContext.
  // eslint-disable-next-line require-jsdoc
  function prepare(context) {
    let renderingTestContext = context;
    context[hasCalledSetupRenderingContext] = true;
    return context;
  }

  // eslint-disable-next-line require-jsdoc
  function isRenderingTestContext(context) {
    return (0, _setupContext.isTestContext)(context) && hasCalledSetupRenderingContext in context;
  }

  /**
    @private
    @param {Ember.ApplicationInstance} owner the current owner instance
    @param {string} templateFullName the fill template name
    @returns {Template} the template representing `templateFullName`
  */
  function lookupTemplate(owner, templateFullName) {
    let template = owner.lookup(templateFullName);
    if (typeof template === 'function') return template(owner);
    return template;
  }

  /**
    @private
    @param {Ember.ApplicationInstance} owner the current owner instance
    @returns {Template} a template representing {{outlet}}
  */
  function lookupOutletTemplate(owner) {
    let OutletTemplate = lookupTemplate(owner, 'template:-outlet');
    if (!OutletTemplate) {
      owner.register('template:-outlet', OUTLET_TEMPLATE);
      OutletTemplate = lookupTemplate(owner, 'template:-outlet');
    }
    return OutletTemplate;
  }
  let templateId = 0;
  /**
    Renders the provided template and appends it to the DOM.
  
    @public
    @param {Template|Component} templateOrComponent the component (or template) to render
    @param {RenderOptions} options options hash containing engine owner ({ owner: engineOwner })
    @returns {Promise<void>} resolves when settled
  
    @example
    <caption>
      Render a div element with the class 'container'.
    </caption>
    await render(hbs`<div class="container"></div>`);
  */
  function render(templateOrComponent, options) {
    let context = (0, _setupContext.getContext)();
    if (!templateOrComponent) {
      throw new Error('you must pass a template to `render()`');
    }
    return Promise.resolve().then(() => (0, _helperHooks.runHooks)('render', 'start')).then(() => {
      if (!context || !isRenderingTestContext(context)) {
        throw new Error('Cannot call `render` without having first called `setupRenderingContext`.');
      }
      let {
        owner
      } = context;
      let testMetadata = (0, _testMetadata.default)(context);
      testMetadata.usedHelpers.push('render');

      // SAFETY: this is all wildly unsafe, because it is all using private API.
      // At some point we should define a path forward for this kind of internal
      // API. For now, just flagging it as *NOT* being safe!
      let toplevelView = owner.lookup('-top-level-view:main');
      let OutletTemplate = lookupOutletTemplate(owner);
      let ownerToRenderFrom = options?.owner || owner;
      if ((0, _isComponent.default)(templateOrComponent)) {
        // We use this to track when `render` is used with a component so that we can throw an
        // assertion if `this.{set,setProperty} is used in the same test
        _setupContext.ComponentRenderMap.set(context, true);
        const setCalls = _setupContext.SetUsage.get(context);
        if (setCalls !== undefined) {
          (true && !(false) && (0, _debug.assert)(`You cannot call \`this.set\` or \`this.setProperties\` when passing a component to \`render\`, but they were called for the following properties:\n${setCalls.map(key => `  - ${key}`).join('\n')}`));
        }
        context = {
          ProvidedComponent: templateOrComponent
        };
        templateOrComponent = INVOKE_PROVIDED_COMPONENT;
      } else {
        templateId += 1;
        let templateFullName = `template:-undertest-${templateId}`;
        ownerToRenderFrom.register(templateFullName, templateOrComponent);
        templateOrComponent = lookupTemplate(ownerToRenderFrom, templateFullName);
      }
      let outletState = {
        render: {
          owner,
          // always use the host app owner for application outlet
          into: undefined,
          outlet: 'main',
          name: 'application',
          controller: undefined,
          ViewClass: undefined,
          template: OutletTemplate
        },
        outlets: {
          main: {
            render: {
              owner: ownerToRenderFrom,
              // the actual owner to be used for any lookups
              into: undefined,
              outlet: 'main',
              name: 'index',
              controller: context,
              ViewClass: undefined,
              template: templateOrComponent,
              outlets: {}
            },
            outlets: {}
          }
        }
      };
      toplevelView.setOutletState(outletState);

      // Ember's rendering engine is integration with the run loop so that when a run
      // loop starts, the rendering is scheduled to be done.
      //
      // Ember should be ensuring an instance on its own here (the act of
      // setting outletState should ensureInstance, since we know we need to
      // render), but on Ember < 3.23 that is not guaranteed.
      if (!(0, _hasEmberVersion.default)(3, 23)) {
        // SAFETY: this was correct and type checked on the Ember v3 types, but
        // since the `run` namespace does not exist in Ember v4, this no longer
        // can be type checked. When (eventually) dropping support for Ember v3,
        // and therefore for versions before 3.23, this can be removed entirely.
        _runloop.run.backburner.ensureInstance();
      }

      // returning settled here because the actual rendering does not happen until
      // the renderer detects it is dirty (which happens on backburner's end
      // hook), see the following implementation details:
      //
      // * [view:outlet](https://github.com/emberjs/ember.js/blob/f94a4b6aef5b41b96ef2e481f35e07608df01440/packages/ember-glimmer/lib/views/outlet.js#L129-L145) manually dirties its own tag upon `setOutletState`
      // * [backburner's custom end hook](https://github.com/emberjs/ember.js/blob/f94a4b6aef5b41b96ef2e481f35e07608df01440/packages/ember-glimmer/lib/renderer.js#L145-L159) detects that the current revision of the root is no longer the latest, and triggers a new rendering transaction
      return (0, _settled.default)();
    }).then(() => (0, _helperHooks.runHooks)('render', 'end'));
  }

  /**
    Clears any templates previously rendered. This is commonly used for
    confirming behavior that is triggered by teardown (e.g.
    `willDestroyElement`).
  
    @public
    @returns {Promise<void>} resolves when settled
  */
  function clearRender() {
    let context = (0, _setupContext.getContext)();
    if (!context || !isRenderingTestContext(context)) {
      throw new Error('Cannot call `clearRender` without having first called `setupRenderingContext`.');
    }
    return render(EMPTY_TEMPLATE);
  }

  /**
    Used by test framework addons to setup the provided context for rendering.
  
    `setupContext` must have been ran on the provided context
    prior to calling `setupRenderingContext`.
  
    Responsible for:
  
    - Setup the basic framework used for rendering by the
      `render` helper.
    - Ensuring the event dispatcher is properly setup.
    - Setting `this.element` to the root element of the testing
      container (things rendered via `render` will go _into_ this
      element).
  
    @public
    @param {TestContext} context the context to setup for rendering
    @returns {Promise<RenderingTestContext>} resolves with the context that was setup
  
    @example
    <caption>
      Rendering out a paragraph element containing the content 'hello', and then clearing that content via clearRender.
    </caption>
  
    await render(hbs`<p>Hello!</p>`);
    assert.equal(this.element.textContent, 'Hello!', 'has rendered content');
    await clearRender();
    assert.equal(this.element.textContent, '', 'has rendered content');
  */
  function setupRenderingContext(context) {
    let testMetadata = (0, _testMetadata.default)(context);
    testMetadata.setupTypes.push('setupRenderingContext');
    let renderingContext = prepare(context);
    return Promise.resolve().then(() => {
      let {
        owner
      } = renderingContext;

      // When the host app uses `setApplication` (instead of `setResolver`) the event dispatcher has
      // already been setup via `applicationInstance.boot()` in `./build-owner`. If using
      // `setResolver` (instead of `setApplication`) a "mock owner" is created by extending
      // `Ember._ContainerProxyMixin` and `Ember._RegistryProxyMixin` in this scenario we need to
      // manually start the event dispatcher.
      if (owner._emberTestHelpersMockOwner) {
        let dispatcher = owner.lookup('event_dispatcher:main') || _ember.default.EventDispatcher.create();
        dispatcher.setup({}, '#ember-testing');
      }
      let OutletView = owner.factoryFor ? owner.factoryFor('view:-outlet') : owner._lookupFactory('view:-outlet');
      let environment = owner.lookup('-environment:main');
      let template = owner.lookup('template:-outlet');
      let toplevelView = OutletView.create({
        template,
        environment
      });
      owner.register('-top-level-view:main', {
        create() {
          return toplevelView;
        }
      });

      // initially render a simple empty template
      return render(EMPTY_TEMPLATE).then(() => {
        (0, _runloop.run)(toplevelView, 'appendTo', (0, _getRootElement.default)());
        return (0, _settled.default)();
      });
    }).then(() => {
      Object.defineProperty(renderingContext, 'element', {
        configurable: true,
        enumerable: true,
        // ensure the element is based on the wrapping toplevel view
        // Ember still wraps the main application template with a
        // normal tagged view
        //
        // In older Ember versions (2.4) the element itself is not stable,
        // and therefore we cannot update the `this.element` until after the
        // rendering is completed
        value: _global.default.EmberENV._APPLICATION_TEMPLATE_WRAPPER !== false ? (0, _getRootElement.default)().querySelector('.ember-view') : (0, _getRootElement.default)(),
        writable: false
      });
      return renderingContext;
    });
  }
});
define("@ember/test-helpers/teardown-context", ["exports", "@ember/test-helpers/settled", "@ember/test-helpers/setup-onerror", "@ember/destroyable"], function (_exports, _settled, _setupOnerror, _destroyable) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = teardownContext;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/settled",0,"@ember/test-helpers/setup-onerror",0,"@ember/destroyable"eaimeta@70e063a35619d71f
  /**
    Used by test framework addons to tear down the provided context after testing is completed.
  
    Responsible for:
  
    - un-setting the "global testing context" (`unsetContext`)
    - destroy the contexts owner object
    - remove AJAX listeners
  
    @public
    @param {Object} context the context to setup
    @param {Object} [options] options used to override defaults
    @param {boolean} [options.waitForSettled=true] should the teardown wait for `settled()`ness
    @returns {Promise<void>} resolves when settled
  */
  function teardownContext(context, {
    waitForSettled = true
  } = {}) {
    return Promise.resolve().then(() => {
      (0, _setupOnerror._cleanupOnerror)(context);
      (0, _destroyable.destroy)(context);
    }).finally(() => {
      if (waitForSettled) {
        return (0, _settled.default)();
      }
      return;
    });
  }
});
define("@ember/test-helpers/test-metadata", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.__TestMetadata = void 0;
  _exports.default = getTestMetadata;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  class TestMetadata {
    constructor() {
      this.setupTypes = [];
      this.usedHelpers = [];
    }
    get isRendering() {
      return this.setupTypes.indexOf('setupRenderingContext') > -1 && this.usedHelpers.indexOf('render') > -1;
    }
    get isApplication() {
      return this.setupTypes.indexOf('setupApplicationContext') > -1;
    }
  }
  _exports.__TestMetadata = TestMetadata;
  // Only export the type side of the item: this way the only way (it is legal) to
  // construct it is here, but users can still reference the type.
  const TEST_METADATA = new WeakMap();

  /**
   * Gets the test metadata associated with the provided test context. Will create
   * a new test metadata object if one does not exist.
   *
   * @param {BaseContext} context the context to use
   * @returns {TestMetadata} the test metadata for the provided context
   */
  function getTestMetadata(context) {
    if (!TEST_METADATA.has(context)) {
      TEST_METADATA.set(context, new TestMetadata());
    }
    return TEST_METADATA.get(context);
  }
});
define("@ember/test-helpers/validate-error-handler", ["exports", "ember"], function (_exports, _ember) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = validateErrorHandler;
  0; //eaimeta@70e063a35619d71f0,"ember"eaimeta@70e063a35619d71f
  const VALID = Object.freeze({
    isValid: true,
    message: null
  });
  const INVALID = Object.freeze({
    isValid: false,
    message: 'error handler should have re-thrown the provided error'
  });

  /**
   * Validate the provided error handler to confirm that it properly re-throws
   * errors when `Ember.testing` is true.
   *
   * This is intended to be used by test framework hosts (or other libraries) to
   * ensure that `Ember.onerror` is properly configured. Without a check like
   * this, `Ember.onerror` could _easily_ swallow all errors and make it _seem_
   * like everything is just fine (and have green tests) when in reality
   * everything is on fire...
   *
   * @public
   * @param {Function} [callback=Ember.onerror] the callback to validate
   * @returns {Object} object with `isValid` and `message`
   *
   * @example <caption>Example implementation for `ember-qunit`</caption>
   *
   * import { validateErrorHandler } from '@ember/test-helpers';
   *
   * test('Ember.onerror is functioning properly', function(assert) {
   *   let result = validateErrorHandler();
   *   assert.ok(result.isValid, result.message);
   * });
   */
  function validateErrorHandler(callback = _ember.default.onerror) {
    if (callback === undefined || callback === null) {
      return VALID;
    }
    let error = new Error('Error handler validation error!');
    let originalEmberTesting = _ember.default.testing;
    _ember.default.testing = true;
    try {
      callback(error);
    } catch (e) {
      if (e === error) {
        return VALID;
      }
    } finally {
      _ember.default.testing = originalEmberTesting;
    }
    return INVALID;
  }
});
define("@ember/test-helpers/wait-until", ["exports", "@ember/test-helpers/-utils"], function (_exports, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = waitUntil;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers/-utils"eaimeta@70e063a35619d71f
  const TIMEOUTS = [0, 1, 2, 5, 7];
  const MAX_TIMEOUT = 10;
  /**
    Wait for the provided callback to return a truthy value.
  
    This does not leverage `settled()`, and as such can be used to manage async
    while _not_ settled (e.g. "loading" or "pending" states).
  
    @public
    @param {Function} callback the callback to use for testing when waiting should stop
    @param {Object} [options] options used to override defaults
    @param {number} [options.timeout=1000] the maximum amount of time to wait
    @param {string} [options.timeoutMessage='waitUntil timed out'] the message to use in the reject on timeout
    @returns {Promise} resolves with the callback value when it returns a truthy value
  
    @example
    <caption>
      Waiting until a selected element displays text:
    </caption>
    await waitUntil(function() {
      return find('.my-selector').textContent.includes('something')
    }, { timeout: 2000 })
  */
  function waitUntil(callback, options = {}) {
    let timeout = 'timeout' in options ? options.timeout : 1000;
    let timeoutMessage = 'timeoutMessage' in options ? options.timeoutMessage : 'waitUntil timed out';

    // creating this error eagerly so it has the proper invocation stack
    let waitUntilTimedOut = new Error(timeoutMessage);
    return new Promise(function (resolve, reject) {
      let time = 0;

      // eslint-disable-next-line require-jsdoc
      function scheduleCheck(timeoutsIndex) {
        let knownTimeout = TIMEOUTS[timeoutsIndex];
        let interval = knownTimeout === undefined ? MAX_TIMEOUT : knownTimeout;
        (0, _utils.futureTick)(function () {
          time += interval;
          let value;
          try {
            value = callback();
          } catch (error) {
            reject(error);
            return;
          }
          if (value) {
            resolve(value);
          } else if (time < timeout) {
            scheduleCheck(timeoutsIndex + 1);
          } else {
            reject(waitUntilTimedOut);
            return;
          }
        }, interval);
      }
      scheduleCheck(0);
    });
  }
});
define("@storybook/ember-cli-storybook/test-support/index", ["exports", "@storybook/ember-cli-storybook/test-support/render-story"], function (_exports, _renderStory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "renderStory", {
    enumerable: true,
    get: function () {
      return _renderStory.default;
    }
  });
});
define("@storybook/ember-cli-storybook/test-support/render-story", ["exports", "@ember/test-helpers"], function (_exports, _testHelpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = renderStory;
  async function renderStory(story, args) {
    let testContext = (0, _testHelpers.getContext)();
    const {
      context,
      template
    } = story(Object.assign({}, story.args, args));
    Object.assign(testContext, context);
    await (0, _testHelpers.render)(template);
    return context;
  }
});
define("ember-cli-test-loader/test-support/index", ["exports"], function (_exports) {
  /* globals requirejs, require */
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addModuleExcludeMatcher = addModuleExcludeMatcher;
  _exports.addModuleIncludeMatcher = addModuleIncludeMatcher;
  _exports.default = void 0;
  let moduleIncludeMatchers = [];
  let moduleExcludeMatchers = [];
  function addModuleIncludeMatcher(fn) {
    moduleIncludeMatchers.push(fn);
  }
  function addModuleExcludeMatcher(fn) {
    moduleExcludeMatchers.push(fn);
  }
  function checkMatchers(matchers, moduleName) {
    return matchers.some(matcher => matcher(moduleName));
  }
  class TestLoader {
    static load() {
      new TestLoader().loadModules();
    }
    constructor() {
      this._didLogMissingUnsee = false;
    }
    shouldLoadModule(moduleName) {
      return moduleName.match(/[-_]test$/);
    }
    listModules() {
      return Object.keys(requirejs.entries);
    }
    listTestModules() {
      let moduleNames = this.listModules();
      let testModules = [];
      let moduleName;
      for (let i = 0; i < moduleNames.length; i++) {
        moduleName = moduleNames[i];
        if (checkMatchers(moduleExcludeMatchers, moduleName)) {
          continue;
        }
        if (checkMatchers(moduleIncludeMatchers, moduleName) || this.shouldLoadModule(moduleName)) {
          testModules.push(moduleName);
        }
      }
      return testModules;
    }
    loadModules() {
      let testModules = this.listTestModules();
      let testModule;
      for (let i = 0; i < testModules.length; i++) {
        testModule = testModules[i];
        this.require(testModule);
        this.unsee(testModule);
      }
    }
    require(moduleName) {
      try {
        require(moduleName);
      } catch (e) {
        this.moduleLoadFailure(moduleName, e);
      }
    }
    unsee(moduleName) {
      if (typeof require.unsee === 'function') {
        require.unsee(moduleName);
      } else if (!this._didLogMissingUnsee) {
        this._didLogMissingUnsee = true;
        if (typeof console !== 'undefined') {
          console.warn('unable to require.unsee, please upgrade loader.js to >= v3.3.0');
        }
      }
    }
    moduleLoadFailure(moduleName, error) {
      console.error('Error loading: ' + moduleName, error.stack);
    }
  }
  _exports.default = TestLoader;
  ;
});
define("ember-data/test-support/index", ["exports", "@ember/debug", "@ember/test-helpers", "qunit", "@embroider/macros/runtime"], function (_exports, _debug, _testHelpers, QUnit, _runtime) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.render = render;
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember/test-helpers",0,"qunit",0,"@ember-data/env"eaimeta@70e063a35619d71f
  /*
    Temporary replacement for the render test helper
    which we will deprecate in EmberData 5.0, this allows
    an app to incrementally migrate to tests that render async
    relationships in stages with potential for tests in between.
  */
  async function render(template) {
    await (0, _testHelpers.render)(template);
    const owner = QUnit.config.current.testEnvironment.owner;
    const pending = owner.lookup('service:store')._getAllPending();

    // this should only be necessary in production tests
    // where @ember/test-waiters is deactivated :()
    if ((0, _runtime.macroCondition)((0, _runtime.config)("/Users/vladucu/code/github.com/smile-io/ember-polaris/node_modules/.pnpm/ember-data@5.2.0_@babel+core@7.22.11_@ember+string@3.1.1_@glimmer+tracking@1.1.2_ember-source@5.2.0/node_modules/ember-data").env.PRODUCTION)) {
      (true && !(pending.length) && (0, _debug.assert)(`No pending requests exist in this test, use \`import { render } from '@ember/test-helpers';\``, pending.length));
      await pending;
      await (0, _testHelpers.settled)();
    }
  }
});
define("ember-qunit/adapter", ["exports", "ember", "qunit", "@ember/test-helpers/has-ember-version"], function (_exports, _ember, QUnit, _hasEmberVersion) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.nonTestDoneCallback = nonTestDoneCallback;
  0; //eaimeta@70e063a35619d71f0,"ember",0,"qunit",0,"@ember/test-helpers/has-ember-version"eaimeta@70e063a35619d71f
  function unhandledRejectionAssertion(current, error) {
    let message, source;
    if (typeof error === 'object' && error !== null) {
      message = error.message;
      source = error.stack;
    } else if (typeof error === 'string') {
      message = error;
      source = 'unknown source';
    } else {
      message = 'unhandledRejection occurred, but it had no message';
      source = 'unknown source';
    }
    current.assert.pushResult({
      result: false,
      actual: false,
      expected: true,
      message: message,
      source: source
    });
  }
  function nonTestDoneCallback() {}
  let Adapter = _ember.default.Test.Adapter.extend({
    init() {
      this.doneCallbacks = [];
      this.qunit = this.qunit || QUnit;
    },
    asyncStart() {
      let currentTest = this.qunit.config.current;
      let done = currentTest && currentTest.assert ? currentTest.assert.async() : nonTestDoneCallback;
      this.doneCallbacks.push({
        test: currentTest,
        done
      });
    },
    asyncEnd() {
      let currentTest = this.qunit.config.current;
      if (this.doneCallbacks.length === 0) {
        throw new Error('Adapter asyncEnd called when no async was expected. Please create an issue in ember-qunit.');
      }
      let {
        test,
        done
      } = this.doneCallbacks.pop();

      // In future, we should explore fixing this at a different level, specifically
      // addressing the pairing of asyncStart/asyncEnd behavior in a more consistent way.
      if (test === currentTest) {
        done();
      }
    },
    // clobber default implementation of `exception` will be added back for Ember
    // < 2.17 just below...
    exception: null
  });

  // Ember 2.17 and higher do not require the test adapter to have an `exception`
  // method When `exception` is not present, the unhandled rejection is
  // automatically re-thrown and will therefore hit QUnit's own global error
  // handler (therefore appropriately causing test failure)
  if (!(0, _hasEmberVersion.default)(2, 17)) {
    Adapter = Adapter.extend({
      exception(error) {
        unhandledRejectionAssertion(QUnit.config.current, error);
      }
    });
  }
  var _default = Adapter;
  _exports.default = _default;
});
define("ember-qunit/index", ["exports", "ember-qunit/adapter", "ember-qunit/test-loader", "ember-qunit/qunit-configuration", "@ember/runloop", "@ember/test-helpers", "ember", "qunit", "ember-qunit/test-isolation-validation"], function (_exports, _adapter, _testLoader, _qunitConfiguration, _runloop, _testHelpers, _ember, QUnit, _testIsolationValidation) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "QUnitAdapter", {
    enumerable: true,
    get: function () {
      return _adapter.default;
    }
  });
  Object.defineProperty(_exports, "loadTests", {
    enumerable: true,
    get: function () {
      return _testLoader.loadTests;
    }
  });
  Object.defineProperty(_exports, "nonTestDoneCallback", {
    enumerable: true,
    get: function () {
      return _adapter.nonTestDoneCallback;
    }
  });
  _exports.setupApplicationTest = setupApplicationTest;
  _exports.setupEmberOnerrorValidation = setupEmberOnerrorValidation;
  _exports.setupEmberTesting = setupEmberTesting;
  _exports.setupRenderingTest = setupRenderingTest;
  _exports.setupResetOnerror = setupResetOnerror;
  _exports.setupTest = setupTest;
  _exports.setupTestAdapter = setupTestAdapter;
  _exports.setupTestContainer = setupTestContainer;
  _exports.setupTestIsolationValidation = setupTestIsolationValidation;
  _exports.start = start;
  _exports.startTests = startTests;
  0; //eaimeta@70e063a35619d71f0,"ember-qunit/adapter",0,"ember-qunit/test-loader",0,"ember-qunit/qunit-configuration",0,"@ember/runloop",0,"@ember/test-helpers",0,"ember-qunit/test-loader",0,"ember",0,"qunit",0,"ember-qunit/adapter",0,"@ember/test-helpers",0,"ember-qunit/test-isolation-validation"eaimeta@70e063a35619d71f
  /* globals Testem */
  if (typeof Testem !== 'undefined') {
    Testem.hookIntoTestFramework();
  }
  let waitForSettled = true;
  function setupTest(hooks, _options) {
    let options = {
      waitForSettled,
      ..._options
    };
    hooks.beforeEach(function (assert) {
      let testMetadata = (0, _testHelpers.getTestMetadata)(this);
      testMetadata.framework = 'qunit';
      return (0, _testHelpers.setupContext)(this, options).then(() => {
        let originalPauseTest = this.pauseTest;
        this.pauseTest = function QUnit_pauseTest() {
          assert.timeout(-1); // prevent the test from timing out

          // This is a temporary work around for
          // https://github.com/emberjs/ember-qunit/issues/496 this clears the
          // timeout that would fail the test when it hits the global testTimeout
          // value.
          clearTimeout(QUnit.config.timeout);
          return originalPauseTest.call(this);
        };
      });
    });
    hooks.afterEach(function () {
      return (0, _testHelpers.teardownContext)(this, options);
    });
  }
  function setupRenderingTest(hooks, _options) {
    let options = {
      waitForSettled,
      ..._options
    };
    setupTest(hooks, options);
    hooks.beforeEach(function () {
      return (0, _testHelpers.setupRenderingContext)(this);
    });
  }
  function setupApplicationTest(hooks, _options) {
    let options = {
      waitForSettled,
      ..._options
    };
    setupTest(hooks, options);
    hooks.beforeEach(function () {
      return (0, _testHelpers.setupApplicationContext)(this);
    });
  }

  /**
     Uses current URL configuration to setup the test container.
  
     * If `?nocontainer` is set, the test container will be hidden.
     * If `?devmode` or `?fullscreencontainer` is set, the test container will be
       made full screen.
  
     @method setupTestContainer
   */
  function setupTestContainer() {
    let testContainer = document.getElementById('ember-testing-container');
    if (!testContainer) {
      return;
    }
    let params = QUnit.urlParams;
    if (params.devmode || params.fullscreencontainer) {
      testContainer.classList.add('ember-testing-container-full-screen');
    }
    if (params.nocontainer) {
      testContainer.classList.add('ember-testing-container-hidden');
    }
  }

  /**
     Instruct QUnit to start the tests.
     @method startTests
   */
  function startTests() {
    QUnit.start();
  }

  /**
     Sets up the `Ember.Test` adapter for usage with QUnit 2.x.
  
     @method setupTestAdapter
   */
  function setupTestAdapter() {
    _ember.default.Test.adapter = _adapter.default.create();
  }

  /**
    Ensures that `Ember.testing` is set to `true` before each test begins
    (including `before` / `beforeEach`), and reset to `false` after each test is
    completed. This is done via `QUnit.testStart` and `QUnit.testDone`.
  
   */
  function setupEmberTesting() {
    QUnit.testStart(() => {
      _ember.default.testing = true;
    });
    QUnit.testDone(() => {
      _ember.default.testing = false;
    });
  }

  /**
    Ensures that `Ember.onerror` (if present) is properly configured to re-throw
    errors that occur while `Ember.testing` is `true`.
  */
  function setupEmberOnerrorValidation() {
    QUnit.module('ember-qunit: Ember.onerror validation', function () {
      QUnit.test('Ember.onerror is functioning properly', function (assert) {
        assert.expect(1);
        let result = (0, _testHelpers.validateErrorHandler)();
        assert.ok(result.isValid, `Ember.onerror handler with invalid testing behavior detected. An Ember.onerror handler _must_ rethrow exceptions when \`Ember.testing\` is \`true\` or the test suite is unreliable. See https://git.io/vbine for more details.`);
      });
    });
  }
  function setupResetOnerror() {
    QUnit.testDone(_testHelpers.resetOnerror);
  }
  function setupTestIsolationValidation(delay) {
    waitForSettled = false;
    _runloop._backburner.DEBUG = true;
    QUnit.on('testStart', () => (0, _testIsolationValidation.installTestNotIsolatedHook)(delay));
  }

  /**
     @method start
     @param {Object} [options] Options to be used for enabling/disabling behaviors
     @param {Boolean} [options.loadTests] If `false` tests will not be loaded automatically.
     @param {Boolean} [options.setupTestContainer] If `false` the test container will not
     be setup based on `devmode`, `dockcontainer`, or `nocontainer` URL params.
     @param {Boolean} [options.startTests] If `false` tests will not be automatically started
     (you must run `QUnit.start()` to kick them off).
     @param {Boolean} [options.setupTestAdapter] If `false` the default Ember.Test adapter will
     not be updated.
     @param {Boolean} [options.setupEmberTesting] `false` opts out of the
     default behavior of setting `Ember.testing` to `true` before all tests and
     back to `false` after each test will.
     @param {Boolean} [options.setupEmberOnerrorValidation] If `false` validation
     of `Ember.onerror` will be disabled.
     @param {Boolean} [options.setupTestIsolationValidation] If `false` test isolation validation
     will be disabled.
     @param {Number} [options.testIsolationValidationDelay] When using
     setupTestIsolationValidation this number represents the maximum amount of
     time in milliseconds that is allowed _after_ the test is completed for all
     async to have been completed. The default value is 50.
   */
  function start(options = {}) {
    if (options.loadTests !== false) {
      (0, _testLoader.loadTests)();
    }
    if (options.setupTestContainer !== false) {
      setupTestContainer();
    }
    if (options.setupTestAdapter !== false) {
      setupTestAdapter();
    }
    if (options.setupEmberTesting !== false) {
      setupEmberTesting();
    }
    if (options.setupEmberOnerrorValidation !== false) {
      setupEmberOnerrorValidation();
    }
    if (typeof options.setupTestIsolationValidation !== 'undefined' && options.setupTestIsolationValidation !== false) {
      setupTestIsolationValidation(options.testIsolationValidationDelay);
    }
    if (options.startTests !== false) {
      startTests();
    }
    setupResetOnerror();
  }
});
define("ember-qunit/qunit-configuration", ["qunit"], function (QUnit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit"eaimeta@70e063a35619d71f
  QUnit.config.autostart = false;
  QUnit.config.urlConfig.push({
    id: 'nocontainer',
    label: 'Hide container'
  });
  QUnit.config.urlConfig.push({
    id: 'nolint',
    label: 'Disable Linting'
  });
  QUnit.config.urlConfig.push({
    id: 'devmode',
    label: 'Development mode'
  });
  QUnit.config.testTimeout = QUnit.urlParams.devmode ? null : 60000; //Default Test Timeout 60 Seconds
});
define("ember-qunit/test-isolation-validation", ["exports", "qunit", "@ember/runloop", "@ember/test-helpers"], function (_exports, QUnit, _runloop, _testHelpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.detectIfTestNotIsolated = detectIfTestNotIsolated;
  _exports.installTestNotIsolatedHook = installTestNotIsolatedHook;
  0; //eaimeta@70e063a35619d71f0,"qunit",0,"@ember/runloop",0,"@ember/test-helpers",0,"@ember/test-helpers"eaimeta@70e063a35619d71f
  /* eslint-disable no-console */
  /**
   * Detects if a specific test isn't isolated. A test is considered
   * not isolated if it:
   *
   * - has pending timers
   * - is in a runloop
   * - has pending AJAX requests
   * - has pending test waiters
   *
   * @function detectIfTestNotIsolated
   * @param {Object} testInfo
   * @param {string} testInfo.module The name of the test module
   * @param {string} testInfo.name The test name
   */
  function detectIfTestNotIsolated(test, message = '') {
    if (!(0, _testHelpers.isSettled)()) {
      let {
        debugInfo
      } = (0, _testHelpers.getSettledState)();
      console.group(`${test.module.name}: ${test.testName}`);
      debugInfo.toConsole();
      console.groupEnd();
      test.expected++;
      test.assert.pushResult({
        result: false,
        message: `${message} \nMore information has been printed to the console. Please use that information to help in debugging.\n\n`
      });
    }
  }

  /**
   * Installs a hook to detect if a specific test isn't isolated.
   * This hook is installed by patching into the `test.finish` method,
   * which allows us to be very precise as to when the detection occurs.
   *
   * @function installTestNotIsolatedHook
   * @param {number} delay the delay delay to use when checking for isolation validation
   */
  function installTestNotIsolatedHook(delay = 50) {
    if (!(0, _testHelpers.getDebugInfo)()) {
      return;
    }
    let test = QUnit.config.current;
    let finish = test.finish;
    let pushFailure = test.pushFailure;
    test.pushFailure = function (message) {
      if (message.indexOf('Test took longer than') === 0) {
        detectIfTestNotIsolated(this, message);
      } else {
        return pushFailure.apply(this, arguments);
      }
    };

    // We're hooking into `test.finish`, which utilizes internal ordering of
    // when a test's hooks are invoked. We do this mainly because we need
    // greater precision as to when to detect and subsequently report if the
    // test is isolated.
    //
    // We looked at using:
    // - `afterEach`
    //    - the ordering of when the `afterEach` is called is not easy to guarantee
    //      (ancestor `afterEach`es have to be accounted for too)
    // - `QUnit.on('testEnd')`
    //    - is executed too late; the test is already considered done so
    //      we're unable to push a new assert to fail the current test
    // - 'QUnit.done'
    //    - it detaches the failure from the actual test that failed, making it
    //      more confusing to the end user.
    test.finish = function () {
      let doFinish = () => finish.apply(this, arguments);
      if ((0, _testHelpers.isSettled)()) {
        return doFinish();
      } else {
        return (0, _testHelpers.waitUntil)(_testHelpers.isSettled, {
          timeout: delay
        }).catch(() => {
          // we consider that when waitUntil times out, you're in a state of
          // test isolation violation. The nature of the error is irrelevant
          // in this case, and we want to allow the error to fall through
          // to the finally, where cleanup occurs.
        }).finally(() => {
          detectIfTestNotIsolated(this, 'Test is not isolated (async execution is extending beyond the duration of the test).');

          // canceling timers here isn't perfect, but is as good as we can do
          // to attempt to prevent future tests from failing due to this test's
          // leakage
          (0, _runloop._cancelTimers)();
          return doFinish();
        });
      }
    };
  }
});
define("ember-qunit/test-loader", ["exports", "qunit", "ember-cli-test-loader/test-support/index"], function (_exports, QUnit, _index) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.TestLoader = void 0;
  _exports.loadTests = loadTests;
  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-cli-test-loader/test-support/index"eaimeta@70e063a35619d71f
  (0, _index.addModuleExcludeMatcher)(function (moduleName) {
    return QUnit.urlParams.nolint && moduleName.match(/\.(jshint|lint-test)$/);
  });
  (0, _index.addModuleIncludeMatcher)(function (moduleName) {
    return moduleName.match(/\.jshint$/);
  });
  let moduleLoadFailures = [];
  QUnit.done(function () {
    let length = moduleLoadFailures.length;
    try {
      if (length === 0) {
        // do nothing
      } else if (length === 1) {
        throw moduleLoadFailures[0];
      } else {
        throw new Error('\n' + moduleLoadFailures.join('\n'));
      }
    } finally {
      // ensure we release previously captured errors.
      moduleLoadFailures = [];
    }
  });
  class TestLoader extends _index.default {
    moduleLoadFailure(moduleName, error) {
      moduleLoadFailures.push(error);
      QUnit.module('TestLoader Failures');
      QUnit.test(moduleName + ': could not be loaded', function () {
        throw error;
      });
    }
  }

  /**
     Load tests following the default patterns:
  
     * The module name ends with `-test`
     * The module name ends with `.jshint`
  
     Excludes tests that match the following
     patterns when `?nolint` URL param is set:
  
     * The module name ends with `.jshint`
     * The module name ends with `-lint-test`
  
     @method loadTests
   */
  _exports.TestLoader = TestLoader;
  function loadTests() {
    new TestLoader().loadModules();
  }
});
define("qunit-dom/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.install = install;
  _exports.setup = setup;
  function exists(options, message) {
    var expectedCount = null;
    if (typeof options === 'string') {
      message = options;
    } else if (options) {
      expectedCount = options.count;
    }
    var elements = this.findElements();
    if (expectedCount === null) {
      var result = elements.length > 0;
      var expected = format$1(this.targetDescription);
      var actual = result ? expected : format$1(this.targetDescription, 0);
      if (!message) {
        message = expected;
      }
      this.pushResult({
        result: result,
        actual: actual,
        expected: expected,
        message: message
      });
    } else if (typeof expectedCount === 'number') {
      var result = elements.length === expectedCount;
      var actual = format$1(this.targetDescription, elements.length);
      var expected = format$1(this.targetDescription, expectedCount);
      if (!message) {
        message = expected;
      }
      this.pushResult({
        result: result,
        actual: actual,
        expected: expected,
        message: message
      });
    } else {
      throw new TypeError("Unexpected Parameter: " + expectedCount);
    }
  }
  function format$1(selector, num) {
    if (num === undefined || num === null) {
      return "Element " + selector + " exists";
    } else if (num === 0) {
      return "Element " + selector + " does not exist";
    } else if (num === 1) {
      return "Element " + selector + " exists once";
    } else if (num === 2) {
      return "Element " + selector + " exists twice";
    } else {
      return "Element " + selector + " exists " + num + " times";
    }
  }

  // imported from https://github.com/nathanboktae/chai-dom
  function elementToString(el) {
    if (!el) return '<not found>';
    var desc;
    if (el instanceof NodeList) {
      if (el.length === 0) {
        return 'empty NodeList';
      }
      desc = Array.prototype.slice.call(el, 0, 5).map(elementToString).join(', ');
      return el.length > 5 ? desc + "... (+" + (el.length - 5) + " more)" : desc;
    }
    if (!(el instanceof HTMLElement || el instanceof SVGElement)) {
      return String(el);
    }
    desc = el.tagName.toLowerCase();
    if (el.id) {
      desc += "#" + el.id;
    }
    if (el.className && !(el.className instanceof SVGAnimatedString)) {
      desc += "." + String(el.className).replace(/\s+/g, '.');
    }
    Array.prototype.forEach.call(el.attributes, function (attr) {
      if (attr.name !== 'class' && attr.name !== 'id') {
        desc += "[" + attr.name + (attr.value ? "=\"" + attr.value + "\"]" : ']');
      }
    });
    return desc;
  }
  function focused(message) {
    var element = this.findTargetElement();
    if (!element) return;
    var result = document.activeElement === element;
    var actual = elementToString(document.activeElement);
    var expected = elementToString(this.target);
    if (!message) {
      message = "Element " + expected + " is focused";
    }
    this.pushResult({
      result: result,
      actual: actual,
      expected: expected,
      message: message
    });
  }
  function notFocused(message) {
    var element = this.findTargetElement();
    if (!element) return;
    var result = document.activeElement !== element;
    var expected = "Element " + this.targetDescription + " is not focused";
    var actual = result ? expected : "Element " + this.targetDescription + " is focused";
    if (!message) {
      message = expected;
    }
    this.pushResult({
      result: result,
      message: message,
      actual: actual,
      expected: expected
    });
  }
  function checked(message) {
    var element = this.findTargetElement();
    if (!element) return;
    var isChecked = element.checked === true;
    var isNotChecked = element.checked === false;
    var result = isChecked;
    var hasCheckedProp = isChecked || isNotChecked;
    if (!hasCheckedProp) {
      var ariaChecked = element.getAttribute('aria-checked');
      if (ariaChecked !== null) {
        result = ariaChecked === 'true';
      }
    }
    var actual = result ? 'checked' : 'not checked';
    var expected = 'checked';
    if (!message) {
      message = "Element " + elementToString(this.target) + " is checked";
    }
    this.pushResult({
      result: result,
      actual: actual,
      expected: expected,
      message: message
    });
  }
  function notChecked(message) {
    var element = this.findTargetElement();
    if (!element) return;
    var isChecked = element.checked === true;
    var isNotChecked = element.checked === false;
    var result = !isChecked;
    var hasCheckedProp = isChecked || isNotChecked;
    if (!hasCheckedProp) {
      var ariaChecked = element.getAttribute('aria-checked');
      if (ariaChecked !== null) {
        result = ariaChecked !== 'true';
      }
    }
    var actual = result ? 'not checked' : 'checked';
    var expected = 'not checked';
    if (!message) {
      message = "Element " + elementToString(this.target) + " is not checked";
    }
    this.pushResult({
      result: result,
      actual: actual,
      expected: expected,
      message: message
    });
  }
  function required(message) {
    var element = this.findTargetElement();
    if (!element) return;
    if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement)) {
      throw new TypeError("Unexpected Element Type: " + element.toString());
    }
    var result = element.required === true;
    var actual = result ? 'required' : 'not required';
    var expected = 'required';
    if (!message) {
      message = "Element " + elementToString(this.target) + " is required";
    }
    this.pushResult({
      result: result,
      actual: actual,
      expected: expected,
      message: message
    });
  }
  function notRequired(message) {
    var element = this.findTargetElement();
    if (!element) return;
    if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement)) {
      throw new TypeError("Unexpected Element Type: " + element.toString());
    }
    var result = element.required === false;
    var actual = !result ? 'required' : 'not required';
    var expected = 'not required';
    if (!message) {
      message = "Element " + elementToString(this.target) + " is not required";
    }
    this.pushResult({
      result: result,
      actual: actual,
      expected: expected,
      message: message
    });
  }
  function isValid(message, options) {
    if (options === void 0) {
      options = {};
    }
    var element = this.findTargetElement();
    if (!element) return;
    if (!(element instanceof HTMLFormElement || element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLButtonElement || element instanceof HTMLOutputElement || element instanceof HTMLSelectElement)) {
      throw new TypeError("Unexpected Element Type: " + element.toString());
    }
    var validity = element.reportValidity() === true;
    var result = validity === !options.inverted;
    var actual = validity ? 'valid' : 'not valid';
    var expected = options.inverted ? 'not valid' : 'valid';
    if (!message) {
      message = "Element " + elementToString(this.target) + " is " + actual;
    }
    this.pushResult({
      result: result,
      actual: actual,
      expected: expected,
      message: message
    });
  }

  // Visible logic based on jQuery's
  // https://github.com/jquery/jquery/blob/4a2bcc27f9c3ee24b3effac0fbe1285d1ee23cc5/src/css/hiddenVisibleSelectors.js#L11-L13
  function visible(el) {
    if (el === null) return false;
    if (el.offsetWidth === 0 || el.offsetHeight === 0) return false;
    var clientRects = el.getClientRects();
    if (clientRects.length === 0) return false;
    for (var i = 0; i < clientRects.length; i++) {
      var rect = clientRects[i];
      if (rect.width !== 0 && rect.height !== 0) return true;
    }
    return false;
  }
  function isVisible(options, message) {
    var expectedCount = null;
    if (typeof options === 'string') {
      message = options;
    } else if (options) {
      expectedCount = options.count;
    }
    var elements = this.findElements().filter(visible);
    if (expectedCount === null) {
      var result = elements.length > 0;
      var expected = format(this.targetDescription);
      var actual = result ? expected : format(this.targetDescription, 0);
      if (!message) {
        message = expected;
      }
      this.pushResult({
        result: result,
        actual: actual,
        expected: expected,
        message: message
      });
    } else if (typeof expectedCount === 'number') {
      var result = elements.length === expectedCount;
      var actual = format(this.targetDescription, elements.length);
      var expected = format(this.targetDescription, expectedCount);
      if (!message) {
        message = expected;
      }
      this.pushResult({
        result: result,
        actual: actual,
        expected: expected,
        message: message
      });
    } else {
      throw new TypeError("Unexpected Parameter: " + expectedCount);
    }
  }
  function format(selector, num) {
    if (num === undefined || num === null) {
      return "Element " + selector + " is visible";
    } else if (num === 0) {
      return "Element " + selector + " is not visible";
    } else if (num === 1) {
      return "Element " + selector + " is visible once";
    } else if (num === 2) {
      return "Element " + selector + " is visible twice";
    } else {
      return "Element " + selector + " is visible " + num + " times";
    }
  }
  function isDisabled(message, options) {
    if (options === void 0) {
      options = {};
    }
    var inverted = options.inverted;
    var element = this.findTargetElement();
    if (!element) return;
    if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement || element instanceof HTMLButtonElement || element instanceof HTMLOptGroupElement || element instanceof HTMLOptionElement || element instanceof HTMLFieldSetElement)) {
      throw new TypeError("Unexpected Element Type: " + element.toString());
    }
    var result = element.disabled === !inverted;
    var actual = element.disabled === false ? "Element " + this.targetDescription + " is not disabled" : "Element " + this.targetDescription + " is disabled";
    var expected = inverted ? "Element " + this.targetDescription + " is not disabled" : "Element " + this.targetDescription + " is disabled";
    if (!message) {
      message = expected;
    }
    this.pushResult({
      result: result,
      actual: actual,
      expected: expected,
      message: message
    });
  }
  function matchesSelector(elements, compareSelector) {
    var failures = elements.filter(function (it) {
      return !it.matches(compareSelector);
    });
    return failures.length;
  }
  function collapseWhitespace(string) {
    return string.replace(/[\t\r\n]/g, ' ').replace(/ +/g, ' ').replace(/^ /, '').replace(/ $/, '');
  }

  /**
   * This function can be used to convert a NodeList to a regular array.
   * We should be using `Array.from()` for this, but IE11 doesn't support that :(
   *
   * @private
   */
  function toArray(list) {
    return Array.prototype.slice.call(list);
  }
  var DOMAssertions = /** @class */function () {
    function DOMAssertions(target, rootElement, testContext) {
      this.target = target;
      this.rootElement = rootElement;
      this.testContext = testContext;
    }
    /**
     * Assert an {@link HTMLElement} (or multiple) matching the `selector` exists.
     *
     * @param {object?} options
     * @param {number?} options.count
     * @param {string?} message
     *
     * @example
     * assert.dom('#title').exists();
     * assert.dom('.choice').exists({ count: 4 });
     *
     * @see {@link #doesNotExist}
     */
    DOMAssertions.prototype.exists = function (options, message) {
      exists.call(this, options, message);
      return this;
    };
    /**
     * Assert an {@link HTMLElement} matching the `selector` does not exists.
     *
     * @param {string?} message
     *
     * @example
     * assert.dom('.should-not-exist').doesNotExist();
     *
     * @see {@link #exists}
     */
    DOMAssertions.prototype.doesNotExist = function (message) {
      exists.call(this, {
        count: 0
      }, message);
      return this;
    };
    /**
     * Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
     * `selector` is currently checked.
     *
     * Note: This also supports `aria-checked="true/false"`.
     *
     * @param {string?} message
     *
     * @example
     * assert.dom('input.active').isChecked();
     *
     * @see {@link #isNotChecked}
     */
    DOMAssertions.prototype.isChecked = function (message) {
      checked.call(this, message);
      return this;
    };
    /**
     * Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
     * `selector` is currently unchecked.
     *
     * Note: This also supports `aria-checked="true/false"`.
     *
     * @param {string?} message
     *
     * @example
     * assert.dom('input.active').isNotChecked();
     *
     * @see {@link #isChecked}
     */
    DOMAssertions.prototype.isNotChecked = function (message) {
      notChecked.call(this, message);
      return this;
    };
    /**
     * Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
     * `selector` is currently focused.
     *
     * @param {string?} message
     *
     * @example
     * assert.dom('input.email').isFocused();
     *
     * @see {@link #isNotFocused}
     */
    DOMAssertions.prototype.isFocused = function (message) {
      focused.call(this, message);
      return this;
    };
    /**
     * Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
     * `selector` is not currently focused.
     *
     * @param {string?} message
     *
     * @example
     * assert.dom('input[type="password"]').isNotFocused();
     *
     * @see {@link #isFocused}
     */
    DOMAssertions.prototype.isNotFocused = function (message) {
      notFocused.call(this, message);
      return this;
    };
    /**
     * Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
     * `selector` is currently required.
     *
     * @param {string?} message
     *
     * @example
     * assert.dom('input[type="text"]').isRequired();
     *
     * @see {@link #isNotRequired}
     */
    DOMAssertions.prototype.isRequired = function (message) {
      required.call(this, message);
      return this;
    };
    /**
     * Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
     * `selector` is currently not required.
     *
     * @param {string?} message
     *
     * @example
     * assert.dom('input[type="text"]').isNotRequired();
     *
     * @see {@link #isRequired}
     */
    DOMAssertions.prototype.isNotRequired = function (message) {
      notRequired.call(this, message);
      return this;
    };
    /**
     * Assert that the {@link HTMLElement} passes validation
     *
     * Validity is determined by asserting that:
     *
     * - `element.reportValidity() === true`
     *
     * @param {string?} message
     *
     * @example
     * assert.dom('.input').isValid();
     *
     * @see {@link #isValid}
     */
    DOMAssertions.prototype.isValid = function (message) {
      isValid.call(this, message);
      return this;
    };
    /**
     * Assert that the {@link HTMLElement} does not pass validation
     *
     * Validity is determined by asserting that:
     *
     * - `element.reportValidity() === true`
     *
     * @param {string?} message
     *
     * @example
     * assert.dom('.input').isNotValid();
     *
     * @see {@link #isValid}
     */
    DOMAssertions.prototype.isNotValid = function (message) {
      isValid.call(this, message, {
        inverted: true
      });
      return this;
    };
    /**
     * Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
     * `selector` exists and is visible.
     *
     * Visibility is determined by asserting that:
     *
     * - the element's offsetWidth and offsetHeight are non-zero
     * - any of the element's DOMRect objects have a non-zero size
     *
     * Additionally, visibility in this case means that the element is visible on the page,
     * but not necessarily in the viewport.
     *
     * @param {object?} options
     * @param {number?} options.count
     * @param {string?} message
     *
     * @example
     * assert.dom('#title').isVisible();
     * assert.dom('.choice').isVisible({ count: 4 });
     *
     * @see {@link #isNotVisible}
     */
    DOMAssertions.prototype.isVisible = function (options, message) {
      isVisible.call(this, options, message);
      return this;
    };
    /**
     * Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
     * `selector` does not exist or is not visible on the page.
     *
     * Visibility is determined by asserting that:
     *
     * - the element's offsetWidth or offsetHeight are zero
     * - all of the element's DOMRect objects have a size of zero
     *
     * Additionally, visibility in this case means that the element is visible on the page,
     * but not necessarily in the viewport.
     *
     * @param {string?} message
     *
     * @example
     * assert.dom('.foo').isNotVisible();
     *
     * @see {@link #isVisible}
     */
    DOMAssertions.prototype.isNotVisible = function (message) {
      isVisible.call(this, {
        count: 0
      }, message);
      return this;
    };
    /**
     * Assert that the {@link HTMLElement} has an attribute with the provided `name`
     * and optionally checks if the attribute `value` matches the provided text
     * or regular expression.
     *
     * @param {string} name
     * @param {string|RegExp|object?} value
     * @param {string?} message
     *
     * @example
     * assert.dom('input.password-input').hasAttribute('type', 'password');
     *
     * @see {@link #doesNotHaveAttribute}
     */
    DOMAssertions.prototype.hasAttribute = function (name, value, message) {
      var element = this.findTargetElement();
      if (!element) return this;
      if (arguments.length === 1) {
        value = {
          any: true
        };
      }
      var actualValue = element.getAttribute(name);
      if (value instanceof RegExp) {
        var result = value.test(actualValue);
        var expected = "Element " + this.targetDescription + " has attribute \"" + name + "\" with value matching " + value;
        var actual = actualValue === null ? "Element " + this.targetDescription + " does not have attribute \"" + name + "\"" : "Element " + this.targetDescription + " has attribute \"" + name + "\" with value " + JSON.stringify(actualValue);
        if (!message) {
          message = expected;
        }
        this.pushResult({
          result: result,
          actual: actual,
          expected: expected,
          message: message
        });
      } else if (value.any === true) {
        var result = actualValue !== null;
        var expected = "Element " + this.targetDescription + " has attribute \"" + name + "\"";
        var actual = result ? expected : "Element " + this.targetDescription + " does not have attribute \"" + name + "\"";
        if (!message) {
          message = expected;
        }
        this.pushResult({
          result: result,
          actual: actual,
          expected: expected,
          message: message
        });
      } else {
        var result = value === actualValue;
        var expected = "Element " + this.targetDescription + " has attribute \"" + name + "\" with value " + JSON.stringify(value);
        var actual = actualValue === null ? "Element " + this.targetDescription + " does not have attribute \"" + name + "\"" : "Element " + this.targetDescription + " has attribute \"" + name + "\" with value " + JSON.stringify(actualValue);
        if (!message) {
          message = expected;
        }
        this.pushResult({
          result: result,
          actual: actual,
          expected: expected,
          message: message
        });
      }
      return this;
    };
    /**
     * Assert that the {@link HTMLElement} has no attribute with the provided `name`.
     *
     * **Aliases:** `hasNoAttribute`, `lacksAttribute`
     *
     * @param {string} name
     * @param {string?} message
     *
     * @example
     * assert.dom('input.username').hasNoAttribute('disabled');
     *
     * @see {@link #hasAttribute}
     */
    DOMAssertions.prototype.doesNotHaveAttribute = function (name, message) {
      var element = this.findTargetElement();
      if (!element) return;
      var result = !element.hasAttribute(name);
      var expected = "Element " + this.targetDescription + " does not have attribute \"" + name + "\"";
      var actual = expected;
      if (!result) {
        var value = element.getAttribute(name);
        actual = "Element " + this.targetDescription + " has attribute \"" + name + "\" with value " + JSON.stringify(value);
      }
      if (!message) {
        message = expected;
      }
      this.pushResult({
        result: result,
        actual: actual,
        expected: expected,
        message: message
      });
      return this;
    };
    DOMAssertions.prototype.hasNoAttribute = function (name, message) {
      return this.doesNotHaveAttribute(name, message);
    };
    DOMAssertions.prototype.lacksAttribute = function (name, message) {
      return this.doesNotHaveAttribute(name, message);
    };
    /**
     * Assert that the {@link HTMLElement} has an ARIA attribute with the provided
     * `name` and optionally checks if the attribute `value` matches the provided
     * text or regular expression.
     *
     * @param {string} name
     * @param {string|RegExp|object?} value
     * @param {string?} message
     *
     * @example
     * assert.dom('button').hasAria('pressed', 'true');
     *
     * @see {@link #hasNoAria}
     */
    DOMAssertions.prototype.hasAria = function (name, value, message) {
      return this.hasAttribute("aria-" + name, value, message);
    };
    /**
     * Assert that the {@link HTMLElement} has no ARIA attribute with the
     * provided `name`.
     *
     * @param {string} name
     * @param {string?} message
     *
     * @example
     * assert.dom('button').doesNotHaveAria('pressed');
     *
     * @see {@link #hasAria}
     */
    DOMAssertions.prototype.doesNotHaveAria = function (name, message) {
      return this.doesNotHaveAttribute("aria-" + name, message);
    };
    /**
     * Assert that the {@link HTMLElement} has a property with the provided `name`
     * and checks if the property `value` matches the provided text or regular
     * expression.
     *
     * @param {string} name
     * @param {RegExp|any} value
     * @param {string?} message
     *
     * @example
     * assert.dom('input.password-input').hasProperty('type', 'password');
     *
     * @see {@link #doesNotHaveProperty}
     */
    DOMAssertions.prototype.hasProperty = function (name, value, message) {
      var element = this.findTargetElement();
      if (!element) return this;
      var description = this.targetDescription;
      var actualValue = element[name];
      if (value instanceof RegExp) {
        var result = value.test(String(actualValue));
        var expected = "Element " + description + " has property \"" + name + "\" with value matching " + value;
        var actual = "Element " + description + " has property \"" + name + "\" with value " + JSON.stringify(actualValue);
        if (!message) {
          message = expected;
        }
        this.pushResult({
          result: result,
          actual: actual,
          expected: expected,
          message: message
        });
      } else {
        var result = value === actualValue;
        var expected = "Element " + description + " has property \"" + name + "\" with value " + JSON.stringify(value);
        var actual = "Element " + description + " has property \"" + name + "\" with value " + JSON.stringify(actualValue);
        if (!message) {
          message = expected;
        }
        this.pushResult({
          result: result,
          actual: actual,
          expected: expected,
          message: message
        });
      }
      return this;
    };
    /**
     *  Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
     * `selector` is disabled.
     *
     * @param {string?} message
     *
     * @example
     * assert.dom('.foo').isDisabled();
     *
     * @see {@link #isNotDisabled}
     */
    DOMAssertions.prototype.isDisabled = function (message) {
      isDisabled.call(this, message);
      return this;
    };
    /**
     *  Assert that the {@link HTMLElement} or an {@link HTMLElement} matching the
     * `selector` is not disabled.
     *
     * **Aliases:** `isEnabled`
     *
     * @param {string?} message
     *
     * @example
     * assert.dom('.foo').isNotDisabled();
     *
     * @see {@link #isDisabled}
     */
    DOMAssertions.prototype.isNotDisabled = function (message) {
      isDisabled.call(this, message, {
        inverted: true
      });
      return this;
    };
    DOMAssertions.prototype.isEnabled = function (message) {
      return this.isNotDisabled(message);
    };
    /**
     * Assert that the {@link HTMLElement} has the `expected` CSS class using
     * [`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList).
     *
     * `expected` can also be a regular expression, and the assertion will return
     * true if any of the element's CSS classes match.
     *
     * @param {string|RegExp} expected
     * @param {string?} message
     *
     * @example
     * assert.dom('input[type="password"]').hasClass('secret-password-input');
     *
     * @example
     * assert.dom('input[type="password"]').hasClass(/.*password-input/);
     *
     * @see {@link #doesNotHaveClass}
     */
    DOMAssertions.prototype.hasClass = function (expected, message) {
      var element = this.findTargetElement();
      if (!element) return this;
      var actual = element.classList.toString();
      if (expected instanceof RegExp) {
        var classNames = Array.prototype.slice.call(element.classList);
        var result = classNames.some(function (className) {
          return expected.test(className);
        });
        if (!message) {
          message = "Element " + this.targetDescription + " has CSS class matching " + expected;
        }
        this.pushResult({
          result: result,
          actual: actual,
          expected: expected,
          message: message
        });
      } else {
        var result = element.classList.contains(expected);
        if (!message) {
          message = "Element " + this.targetDescription + " has CSS class \"" + expected + "\"";
        }
        this.pushResult({
          result: result,
          actual: actual,
          expected: expected,
          message: message
        });
      }
      return this;
    };
    /**
     * Assert that the {@link HTMLElement} does not have the `expected` CSS class using
     * [`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList).
     *
     * `expected` can also be a regular expression, and the assertion will return
     * true if none of the element's CSS classes match.
     *
     * **Aliases:** `hasNoClass`, `lacksClass`
     *
     * @param {string|RegExp} expected
     * @param {string?} message
     *
     * @example
     * assert.dom('input[type="password"]').doesNotHaveClass('username-input');
     *
     * @example
     * assert.dom('input[type="password"]').doesNotHaveClass(/username-.*-input/);
     *
     * @see {@link #hasClass}
     */
    DOMAssertions.prototype.doesNotHaveClass = function (expected, message) {
      var element = this.findTargetElement();
      if (!element) return this;
      var actual = element.classList.toString();
      if (expected instanceof RegExp) {
        var classNames = Array.prototype.slice.call(element.classList);
        var result = classNames.every(function (className) {
          return !expected.test(className);
        });
        if (!message) {
          message = "Element " + this.targetDescription + " does not have CSS class matching " + expected;
        }
        this.pushResult({
          result: result,
          actual: actual,
          expected: "not: " + expected,
          message: message
        });
      } else {
        var result = !element.classList.contains(expected);
        if (!message) {
          message = "Element " + this.targetDescription + " does not have CSS class \"" + expected + "\"";
        }
        this.pushResult({
          result: result,
          actual: actual,
          expected: "not: " + expected,
          message: message
        });
      }
      return this;
    };
    DOMAssertions.prototype.hasNoClass = function (expected, message) {
      return this.doesNotHaveClass(expected, message);
    };
    DOMAssertions.prototype.lacksClass = function (expected, message) {
      return this.doesNotHaveClass(expected, message);
    };
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
    DOMAssertions.prototype.hasStyle = function (expected, message) {
      return this.hasPseudoElementStyle(null, expected, message);
    };
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
    DOMAssertions.prototype.hasPseudoElementStyle = function (selector, expected, message) {
      var element = this.findTargetElement();
      if (!element) return this;
      var computedStyle = window.getComputedStyle(element, selector);
      var expectedProperties = Object.keys(expected);
      if (expectedProperties.length <= 0) {
        throw new TypeError("Missing style expectations. There must be at least one style property in the passed in expectation object.");
      }
      var result = expectedProperties.every(function (property) {
        return computedStyle[property] === expected[property];
      });
      var actual = {};
      expectedProperties.forEach(function (property) {
        return actual[property] = computedStyle[property];
      });
      if (!message) {
        var normalizedSelector = selector ? selector.replace(/^:{0,2}/, '::') : '';
        message = "Element " + this.targetDescription + normalizedSelector + " has style \"" + JSON.stringify(expected) + "\"";
      }
      this.pushResult({
        result: result,
        actual: actual,
        expected: expected,
        message: message
      });
      return this;
    };
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
    DOMAssertions.prototype.doesNotHaveStyle = function (expected, message) {
      return this.doesNotHavePseudoElementStyle(null, expected, message);
    };
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
    DOMAssertions.prototype.doesNotHavePseudoElementStyle = function (selector, expected, message) {
      var element = this.findTargetElement();
      if (!element) return this;
      var computedStyle = window.getComputedStyle(element, selector);
      var expectedProperties = Object.keys(expected);
      if (expectedProperties.length <= 0) {
        throw new TypeError("Missing style expectations. There must be at least one style property in the passed in expectation object.");
      }
      var result = expectedProperties.some(function (property) {
        return computedStyle[property] !== expected[property];
      });
      var actual = {};
      expectedProperties.forEach(function (property) {
        return actual[property] = computedStyle[property];
      });
      if (!message) {
        var normalizedSelector = selector ? selector.replace(/^:{0,2}/, '::') : '';
        message = "Element " + this.targetDescription + normalizedSelector + " does not have style \"" + JSON.stringify(expected) + "\"";
      }
      this.pushResult({
        result: result,
        actual: actual,
        expected: expected,
        message: message
      });
      return this;
    };
    /**
     * Assert that the text of the {@link HTMLElement} or an {@link HTMLElement}
     * matching the `selector` matches the `expected` text, using the
     * [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
     * attribute and stripping/collapsing whitespace.
     *
     * `expected` can also be a regular expression.
     *
     * > Note: This assertion will collapse whitespace if the type you pass in is a string.
     * > If you are testing specifically for whitespace integrity, pass your expected text
     * > in as a RegEx pattern.
     *
     * **Aliases:** `matchesText`
     *
     * @param {string|RegExp} expected
     * @param {string?} message
     *
     * @example
     * // <h2 id="title">
     * //   Welcome to <b>QUnit</b>
     * // </h2>
     *
     * assert.dom('#title').hasText('Welcome to QUnit');
     *
     * @example
     * assert.dom('.foo').hasText(/[12]\d{3}/);
     *
     * @see {@link #includesText}
     */
    DOMAssertions.prototype.hasText = function (expected, message) {
      var element = this.findTargetElement();
      if (!element) return this;
      if (expected instanceof RegExp) {
        var result = expected.test(element.textContent);
        var actual = element.textContent;
        if (!message) {
          message = "Element " + this.targetDescription + " has text matching " + expected;
        }
        this.pushResult({
          result: result,
          actual: actual,
          expected: expected,
          message: message
        });
      } else if (expected.any === true) {
        var result = Boolean(element.textContent);
        var expected_1 = "Element " + this.targetDescription + " has a text";
        var actual = result ? expected_1 : "Element " + this.targetDescription + " has no text";
        if (!message) {
          message = expected_1;
        }
        this.pushResult({
          result: result,
          actual: actual,
          expected: expected_1,
          message: message
        });
      } else if (typeof expected === 'string') {
        expected = collapseWhitespace(expected);
        var actual = collapseWhitespace(element.textContent);
        var result = actual === expected;
        if (!message) {
          message = "Element " + this.targetDescription + " has text \"" + expected + "\"";
        }
        this.pushResult({
          result: result,
          actual: actual,
          expected: expected,
          message: message
        });
      } else {
        throw new TypeError("You must pass a string or Regular Expression to \"hasText\". You passed " + expected + ".");
      }
      return this;
    };
    DOMAssertions.prototype.matchesText = function (expected, message) {
      return this.hasText(expected, message);
    };
    /**
     * Assert that the `textContent` property of an {@link HTMLElement} is not empty.
     *
     * @param {string?} message
     *
     * @example
     * assert.dom('button.share').hasAnyText();
     *
     * @see {@link #hasText}
     */
    DOMAssertions.prototype.hasAnyText = function (message) {
      return this.hasText({
        any: true
      }, message);
    };
    /**
     * Assert that the `textContent` property of an {@link HTMLElement} is empty.
     *
     * @param {string?} message
     *
     * @example
     * assert.dom('div').hasNoText();
     *
     * @see {@link #hasNoText}
     */
    DOMAssertions.prototype.hasNoText = function (message) {
      return this.hasText('', message);
    };
    /**
     * Assert that the text of the {@link HTMLElement} or an {@link HTMLElement}
     * matching the `selector` contains the given `text`, using the
     * [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
     * attribute.
     *
     * > Note: This assertion will collapse whitespace in `textContent` before searching.
     * > If you would like to assert on a string that *should* contain line breaks, tabs,
     * > more than one space in a row, or starting/ending whitespace, use the {@link #hasText}
     * > selector and pass your expected text in as a RegEx pattern.
     *
     * **Aliases:** `containsText`, `hasTextContaining`
     *
     * @param {string} text
     * @param {string?} message
     *
     * @example
     * assert.dom('#title').includesText('Welcome');
     *
     * @see {@link #hasText}
     */
    DOMAssertions.prototype.includesText = function (text, message) {
      var element = this.findTargetElement();
      if (!element) return this;
      var collapsedText = collapseWhitespace(element.textContent);
      var result = collapsedText.indexOf(text) !== -1;
      var actual = collapsedText;
      var expected = text;
      if (!message) {
        message = "Element " + this.targetDescription + " has text containing \"" + text + "\"";
      }
      if (!result && text !== collapseWhitespace(text)) {
        console.warn('The `.includesText()`, `.containsText()`, and `.hasTextContaining()` assertions collapse whitespace. The text you are checking for contains whitespace that may have made your test fail incorrectly. Try the `.hasText()` assertion passing in your expected text as a RegExp pattern. Your text:\n' + text);
      }
      this.pushResult({
        result: result,
        actual: actual,
        expected: expected,
        message: message
      });
      return this;
    };
    DOMAssertions.prototype.containsText = function (expected, message) {
      return this.includesText(expected, message);
    };
    DOMAssertions.prototype.hasTextContaining = function (expected, message) {
      return this.includesText(expected, message);
    };
    /**
     * Assert that the text of the {@link HTMLElement} or an {@link HTMLElement}
     * matching the `selector` does not include the given `text`, using the
     * [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
     * attribute.
     *
     * **Aliases:** `doesNotContainText`, `doesNotHaveTextContaining`
     *
     * @param {string} text
     * @param {string?} message
     *
     * @example
     * assert.dom('#title').doesNotIncludeText('Welcome');
     */
    DOMAssertions.prototype.doesNotIncludeText = function (text, message) {
      var element = this.findTargetElement();
      if (!element) return this;
      var collapsedText = collapseWhitespace(element.textContent);
      var result = collapsedText.indexOf(text) === -1;
      var expected = "Element " + this.targetDescription + " does not include text \"" + text + "\"";
      var actual = expected;
      if (!result) {
        actual = "Element " + this.targetDescription + " includes text \"" + text + "\"";
      }
      if (!message) {
        message = expected;
      }
      this.pushResult({
        result: result,
        actual: actual,
        expected: expected,
        message: message
      });
      return this;
    };
    DOMAssertions.prototype.doesNotContainText = function (unexpected, message) {
      return this.doesNotIncludeText(unexpected, message);
    };
    DOMAssertions.prototype.doesNotHaveTextContaining = function (unexpected, message) {
      return this.doesNotIncludeText(unexpected, message);
    };
    /**
     * Assert that the `value` property of an {@link HTMLInputElement} matches
     * the `expected` text or regular expression.
     *
     * If no `expected` value is provided, the assertion will fail if the
     * `value` is an empty string.
     *
     * @param {string|RegExp|object?} expected
     * @param {string?} message
     *
     * @example
     * assert.dom('input.username').hasValue('HSimpson');
        * @see {@link #hasAnyValue}
     * @see {@link #hasNoValue}
     */
    DOMAssertions.prototype.hasValue = function (expected, message) {
      var element = this.findTargetElement();
      if (!element) return this;
      if (arguments.length === 0) {
        expected = {
          any: true
        };
      }
      var value = element.value;
      if (expected instanceof RegExp) {
        var result = expected.test(value);
        var actual = value;
        if (!message) {
          message = "Element " + this.targetDescription + " has value matching " + expected;
        }
        this.pushResult({
          result: result,
          actual: actual,
          expected: expected,
          message: message
        });
      } else if (expected.any === true) {
        var result = Boolean(value);
        var expected_2 = "Element " + this.targetDescription + " has a value";
        var actual = result ? expected_2 : "Element " + this.targetDescription + " has no value";
        if (!message) {
          message = expected_2;
        }
        this.pushResult({
          result: result,
          actual: actual,
          expected: expected_2,
          message: message
        });
      } else {
        var actual = value;
        var result = actual === expected;
        if (!message) {
          message = "Element " + this.targetDescription + " has value \"" + expected + "\"";
        }
        this.pushResult({
          result: result,
          actual: actual,
          expected: expected,
          message: message
        });
      }
      return this;
    };
    /**
     * Assert that the `value` property of an {@link HTMLInputElement} is not empty.
     *
     * @param {string?} message
     *
     * @example
     * assert.dom('input.username').hasAnyValue();
     *
     * @see {@link #hasValue}
     * @see {@link #hasNoValue}
     */
    DOMAssertions.prototype.hasAnyValue = function (message) {
      return this.hasValue({
        any: true
      }, message);
    };
    /**
     * Assert that the `value` property of an {@link HTMLInputElement} is empty.
     *
     * **Aliases:** `lacksValue`
     *
     * @param {string?} message
     *
     * @example
     * assert.dom('input.username').hasNoValue();
     *
     * @see {@link #hasValue}
     * @see {@link #hasAnyValue}
     */
    DOMAssertions.prototype.hasNoValue = function (message) {
      return this.hasValue('', message);
    };
    DOMAssertions.prototype.lacksValue = function (message) {
      return this.hasNoValue(message);
    };
    /**
     * Assert that the target selector selects only Elements that are also selected by
     * compareSelector.
     *
     * @param {string} compareSelector
     * @param {string?} message
     *
     * @example
     * assert.dom('p.red').matchesSelector('div.wrapper p:last-child')
     */
    DOMAssertions.prototype.matchesSelector = function (compareSelector, message) {
      var targetElements = this.target instanceof Element ? [this.target] : this.findElements();
      var targets = targetElements.length;
      var matchFailures = matchesSelector(targetElements, compareSelector);
      var singleElement = targets === 1;
      var selectedByPart = this.target instanceof Element ? 'passed' : "selected by " + this.target;
      var actual;
      var expected;
      if (matchFailures === 0) {
        // no failures matching.
        if (!message) {
          message = singleElement ? "The element " + selectedByPart + " also matches the selector " + compareSelector + "." : targets + " elements, selected by " + this.target + ", also match the selector " + compareSelector + ".";
        }
        actual = expected = message;
        this.pushResult({
          result: true,
          actual: actual,
          expected: expected,
          message: message
        });
      } else {
        var difference = targets - matchFailures;
        // there were failures when matching.
        if (!message) {
          message = singleElement ? "The element " + selectedByPart + " did not also match the selector " + compareSelector + "." : matchFailures + " out of " + targets + " elements selected by " + this.target + " did not also match the selector " + compareSelector + ".";
        }
        actual = singleElement ? message : difference + " elements matched " + compareSelector + ".";
        expected = singleElement ? "The element should have matched " + compareSelector + "." : targets + " elements should have matched " + compareSelector + ".";
        this.pushResult({
          result: false,
          actual: actual,
          expected: expected,
          message: message
        });
      }
      return this;
    };
    /**
     * Assert that the target selector selects only Elements that are not also selected by
     * compareSelector.
     *
     * @param {string} compareSelector
     * @param {string?} message
     *
     * @example
     * assert.dom('input').doesNotMatchSelector('input[disabled]')
     */
    DOMAssertions.prototype.doesNotMatchSelector = function (compareSelector, message) {
      var targetElements = this.target instanceof Element ? [this.target] : this.findElements();
      var targets = targetElements.length;
      var matchFailures = matchesSelector(targetElements, compareSelector);
      var singleElement = targets === 1;
      var selectedByPart = this.target instanceof Element ? 'passed' : "selected by " + this.target;
      var actual;
      var expected;
      if (matchFailures === targets) {
        // the assertion is successful because no element matched the other selector.
        if (!message) {
          message = singleElement ? "The element " + selectedByPart + " did not also match the selector " + compareSelector + "." : targets + " elements, selected by " + this.target + ", did not also match the selector " + compareSelector + ".";
        }
        actual = expected = message;
        this.pushResult({
          result: true,
          actual: actual,
          expected: expected,
          message: message
        });
      } else {
        var difference = targets - matchFailures;
        // the assertion fails because at least one element matched the other selector.
        if (!message) {
          message = singleElement ? "The element " + selectedByPart + " must not also match the selector " + compareSelector + "." : difference + " elements out of " + targets + ", selected by " + this.target + ", must not also match the selector " + compareSelector + ".";
        }
        actual = singleElement ? "The element " + selectedByPart + " matched " + compareSelector + "." : matchFailures + " elements did not match " + compareSelector + ".";
        expected = singleElement ? message : targets + " elements should not have matched " + compareSelector + ".";
        this.pushResult({
          result: false,
          actual: actual,
          expected: expected,
          message: message
        });
      }
      return this;
    };
    /**
     * Assert that the tagName of the {@link HTMLElement} or an {@link HTMLElement}
     * matching the `selector` matches the `expected` tagName, using the
     * [`tagName`](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName)
     * property of the {@link HTMLElement}.
     *
     * @param {string} expected
     * @param {string?} message
     *
     * @example
     * // <h1 id="title">
     * //   Title
     * // </h1>
     *
     * assert.dom('#title').hasTagName('h1');
     */
    DOMAssertions.prototype.hasTagName = function (tagName, message) {
      var element = this.findTargetElement();
      var actual;
      var expected;
      if (!element) return this;
      if (typeof tagName !== 'string') {
        throw new TypeError("You must pass a string to \"hasTagName\". You passed " + tagName + ".");
      }
      actual = element.tagName.toLowerCase();
      expected = tagName.toLowerCase();
      if (actual === expected) {
        if (!message) {
          message = "Element " + this.targetDescription + " has tagName " + expected;
        }
        this.pushResult({
          result: true,
          actual: actual,
          expected: expected,
          message: message
        });
      } else {
        if (!message) {
          message = "Element " + this.targetDescription + " does not have tagName " + expected;
        }
        this.pushResult({
          result: false,
          actual: actual,
          expected: expected,
          message: message
        });
      }
      return this;
    };
    /**
     * Assert that the tagName of the {@link HTMLElement} or an {@link HTMLElement}
     * matching the `selector` does not match the `expected` tagName, using the
     * [`tagName`](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName)
     * property of the {@link HTMLElement}.
     *
     * @param {string} expected
     * @param {string?} message
     *
     * @example
     * // <section id="block">
     * //   Title
     * // </section>
     *
     * assert.dom('section#block').doesNotHaveTagName('div');
     */
    DOMAssertions.prototype.doesNotHaveTagName = function (tagName, message) {
      var element = this.findTargetElement();
      var actual;
      var expected;
      if (!element) return this;
      if (typeof tagName !== 'string') {
        throw new TypeError("You must pass a string to \"doesNotHaveTagName\". You passed " + tagName + ".");
      }
      actual = element.tagName.toLowerCase();
      expected = tagName.toLowerCase();
      if (actual !== expected) {
        if (!message) {
          message = "Element " + this.targetDescription + " does not have tagName " + expected;
        }
        this.pushResult({
          result: true,
          actual: actual,
          expected: expected,
          message: message
        });
      } else {
        if (!message) {
          message = "Element " + this.targetDescription + " has tagName " + expected;
        }
        this.pushResult({
          result: false,
          actual: actual,
          expected: expected,
          message: message
        });
      }
      return this;
    };
    /**
     * @private
     */
    DOMAssertions.prototype.pushResult = function (result) {
      this.testContext.pushResult(result);
    };
    /**
     * Finds a valid HTMLElement from target, or pushes a failing assertion if a valid
     * element is not found.
     * @private
     * @returns (HTMLElement|null) a valid HTMLElement, or null
     */
    DOMAssertions.prototype.findTargetElement = function () {
      var el = this.findElement();
      if (el === null) {
        var message = "Element " + (this.target || '<unknown>') + " should exist";
        this.pushResult({
          message: message,
          result: false,
          actual: undefined,
          expected: undefined
        });
        return null;
      }
      return el;
    };
    /**
     * Finds a valid HTMLElement from target
     * @private
     * @returns (HTMLElement|null) a valid HTMLElement, or null
     * @throws TypeError will be thrown if target is an unrecognized type
     */
    DOMAssertions.prototype.findElement = function () {
      if (this.target === null) {
        return null;
      } else if (typeof this.target === 'string') {
        return this.rootElement.querySelector(this.target);
      } else if (this.target instanceof Element) {
        return this.target;
      } else {
        throw new TypeError("Unexpected Parameter: " + this.target);
      }
    };
    /**
     * Finds a collection of Element instances from target using querySelectorAll
     * @private
     * @returns (Element[]) an array of Element instances
     * @throws TypeError will be thrown if target is an unrecognized type
     */
    DOMAssertions.prototype.findElements = function () {
      if (this.target === null) {
        return [];
      } else if (typeof this.target === 'string') {
        return toArray(this.rootElement.querySelectorAll(this.target));
      } else if (this.target instanceof Element) {
        return [this.target];
      } else {
        throw new TypeError("Unexpected Parameter: " + this.target);
      }
    };
    Object.defineProperty(DOMAssertions.prototype, "targetDescription", {
      /**
       * @private
       */
      get: function () {
        return elementToString(this.target);
      },
      enumerable: false,
      configurable: true
    });
    return DOMAssertions;
  }();
  var _getRootElement = function () {
    return null;
  };
  function overrideRootElement(fn) {
    _getRootElement = fn;
  }
  function getRootElement() {
    return _getRootElement();
  }
  function install(assert) {
    assert.dom = function (target, rootElement) {
      if (!isValidRootElement(rootElement)) {
        throw new Error(rootElement + " is not a valid root element");
      }
      rootElement = rootElement || this.dom.rootElement || getRootElement();
      if (arguments.length === 0) {
        target = rootElement instanceof Element ? rootElement : null;
      }
      return new DOMAssertions(target, rootElement, this);
    };
    function isValidRootElement(element) {
      return !element || typeof element === 'object' && typeof element.querySelector === 'function' && typeof element.querySelectorAll === 'function';
    }
  }
  function setup(assert, options) {
    if (options === void 0) {
      options = {};
    }
    install(assert);
    var getRootElement = typeof options.getRootElement === 'function' ? options.getRootElement : function () {
      return document.querySelector('#ember-testing');
    };
    overrideRootElement(getRootElement);
  }
});
/*
  used to determine if the application should be booted immediately when `app-name.js` is evaluated
  when `runningTests` the `app-name.js` file will **not** import the applications `app/app.js` and
  call `Application.create(...)` on it. Additionally, applications can opt-out of this behavior by
  setting `autoRun` to `false` in their `ember-cli-build.js`
*/
runningTests = true;

/*
  This file overrides a file built into ember-cli's build pipeline and prevents
  this built-in `Testem.hookIntoTestFramework` invocation:

  https://github.com/ember-cli/ember-cli/blob/v3.20.0/lib/broccoli/test-support-suffix.js#L3-L5
*/
//# sourceMappingURL=test-support.map
